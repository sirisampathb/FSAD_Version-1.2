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
      <section className="relative h-screen flex items-center justify-center overflow-hidden noise-overlay">
        {/* Background Image with Parallax effect */}
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-background" />
        
        {/* Decorative Light Leak */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] animate-float rounded-full mix-blend-screen pointer-events-none" />
        
        {/* Content */}
        <div className="container mx-auto px-6 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-px w-12 bg-primary/40" />
               <span className="text-white/80 font-bold uppercase tracking-[0.5em] text-[9px] md:text-xs">Est. 3000 BCE • Eternal Bharat</span>
               <div className="h-px w-12 bg-primary/40" />
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
              The <span className="text-primary italic font-medium">Soul</span> of Antiquity
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Witness the architectural echoes of a civilization that transcended time. From golden sands to sacred peaks.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href={heroLink}>
                <Button size="lg" className="group rounded-full h-16 px-12 text-sm font-bold uppercase tracking-[0.2em] bg-primary text-black hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  Seek Truth <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-sm font-bold uppercase tracking-[0.2em] border-white/20 text-white hover:bg-white/10 glass-panel backdrop-blur-3xl transition-all">
                  State Archives
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1.5">
            <div className="w-1 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Monuments */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary/80 font-bold uppercase tracking-[0.3em] text-[10px]">Architectural Anthology</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">Timeless <span className="text-primary italic font-medium">Marvels</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl font-medium opacity-60">
                 Explore a curated selection of India's most profound structural accomplishments.
              </p>
            </div>
            
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/60" />
              <Input 
                placeholder="Search the chronicles..." 
                className="pl-14 h-16 rounded-2xl border-primary/10 bg-card/40 backdrop-blur-3xl text-lg focus:ring-primary/20 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMonuments.map((monument, index) => (
              <motion.div
                key={monument.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/monument/${monument.id}`}>
                  <div className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl border border-white/5 transition-all duration-500 hover:border-primary/40 hover:-translate-y-2">
                    <img 
                      src={resolveImageUrl(monument.image)} 
                      alt={monument.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                    
                    {monument.unesco && (
                      <div className="absolute top-8 right-8 glass-panel text-primary text-[9px] font-bold px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-[0.1em]">
                        UNESCO Legend
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 p-10 w-full transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="flex items-center text-primary/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {monument.location}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">{monument.name}</h3>
                      <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-full" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 bg-card relative overflow-hidden noise-overlay">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <BookOpen className="w-16 h-16 text-primary/20 mx-auto mb-12 animate-float" />
            <blockquote className="text-3xl md:text-5xl font-serif text-foreground leading-snug mb-12 italic tracking-tight font-light">
              &ldquo;A nation&apos;s culture resides in the hearts and in the <span className="text-primary">soul</span> of its people.&rdquo;
            </blockquote>
            <div className="flex flex-col items-center gap-4">
              <cite className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs block opacity-80">Mahatma Gandhi</cite>
              <div className="h-px w-24 bg-primary/20" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

    </div>
  );
}
