import { useState, useEffect } from "react";
import { History } from "lucide-react";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-card px-4 py-2 rounded-xl border border-border flex items-center gap-3 shadow-sm">
      <History className="w-4 h-4 text-primary" />
      <span className="text-lg font-serif font-bold tracking-widest text-foreground">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
    </div>
  );
}
