import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

const QUICK_CHIPS = [
  "UNESCO Sites",
  "Taj Mahal",
  "Ancient Temples",
  "Mughal History",
  "Rajasthan Forts",
  "Hampi",
];

const MONUMENT_DATA: Record<string, string> = {
  "taj mahal": "The Taj Mahal is an ivory-white marble mausoleum in Agra, built by Shah Jahan in memory of his wife Mumtaz Mahal. It's a UNESCO World Heritage site and one of the New 7 Wonders of the World.",
  "hampi": "Hampi is a UNESCO World Heritage site in Karnataka, famous for the ruins of the Vijayanagara Empire (14th century). Highlights include the Virupaksha Temple and the Stone Chariot.",
  "qutub minar": "The Qutub Minar in Delhi is the world's tallest brick minaret, standing at 72.5 meters. It was started by Qutb-ud-din Aibak in 1192.",
  "red fort": "The Red Fort (Lal Qila) in Delhi was the main residence of Mughal Emperors for nearly 200 years. It was built by Shah Jahan in 1639 using red sandstone.",
  "ajanta": "The Ajanta Caves in Maharashtra contain 30 rock-cut Buddhist cave monuments dating from the 2nd century BC to about 480 AD. They feature masterpieces of Buddhist religious art.",
  "ellora": "Ellora is a UNESCO World Heritage site in Maharashtra, featuring one of the largest rock-cut monastery-temple cave complexes in the world, with Hindu, Buddhist, and Jain monuments.",
  "konark": "The Konark Sun Temple in Odisha (13th century) is designed as a colossal chariot for the Sun God Surya, with 12 pairs of exquisitely carved stone wheels.",
  "khajuraho": "The Khajuraho Group of Monuments in Madhya Pradesh are famous for their Nagara-style architectural symbolism and erotic sculptures. They were built by the Chandela dynasty.",
  "unesco": "India has over 40 UNESCO World Heritage Sites! Some of the most famous include the Taj Mahal, Hampi, Sun Temple Konark, Kaziranga National Park, and the Hill Forts of Rajasthan.",
  "rajasthan": "Rajasthan is known for its majestic forts like Amer Fort, Mehrangarh Fort, and Jaisalmer Fort. These structures represent the valor and heritage of the Rajputs.",
  "mughal": "Mughal architecture flourished in India under emperors like Akbar and Shah Jahan. Major examples include the Taj Mahal, Fatehpur Sikri, Agra Fort, and Humayun's Tomb.",
  "temples": "Indian ancient temples like Shore Temple (Mahabalipuram), Meenakshi Temple (Madurai), and Brihadisvara Temple (Thanjavur) are marvels of Dravidian and Nagara architecture.",
  "mysore palace": "The Mysore Palace is a historical palace and a royal residence at Mysore in Karnataka. It is one of the most visited monuments in India after the Taj Mahal.",
  "sanchi stupa": "The Great Stupa at Sanchi is one of the oldest stone structures in India, commissioned by Emperor Ashoka in the 3rd century BCE.",
  "hawa mahal": "The Hawa Mahal or 'Palace of Winds' in Jaipur was built in 1799 by Maharaja Sawai Pratap Singh. Its unique five-story exterior is akin to the honeycomb of a beehive.",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

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
    
    for (const [key, value] of Object.entries(MONUMENT_DATA)) {
      if (q.includes(key)) return value;
    }

    if (q.includes("help") || q.includes("what can you do")) {
      return "I can provide historical facts, locations, and UNESCO details for over 20 major Indian monuments. Try asking about 'Hampi' or 'Rajasthan Forts'!";
    }

    return "That's a great question! I'm constantly learning about India's 5,000 years of heritage. Could you ask about a specific monument like the Taj Mahal, Qutub Minar, or Ajanta Caves?";
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
            <Card className="w-80 sm:w-96 h-[550px] shadow-2xl border-primary/20 flex flex-col glass-card overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-serif">Heritage Guide</CardTitle>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest">AI Assistant</p>
                  </div>
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
              
              <CardContent className="flex-grow p-0 flex flex-col min-h-0">
                <ScrollArea className="flex-grow p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[85%] ${
                            msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div className={`mt-1 h-7 w-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                            msg.sender === "user" ? "bg-primary/20" : "bg-accent/20"
                          }`}>
                            {msg.sender === "user" ? <User className="w-3.5 h-3.5 text-primary" /> : <Bot className="w-3.5 h-3.5 text-accent" />}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div
                              className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.sender === "user"
                                  ? "bg-primary text-primary-foreground rounded-tr-none"
                                  : "bg-muted text-foreground rounded-tl-none border border-border/50"
                              }`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 px-1">
                              <Clock className="w-2.5 h-2.5" /> {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 items-center">
                        <div className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <div className="bg-muted px-3 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center h-8">
                          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {/* Quick Chips */}
                <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-border/50 bg-muted/30">
                  {QUICK_CHIPS.map(chip => (
                    <Badge 
                      key={chip} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1 px-2.5 text-[11px] font-normal"
                      onClick={() => handleSend(chip)}
                    >
                      {chip}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t border-border shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Ask about a monument..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow h-10 rounded-full bg-muted/50 border-border/50 focus-visible:ring-primary"
                  />
                  <Button type="submit" size="icon" className="h-10 w-10 rounded-full shrink-0 shadow-md">
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
        className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageCircle className={`w-7 h-7 absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}`} />
        <X className={`w-7 h-7 absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`} />
      </Button>
    </div>
  );
}

