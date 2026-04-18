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
  const [mobile, setMobile] = useState("");
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
      await register(username.trim(), password.trim(), mobile.trim(), role);
      setLocation("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-sm text-primary uppercase tracking-[0.3em] mb-3">Create account</p>
          <h1 className="text-4xl font-serif font-bold text-foreground">Register your profile</h1>
          <p className="text-muted-foreground mt-3">Create your login and start exploring heritage features.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block text-center">Identity Path</label>
            <Tabs defaultValue="enthusiast" className="w-full" onValueChange={setRole}>
              <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-2xl h-16">
                <TabsTrigger value="enthusiast" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black transition-all">
                  <div className="flex flex-col items-center gap-1">
                    <Gem className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold">Enthusiast</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="admin" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black transition-all">
                  <div className="flex flex-col items-center gap-1">
                    <Crown className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold">Curator</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Mobile Number (Optional)</label>
            <Input
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="10 digit mobile number"
              pattern="[0-9]{10}"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>


          {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">{error}</div>}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
