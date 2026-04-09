import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! I'm your Indian Heritage assistant. How can I help you explore monuments today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("taj mahal")) return "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan.";
    if (q.includes("hampi")) return "Hampi was the capital of the Vijayanagara Empire in the 14th century. It is a UNESCO World Heritage Site, listed as the Group of Monuments at Hampi.";
    if (q.includes("unesco")) return "India has many UNESCO World Heritage sites, including the Taj Mahal, Hampi, Qutub Minar, and many more. Would you like to see a specific list?";
    if (q.includes("help") || q.includes("what can you do")) return "I can tell you about famous Indian monuments, their history, locations, and UNESCO status. Just ask about a monument!";
    return "That's interesting! I'm still learning about all the hidden gems of India. Could you tell me more or ask about a specific monument?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4"
          >
            <Card className="w-80 sm:w-96 h-[500px] shadow-2xl border-primary/20 flex flex-col glass-card overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-lg font-serif">Heritage Guide</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-grow p-0">
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[85%] ${
                            msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.sender === "user" ? "bg-primary/10" : "bg-accent/10"
                          }`}>
                            {msg.sender === "user" ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-accent" />}
                          </div>
                          <div
                            className={`p-3 rounded-2xl text-sm ${
                              msg.sender === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-muted text-foreground rounded-tl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t border-border">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Ask about a monument..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow h-10 rounded-full"
                  />
                  <Button type="submit" size="icon" className="h-10 w-10 rounded-full shrink-0">
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
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className={`w-7 h-7 transition-all ${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}`} />
        <X className={`w-7 h-7 absolute transition-all ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`} />
      </Button>
    </div>
  );
}
