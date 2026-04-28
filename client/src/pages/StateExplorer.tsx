import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Utensils, Info, ChevronRight, Sparkles, Calendar, Clock, Compass, Lock, ArrowRight, BookmarkPlus, Music, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Star, Trash2, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { addReview, getReviews, toggleSaveMonument, checkIsSaved, getSavedMonuments } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const EXACT_MONUMENT_IMAGES: Record<string, string> = {
  "Taj Mahal": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHUGLmSRkHiq8LIQMIYzac4xrax-vT0xwUveWLyY_BTIQbCLqgtXKcCMX25pdQ_vjk8COtJ7nDgYMNcw5J2OdU3LEiZFzMRK2vmhgEx9yeyIUhysj6R05JacEYbNUZ29jca7Do5=s1360-w1360-h1020-rw",
  "Agra Fort": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1JgKg0KjILyIZuypTtrWharVS5X_q9Mizw&s",
  "Fatehpur Sikri": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTIj8cAY0SsOIyUR8cD2I0Ls0lLyHQ9N8i6MGWm2ZgtF8p1sUpp",
  "Qutub Minar": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGr0Pt4o4TN-k4fRJCYZaIbmRvtfC6NO3E_Lm6hsM2bzfTDBFZRXpAG38AWK5pWXNwGUQOvz0rCk4-XKfUo1s1FJ5KUWIYv-hzHPk7SBgkvoWXGzrSBkHdWw2jX5FdWa6G84x_N=s1360-w1360-h1020-rw",
  "Red Fort": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGDsA7iqdqLUy5NntZ4L3rU4vKFHKB-RxJTSji-j4EU12dIrJI9rb4oFAExTwcvY2jVOEzm94u24NFoiTqcs_bsn5g4RJcEA1hq7tFh6dejRaUvvxsnG2uKFarSSULHuXvtvZE=s1360-w1360-h1020-rw",
  "Humayun's Tomb": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Tomb_of_Humayun%2C_Delhi.jpg",
  "Hawa Mahal": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Hawa_Mahal_in_Jaipur.jpg",
  "Amer Fort": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Amer_Fort%2C_Jaipur.jpg",
  "Mehrangarh Fort": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Mehrangarh_Fort.jpg",
  "Gateway of India": "https://upload.wikimedia.org/wikipedia/commons/5/5e/The_Gateway_of_India_%2C_Mumbai.jpg",
  "Ajanta & Ellora Caves": "https://upload.wikimedia.org/wikipedia/commons/7/77/Ajanta_Caves_panorama_view.jpg",
  "Hampi Ruins": "https://upload.wikimedia.org/wikipedia/commons/0/05/Virupaksha_Temple_Hampi.jpg",
  "Mysore Palace": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Mysore_Palace_Morning.jpg",
  "Charminar (Historical Tie)": "https://upload.wikimedia.org/wikipedia/commons/9/91/Charminar_Summer.jpg",
  "Tirupati Temple": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
  "Golconda Fort": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Golconda_Fort%2C_Hyderabad%2C_Andhra_Pradesh%2C_India.JPG",
  "Somnath Temple": "https://upload.wikimedia.org/wikipedia/commons/7/71/Somnath_Temple_Gujarat.jpg"
};

const DEFAULT_MONUMENT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/d/d4/India_Gate_in_New_Delhi_03-2016.jpg";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=400"
];

