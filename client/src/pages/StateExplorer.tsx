import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Utensils, Info, ChevronRight, Sparkles, Calendar, Clock, Compass, Lock, ArrowRight, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function StateExplorer() {
  const [selectedState, setSelectedState] = useState(STATE_DATA[0]);
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isPlanning, setIsPlanning] = useState(false);
  const [activeMonument, setActiveMonument] = useState<string | null>(null);

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
              Explore <span className="text-gradient-rose italic font-light lowercase">{selectedState.name}</span>
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
                            onClick={() => setActiveMonument(m)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer group/item"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(253,185,49,0.5)] group-hover/item:scale-150 transition-transform" />
                            <span className="text-foreground text-sm font-bold tracking-tight opacity-90 group-hover/item:text-primary transition-colors">{m}</span>
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
                  <Card className="premium-card p-6 border-primary/10 bg-gradient-to-br from-card/60 to-primary/5 shadow-md relative overflow-hidden group">
                    <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-sky-500/20 p-3 rounded-xl text-sky-400 border border-sky-500/30">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold tracking-tight">Auspicious Seasons</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-medium opacity-80 italic">
                      "Behold the glory of <strong className="text-foreground">{selectedState.name}</strong> from <span className="text-primary font-black underline decoration-primary/40 underline-offset-4 decoration-2">{selectedState.bestTimeToVisit}</span>, when the heavens align for the perfect pilgrimage."
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-black text-sky-400 uppercase tracking-widest">
                      <Clock className="w-4 h-4 animate-pulse" />
                      Prime Celestial Window
                    </div>
                  </Card>

                  {/* Cultural Highlights Card */}
                  <Card className="premium-card p-6 border-accent/10 bg-gradient-to-br from-card/60 to-accent/5 shadow-md relative overflow-hidden group">
                    <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />
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
              className="grid lg:grid-cols-2 gap-8"
            >
              <Card className="premium-card p-6 bg-gradient-to-br from-primary/10 via-background/40 to-accent/10 border-primary/30 shadow-lg relative overflow-hidden group flex flex-col justify-center">
                <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl animate-pulse-rose pointer-events-none" />
                
                <div className="relative z-10">
                  {!isPlanning ? (
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="shrink-0">
                        <div className="w-16 h-16 bg-primary p-4 rounded-2xl shadow-md flex items-center justify-center text-black border border-white/20">
                          <Sparkles className="w-8 h-8 stroke-[1.5]" />
                        </div>
                      </div>
                      <div className="text-center sm:text-left flex-grow">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 tracking-tighter leading-none">Draft Your <br /><span className="text-gradient-rose italic">Sacred Itinerary</span></h3>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6 font-medium opacity-80">
                          Unveil the hidden trails of <span className="text-foreground font-black italic">{selectedState.name}</span> with our AI Chronicler.
                        </p>
                        
                        {!user ? (
                          <div className="inline-flex flex-col items-center sm:items-start gap-4">
                            <Button onClick={() => setLocation("/login")} className="rounded-xl bg-primary text-black hover:bg-white h-12 px-6 text-sm font-black uppercase tracking-widest transition-all">
                              Identify Now <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => setIsPlanning(true)}
                            className="rounded-xl h-12 px-6 text-sm font-black uppercase tracking-widest bg-primary text-black hover:bg-white transition-all duration-700 w-full sm:w-auto"
                          >
                             <span className="relative z-10 flex items-center gap-2">
                               Invoke Planner <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                             </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8"
                    >
                      <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <h3 className="text-2xl font-serif font-bold tracking-tighter">Manifesting <span className="text-primary italic">{selectedState.name}</span></h3>
                        </div>
                        <Button variant="ghost" onClick={() => setIsPlanning(false)} className="rounded-xl h-10 border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px]">Abandon</Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Focus</span>
                        </div>
                      </div>
                      <Button className="w-full h-14 rounded-2xl text-lg font-black uppercase tracking-[0.2em] bg-primary text-black hover:bg-white">
                        Weave Destiny
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>

              {/* NEW FEATURES INTEGRATION CARD */}
              <Card className="premium-card p-6 bg-gradient-to-br from-card to-accent/5 border-white/10 shadow-lg relative overflow-hidden group flex flex-col justify-center">
                <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl animate-float pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                     <div className="w-12 h-12 bg-white/5 p-3 rounded-xl shadow-md flex items-center justify-center text-primary border border-white/10">
                        <BookmarkPlus className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-xl font-serif font-bold tracking-tight">Your Saved Journeys</h3>
                       <p className="text-xs text-muted-foreground opacity-80 mt-1">Access your bookmarked monuments & reviews</p>
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-white/10 hover:bg-white/5 hover:text-primary transition-colors">
                       <span className="font-bold tracking-wide text-sm">View Wishlist</span>
                       <ArrowRight className="w-4 h-4" />
                     </Button>
                     <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-white/10 hover:bg-white/5 hover:text-primary transition-colors">
                       <span className="font-bold tracking-wide text-sm">My Reviews</span>
                       <ArrowRight className="w-4 h-4" />
                     </Button>
                     {user?.role === 'admin' && (
                       <Button onClick={() => setLocation("/admin")} variant="secondary" className="w-full justify-between h-12 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors mt-2">
                         <span className="font-bold tracking-wide text-sm uppercase text-[10px]">Analytics Dashboard</span>
                         <Sparkles className="w-4 h-4" />
                       </Button>
                     )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Monument Detail Modal */}
      <Dialog open={!!activeMonument} onOpenChange={() => setActiveMonument(null)}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background border-white/10">
          {activeMonument && (
            <>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img 
                  src={`https://source.unsplash.com/800x600/?${encodeURIComponent(activeMonument + ' monument india')}`} 
                  alt={activeMonument}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background to-transparent h-32 z-10" />
                <Badge className="absolute top-4 left-4 z-20 bg-primary text-black font-black uppercase tracking-widest text-[10px]">
                  {selectedState.name} Heritage
                </Badge>
              </div>
              <div className="p-8 pt-2 relative z-20">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-serif font-bold tracking-tight mb-2 flex items-center gap-3">
                    {activeMonument}
                    <Sparkles className="w-5 h-5 text-primary" />
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    Experience the grandeur of {activeMonument}, a shining symbol of India's glorious past located in the heart of {selectedState.name}.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <MapPin className="w-8 h-8 text-primary p-1.5 bg-primary/10 rounded-lg" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Location</p>
                      <p className="font-semibold text-sm">{selectedState.name}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <Clock className="w-8 h-8 text-accent p-1.5 bg-accent/10 rounded-lg" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Era</p>
                      <p className="font-semibold text-sm">Ancient India</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                   <Button variant="outline" onClick={() => setActiveMonument(null)} className="rounded-xl border-white/10 hover:bg-white/5 font-bold">Close</Button>
                   <Button className="rounded-xl bg-primary text-black hover:bg-white font-bold uppercase tracking-widest text-xs gap-2">
                     <BookmarkPlus className="w-4 h-4" /> Save to Wishlist
                   </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
