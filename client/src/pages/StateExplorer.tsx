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
    <div className="min-h-screen bg-background pb-24">
      {/* Animated Hero Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${selectedState.color} opacity-20 transition-colors duration-700`} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            key={selectedState.id + "-title"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/30 uppercase tracking-[0.2em] bg-primary/5">
              Region Explorer
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4">
              Explore <span className="text-primary">{selectedState.name}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
              "{selectedState.description}"
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* State List Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Select Region</h3>
              <Badge variant="secondary" className="text-[10px]">{STATE_DATA.length} States</Badge>
            </div>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[70vh] pb-4 lg:pb-2 pr-2 scrollbar-thin scrollbar-thumb-primary/20">
              {STATE_DATA.map((state) => (
                <button
                  key={state.id}
                  onClick={() => {
                    setSelectedState(state);
                    setIsPlanning(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 shrink-0 lg:w-full group text-sm",
                    selectedState.id === state.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                      : "bg-card hover:bg-muted border border-border/50"
                  )}
                >
                  <span className="font-semibold tracking-tight">{state.name}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    selectedState.id === state.id ? "rotate-90 lg:rotate-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Monuments Card */}
                  <Card className="glass-card overflow-hidden border-primary/10 group hover:border-primary/30 transition-all duration-500 rounded-[2rem]">
                    <div className={cn("h-2 bg-gradient-to-r", selectedState.color)} />
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold">Famous Monuments</h2>
                      </div>
                      <ul className="space-y-4">
                        {selectedState.monuments.map((m, i) => (
                          <motion.li 
                            key={m}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all cursor-default"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                            <span className="text-foreground font-semibold tracking-tight">{m}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Cuisine Card */}
                  <Card className="glass-card overflow-hidden border-accent/10 group hover:border-accent/30 transition-all duration-500 rounded-[2rem]">
                    <div className={cn("h-2 bg-gradient-to-l", selectedState.color)} />
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-accent/10 p-3 rounded-2xl">
                          <Utensils className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold">Iconic Cuisines</h2>
                      </div>
                      <ul className="space-y-4">
                        {selectedState.foods.map((food, i) => (
                          <motion.li 
                            key={food}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-3.5 rounded-xl hover:bg-accent/5 border border-transparent hover:border-accent/10 transition-all cursor-default"
                          >
                            <span className="text-foreground font-semibold tracking-tight">{food}</span>
                            <Sparkles className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Planning/Seasonal Card */}
                  <Card className="glass-card p-8 rounded-[2rem] border-primary/5 bg-gradient-to-br from-background to-primary/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-sky-500/10 p-3 rounded-2xl text-sky-600">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold">Best Time to Visit</h3>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed bg-white/40 p-4 rounded-2xl border border-white/60">
                      We recommend visiting <strong>{selectedState.name}</strong> between <span className="text-primary font-bold underline decoration-primary/30">{selectedState.bestTimeToVisit}</span> for the best experience.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-sky-700 font-medium px-4">
                      <Clock className="w-4 h-4" />
                      Peak Season Explorer
                    </div>
                  </Card>

                  {/* Cultural Highlights Card */}
                  <Card className="glass-card p-8 rounded-[2rem] border-accent/5 bg-gradient-to-br from-background to-accent/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-600">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold">Cultural Highlights</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedState.highlights?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-4 py-2 rounded-full font-medium bg-white/60 border-white/80">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-primary/20 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Compass className="w-32 h-32" />
                </div>
                
                <div className="relative z-10">
                  {!isPlanning ? (
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                      <div className="shrink-0 relative">
                        <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                          <Sparkles className="w-12 h-12" />
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-3xl font-serif font-bold mb-3 tracking-tight">Plan Your Heritage Journey</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-6">
                          Ready to explore {selectedState.name}? Our AI-powered planner helps you curate a personalized itinerary through India's rich history.
                        </p>
                        
                        {!user ? (
                          <div className="inline-flex items-center gap-4 bg-muted/50 p-2 pl-4 rounded-2xl border border-border/40">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <Lock className="w-4 h-4 text-primary" /> Login Required to start planning
                            </span>
                            <Button onClick={() => setLocation("/login")} className="rounded-xl shadow-lg">
                              Login Now <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => setIsPlanning(true)}
                            size="lg" 
                            className="rounded-2xl px-10 py-6 text-lg shadow-xl shadow-primary/20 hover:scale-[1.05] transition-transform"
                          >
                            Step Inside the Planner <ChevronRight className="ml-2 w-5 h-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-3xl font-serif font-bold">Curating for {selectedState.name}</h3>
                          <p className="text-muted-foreground">Logged in as {user?.username}</p>
                        </div>
                        <Button variant="ghost" onClick={() => setIsPlanning(false)} className="rounded-xl">Cancel</Button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest px-1">Select Dates</label>
                          <div className="bg-muted p-4 rounded-2xl border border-border/40 flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="text-sm">Choose travel window</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest px-1">Heritage Focus</label>
                          <div className="bg-muted p-4 rounded-2xl border border-border/40 flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span className="text-sm">Monuments & Ruins</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest px-1">Pace</label>
                          <div className="bg-muted p-4 rounded-2xl border border-border/40 flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="text-sm">Leisurely (3 days)</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full h-16 rounded-2xl text-xl font-bold shadow-2xl">Generate Trip Plan <Sparkles className="ml-2 w-6 h-6" /></Button>
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