export default function StateExplorer() {
  const [selectedState, setSelectedState] = useState(STATE_DATA[0]);
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [isPlanning, setIsPlanning] = useState(false);
  const [activeMonument, setActiveMonument] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [plannerDuration, setPlannerDuration] = useState("3");
  const [plannerFocus, setPlannerFocus] = useState("balanced");
  const [generatedPlan, setGeneratedPlan] = useState<{ day: number; activities: string[] }[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [viewingList, setViewingList] = useState<"wishlist" | "reviews" | null>(null);

  const { data: allMonuments } = useQuery({
    queryKey: ["monuments"],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/monuments`).then(res => res.json())
  });

  const getMonumentId = (name: string) => {
    const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const match = allMonuments?.find((m: any) => 
      m.name.toLowerCase() === name.toLowerCase() || 
      m.name.toLowerCase().includes(name.toLowerCase())
    );
    return match?.id || normalized;
  };
  
  const activeMonumentId = activeMonument ? getMonumentId(activeMonument) : null;

  // Wishlist Logic
  const { data: isSaved, refetch: refetchSaved } = useQuery({
    queryKey: ["isSaved", activeMonumentId],
    queryFn: () => checkIsSaved(activeMonumentId!),
    enabled: !!activeMonumentId,
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: () => toggleSaveMonument(activeMonumentId!),
    onSuccess: () => {
      refetchSaved();
      queryClient.invalidateQueries({ queryKey: ["savedMonuments"] });
      toast({ title: isSaved ? "Removed from Wishlist" : "Added to Wishlist" });
    },
  });

  const { data: savedMonuments } = useQuery({
    queryKey: ["savedMonuments"],
    queryFn: getSavedMonuments,
    enabled: viewingList === "wishlist",
  });

  // Reviews Logic
  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", activeMonumentId],
    queryFn: () => getReviews(activeMonumentId!),
    enabled: !!activeMonumentId,
  });

  const addReviewMutation = useMutation({
    mutationFn: () => {
      if (!reviewComment.trim()) throw new Error("Comment cannot be empty");
      return addReview(activeMonumentId!, reviewRating, reviewComment);
    },
    onSuccess: () => {
      setReviewComment("");
      refetchReviews();
      toast({ title: "Review submitted successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Submission Failed", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const generateItinerary = () => {
    setIsGenerating(true);
    setGeneratedPlan(null);

    // Simulate AI generation
    setTimeout(() => {
      const days = parseInt(plannerDuration);
      const plan = [];
      const monuments = [...(selectedState.monuments || [])];
      const foods = [...(selectedState.foods || [])];

      for (let i = 1; i <= days; i++) {
        const activities = [];
        // Add a monument
        if (monuments.length > 0) {
          const mIdx = Math.floor(Math.random() * monuments.length);
          activities.push(`Visit ${monuments.splice(mIdx, 1)[0]}`);
        }
        // Add a food experience
        if (foods.length > 0) {
          const fIdx = Math.floor(Math.random() * foods.length);
          activities.push(`Taste authentic ${foods.splice(fIdx, 1)[0]}`);
        }
        // Add a general activity
        if (selectedState.highlights && selectedState.highlights.length > 0) {
          const hIdx = Math.floor(Math.random() * selectedState.highlights.length);
          activities.push(`Explore ${selectedState.highlights[hIdx]}`);
        }

        plan.push({ day: i, activities });
      }

      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [user, loading, setLocation]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background mesh-gradient">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 mesh-gradient noise-overlay overflow-hidden">
      {/* Animated Hero Header */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <motion.div
          key={selectedState.id + "-img"}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url('${EXACT_MONUMENT_IMAGES[selectedState.monuments?.[0] || ""] || DEFAULT_MONUMENT_IMAGE}')` }}
        />
        <motion.div
          key={selectedState.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={cn("absolute inset-0 bg-gradient-to-br opacity-50 transition-colors duration-1000", selectedState.color)}
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
                      <ul className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedState.monuments?.map((m: string, i: number) => (
                          <motion.li
                            key={m}
                            onClick={() => setActiveMonument(m)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer group/item"
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white/10 group-hover/item:border-primary transition-colors shadow-lg">
                              <img src={EXACT_MONUMENT_IMAGES[m] || DEFAULT_MONUMENT_IMAGE} alt={m} className="w-full h-full object-cover group-hover/item:scale-125 transition-transform duration-700" />
                            </div>
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
                      <ul className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedState.foods?.map((food: string, i: number) => (
                          <motion.li
                            key={food}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-5 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-default group/item"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white/10 group-hover/item:border-accent transition-colors shadow-lg">
                                <img src={FOOD_IMAGES[i % FOOD_IMAGES.length]} alt={food} className="w-full h-full object-cover group-hover/item:scale-125 transition-transform duration-700" />
                              </div>
                              <span className="text-foreground text-base font-bold tracking-tight opacity-90">{food}</span>
                            </div>
                            <Sparkles className="w-5 h-5 text-accent opacity-0 group-hover/item:opacity-100 transition-opacity animate-pulse" />
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
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

                  {/* Heritage Soundscape Card */}
                  <Card className="premium-card p-6 border-emerald-500/10 bg-gradient-to-br from-card/60 to-emerald-500/5 shadow-md relative overflow-hidden group flex flex-col">
                    <div className="absolute -top-20 -right-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                        <Music className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold tracking-tight">Soundscape</h3>
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-center text-center">
                      <div className="w-full flex items-center justify-center gap-1 mb-6 h-8">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={isPlaying ? { height: ["20%", "100%", "40%", "80%", "30%"] } : { height: "20%" }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                            className="w-1.5 bg-emerald-500/60 rounded-full"
                          />
                        ))}
                      </div>
                      <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" className="rounded-full w-12 h-12 p-0 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10">
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                      </Button>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-4">
                        {isPlaying ? `Playing ${selectedState.name} Ambient` : "Listen to State Tunes"}
                      </p>
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
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <h3 className="text-xl font-serif font-bold tracking-tighter">Manifesting <span className="text-primary italic">{selectedState.name}</span></h3>
                        </div>
                        <Button variant="ghost" onClick={() => setIsPlanning(false)} className="rounded-xl h-8 border border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[9px]">Abandon</Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</label>
                          <Select value={plannerDuration} onValueChange={setPlannerDuration}>
                            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                              <SelectValue placeholder="Days" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-white/10">
                              <SelectItem value="1">1 Day</SelectItem>
                              <SelectItem value="2">2 Days</SelectItem>
                              <SelectItem value="3">3 Days</SelectItem>
                              <SelectItem value="5">5 Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Focus</label>
                          <Select value={plannerFocus} onValueChange={setPlannerFocus}>
                            <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-white/10">
                              <SelectItem value="balanced">Balanced</SelectItem>
                              <SelectItem value="monuments">History</SelectItem>
                              <SelectItem value="food">Culinary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {generatedPlan ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-primary/5 rounded-2xl border border-primary/20 p-4 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold tracking-tight text-primary uppercase">Your Sacred Trail</h4>
                            <Badge variant="outline" className="text-[9px] border-primary/30 text-primary uppercase">Generated</Badge>
                          </div>
                          <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-6">
                              {generatedPlan.map((day) => (
                                <div key={day.day} className="space-y-3 relative pl-4 border-l border-primary/30">
                                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Day {day.day}</span>
                                  <ul className="space-y-2">
                                    {day.activities.map((act, idx) => (
                                      <li key={idx} className="text-xs font-medium text-foreground/80 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-primary/40 rounded-full" />
                                        {act}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setGeneratedPlan(null)}
                            className="w-full text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary"
                          >
                            Reset Manifest
                          </Button>
                        </motion.div>
                      ) : (
                        <Button
                          onClick={generateItinerary}
                          disabled={isGenerating}
                          className="w-full h-14 rounded-2xl text-lg font-black uppercase tracking-[0.2em] bg-primary text-black hover:bg-white disabled:opacity-50"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mr-2" />
                              Manifesting...
                            </>
                          ) : (
                            "Weave Destiny"
                          )}
                        </Button>
                      )}
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
                    <Button onClick={() => setViewingList("wishlist")} variant="outline" className="w-full justify-between h-12 rounded-xl border-white/10 hover:bg-white/5 hover:text-primary transition-colors">
                      <span className="font-bold tracking-wide text-sm">View Wishlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => setViewingList("reviews")} variant="outline" className="w-full justify-between h-12 rounded-xl border-white/10 hover:bg-white/5 hover:text-primary transition-colors">
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
      <Dialog open={!!activeMonument} onOpenChange={(isOpen: boolean) => { if (!isOpen) setActiveMonument(null) }}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background border-white/10">
          {activeMonument && (
            <>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                  src={EXACT_MONUMENT_IMAGES[activeMonument || ""] || DEFAULT_MONUMENT_IMAGE}
                  alt={activeMonument || "Monument"}
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
                  <Button 
                    onClick={() => toggleWishlistMutation.mutate()}
                    disabled={toggleWishlistMutation.isPending}
                    className={cn(
                      "rounded-xl font-bold uppercase tracking-widest text-xs gap-2 transition-all",
                      isSaved ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30" : "bg-primary text-black hover:bg-white"
                    )}
                  >
                    {toggleWishlistMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isSaved ? (
                      <><Trash2 className="w-4 h-4" /> Remove from Wishlist</>
                    ) : (
                      <><BookmarkPlus className="w-4 h-4" /> Save to Wishlist</>
                    )}
                  </Button>
                </div>

                {/* Reviews Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    Explorer Chronicles
                  </h4>
                  
                  {/* Add Review */}
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-8 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className={cn(
                            "transition-transform hover:scale-125",
                            star <= reviewRating ? "text-primary" : "text-muted-foreground opacity-30"
                          )}
                        >
                          <Star className={cn("w-5 h-5", star <= reviewRating && "fill-primary")} />
                        </button>
                      ))}
                    </div>
                    <Textarea 
                      placeholder="Share your pilgrimage experience..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="bg-background border-white/10 rounded-xl resize-none min-h-[100px]"
                    />
                    <Button 
                      onClick={() => addReviewMutation.mutate()}
                      disabled={addReviewMutation.isPending || !reviewComment.trim()}
                      className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-black font-black uppercase tracking-widest text-[10px] h-10 rounded-xl"
                    >
                      {addReviewMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Chronicle"}
                    </Button>
                  </div>

                  {/* Reviews List */}
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-6">
                      {reviews && reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div key={review.id} className="space-y-2 pb-6 border-b border-white/5 last:border-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-primary">@{review.username}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={cn("w-3 h-3", i < review.rating ? "text-primary fill-primary" : "text-muted-foreground opacity-20")} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground opacity-50 italic text-sm">
                          No chronicles shared yet. Be the first to tell the tale.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Global Wishlist/Reviews List Dialog */}
      <Dialog open={!!viewingList} onOpenChange={() => setViewingList(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background border-white/10 p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-3">
              {viewingList === "wishlist" ? (
                <><Heart className="w-6 h-6 text-red-500 fill-red-500" /> Sacred Wishlist</>
              ) : (
                <><Star className="w-6 h-6 text-primary fill-primary" /> My Chronicles</>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] mt-6 pr-4">
            <div className="space-y-4">
              {viewingList === "wishlist" ? (
                savedMonuments && savedMonuments.length > 0 ? (
                  savedMonuments.map((item) => (
                    <div key={item.monumentId} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-all">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img src={item.image || DEFAULT_MONUMENT_IMAGE} alt={item.monumentName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h5 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.monumentName}</h5>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Sacred Site</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setActiveMonument(item.monumentName);
                          setViewingList(null);
                        }}
                        className="rounded-full hover:bg-primary/20"
                      >
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 opacity-50 italic">Your wishlist is an empty scroll.</div>
                )
              ) : (
                <div className="text-center py-12 opacity-50 italic">Feature manifesting soon: Personal chronicle history.</div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
