import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { login, loginWithOtp, requestOtp } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Password Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // OTP Login State
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
      toast({ title: "Success", description: "Logged in successfully" });
      setLocation("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Login failed. Please try again.");
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
        toast({ 
          title: "OTP Sent", 
          description: res.message || "Please check your mobile for the OTP.",
        });
      }
    } catch (err) {
      setError((err as Error).message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[0-9]{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await loginWithOtp(mobile, otp);
      toast({ title: "Success", description: "Logged in successfully" });
      setLocation("/dashboard");
    } catch (err) {
      setError((err as Error).message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-sm text-primary uppercase tracking-[0.3em] mb-3">Welcome back</p>
          <h1 className="text-4xl font-serif font-bold text-foreground">Login to your account</h1>
          <p className="text-muted-foreground mt-3">Choose your preferred login method.</p>
        </div>

        <Tabs defaultValue="password" title="Login Methods" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="otp">Mobile OTP</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">{error}</div>}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Login with Password"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="otp">
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {!otpSent ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Mobile Number</label>
                    <Input
                      type="tel"
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      placeholder="10 digit mobile number"
                      required
                    />
                  </div>
                  {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">{error}</div>}
                  <Button type="button" size="lg" className="w-full" disabled={loading} onClick={handleSendOtp}>
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Enter 6-digit OTP</label>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      placeholder="XXXXXX"
                      maxLength={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      OTP sent to {mobile}. <button type="button" onClick={() => setOtpSent(false)} className="text-primary hover:underline">Change number</button>
                    </p>
                  </div>
                  {error && <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">{error}</div>}
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>
                </>
              )}
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          New here? <Link href="/register" className="text-primary hover:underline">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

