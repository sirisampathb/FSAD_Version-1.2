import { useParams } from "wouter";
import { useMonument } from "@/hooks/useMonuments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIsSaved, toggleSaveMonument } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent 
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Calendar, 
  Compass, 
  Share2, 
  BookmarkPlus, 
  PlayCircle, 
  Eye, 
  Sparkles,
  Loader2,
  ExternalLink,
  Music,
  Pause,
  History as HistoryIcon,
  Crown,
  Info,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/queryClient";

export default function MonumentDetail() {
  const { id } = useParams();
  const { data: monument, isLoading, error } = useMonument(id!);
  const [immersiveMode, setImmersiveMode] = useState<"360" | "audio" | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isSaved, refetch: refetchSaved } = useQuery({
    queryKey: ["isSaved", id],
    queryFn: () => checkIsSaved(id!),
    enabled: !!id,
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: () => toggleSaveMonument(id!),
    onSuccess: () => {
      refetchSaved();
      queryClient.invalidateQueries({ queryKey: ["savedMonuments"] });
      toast({ 
        title: isSaved ? "Removed from Wishlist" : "Saved to Timeline",
        description: isSaved ? `${monument?.name} removed.` : `${monument?.name} is now in your sacred journey.`
      });
    },
  });

  const handleLaunch360 = () => {
    setIsLaunching(true);
    setImmersiveMode("360");
    setTimeout(() => setIsLaunching(false), 2000);
  };

  const handlePlayAudio = () => {
    setImmersiveMode("audio");
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen text-primary font-black uppercase tracking-[0.3em]"><Loader2 className="w-8 h-8 animate-spin mr-3" /> Manifesting...</div>;
  if (error || !monument) return <div className="flex justify-center items-center min-h-screen">Not Found</div>;

  return (
    <div className="w-full pb-20 pt-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${resolveImageUrl(monument.image)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {monument.unesco && (
                <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground mb-4 font-bold tracking-wide">
                  UNESCO WORLD HERITAGE SITE
                </Badge>
              )}
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground drop-shadow-sm mb-4">
                {monument.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-lg">
                <span className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" /> {monument.location}</span>
                <span className="flex items-center"><Calendar className="w-5 h-5 mr-2 text-primary" /> Built {monument.builtYear}</span>
                <span className="flex items-center"><Compass className="w-5 h-5 mr-2 text-primary" /> {monument.style}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex justify-end gap-4 mb-12">
          <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5"><Share2 className="w-4 h-4" /> Share</Button>
          <Button 
            variant={isSaved ? "secondary" : "default"} 
            onClick={() => toggleWishlistMutation.mutate()}
            disabled={toggleWishlistMutation.isPending}
            className={cn(
              "gap-2 font-bold transition-all",
              isSaved ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-primary text-black hover:scale-105"
            )}
          >
            {toggleWishlistMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSaved ? (
              <><Trash2 className="w-4 h-4" /> Remove from Timeline</>
            ) : (
              <><BookmarkPlus className="w-4 h-4" /> Save to Timeline</>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">About the Monument</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {monument.description}
                <br/><br/>
                This architectural masterpiece stands as a testament to the grand vision of the {monument.dynasty}. The intricate details and massive scale showcase the engineering brilliance of its time.
              </p>
            </section>

            {/* Immersive Elements Placeholders */}
            <section className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">Immersive Experience</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div 
                  onClick={handleLaunch360}
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border aspect-video flex items-center justify-center cursor-pointer hover:border-primary transition-all duration-500 shadow-lg hover:shadow-primary/10"
                >
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-primary/5 transition-colors" />
                  <div className="text-center z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                      <Eye className="w-8 h-8" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs text-foreground/80 group-hover:text-foreground">Launch 360° Tour</span>
                  </div>
                </div>
                <div 
                  onClick={handlePlayAudio}
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border aspect-video flex items-center justify-center cursor-pointer hover:border-primary transition-all duration-500 shadow-lg hover:shadow-primary/10"
                >
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="text-center z-10">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 text-black">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs text-foreground/80 group-hover:text-foreground">Play Audio Guide</span>
                  </div>
                </div>
              </div>

              {/* Immersive Modal */}
              <Dialog open={!!immersiveMode} onOpenChange={() => setImmersiveMode(null)}>
                <DialogContent className="sm:max-w-[800px] bg-background border-white/10 p-0 overflow-hidden">
                  <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                    {immersiveMode === "360" ? (
                      isLaunching ? (
                        <div className="text-center space-y-4">
                          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                          <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">Syncing Spatial Archive...</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-b from-primary/20 to-black">
                          <Compass className="w-20 h-20 text-primary mb-8 animate-pulse" />
                          <h3 className="text-3xl font-serif font-bold mb-4">360° Vision Active</h3>
                          <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                            The spatial reconstruction of <span className="text-primary font-bold">{monument.name}</span> is ready for exploration.
                          </p>
                          <Button size="lg" className="rounded-xl bg-primary text-black font-black uppercase tracking-widest px-8">
                             Enter the Realm <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )
                    ) : (
                      <div className="p-12 w-full text-center space-y-8">
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto relative">
                           <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                           <Music className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif font-bold mb-2">Heritage Soundscape</h3>
                          <p className="text-muted-foreground text-sm">Chanted Chronicles of the {monument.dynasty}</p>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: "45%" }}
                             transition={{ duration: 10, repeat: Infinity }}
                             className="h-full bg-primary"
                           />
                        </div>
                        <div className="flex items-center justify-center gap-6">
                           <Button variant="ghost" className="text-muted-foreground">Previous</Button>
                           <Button className="w-16 h-16 rounded-full bg-primary text-black">
                              <Pause className="w-8 h-8" />
                           </Button>
                           <Button variant="ghost" className="text-muted-foreground">Next</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Timeline */}
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <h3 className="text-2xl font-serif font-bold mb-8 text-foreground">Historical Timeline</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {monument.timeline?.map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] text-left md:group-odd:text-right p-4 bg-background rounded-lg border border-border">
                      <div className="font-bold text-primary mb-1">{item.year}</div>
                      <div className="text-sm text-foreground">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Did you know */}
            <div className="bg-accent/10 border border-accent/20 p-8 rounded-3xl">
              <h3 className="text-2xl font-serif font-bold mb-6 text-foreground flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-accent" />
                Did You Know?
              </h3>
              <ul className="space-y-4">
                {monument.funFacts?.map((fact, i) => (
                  <li key={i} className="flex items-start">
                    <div className="min-w-2 mt-2 mr-3 h-2 rounded-full bg-accent" />
                    <span className="text-muted-foreground">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
