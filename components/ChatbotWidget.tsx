'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Clock,
  Phone,
  PhoneCall,
  Calendar,
  Sparkles,
  Minimize2,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  Headphones,
} from 'lucide-react';
import hospitalData from '@/data/hospitalData.json';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isEmergency?: boolean;
  showReceptionCard?: boolean;
  action?: {
    label: string;
    href: string;
  };
  timestamp: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReceptionModal, setShowReceptionModal] = useState(false);

  const { hospitalInfo, chatbotQuickPrompts } = hospitalData;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! Welcome to Apex Care Hospital Enquiry Assistant. I can assist you with visiting hours, doctors, departments, booking consultations, and insurance.\n\nHow can I help you today?`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Handle "Talk to a person" action
  const handleTalkToPerson = () => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: 'Talk to a person',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: `Connecting you with our reception desk. Our hospital reception coordinators are available to speak with you directly:`,
      showReceptionCard: true,
      action: {
        label: `Call Reception: ${hospitalInfo.generalEnquiry}`,
        href: `tel:${hospitalInfo.generalEnquiry.replace(/\s+/g, '')}`,
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Call the Next.js API route /api/chat (which interfaces with Claude API and /data/faq.md)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const replyText =
        data?.reply || "I don't have that information, please contact our reception.";

      const isEmergency = data?.isEmergency || false;

      let action: { label: string; href: string } | undefined = undefined;
      if (isEmergency) {
        action = {
          label: `🚨 Call 24/7 Emergency: ${hospitalInfo.emergencyNumber.split('/')[0]}`,
          href: `tel:${hospitalInfo.emergencyNumber.split('/')[0].trim()}`,
        };
      } else if (replyText.toLowerCase().includes('reception')) {
        action = {
          label: `Call Reception: ${hospitalInfo.generalEnquiry}`,
          href: `tel:${hospitalInfo.generalEnquiry.replace(/\s+/g, '')}`,
        };
      } else if (replyText.toLowerCase().includes('appointment') || replyText.toLowerCase().includes('book')) {
        action = {
          label: 'Book Consultation Online',
          href: '/book-appointment',
        };
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        isEmergency,
        action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I don't have that information, please contact our reception.",
        action: {
          label: `Call Reception: ${hospitalInfo.generalEnquiry}`,
          href: `tel:${hospitalInfo.generalEnquiry.replace(/\s+/g, '')}`,
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-sky-700 hover:bg-sky-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 focus:ring-4 focus:ring-sky-300"
          aria-label="Open Hospital Enquiry Chatbot"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-sm tracking-wide">
            Need Help? Ask AI
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Hospital Enquiry Assistant"
          className="w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-sky-800 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <Bot className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-tight leading-tight">
                  Apex Care Assistant
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-sky-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online | Hospital Enquiry</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* "Talk to a person" header quick button */}
              <button
                type="button"
                onClick={handleTalkToPerson}
                title="Speak directly with hospital reception"
                className="flex items-center gap-1 bg-white/10 hover:bg-white/25 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/20"
                aria-label="Talk to a person at reception"
              >
                <Headphones className="w-3.5 h-3.5 text-sky-200" />
                <span className="hidden sm:inline">Talk to a person</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-sky-100 hover:text-white hover:bg-sky-900 transition-colors focus:ring-2 focus:ring-white"
                aria-label="Close Chat Window"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Emergency Alert Strip */}
          <div className="bg-red-700 text-white px-3.5 py-1.5 flex items-center justify-between text-xs font-bold shadow-inner">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-200 animate-pulse" />
              <span>24/7 EMERGENCY: {hospitalInfo.emergencyNumber.split('/')[0]}</span>
            </div>
            <a
              href={`tel:${hospitalInfo.emergencyNumber.split('/')[0].trim()}`}
              className="bg-white text-red-800 px-2 py-0.5 rounded text-[11px] font-black uppercase hover:bg-red-100 transition-colors"
            >
              Call 24/7
            </a>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 chat-scroll bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-sm ${
                    msg.isEmergency ? 'bg-red-600 text-white' : 'bg-sky-700 text-white'
                  }`}>
                    {msg.isEmergency ? <AlertTriangle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-sky-700 text-white rounded-br-none'
                      : msg.isEmergency
                      ? 'bg-red-50 text-red-950 border-2 border-red-500 rounded-bl-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Special Reception Card if requested */}
                  {msg.showReceptionCard && (
                    <div className="mt-3 p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-sky-950 font-black text-sm">
                        <PhoneCall className="w-4 h-4 text-sky-700" />
                        <span>Hospital Reception Phone Number:</span>
                      </div>
                      <p className="text-xl font-black text-sky-900 tracking-wide">
                        {hospitalInfo.generalEnquiry}
                      </p>
                      <div className="text-slate-600 space-y-0.5 pt-1">
                        <p><strong>OPD Desk:</strong> Ext. 1010 / 1012</p>
                        <p><strong>Operating Hours:</strong> {hospitalInfo.opdHours.split('|')[0]}</p>
                        <p><strong>Location:</strong> Main Entrance Lobby, Ground Floor</p>
                      </div>
                    </div>
                  )}

                  {/* Optional Action Button */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <a
                        href={msg.action.href}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                          msg.isEmergency
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-sm'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                        }`}
                      >
                        <span>{msg.action.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-sky-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
                  <span>Consulting hospital knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Pills & Action Buttons */}
          <div className="bg-white border-t border-slate-200 px-3 py-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Actions:
              </span>

              {/* Dedicated "Talk to a person" Button */}
              <button
                type="button"
                onClick={handleTalkToPerson}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full transition-colors"
              >
                <PhoneCall className="w-3 h-3 text-emerald-600" />
                <span>Talk to a person</span>
              </button>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => handleSendMessage('What are the visiting hours?')}
                className="shrink-0 text-xs font-semibold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-900 border border-slate-200 rounded-full px-2.5 py-1 transition-colors"
              >
                Visiting hours?
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('How can I book an appointment?')}
                className="shrink-0 text-xs font-semibold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-900 border border-slate-200 rounded-full px-2.5 py-1 transition-colors"
              >
                Book appointment
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Which insurance providers are covered for cashless?')}
                className="shrink-0 text-xs font-semibold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-900 border border-slate-200 rounded-full px-2.5 py-1 transition-colors"
              >
                Insurance covered?
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('What is the emergency contact number?')}
                className="shrink-0 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full px-2.5 py-1 transition-colors"
              >
                Emergency number
              </button>
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a hospital question..."
              className="flex-1 text-sm bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-sky-600 focus:outline-none disabled:bg-slate-200"
              aria-label="Type your hospital enquiry question"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-colors focus:ring-2 focus:ring-sky-600 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
