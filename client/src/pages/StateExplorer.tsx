import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Utensils, Info, ChevronRight, Sparkles, Calendar, Clock, Compass, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function StateExplorer() {
  const [selectedState, setSelectedState] = useState(STATE_DATA[0]);
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isPlanning, setIsPlanning] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-32 mesh-gradient noise-overlay overflow-hidden">
      {/* Animated Hero Header */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          key={selectedState.id + "-bg"}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className={cn("absolute inset-0 bg-gradient-to-br opacity-30 transition-colors duration-1000", selectedState.color)} 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

        {/* Decorative Light Leak */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-3xl animate-float rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 z-10 text-center">
          <motion.div
            key={selectedState.id + "-title"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-px w-12 bg-primary/40" />
               <Badge variant="outline" className="px-6 py-2 text-primary border-primary/30 uppercase tracking-[0.4em] bg-primary/10 text-[10px] font-black rounded-full shadow-2xl">
                 Regional Chronicles
               </Badge>
               <div className="h-px w-12 bg-primary/40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4 shadow-sm">
              Explore <span className="text-gradient-gold italic font-light lowercase">{selectedState.name}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto italic font-medium opacity-80 leading-relaxed">
              &ldquo;{selectedState.description}&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* State List Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">State Index</h3>
              <Badge variant="secondary" className="text-[10px] font-black rounded-lg bg-white/5 border border-white/10 px-3">{STATE_DATA.length} Chapters</Badge>
            </div>
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[75vh] pb-6 lg:pb-0 pr-2 custom-scrollbar">
              {STATE_DATA.map((state) => (
                <button
                  key={state.id}
                  onClick={() => {
                    setSelectedState(state);
                    setIsPlanning(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-500 shrink-0 lg:w-full group text-sm font-serif font-bold tracking-tight border",
                    selectedState.id === state.id
                      ? "bg-primary text-black border-primary shadow-[0_20px_40px_rgba(var(--primary),0.3)] scale-[1.05]"
                      : "bg-card/40 hover:bg-white/10 border-white/5 backdrop-blur-3xl text-foreground/80"
                  )}
                >
                  <span className="relative z-10">{state.name}</span>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-all duration-500 relative z-10",
                    selectedState.id === state.id ? "rotate-90 lg:rotate-0" : "opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
                  )} />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedState.id}
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Monuments Card */}
                  <Card className="bento-card p-2 group overflow-visible">
                    <div className={cn("h-3 bg-gradient-to-r rounded-t-[2.5rem]", selectedState.color)} />
                    <CardContent className="p-8">
                      <div className="flex items-center gap-6 mb-10">
                        <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 shadow-xl group-hover:rotate-12 transition-transform duration-500">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold tracking-tight">Monumental <br />Legends</h2>
                      </div>
                      <ul className="space-y-6">
                        {selectedState.monuments.map((m: string, i: number) => (
                          <motion.li 
                            key={m}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-default group/item"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(253,185,49,0.5)]" />
                            <span className="text-foreground text-sm font-bold tracking-tight opacity-90">{m}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Cuisine Card */}
                  <Card className="bento-card p-2 group overflow-visible">
                    <div className={cn("h-3 bg-gradient-to-l rounded-t-[2.5rem]", selectedState.color)} />
                    <CardContent className="p-12">
                      <div className="flex items-center gap-6 mb-10">
                        <div className="bg-accent/20 p-3 rounded-xl border border-accent/30 shadow-xl group-hover:-rotate-12 transition-transform duration-500">
                          <Utensils className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold tracking-tight">Culinary <br />Spirit</h2>
                      </div>
                      <ul className="space-y-6">
                        {selectedState.foods.map((food: string, i: number) => (
                          <motion.li 
                            key={food}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-5 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-default group/item"
                          >
                            <span className="text-foreground text-base font-bold tracking-tight opacity-90">{food}</span>
                            <Sparkles className="w-5 h-5 text-accent opacity-0 group-hover/item:opacity-100 transition-opacity animate-pulse" />
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Planning/Seasonal Card */}
                  <Card className="premium-card p-8 border-primary/10 bg-gradient-to-br from-card/60 to-primary/5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-sky-500/20 p-3 rounded-xl text-sky-400 border border-sky-500/30">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold tracking-tight">Auspicious Seasons</h3>
                    </div>
                    <p className="text-muted-foreground text-base mb-8 leading-relaxed font-medium opacity-80 italic">
                      "Behold the glory of <strong className="text-foreground">{selectedState.name}</strong> from <span className="text-primary font-black underline decoration-primary/40 underline-offset-8 decoration-2">{selectedState.bestTimeToVisit}</span>, when the heavens align for the perfect pilgrimage."
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-black text-sky-400 uppercase tracking-widest">
                      <Clock className="w-4 h-4 animate-pulse" />
                      Prime Celestial Window
                    </div>
                  </Card>

                  {/* Cultural Highlights Card */}
                  <Card className="premium-card p-8 border-accent/10 bg-gradient-to-br from-card/60 to-accent/5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-orange-500/20 p-3 rounded-xl text-orange-400 border border-orange-500/30">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold tracking-tight">Cultural Essences</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {selectedState.highlights?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="px-4 py-2 rounded-xl font-black uppercase tracking-widest text-[9px] bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-all cursor-default shadow-lg">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Travel Tip Section / Planning Gated Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="premium-card p-10 bg-gradient-to-br from-primary/10 via-background/40 to-accent/10 border-primary/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-pulse-gold pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl animate-float pointer-events-none" />
                
                <div className="relative z-10">
                  {!isPlanning ? (
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                      <div className="shrink-0 relative">
                        <div className="w-20 h-20 bg-primary p-5 rounded-2xl shadow-xl flex items-center justify-center text-black border border-white/20">
                          <Sparkles className="w-10 h-10 stroke-[1.5]" />
                        </div>
                      </div>
                      <div className="text-center lg:text-left flex-grow">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tighter leading-none">Draft Your <br /><span className="text-gradient-gold italic">Sacred Itinerary</span></h3>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-8 font-medium opacity-80">
                          Unveil the hidden trails of <span className="text-foreground font-black italic">{selectedState.name}</span>. Our AI Chronicler will weave a journey tailored to your soul's curiosity.
                        </p>
                        
                        {!user ? (
                          <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-white/5 p-4 pl-8 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
                            <span className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 text-primary">
                              <Lock className="w-5 h-5" /> Identification Required
                            </span>
                            <Button onClick={() => setLocation("/login")} className="rounded-2xl bg-primary text-black hover:bg-white h-14 px-8 text-base font-black uppercase tracking-widest transition-all">
                              Identify Now <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => setIsPlanning(true)}
                            size="lg" 
                            className="rounded-2xl h-16 px-10 text-base font-black uppercase tracking-widest bg-primary text-black hover:bg-white transition-all duration-700"
                          >
                             <span className="relative z-10 flex items-center gap-3">
                               Invoke the Planner <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                             </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-12"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-b border-white/10 pb-12">
                        <div>
                          <h3 className="text-4xl font-serif font-bold tracking-tighter mb-4">Manifesting for <span className="text-primary italic">{selectedState.name}</span></h3>
                          <p className="text-xs font-black text-primary uppercase tracking-[0.4em] opacity-60">Authorized: Imperial Chronicler {user?.username}</p>
                        </div>
                        <Button variant="ghost" onClick={() => setIsPlanning(false)} className="rounded-2xl h-14 border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px]">Abandon Intent</Button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-10">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary px-4">Temporal Window</label>
                          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-3xl flex items-center gap-5 group cursor-pointer hover:border-primary/50 transition-all duration-500">
                            <Calendar className="w-6 h-6 text-primary group-hover:scale-120 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Cycle Selection</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary px-4">Divine Focus</label>
                          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-3xl flex items-center gap-5 group cursor-pointer hover:border-primary/50 transition-all duration-500">
                            <MapPin className="w-6 h-6 text-primary group-hover:scale-120 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Vaults & Spires</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary px-4">Soul Pace</label>
                          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-3xl flex items-center gap-5 group cursor-pointer hover:border-primary/50 transition-all duration-500">
                            <Clock className="w-6 h-6 text-primary group-hover:scale-120 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Eternal (3 Days)</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full h-24 rounded-[3rem] text-2xl font-black uppercase tracking-[0.3em] shadow-[0_40px_80px_rgba(253,185,49,0.3)] bg-primary text-black hover:bg-white transition-all duration-1000 group relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-6">
                          Weave Destiny <Sparkles className="w-8 h-8 animate-pulse-gold" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
