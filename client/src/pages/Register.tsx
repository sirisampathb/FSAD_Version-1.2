import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, User, ShieldCheck, Gem } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("enthusiast");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(username.trim(), password.trim(), email.trim(), role);
      setLocation("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center mesh-gradient noise-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl rounded-[3rem] premium-glass p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 -z-10" />
        <div className="mb-10 text-center">
          <p className="text-[10px] text-primary uppercase font-black tracking-[0.5em] mb-4 animate-pulse">Join the Chronicles</p>
          <h1 className="text-5xl font-serif font-bold text-foreground tracking-tight">Create your <span className="text-gradient-rose animate-text-gradient italic font-medium">Path</span></h1>
          <p className="text-muted-foreground mt-4 text-base font-medium opacity-60">Begin your immersive journey through Bharat's architectural spirit.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-10">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6 block text-center opacity-50">Select Identity Path</label>
            <Tabs defaultValue="enthusiast" className="w-full" onValueChange={setRole}>
              <TabsList className="grid w-full grid-cols-2 p-2 bg-white/5 backdrop-blur-xl rounded-[1.5rem] h-20 border border-white/10 shadow-inner">
                <TabsTrigger value="enthusiast" className="rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-2xl transition-all duration-500">
                  <div className="flex flex-col items-center gap-1.5">
                    <Gem className="h-5 w-5" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Enthusiast</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="admin" className="rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-2xl transition-all duration-500">
                  <div className="flex flex-col items-center gap-1.5">
                    <Crown className="h-5 w-5" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Curator</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block opacity-60">Imperial Username</label>
              <Input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Ex: Ashoka_24"
                required
                className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all text-base"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block opacity-60">Sacred Email</label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                required
                className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all text-base"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block opacity-60">Divine Password</label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block opacity-60">Confirm Rite</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                required
                className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all"
              />
            </div>
          </div>


          {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">{error}</div>}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" size="lg" className="w-full h-16 rounded-2xl bg-primary text-black font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary/20 hover:bg-white hover:text-black transition-all duration-500" disabled={loading}>
              {loading ? "Forging Identity..." : "Seal the Covenant"}
            </Button>
          </motion.div>

          <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
            Already an archivist? <Link href="/login" className="text-primary hover:text-white transition-colors ml-2">Ascend Here</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
