import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, X, MessageSquare, AlertCircle, ShoppingBag } from 'lucide-react';
import { StylistMessage } from '../types';

interface StylistChatProps {
  onSuggestOffer: (productName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function StylistChat({ onSuggestOffer, isOpen, onClose }: StylistChatProps) {
  const [messages, setMessages] = useState<StylistMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá, maravilhosa! ✨ Sou a **Estilista HL**, sua consultora de imagem e estilo virtual. \n\nPosso ajudar você a montar combinações belíssimas com as marcas do nosso catálogo, escolher o look perfeito para uma ocasião especial (como um casamento ou uma tarde ensolarada em Araraquara) ou sugerir acessórios. O que você gostaria de explorar hoje?',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: StylistMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setApiKeyError(null);

    // Call server-side API proxy
    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'GOOGLE_GEMINI_API_KEY_REQUIRED') {
          setApiKeyError(data.message);
        } else {
          throw new Error(data.message || 'Erro inesperado do servidor.');
        }
      } else {
        const botMsg: StylistMessage = {
          id: `b-${Date.now()}`,
          role: 'model',
          text: data.text,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err: any) {
      console.error('Fetch stylist chat err:', err);
      const errorMsg: StylistMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: 'Ah, lamento, querida! 😔 Não consegui concluir meu raciocínio de moda devido a um imprevisto na rede. Que tal tentarmos novamente em instantes?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const txt = inputValue;
    setInputValue('');
    handleSend(txt);
  };

  const handleQuickChip = (prompt: string) => {
    handleSend(prompt);
  };

  const quickPrompts = [
    'Look completo com o Blazer Rose 🌸',
    'Escolha de vestido para casamento civil 💍',
    'O que vestir no calor de Araraquara? ☀️',
    'Sugerir peças da marca Le Lis Blanc ✨'
  ];

  // Render markdown helper function safely
  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, idx) => {
      // Bold handling
      let formatted = paragraph;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      let elements: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(paragraph)) !== null) {
        // text before bold
        if (match.index > lastIndex) {
          elements.push(paragraph.substring(lastIndex, match.index));
        }
        // bold text
        elements.push(<strong key={match.index} className="font-semibold text-stone-950">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < paragraph.length) {
        elements.push(paragraph.substring(lastIndex));
      }

      const isListItem = paragraph.trim().startsWith('-') || paragraph.trim().startsWith('*') || /^\d+\./.test(paragraph.trim());

      return (
        <p key={idx} className={`${isListItem ? 'pl-4 -indent-4' : ''} text-sm text-stone-700 leading-relaxed min-h-[0.5rem] font-sans`}>
          {elements.length > 0 ? elements : paragraph}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-slide-in">
      {/* Drawer Head */}
      <div className="bg-stone-900 px-6 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif text-base font-semibold leading-tight">Estilista Virtual HL</h4>
            <span className="text-[10px] text-rose-300 tracking-widest uppercase block font-sans">IA Personal Stylist</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1 hover:bg-stone-800 rounded-full transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Log */}
      <div className="flex-1 overflow-y-auto p-6 bg-stone-50 space-y-4">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.role === 'user' ? 'bg-stone-200 text-stone-700' : 'bg-rose-50 text-rose-700 border border-rose-100'
            }`}>
              {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div className="space-y-1">
              <div className={`p-4 rounded-2xl shadow-sm border ${
                m.role === 'user' 
                  ? 'bg-rose-700 border-rose-800 text-white rounded-tr-none' 
                  : 'bg-white border-stone-200 text-stone-800 rounded-tl-none'
              }`}>
                {m.role === 'user' ? (
                  <p className="text-sm font-sans whitespace-pre-line">{m.text}</p>
                ) : (
                  <div className="space-y-2">
                    {formatText(m.text)}
                  </div>
                )}
              </div>
              <span className={`text-[9px] text-stone-400 font-sans block ${m.role === 'user' ? 'text-right' : ''}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Missing API Key Guidance */}
        {apiKeyError && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2 text-amber-900 font-sans text-xs">
            <div className="flex items-center gap-2 font-medium text-amber-950">
              <AlertCircle size={16} className="text-amber-800 shrink-0" />
              <span>Chave de API do Gemini não Encontrada</span>
            </div>
            <p className="leading-relaxed">
              Sua estilista virtual utiliza tecnologia de inteligência artificial de última ponta do Gemini. Acesse <span className="font-semibold">Configurações ⚙️ (Secrets)</span> e salve a segredo <code className="bg-amber-100 px-1 py-0.2 rounded font-mono font-bold text-rose-700">GEMINI_API_KEY</code> com sua chave para ativar este recurso interativo!
            </p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-[60%]">
            <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700">
              <Bot size={14} />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
              <div className="flex gap-1.5 items-center justify-center py-2 px-3">
                <span className="w-2 h-2 rounded-full bg-rose-700 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-rose-700 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-rose-700 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-[10px] text-stone-400 font-sans text-center block">HL IA analisando combinações...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && !isLoading && (
        <div className="p-4 bg-white border-t border-stone-200 shrink-0">
          <span className="text-[10px] text-stone-400 font-sans uppercase tracking-wider block mb-2">Sugestões rápidas de conversa</span>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickChip(p)}
                className="text-xs text-stone-700 bg-stone-50 hover:bg-rose-50 hover:text-rose-700 border border-stone-200 hover:border-rose-300 rounded-full px-3 py-1.5 transition text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-stone-200 shrink-0 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Peça seu look ou dica de estilo..."
          disabled={isLoading}
          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-sans outline-none focus:bg-white focus:border-rose-700 transition"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-stone-900 hover:bg-rose-750 text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition disabled:opacity-45"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
