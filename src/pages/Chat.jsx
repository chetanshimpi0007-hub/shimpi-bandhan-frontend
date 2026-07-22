import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  FaPaperPlane, FaSmile, FaPaperclip, FaMicrophone, FaMicrophoneSlash,
  FaEllipsisV, FaPhone, FaVideo, FaVideoSlash, FaSpinner, FaVolumeUp
} from 'react-icons/fa';
import api from '../services/api';

/* ─── Call Modal ─────────────────────────────────────────── */
const CallModal = ({ type, participant, onEnd }) => {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [connected, setConnected] = useState(false);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (connected) {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [connected]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`relative w-full max-w-sm mx-4 rounded-[32px] overflow-hidden shadow-2xl ${type === 'video' ? 'bg-slate-900' : 'bg-gradient-to-b from-indigo-900 to-slate-900'}`}>

        {/* Video area */}
        {type === 'video' && (
          <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
            <span className="text-6xl">{camOff ? '🚫' : '👩'}</span>
            <div className="absolute bottom-3 right-3 w-20 h-14 bg-slate-700 rounded-xl border-2 border-white/20 flex items-center justify-center text-2xl">🧑</div>
          </div>
        )}

        {/* Info */}
        <div className={`flex flex-col items-center gap-3 ${type === 'video' ? 'py-4' : 'py-12'}`}>
          {type !== 'video' && (
            <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center text-5xl mb-2">👩</div>
          )}
          <h3 className="text-white font-extrabold text-xl">{participant?.participantName || 'User'}</h3>
          {connected ? (
            <span className="text-emerald-400 text-sm font-bold animate-pulse">
              {type === 'video' ? '📹' : '📞'} Connected • {fmt(duration)}
            </span>
          ) : (
            <span className="text-slate-400 text-sm font-bold animate-pulse">
              {type === 'video' ? 'Starting video call...' : 'Calling...'}
            </span>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-5 pb-8 px-6">
          {/* Mute */}
          <button
            onClick={() => setMuted(m => !m)}
            title={muted ? 'Unmute' : 'Mute'}
            className={`p-4 rounded-full transition-all shadow-md ${muted ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'}`}
          >
            {muted ? <FaMicrophoneSlash size={18} /> : <FaMicrophone size={18} />}
          </button>

          {/* End Call */}
          <button
            onClick={onEnd}
            title="End Call"
            className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 transition-all scale-110"
          >
            <FaPhone size={20} className="rotate-[135deg]" />
          </button>

          {/* Camera / Speaker */}
          {type === 'video' ? (
            <button
              onClick={() => setCamOff(c => !c)}
              title={camOff ? 'Turn Camera On' : 'Turn Camera Off'}
              className={`p-4 rounded-full transition-all shadow-md ${camOff ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'}`}
            >
              {camOff ? <FaVideoSlash size={18} /> : <FaVideo size={18} />}
            </button>
          ) : (
            <button title="Speaker" className="p-4 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all shadow-md">
              <FaVolumeUp size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Chat Page ──────────────────────────────────────────── */
const Chat = () => {
  const currentUser = useSelector(state => state?.auth?.user);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [activeCall, setActiveCall] = useState(null); // null | 'voice' | 'video'

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoadingRooms(true);
        const res = await api.get('/chat/rooms');
        if (res.data && res.data.length > 0) {
          setRooms(res.data);
          setActiveRoomId(res.data[0].id);
        } else {
          // Provide mock rooms so the user can test the calls!
          const mockRooms = [
            { id: 'mock-1', participantName: 'Ankita Joshi', participantPhoto: '/indian-girl-1.jpg', isOnline: true, lastMessage: 'Hey, I checked your profile!', lastMessageTime: '10:42 AM', isFamilyAccount: false },
            { id: 'mock-2', participantName: 'Shreya Patil', participantPhoto: '/indian-girl-2.jpg', isOnline: true, lastMessage: 'Are you free for a call?', lastMessageTime: 'Yesterday', isFamilyAccount: true },
            { id: 'mock-3', participantName: 'Pooja Kadam', participantPhoto: '/indian-girl-3.jpg', isOnline: false, lastMessage: 'Nice meeting you.', lastMessageTime: '2 days ago', isFamilyAccount: false },
            { id: 'mock-4', participantName: 'Sneha Mohite', participantPhoto: '/indian-girl-4.jpg', isOnline: true, lastMessage: 'Sent you an interest request.', lastMessageTime: '3 days ago', isFamilyAccount: false }
          ];
          setRooms(mockRooms);
          setActiveRoomId(mockRooms[0].id);
        }
      } catch (err) {
        console.error('Failed to load chat rooms, falling back to mock data', err);
        const mockRooms = [
          { id: 'mock-1', participantName: 'Ankita Joshi', participantPhoto: '/indian-girl-1.jpg', isOnline: true, lastMessage: 'Hey, I checked your profile!', lastMessageTime: '10:42 AM', isFamilyAccount: false },
          { id: 'mock-2', participantName: 'Shreya Patil', participantPhoto: '/indian-girl-2.jpg', isOnline: true, lastMessage: 'Are you free for a call?', lastMessageTime: 'Yesterday', isFamilyAccount: true },
          { id: 'mock-3', participantName: 'Pooja Kadam', participantPhoto: '/indian-girl-3.jpg', isOnline: false, lastMessage: 'Nice meeting you.', lastMessageTime: '2 days ago', isFamilyAccount: false },
          { id: 'mock-4', participantName: 'Sneha Mohite', participantPhoto: '/indian-girl-4.jpg', isOnline: true, lastMessage: 'Sent you an interest request.', lastMessageTime: '3 days ago', isFamilyAccount: false }
        ];
        setRooms(mockRooms);
        setActiveRoomId(mockRooms[0].id);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!activeRoomId) return;
    if (String(activeRoomId).startsWith('mock-')) {
      const mockMessagesMap = {
        'mock-1': [
          { id: 1, senderId: 'other', text: 'Namaste! I checked your profile on Shimpi Bandhan.', time: '10:30 AM' },
          { id: 2, senderId: 'me', text: 'Namaste Ankita! Nice to connect with you. What do you do?', time: '10:35 AM' },
          { id: 3, senderId: 'other', text: 'I am a Software Engineer based in Pune. What about you?', time: '10:40 AM' },
          { id: 4, senderId: 'other', text: 'Hey, I checked your profile!', time: '10:42 AM' }
        ],
        'mock-2': [
          { id: 1, senderId: 'other', text: 'Hello, my family is interested in your profile.', time: 'Yesterday' },
          { id: 2, senderId: 'me', text: 'Thank you! Let me know when we can discuss.', time: 'Yesterday' },
          { id: 3, senderId: 'other', text: 'Are you free for a call?', time: 'Yesterday' }
        ],
        'mock-3': [
          { id: 1, senderId: 'other', text: 'Hello, let us connect here first.', time: '2 days ago' },
          { id: 2, senderId: 'me', text: 'Sure, sounds good.', time: '2 days ago' },
          { id: 3, senderId: 'other', text: 'Nice meeting you.', time: '2 days ago' }
        ],
        'mock-4': [
          { id: 1, senderId: 'other', text: 'Sent you an interest request.', time: '3 days ago' }
        ]
      };
      setMessages(mockMessagesMap[activeRoomId] || []);
      return;
    }
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await api.get(`/chat/messages/${activeRoomId}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages', err);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [activeRoomId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeRoomId) return;

    if (String(activeRoomId).startsWith('mock-')) {
      const newMsgObj = {
        id: Date.now(),
        senderId: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsgObj]);
      setNewMessage('');
      setRooms(prev => prev.map(r =>
        r.id === activeRoomId
          ? { ...r, lastMessage: newMsgObj.text, lastMessageTime: newMsgObj.time }
          : r
      ));
      return;
    }

    try {
      const res = await api.post(`/chat/messages/${activeRoomId}`, { text: newMessage });
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
      setRooms(prev => prev.map(r =>
        r.id === activeRoomId
          ? { ...r, lastMessage: res.data.text, lastMessageTime: res.data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : r
      ));
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const activeRoom = rooms.find(r => r.id === activeRoomId);

  return (
    <>
      {activeCall && (
        <CallModal type={activeCall} participant={activeRoom} onEnd={() => setActiveCall(null)} />
      )}

      <div className="flex h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Sidebar */}
        <div className="w-80 border-r border-gray-100 hidden md:flex flex-col bg-gray-50">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h2 className="text-xl font-bold text-gray-800">Messages</h2>
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full mt-4 bg-gray-100 border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingRooms ? (
              <div className="flex justify-center p-8"><FaSpinner className="animate-spin text-xl text-[var(--color-primary)]" /></div>
            ) : rooms.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No conversations yet.</div>
            ) : (
              rooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`p-4 cursor-pointer flex gap-3 ${activeRoomId === room.id ? 'bg-blue-50 border-l-4 border-[var(--color-primary)]' : 'hover:bg-gray-100 border-l-4 border-transparent'}`}
                >
                  <div className="relative">
                    <img src={room.participantPhoto || 'https://via.placeholder.com/40'} alt="Avatar" loading="lazy" className={`w-10 h-10 rounded-full ${room.isOnline ? '' : 'grayscale opacity-70'}`} />
                    {room.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className={`font-bold truncate ${activeRoomId === room.id ? 'text-gray-900' : 'text-gray-700'}`}>{room.participantName}</h4>
                      <span className={`text-xs font-medium ${activeRoomId === room.id ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>{room.lastMessageTime}</span>
                    </div>
                    <p className={`text-sm truncate ${activeRoomId === room.id ? 'text-gray-600' : 'text-gray-500'}`}>{room.lastMessage}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {activeRoom ? (
            <>
              {/* Header with call buttons */}
              <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <img src={activeRoom.participantPhoto || 'https://via.placeholder.com/40'} alt="Avatar" loading="lazy" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      {activeRoom.participantName}
                      {activeRoom.isFamilyAccount && (
                        <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200">Family Member</span>
                      )}
                    </h3>
                    {activeRoom.isOnline && <p className="text-xs text-green-500 font-medium">Online</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Voice Call */}
                  <button
                    onClick={() => setActiveCall('voice')}
                    title="Voice Call"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-500 text-xs font-black transition-all shadow-sm"
                  >
                    <FaPhone size={13} />
                    <span className="hidden sm:inline">Voice Call</span>
                  </button>

                  {/* Video Call */}
                  <button
                    onClick={() => setActiveCall('video')}
                    title="Video Call"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-500 text-xs font-black transition-all shadow-sm"
                  >
                    <FaVideo size={13} />
                    <span className="hidden sm:inline">Video Call</span>
                  </button>

                  <div className="h-6 w-px bg-gray-200 mx-1" />
                  <FaEllipsisV className="text-gray-400 hover:text-gray-700 cursor-pointer" />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {loadingMessages ? (
                  <div className="flex justify-center p-8"><FaSpinner className="animate-spin text-2xl text-[var(--color-primary)]" /></div>
                ) : messages.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">Send a message to start the conversation!</div>
                ) : (
                  messages.map(msg => {
                    const isMe = msg.senderId === 'me' || msg.senderId === currentUser?.id;
                    const isFamily = msg.senderAccountType === 'FAMILY' || msg.isFamilyMember;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${isMe ? 'bg-gradient-to-r from-[var(--color-primary)] to-blue-800 text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'}`}>
                          {!isMe && isFamily && <div className="text-[10px] font-bold text-purple-600 mb-1">👨‍👩‍👧 Family Member</div>}
                          <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                          <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time || msg.timestamp}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="flex items-center gap-2 max-w-4xl mx-auto">
                  <button type="button" className="p-2 text-gray-400 hover:text-[var(--color-secondary)] transition-colors"><FaSmile className="text-xl" /></button>
                  <button type="button" className="p-2 text-gray-400 hover:text-[var(--color-secondary)] transition-colors"><FaPaperclip className="text-xl" /></button>
                  <div className="flex-1 bg-gray-50 rounded-full border border-gray-200 flex items-center px-4 py-1.5 focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent transition-all shadow-inner">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-none outline-none text-gray-800 p-2"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                    />
                  </div>
                  {newMessage.trim() ? (
                    <button type="submit" className="bg-[var(--color-primary)] text-white p-3 rounded-full hover:bg-blue-900 transition-colors shadow-md">
                      <FaPaperPlane />
                    </button>
                  ) : (
                    <button type="button" className="p-3 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                      <FaMicrophone className="text-xl" />
                    </button>
                  )}
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;