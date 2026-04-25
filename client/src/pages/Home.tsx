import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMonuments } from "@/hooks/useMonuments";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Search, 
  Crown, 
  ShieldCheck, 
  Award, 
  History, 
  BarChart3, 
  PlusCircle,
  Gem,
  Tent
} from "lucide-react";
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-3xl animate-float rounded-full pointer-events-none" />
        
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
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8 leading-[1.05] text-white">
              The <span className="text-gradient-gold animate-text-gradient italic font-medium">Soul</span> of Antiquity
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
                <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-sm font-bold uppercase tracking-[0.2em] border-white/20 text-white hover:bg-white/10 premium-glass transition-all">
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

      {/* Authenticated Personalization Sections */}
      {user && (
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-6">
            {user.role === "admin" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="premium-card p-12 relative overflow-hidden"
              >
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Crown className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Curator Command Center</span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-white">Shalom, <span className="text-primary">{user.username}</span></h2>
                    <p className="text-white/60 mt-2">The chronicles are under your stewardship. What shall we preserve today?</p>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/dashboard">
                      <Button className="h-14 px-8 rounded-2xl bg-primary text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
                        <PlusCircle className="w-4 h-4 mr-2" /> Add Monument
                      </Button>
                    </Link>
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 text-white font-bold uppercase tracking-widest text-xs glass-panel">
                       Export Registry
                    </Button>
                  </div>
                </div>

                {/* Admin Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  <div className="bento-card p-8 bg-white/5 border-white/5">
                    <BarChart3 className="w-8 h-8 text-primary mb-6" />
                    <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Total Registry</h4>
                    <div className="text-4xl font-serif font-bold text-white mb-2">{monuments?.length || 0} Assets</div>
                    <div className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> +2 new this week
                    </div>
                  </div>
                  
                  <div className="bento-card p-8 bg-white/5 border-white/5">
                    <ShieldCheck className="w-8 h-8 text-primary mb-6" />
                    <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">UNESCO Status</h4>
                    <div className="text-4xl font-serif font-bold text-white mb-2">
                       {monuments?.filter(m => m.unesco).length || 0} Verified
                    </div>
                    <p className="text-white/40 text-xs">Priority compliance achieved</p>
                  </div>

                  <div className="bento-card p-8 bg-white/5 border-white/5">
                    <History className="w-8 h-8 text-primary mb-6" />
                    <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">System Health</h4>
                    <div className="text-4xl font-serif font-bold text-white mb-2">99.9%</div>
                    <p className="text-white/40 text-xs">Distributed node sync active</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Enthusiast Section */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="lg:col-span-2 bento-card p-12 bg-card/60"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="font-serif text-3xl font-bold mb-6 text-foreground tracking-tighter">
                      Bharat <span className="text-gradient-gold animate-text-gradient italic">Heritage</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold">Your <span className="text-primary">Heritage Path</span></h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <p className="text-muted-foreground font-medium">Continue your exploration where you left off. Every visit preserves a memory.</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                            <span>Civilization Rank: Seeker</span>
                            <span className="text-primary">65%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "65%" }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                        <Link href="/explore">
                           <Button className="w-full h-14 rounded-2xl bg-primary text-black font-bold">Resuming Expedition</Button>
                        </Link>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Award, label: "Explorer", color: "text-amber-400" },
                          { icon: Tent, label: "Nomad", color: "text-emerald-400" },
                          { icon: BookOpen, label: "Scribe", color: "text-blue-400" },
                          { icon: History, label: "Elder", color: "text-purple-400" }
                        ].map((badge, i) => (
                          <div key={i} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/5 grayscale hover:grayscale-0 transition-all cursor-help group">
                            <badge.icon className={`w-8 h-8 ${badge.color} mb-3 group-hover:scale-110 transition-transform`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{badge.label}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bento-card p-10 bg-primary/5 border-primary/20 relative group"
                >
                  <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all" />
                  <History className="w-10 h-10 text-primary mb-8" />
                  <h3 className="text-2xl font-serif font-bold mb-4 italic">Recent Inquiries</h3>
                  <div className="space-y-6">
                    {filteredMonuments.slice(0, 3).map((m, i) => (
                      <Link key={m.id} href={`/monument/${m.id}`}>
                        <div className="flex items-center gap-4 group/item cursor-pointer">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0">
                            <img src={resolveImageUrl(m.image)} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold group-hover/item:text-primary transition-colors">{m.name}</h4>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium dark:text-gray-400">Visited 2 days ago</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-8 text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-primary">View Full History</Button>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      )}

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
