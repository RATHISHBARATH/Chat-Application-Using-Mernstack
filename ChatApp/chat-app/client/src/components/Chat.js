import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios';
import Notification from './Notification';

const socket = io('http://localhost:5000');
const peer = new Peer();

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (Notification.permission === 'granted') {
        new Notification('New Message', { body: message.text });
      }
    });

    peer.on('call', (incomingCall) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          incomingCall.answer(currentStream);
          incomingCall.on('stream', (remoteStream) => {
            const video = document.getElementById('remoteVideo');
            video.srcObject = remoteStream;
            video.play();
          });
        });
    });

    return () => socket.off('receive_message');
  }, []);

  const handleSend = async () => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files[0];
    const formData = new FormData();
    formData.append('from', 'user1'); // Replace with actual user
    formData.append('to', 'user2'); // Replace with actual user
    formData.append('text', message);
    if (file) formData.append('file', file);

    socket.emit('send_message', { text: message });
    setMessage('');

    try {
      await axios.post('/api/chat/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        const call = peer.call('peerId', currentStream); // Replace 'peerId' with actual peer ID
        call.on('stream', (remoteStream) => {
          const video = document.getElementById('remoteVideo');
          video.srcObject = remoteStream;
          video.play();
        });
        setCall(call);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Notification message={messages[messages.length - 1]?.text} />
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 ${msg.from === 'me' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded`}>
            {msg.text}
            {msg.file && <img src={`http://localhost:5000/uploads/${msg.file}`} alt="Attachment" />}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input type="file" className="mt-2" />
        <button onClick={handleSend} className="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
        <button onClick={startCall} className="mt-2 bg-green-500 text-white p-2 rounded">Start Call</button>
      </div>
      <video id="remoteVideo" className="w-full h-full"></video>
    </div>
  );
};

export default Chat;
