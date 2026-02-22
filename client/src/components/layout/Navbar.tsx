import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, Globe, User, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [role, setRole] = useState<'admin' | 'enthusiast'>('enthusiast');

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe className={`h-8 w-8 ${scrolled || !isDark ? 'text-primary' : 'text-primary'}`} />
            <span className={`font-serif text-2xl font-bold tracking-tight ${
              !scrolled && location === '/' ? 'text-white' : 'text-foreground'
            }`}>
              Bharat Heritage
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <span className={`text-sm font-medium hover:text-primary transition-colors cursor-pointer ${
              !scrolled && location === '/' ? 'text-white/90 hover:text-white' : 'text-foreground/80'
            }`}>
              Explore
            </span>
          </Link>
          <Link href="/dashboard">
            <span className={`text-sm font-medium hover:text-primary transition-colors cursor-pointer ${
              !scrolled && location === '/' ? 'text-white/90 hover:text-white' : 'text-foreground/80'
            }`}>
              Dashboard
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 border-primary/20 hover:bg-primary/10">
                {role === 'admin' ? <ShieldAlert className="w-4 h-4" /> : <User className="w-4 h-4" />}
                {role === 'admin' ? 'Admin' : 'Enthusiast'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRole('enthusiast')} className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Cultural Enthusiast
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('admin')} className="cursor-pointer">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className={!scrolled && location === '/' ? 'text-white hover:text-white hover:bg-white/20' : ''}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className={`md:hidden ${!scrolled && location === '/' ? 'text-white hover:bg-white/20' : ''}`}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
