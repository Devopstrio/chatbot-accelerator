import React, { useState } from 'react';
import { Send, Bot, User, ShieldCheck, Settings, BarChart } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your Enterprise AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: 'I am processing your request using RAG-enhanced search...' }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-sky-900/40">CA</div>
          <span className="font-bold text-xl tracking-tight">Accelerator</span>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarItem icon={<Bot size={20} />} label="Active Chat" active />
          <SidebarItem icon={<ShieldCheck size={20} />} label="Prompt Lab" />
          <SidebarItem icon={<Settings size={20} />} label="Knowledge Base" />
          <SidebarItem icon={<BarChart size={20} />} label="Analytics" />
        </nav>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-slate-950 relative">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-400">System Ready: Azure OpenAI (gpt-4o)</span>
          </div>
          <button className="text-sm text-sky-400 font-medium hover:text-sky-300 transition">View Citations</button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'bot' ? '' : 'flex-row-reverse'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${m.role === 'bot' ? 'bg-sky-600' : 'bg-slate-700'}`}>
                {m.role === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-2xl px-6 py-4 rounded-2xl shadow-lg ${m.role === 'bot' ? 'bg-slate-900 border border-slate-800' : 'bg-sky-600 text-white'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-slate-800 bg-slate-950">
          <div className="max-w-4xl mx-auto relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-sky-500 outline-none transition"
              placeholder="Ask anything about enterprise policy, HR, or IT support..."
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-3 w-10 h-10 bg-sky-600 hover:bg-sky-500 rounded-xl flex items-center justify-center transition"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-4">Enterprise AI Assistant &mdash; Powered by Chatbot Accelerator & Azure OpenAI</p>
        </div>
      </main>
    </div>
  );
}

const SidebarItem = ({ icon, label, active }: any) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition cursor-pointer ${active ? 'bg-sky-600/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default App;
