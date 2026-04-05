import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";

export default function Register() {
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      await register(username.trim(), password.trim());
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
