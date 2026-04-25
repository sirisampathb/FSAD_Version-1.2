import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, Globe, User, ShieldAlert, LogOut, LogIn, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled
          ? "premium-glass border-b border-white/5 h-24"
          : "bg-transparent h-28"
        }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="bg-primary p-2.5 rounded-2xl scale-90 group-hover:scale-100 shadow-2xl shadow-primary/40 relative z-10"
            >
              <Globe className="h-7 w-7 text-black stroke-[2.5]" />
              <div className="absolute inset-0 bg-white/20 rounded-[inherit] animate-pulse" />
            </motion.div>
            <span className={`font-serif text-3xl font-bold tracking-tighter relative z-10 ${!scrolled && location === '/' ? 'text-white' : 'text-foreground'
              }`}>
              Bharat <span className="text-gradient-rose animate-text-gradient italic font-medium">Heritage</span>
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-16">
          {(['/', '/explore', user ? '/dashboard' : null].filter((path): path is string => Boolean(path))).map((path) => (
            <Link key={path!} href={path!}>
              <motion.span
                whileHover={{ y: -2 }}
                className={`text-[10px] font-black uppercase tracking-[0.4em] hover:text-primary transition-all cursor-pointer relative group py-2 ${location === path
                    ? 'text-primary'
                    : (!scrolled && location === '/' ? 'text-white/80' : 'text-foreground/70')
                  }`}>
                {path === '/' ? 'Home' : path.slice(1)}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-700 rounded-full",
                  location === path ? "w-full shadow-[0_0_10px_rgba(253,185,49,0.5)]" : "w-0 group-hover:w-full"
                )} />
              </motion.span>
            </Link>
          ))}
        </div>


        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="hidden sm:flex items-center gap-3 border-primary/20 hover:bg-primary/10 rounded-full px-6 h-12 transition-all">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-panel border-primary/20 rounded-2xl p-2 min-w-[200px]">
                <DropdownMenuItem className="cursor-pointer rounded-xl p-3 focus:bg-primary/10">
                  <ShieldAlert className="w-4 h-4 mr-3 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer rounded-xl p-3 focus:bg-destructive/10 text-destructive">
                  <LogOut className="w-4 h-4 mr-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className={cn(
                  "font-black uppercase tracking-[0.2em] text-[10px] px-6 h-12 rounded-full",
                  !scrolled && location === '/' ? 'text-white hover:bg-white/10' : ''
                )}>
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="bg-primary text-black hover:bg-white font-black uppercase tracking-[0.2em] text-[10px] px-8 h-12 rounded-full shadow-lg shadow-primary/20">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "rounded-full w-12 h-12",
              !scrolled && location === '/' ? 'text-white hover:bg-white/10' : 'hover:bg-primary/10'
            )}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden rounded-full w-12 h-12",
              !scrolled && location === '/' ? 'text-white hover:bg-white/10' : ''
            )}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
