import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="font-serif text-2xl font-bold mb-4 text-foreground">
              Bharat Heritage <span className="text-primary">Explorer</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Discover the soul of India. A cultural education platform that inspires awareness of Indian heritage, historical places, and famous monuments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Explore</span></Link></li>
              <li><Link href="/dashboard"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Dashboard</span></Link></li>
              <li><Link href="#"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Virtual Tours</span></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="#"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Discussions</span></Link></li>
              <li><Link href="#"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Cultural Events</span></Link></li>
              <li><Link href="#"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Join as Enthusiast</span></Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bharat Heritage Explorer. All rights reserved. Built with ❤️ for culture.
        </div>
      </div>
    </footer>
  );
}
