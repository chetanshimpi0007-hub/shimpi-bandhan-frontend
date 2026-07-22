import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from '../services/api';

export const useExportQueue = () => {
  const [jobs, setJobs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await api.get('/admin/export/jobs?page=0&size=50&sort=requestedAt,desc');
      setJobs(response.data.content);
    } catch (error) {
      console.error('Failed to fetch export jobs', error);
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    const socket = new SockJS('http://localhost:8080/ws-admin');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        // console.log(str);
      },
      onConnect: () => {
        setIsConnected(true);
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        client.subscribe('/topic/admin/exports', (message) => {
          if (message.body) {
            const updatedJob = JSON.parse(message.body);
            setJobs(prevJobs => {
              const index = prevJobs.findIndex(j => j.id === updatedJob.id);
              if (index >= 0) {
                const newJobs = [...prevJobs];
                newJobs[index] = { ...newJobs[index], ...updatedJob };
                return newJobs;
              } else {
                return [updatedJob, ...prevJobs];
              }
            });
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onDisconnect: () => {
        setIsConnected(false);
        startPolling();
      },
      onWebSocketClose: () => {
        setIsConnected(false);
        startPolling();
      }
    });

    client.activate();
    stompClientRef.current = client;
  }, []);

  const startPolling = useCallback(() => {
    if (!pollingIntervalRef.current) {
      console.log('WebSocket disconnected, falling back to HTTP polling every 10s...');
      pollingIntervalRef.current = setInterval(() => {
        fetchJobs();
      }, 10000);
    }
  }, [fetchJobs]);

  useEffect(() => {
    fetchJobs(); // Initial fetch
    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchJobs, connectWebSocket]);

  const deleteJob = async (jobUuid) => {
    try {
      await api.delete(`/admin/export/jobs/${jobUuid}`);
      setJobs(prev => prev.filter(j => j.jobUuid !== jobUuid));
    } catch (error) {
      console.error('Failed to delete job', error);
      throw error;
    }
  };

  const queueExport = async (requestDto) => {
    try {
      const res = await api.post('/admin/export/queue', requestDto);
      // It should naturally come through WS or Polling, but we can optimistically prepend it
      setJobs(prev => {
        if (!prev.find(j => j.id === res.data.id)) {
          return [res.data, ...prev];
        }
        return prev;
      });
      return res.data;
    } catch (error) {
      console.error('Failed to queue export', error);
      throw error;
    }
  };

  return { jobs, isConnected, deleteJob, queueExport, refetch: fetchJobs };
};
