import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles, Clock, ChevronDown, CheckCircle2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

import { STATE_DATA, MONUMENTS } from "@/lib/data";

const QUICK_CHIPS = [
  "UNESCO Sites",
  "Taj Mahal",
  "Rajasthan Forts",
  "Hampi",
  "Indian Foods",
  "Best time to visit",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! I'm your Indian Heritage assistant. How can I help you explore monuments today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    setShowScrollButton(!isAtBottom);
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom("auto"), 100);
    }
  }, [isOpen, scrollToBottom]);

  const handleSend = (text: string = input) => {
    const messageText = text.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responseText = getBotResponse(messageText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Search in MONUMENTS
    const monument = MONUMENTS.find(m => 
      q.includes(m.name.toLowerCase()) || q.includes(m.id.replace(/-/g, " "))
    );
    if (monument) {
      return `${monument.name} (${monument.location}) was built in ${monument.builtYear} by the ${monument.dynasty}. It is a prime example of ${monument.style}. ${monument.description}`;
    }

    // Search in STATE_DATA
    const state = STATE_DATA.find(s => q.includes(s.name.toLowerCase()) || q.includes(s.id));
    if (state) {
      return `${state.name} is famous for its rich heritage! Notable monuments include ${state.monuments.slice(0, 3).join(", ")}. Don't forget to try the local food: ${state.foods.slice(0, 3).join(", ")}. Best time to visit is ${state.bestTime}.`;
    }

    // Keyword searches
    if (q.includes("food") || q.includes("eat") || q.includes("cuisine")) {
      const allFoods = STATE_DATA.flatMap(s => s.foods).slice(0, 10);
      return `Indian cuisine is diverse! You must try ${allFoods.join(", ")}. Each state has its own unique flavor.`;
    }

    if (q.includes("unesco")) {
      const unescoSites = MONUMENTS.filter(m => m.unesco).map(m => m.name).slice(0, 8);
      return `India has many UNESCO World Heritage Sites, including: ${unescoSites.join(", ")}. These sites represent our universal architectural and cultural value.`;
    }

    if (q.includes("help") || q.includes("what can you do")) {
      return "I'm your Heritage AI! Ask me about specific monuments (like Taj Mahal), Indian states (like Rajasthan), or even local cuisines. I can give you historical facts and travel tips!";
    }

    return "That's fascinating! India's heritage spans over 5,000 years. Could you ask about a specific state like 'Karnataka' or a monument like the 'Konark Sun Temple'?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4"
          >
            <Card className="w-[340px] sm:w-[400px] h-[600px] shadow-2xl border-primary/20 flex flex-col glass-card overflow-hidden rounded-[24px]">
              <CardHeader className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground p-5 flex flex-row items-center justify-between shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner group transition-transform hover:scale-105">
                      <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-serif tracking-tight flex items-center gap-2">
                      Heritage Guide
                      <Badge variant="outline" className="text-[9px] h-4 bg-white/10 text-white border-white/20 font-sans uppercase tracking-tighter">BETA</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-white/70" />
                      <p className="text-[10px] text-white/80 font-medium uppercase tracking-wider">Online & Ready</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 relative z-10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-white/20 text-white rounded-full transition-colors"
                    onClick={() => setMessages(messages.slice(0, 1))}
                    title="Clear history"
                  >
                    <History className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-white/20 text-white rounded-full transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow p-0 flex flex-col min-h-0 bg-background/30 relative">
                <div 
                  className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-4 custom-scrollbar" 
                  ref={scrollRef}
                  onScroll={handleScroll}
                >
                  <div className="flex flex-col gap-6 py-2">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[88%] ${
                            msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div className={`mt-1 h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                            msg.sender === "user" ? "bg-primary text-white" : "bg-card border border-border"
                          }`}>
                            {msg.sender === "user" ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Bot className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className={`flex flex-col gap-1.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                            <div
                              className={cn(
                                "p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm relative transition-all duration-300",
                                msg.sender === "user"
                                  ? "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20"
                                  : "bg-card text-foreground rounded-tl-none border border-border/60 shadow-black/5"
                              )}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 px-1 font-medium opacity-60">
                              <Clock className="w-2.5 h-2.5" /> {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex gap-3 items-center"
                      >
                        <div className="h-8 w-8 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="bg-card border border-border/60 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center h-10 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                  </div>
                </div>

                <AnimatePresence>
                  {showScrollButton && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={() => scrollToBottom()}
                      className="absolute bottom-20 right-4 bg-primary text-white p-2 rounded-full shadow-lg z-20 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                {/* Quick Chips */}
                <div className="px-4 py-3 flex flex-wrap gap-2 border-t border-border/40 bg-muted/20 backdrop-blur-sm shrink-0">
                  <div className="w-full mb-1 text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    Quick Suggestions
                  </div>
                  {QUICK_CHIPS.map(chip => (
                    <Badge 
                      key={chip} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground border-transparent hover:border-primary transition-all py-1.5 px-3 text-[11px] font-medium bg-card shadow-sm"
                      onClick={() => handleSend(chip)}
                    >
                      {chip}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t border-border/40 bg-card/50 backdrop-blur-md shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full gap-3"
                >
                  <div className="relative flex-grow group">
                    <Input
                      placeholder="Ask about Indian history..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full h-11 pr-10 rounded-[16px] bg-background/50 border-border/60 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all group-hover:bg-background"
                    />
                    <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim()}
                    className="h-11 w-11 rounded-[16px] shrink-0 shadow-lg shadow-primary/20 bg-gradient-to-br from-primary to-accent hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="h-16 w-16 rounded-[24px] shadow-2xl bg-gradient-to-br from-primary to-accent hover:scale-105 active:scale-95 transition-all group relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
              >
                <X className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Button>
    </div>
  );
}

