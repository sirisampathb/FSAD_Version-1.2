import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMonuments } from "@/hooks/useMonuments";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { ArrowRight, MapPin, Sparkles, BookOpen, Search } from "lucide-react";
import { resolveImageUrl } from "@/lib/queryClient";
import heroBg from "@/assets/images/hero-bg.png";

export default function Home() {
  const { data: monuments, isLoading } = useMonuments();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const heroLink = user ? "/dashboard" : "/login";

  const filteredMonuments = (monuments || []).filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 z-10 hero-overlay" />
        
        {/* Content */}
        <div className="container mx-auto px-4 z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
               <div className="h-px w-12 bg-primary/50" />
               <span className="text-secondary font-black uppercase tracking-[0.5em] text-xs">Since 3000 BCE</span>
               <div className="h-px w-12 bg-primary/50" />
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.85] drop-shadow-2xl">
              The <span className="text-primary italic font-light">Soul</span> of <br />Ancient India
            </h1>
            <p className="text-xl md:text-3xl text-white/80 max-w-4xl mx-auto mb-14 font-medium leading-relaxed">
              Step into a living museum. Explore the majestic heritage, sacred sites, and architectural wonders of a timeless civilization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href={heroLink}>
                <Button size="lg" className="rounded-full h-20 px-12 text-xl font-black uppercase tracking-widest bg-primary hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(var(--primary),0.3)] border-none">
                  Begin Journey
                </Button>
              </Link>
              <Link href={heroLink}>
                <Button size="lg" variant="outline" className="rounded-full h-20 px-12 text-xl font-black uppercase tracking-widest border-white/20 text-white hover:bg-white/10 glass-panel backdrop-blur-3xl">
                  Virtual Archives
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Monuments Carousel */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-primary" />
                <span className="text-primary font-black uppercase tracking-widest text-sm">Curated Selection</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">Living Masterpieces</h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                 Immersion into the architectural marvels that have withstood the tides of history.
              </p>
            </div>
            
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <Input 
                placeholder="Search the archives..." 
                className="pl-14 h-16 rounded-3xl border-primary/10 bg-card/30 backdrop-blur-xl text-lg focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredMonuments.map((monument, index) => (
              <motion.div
                key={monument.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/monument/${monument.id}`}>
                  <div className="relative h-[600px] rounded-[3rem] overflow-hidden mb-6 shadow-2xl border border-white/5 transition-all duration-700 hover:border-primary/50">
                    <img 
                      src={resolveImageUrl(monument.image)} 
                      alt={monument.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    
                    {monument.unesco && (
                      <div className="absolute top-8 right-8 bg-primary text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl border border-white/20 uppercase tracking-widest">
                        UNESCO World Heritage
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 p-10 w-full">
                      <div className="flex items-center text-primary/80 text-xs font-bold uppercase tracking-widest mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {monument.location}
                      </div>
                      <h3 className="text-4xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{monument.name}</h3>
                      <div className="h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-card/30 backdrop-blur-3xl border-y border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <BookOpen className="w-16 h-16 text-primary/40 mx-auto mb-10 animate-float" />
          <blockquote className="text-4xl md:text-6xl font-serif text-foreground leading-tight mb-12 italic tracking-tight">
            &ldquo;A nation&apos;s culture resides in the hearts and in the soul of its people.&rdquo;
          </blockquote>
          <div className="flex flex-col items-center gap-4">
            <cite className="text-primary font-black tracking-[0.4em] uppercase text-sm block">— Mahatma Gandhi</cite>
            <div className="h-px w-20 bg-primary/30" />
          </div>
        </div>
      </section>

    </div>
  );
}
