import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Utensils, Info, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StateExplorer() {
  const [selectedState, setSelectedState] = useState(STATE_DATA[0]);

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
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">Select State</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {STATE_DATA.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setSelectedState(state)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 shrink-0 lg:w-full group ${
                    selectedState.id === state.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                      : "bg-card hover:bg-muted border border-border"
                  }`}
                >
                  <span className="font-medium">{state.name}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedState.id === state.id ? "rotate-90 lg:rotate-0" : "opacity-0 group-hover:opacity-100"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedState.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Monuments Card */}
                <Card className="glass-card overflow-hidden border-primary/10 group hover:border-primary/30 transition-colors">
                  <div className={`h-2 bg-gradient-to-r ${selectedState.color}`} />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-primary/10 p-2.5 rounded-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold">Famous Monuments</h2>
                    </div>
                    <ul className="space-y-4">
                      {selectedState.monuments.map((m, i) => (
                        <motion.li 
                          key={m}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all cursor-default"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-foreground font-medium">{m}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Cuisine Card */}
                <Card className="glass-card overflow-hidden border-accent/10 group hover:border-accent/30 transition-colors">
                  <div className={`h-2 bg-gradient-to-r ${selectedState.color} reverse`} />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-accent/10 p-2.5 rounded-lg">
                        <Utensils className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold">Iconic Cuisines</h2>
                    </div>
                    <ul className="space-y-4">
                      {selectedState.foods.map((food, i) => (
                        <motion.li 
                          key={food}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/5 border border-transparent hover:border-accent/10 transition-all cursor-default"
                        >
                          <span className="text-foreground font-medium">{food}</span>
                          <Sparkles className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Travel Tip Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-primary/5 border-primary/20 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Info className="w-24 h-24" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="shrink-0">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                      <Sparkles className="w-10 h-10" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Did you know?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedState.name} is one of India's most visited regions. From the {selectedState.monuments[0]} to the mouth-watering {selectedState.foods[0]}, there is so much to see and taste.
                    </p>
                    <Button variant="link" className="px-0 mt-4 text-primary font-bold">
                      Plan a trip to {selectedState.name} <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
