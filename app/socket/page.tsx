'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export default function ChatComponent() {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initialize socket connection with the correct path
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Clean up socket connection on unmount
    return () => {
      newSocket.close();
      console.log("closing socket");
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on('chat message', (newMessage: Message) => {
      console.log("newMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // add error handler
    // socket.on("connect_error", (err: Record<string, any>) => {
    //     // the reason of the error, for example "xhr poll error"
    //     console.log("message",err.message);
        
    //     // some additional description, for example the status code of the initial HTTP response
    //     console.log("description", err.description);
        
    //     // some additional context, for example the XMLHttpRequest object
    //     console.log("context", err.context);
    // });

    return () => {
      socket.off('chat message');
    };
  }, [socket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: Date.now(),
    };

    // Emit the message to the server
    socket.emit('chat message', newMessage);
    
    setMessage('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4 h-96 overflow-y-auto border rounded p-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2 p-2 bg-gray-100 text-gray-500 rounded">
            <p><span className="text-gray-500">
             [{new Date(msg.timestamp).toLocaleTimeString()}]
            </span> {msg.text}</p>
            
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded text-gray-500"
          placeholder="Type your message..."
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
