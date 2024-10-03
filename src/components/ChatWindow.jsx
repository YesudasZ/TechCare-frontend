import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSend, FiImage, FiVideo, FiSmile } from 'react-icons/fi';
import axios from '../utils/axiosConfig';
import io from 'socket.io-client';
import Picker from 'emoji-picker-react';

const ChatWindow = ({ service, onClose, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState({ images: [], videos: [] });
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [readMessages, setReadMessages] = useState(new Set());

  const isTechnician = currentUser.role === 'technician';

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      newSocket.emit('join room', service._id);
      newSocket.emit('user online', currentUser.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    newSocket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (message.sender._id !== currentUser.id) {
        markMessageAsRead(message._id);
      }
    });

    newSocket.on('user online', (userId) => {
      setOnlineUsers((prev) => new Set(prev).add(userId));
    });

    newSocket.on('user offline', (userId) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    newSocket.on('message read', (messageId) => {
      setReadMessages((prev) => new Set(prev).add(messageId));
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.emit('leave room', service._id);
        newSocket.emit('user offline', currentUser.id);
        newSocket.disconnect();
      }
    };
  }, [service._id, currentUser.id]);

  useEffect(() => {
    fetchChatHistory();
  }, [service._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`/auth/chat-history/${service._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' && attachments.images.length === 0 && attachments.videos.length === 0) return;

    try {
      const messageData = {
        serviceId: service._id,
        message: newMessage,
        type: 'text',
      };

      if (attachments.images.length > 0) {
        messageData.type = 'image';
        messageData.file = attachments.images[0];
      } else if (attachments.videos.length > 0) {
        messageData.type = 'video';
        messageData.file = attachments.videos[0];
      }

      const response = await axios.post('/auth/send-message', messageData);
      const sentMessage = response.data;

      if (socket && socket.connected) {
        socket.emit('chat message', sentMessage);
        if (onlineUsers.has(isTechnician ? service.user : service.technician)) {
          socket.emit('check message read', sentMessage._id);
        }
      } else {
        console.error('Socket is not connected');
      }

      setNewMessage('');
      setAttachments({ images: [], videos: [] });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await axios.put('/auth/mark-messages-read', {
        serviceId: service._id,
        messageIds: [messageId],
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };



  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert("Only JPG, PNG, and WebP images are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachments((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validVideoTypes = ['video/mp4', 'video/x-matroska'];
    if (!validVideoTypes.includes(file.type)) {
      alert("Only MP4 and MKV video formats are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachments((prev) => ({ ...prev, videos: [...prev.videos, reader.result] }));
    };
    reader.readAsDataURL(file);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStatus = (message) => {
    if (message.sender._id === currentUser.id) {
      if (readMessages.has(message._id)) {
        return '✓✓';
      } else if (onlineUsers.has(isTechnician ? service.user : service.technician)) {
        return '✓✓';
      } else {
        return '✓';
      }
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h3 className="text-lg font-semibold">Chat with {service.technician ? service.technician.firstName : 'User'}</h3>
          <button onClick={onClose} className="text-white">
            <FiX size={24} />
          </button>
        </div>
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`mb-2 flex ${msg.sender._id === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col">
                <span 
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender._id === currentUser.id 
                      ? (isTechnician ? 'bg-green-200' : 'bg-blue-100')  
                      : (isTechnician ? 'bg-blue-100' : 'bg-green-200')  
                  }`}
                >
                  {msg.type === 'text' && msg.message}
                  {msg.type === 'image' && <img src={msg.imageUrl} alt="Sent Image" className="max-w-xs" />}
                  {msg.type === 'video' && (
                    <video controls className="max-w-xs">
                      <source src={msg.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </span>
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  <span>{formatTime(msg.timestamp)}</span>
                  {msg.sender._id === currentUser.id && (
                   <span className={`ml-2 ${readMessages.has(msg._id) ? 'text-blue-500' : ''}`}>
                   {getMessageStatus(msg)}
                 </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          {attachments.images.length > 0 && (
            <div className="mb-2">
              <h4 className="text-sm text-gray-700">Attached Images:</h4>
              <div className="flex space-x-2">
                {attachments.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`Attachment ${idx}`} className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            </div>
          )}
          {attachments.videos.length > 0 && (
            <div className="mb-2">
              <h4 className="text-sm text-gray-700">Attached Videos:</h4>
              <div className="flex space-x-2">
                {attachments.videos.map((vid, idx) => (
                  <video key={idx} src={vid} className="w-32 h-20 object-cover rounded" controls />
                ))}
              </div>
            </div>
          )}
          <div className="flex">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-500 p-2"
            >
              <FiSmile size={24} />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-20">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
            <label htmlFor="image-upload" className="text-gray-500 p-2 cursor-pointer">
              <FiImage size={24} />
            </label>
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-upload" />
            <label htmlFor="video-upload" className="text-gray-500 p-2 cursor-pointer">
              <FiVideo size={24} />
            </label>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow border rounded-l-lg p-2"
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
