import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

const Chat: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<number>(1);
  const [newMessage, setNewMessage] = useState('');

  const chatRooms: ChatRoom[] = [
    {
      id: 1,
      name: '新築マンションチーム',
      lastMessage: '明日の現場確認について',
      timestamp: '10:30',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: '設計部門',
      lastMessage: '図面の修正が完了しました',
      timestamp: '昨日',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: '山田 健一',
      content: '明日の現場確認の時間を10時に変更できますか？',
      timestamp: '10:30',
      isMe: false
    },
    {
      id: 2,
      sender: '自分',
      content: '承知しました。10時で問題ありません。',
      timestamp: '10:32',
      isMe: true
    },
    {
      id: 3,
      sender: '佐藤 美咲',
      content: '私も10時で大丈夫です。',
      timestamp: '10:35',
      isMe: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chat rooms list */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="チャットを検索..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="space-y-2">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors ${
                  selectedRoom === room.id ? 'bg-gray-50' : ''
                }`}
              >
                <img
                  src={room.avatar}
                  alt={room.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{room.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{room.timestamp}</p>
                  {room.unread > 0 && (
                    <span className="inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                      {room.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={chatRooms[0].avatar}
              alt={chatRooms[0].name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="font-semibold text-gray-900">{chatRooms[0].name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isMe
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {!message.isMe && (
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {message.sender}
                  </p>
                )}
                <p className={message.isMe ? 'text-white' : 'text-gray-700'}>
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    message.isMe ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;