import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Globe, Lock, User, Phone, Sparkles, ChevronRight } from "lucide-react";

export default function Login() {
  const { login, loginWithOtp, requestOtp } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username.trim(), password.trim());
      toast({ title: "Welcome back!", description: "Logged in successfully." });
      setLocation("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await requestOtp(mobile);
      if (res.error) {
        setError(res.error);
      } else {
        setOtpSent(true);
        toast({ title: "OTP Sent", description: res.message });
      }
    } catch (err) {
      setError("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithOtp(mobile, otp);
      toast({ title: "Success", description: "Logged in successfully." });
      setLocation("/dashboard");
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-background">
      {/* Visual Side (Cinematic) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2073&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/30">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-md">Bharat Heritage</span>
            </div>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Preserving our <br />
              <span className="text-primary italic">Eternal Legacy.</span>
            </h2>
            <div className="flex items-center gap-4 text-white/80">
              <div className="h-0.5 w-12 bg-primary/60" />
              <p className="text-lg font-light tracking-wide">Join thousands of enthusiasts exploring 5000 years of history.</p>
            </div>
          </motion.div>

          <p className="text-white/40 text-sm">© 2024 Bharat Heritage. All rights reserved.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute top-0 right-0 p-8 lg:hidden">
          <Link href="/">
             <span className="font-serif text-xl font-bold text-primary">BH</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-3">Welcome back</h1>
            <p className="text-muted-foreground">Select your preferred way to sign in to your dashboard.</p>
          </div>

          <Tabs defaultValue="password" title="Login Methods" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-2xl mb-8">
              <TabsTrigger value="password" title="Password Login" className="rounded-xl data-[state=active]:shadow-lg">Password</TabsTrigger>
              <TabsTrigger value="otp" title="OTP Login" className="rounded-xl data-[state=active]:shadow-lg">Mobile OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-muted/40 border-border/50 focus:bg-background transition-all"
                      placeholder="Your unique username"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-muted/40 border-border/50 focus:bg-background transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive bg-destructive/5 border border-destructive/20 p-3 rounded-xl">{error}</motion.div>}

                <Button type="submit" size="lg" className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20 group" disabled={loading}>
                  {loading ? "Signing in..." : (
                    <span className="flex items-center gap-2">
                      Sign In Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp">
              <form onSubmit={handleOtpSubmit} className="space-y-5">
                {!otpSent ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Mobile Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="pl-12 h-14 rounded-2xl bg-muted/40 border-border/50 focus:bg-background transition-all"
                          placeholder="9876543210"
                          required
                        />
                      </div>
                    </div>
                    {error && <div className="text-sm text-destructive">{error}</div>}
                    <Button type="button" size="lg" className="w-full h-14 rounded-2xl" disabled={loading} onClick={handleSendOtp}>
                       <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Sending..." : "Send Verification Code"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2 text-center animate-in fade-in zoom-in-95 duration-300">
                      <p className="text-sm text-muted-foreground">We sent a code to <span className="text-primary font-bold">{mobile}</span></p>
                      <Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-16 text-center text-2xl tracking-[1em] font-bold rounded-2xl"
                        maxLength={6}
                        required
                      />
                      <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-primary hover:underline">Incorrect number?</button>
                    </div>
                    {error && <div className="text-sm text-destructive">{error}</div>}
                    <Button type="submit" size="lg" className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20" disabled={loading}>
                      {loading ? "Verifying..." : "Confirm & Access Dashboard"}
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/register" title="Create Account Link" className="text-primary font-bold hover:underline">Explore Registration</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

