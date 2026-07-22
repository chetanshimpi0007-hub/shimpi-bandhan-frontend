import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { FaVideo, FaPhone, FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';

const FamilyDiscussionRoom = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Uncle Rajesh', text: 'Have you seen the new profile?', time: '10:00 AM', isSelf: false },
    { id: 2, sender: 'You', text: 'Yes, it looks promising. We should schedule a meeting.', time: '10:05 AM', isSelf: true },
  ]);
  const [inputText, setInputText] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [inCall, setInCall] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Setup STOMP Client
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        client.subscribe('/topic/family-group', (message) => {
          if (message.body) {
            const newMsg = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMsg]);
          }
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() && stompClient && stompClient.connected) {
      const msg = {
        id: Date.now(),
        sender: 'You',
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      };
      stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(msg)
      });
      setInputText('');
    } else if (inputText.trim()) {
      // Fallback for UI testing if disconnected
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'You',
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      }]);
      setInputText('');
    }
  };

  const startVideoCall = () => {
    setInCall(true);
    // WebRTC initialization would go here using simple-peer
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="bg-[var(--color-primary)] text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-xl font-bold">Family Discussion Room</h2>
          <p className="text-sm opacity-80">3 members online</p>
        </div>
        <div className="flex gap-4">
          <button onClick={startVideoCall} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <FaVideo className="text-xl" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <FaPhone className="text-xl" />
          </button>
        </div>
      </div>

      {inCall && (
        <div className="bg-black text-white p-4 flex flex-col items-center justify-center h-64 relative">
          <p>Video Call in progress...</p>
          <button onClick={() => setInCall(false)} className="mt-4 bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-colors">End Call</button>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4 border-x border-gray-200">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-gray-500 mb-1 ml-1">{msg.sender}</span>
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${msg.isSelf ? 'bg-[var(--color-primary)] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
              <p>{msg.text}</p>
              <span className={`text-[10px] block mt-1 ${msg.isSelf ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 rounded-b-2xl border border-t-0 border-gray-200 shadow-sm">
        <form onSubmit={sendMessage} className="flex items-center gap-3">
          <button type="button" className="text-gray-400 hover:text-gray-600 p-2">
            <FaSmile className="text-xl" />
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-600 p-2">
            <FaPaperclip className="text-xl" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <button type="submit" className="bg-[var(--color-secondary)] text-[var(--color-primary)] p-3 rounded-full hover:brightness-95 transition-all shadow-sm flex items-center justify-center">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FamilyDiscussionRoom;
