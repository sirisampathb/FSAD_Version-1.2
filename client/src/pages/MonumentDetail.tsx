import { useParams } from "wouter";
import { MONUMENTS } from "@/lib/data";
import { motion } from "framer-motion";
import { MapPin, Calendar, Compass, Share2, BookmarkPlus, PlayCircle, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MonumentDetail() {
  const { id } = useParams();
  const monument = MONUMENTS.find(m => m.id === id) || MONUMENTS[0];

  if (!monument) return <div>Not Found</div>;

  return (
    <div className="w-full pb-20 pt-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${monument.image})` }}
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
          <Button variant="outline" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
          <Button variant="default" className="gap-2"><BookmarkPlus className="w-4 h-4" /> Save to Timeline</Button>
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
                <div className="group relative rounded-2xl overflow-hidden bg-card border border-border aspect-video flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                  <div className="text-center z-10">
                    <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
                    <span className="font-semibold text-foreground">Launch 360° Tour</span>
                  </div>
                </div>
                <div className="group relative rounded-2xl overflow-hidden bg-card border border-border aspect-video flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="text-center z-10">
                    <PlayCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                    <span className="font-semibold text-foreground">Play Audio Guide</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Timeline */}
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <h3 className="text-2xl font-serif font-bold mb-8 text-foreground">Historical Timeline</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {monument.timeline.map((item, i) => (
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
                {monument.funFacts.map((fact, i) => (
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
