import { useState } from 'react';

function AIChat({ onClose }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChat([...chat, { type: 'user', content: message }]);
    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, {
        type: 'ai',
        content: 'I understand your concern about environmental impact. Based on your current data, I recommend focusing on reducing energy consumption in your manufacturing process.'
      }]);
    }, 1000);
    setMessage('');
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">AI Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about environmental impact..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default AIChat;