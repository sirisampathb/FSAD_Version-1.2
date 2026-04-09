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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-xl">
              Discover the <span className="text-primary italic">Soul of India</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light">
              Embark on a breathtaking journey through time. Explore the rich culture, majestic heritage, and iconic monuments of a timeless civilization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={heroLink}>
                <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                  <MapPin className="mr-2 h-5 w-5" /> Explore Monuments
                </Button>
              </Link>
              <Link href={heroLink}>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 glass-panel">
                  <Sparkles className="mr-2 h-5 w-5" /> Start Virtual Tour
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Monuments Carousel */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Featured Heritage</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Immerse yourself in the architectural marvels that have stood the test of time.
              </p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search monuments or locations..." 
                className="pl-10 h-10 rounded-full border-primary/20 bg-card/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/10">
              View all places <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMonuments.map((monument, index) => (
              <motion.div
                key={monument.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/monument/${monument.id}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={resolveImageUrl(monument.image)} 
                      alt={monument.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {monument.unesco && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        UNESCO
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-2xl font-serif font-bold text-white mb-1">{monument.name}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {monument.location}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-8">
            &ldquo;A nation&apos;s culture resides in the hearts and in the soul of its people.&rdquo;
          </blockquote>
          <cite className="text-primary font-medium tracking-widest uppercase">— Mahatma Gandhi</cite>
        </div>
      </section>
    </div>
  );
}
