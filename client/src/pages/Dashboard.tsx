import { useState } from "react";
import { Link } from "wouter";
import { ADMIN_STATS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Map, MessageSquare, Trash2, Edit2, ShieldAlert, Sparkles, Plus, TrendingUp, History, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useMonuments, useDeleteMonument } from "@/hooks/useMonuments";
import { AddMonumentDialog } from "@/components/AddMonumentDialog";
import { resolveImageUrl } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-screen text-center flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <ShieldAlert className="w-20 h-20 text-primary/40 mx-auto mb-6" />
          <h1 className="text-5xl font-serif font-bold text-foreground mb-4">Secure Access Only</h1>
          <p className="text-muted-foreground mb-10 text-lg max-w-md mx-auto">Please sign in to unlock your personalized heritage journey and tour archives.</p>
          <div className="flex justify-center gap-6">
            <Link href="/login">
              <Button className="rounded-2xl px-10 h-14 text-lg shadow-xl shadow-primary/20" size="lg">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="rounded-2xl px-10 h-14 text-lg border-primary/20 hover:bg-primary/5 shadow-xl shadow-black/5" size="lg">Register</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.role === "admin" || user.role === "enthusiast";

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 mesh-gradient overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Ambient background decoration */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] -z-10 animate-float" />

        {/* Modern Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 px-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-primary/20 p-2.5 rounded-2xl backdrop-blur-md border border-primary/20 animate-pulse-slow">
                 <Sparkles className="w-5 h-5 text-primary" />
               </div>
               <span className="text-xs font-black uppercase tracking-[0.3em] text-primary/80">Heritage Portal</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground tracking-tighter leading-[0.9] mb-4">
              Mornin', <span className="text-primary italic font-light drop-shadow-sm">{user.username}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl font-medium opacity-80">Welcome to your curated command center for Indian Heritage & Culture.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-6 premium-card p-4 pr-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10">
               <ShieldAlert className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Authorization</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">{user.role === 'admin' ? 'Curator Admin' : 'Cultural Explorer'}</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </header>

        {isAdmin ? <AdminView /> : <EnthusiastView />}
      </div>
    </div>
  );
}

function AdminView() {
  const { data: monuments, isLoading } = useMonuments();
  const { mutateAsync: deleteMonument } = useDeleteMonument();
  const { toast } = useToast();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMonument(id);
        toast({ title: "Deleted Successfully", description: `${name} has been removed.` });
      } catch (err: any) {
        toast({ title: "Action failed", description: err.message, variant: "destructive" });
      }
    }
  };

  const statCards = [
    { title: "Archived Users", value: "12.4K", icon: Users, color: "from-blue-500/20 to-blue-600/5", textColor: "text-blue-400" },
    { title: "Heritage Hotspots", value: monuments?.length || 84, icon: Building2, color: "from-primary/20 to-primary/5", textColor: "text-primary" },
    { title: "Virtual Journeys", value: "1.2K", icon: Map, color: "from-green-500/20 to-green-600/5", textColor: "text-green-400" },
    { title: "Active Dialogues", value: "5.4K", icon: MessageSquare, color: "from-purple-500/20 to-purple-600/5", textColor: "text-purple-400" },
  ];

  const chartData = (monuments || []).reduce((acc: any[], current) => {
    const style = current.style || "Other";
    const existing = acc.find(a => a.name === style);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: style, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#3B82F6', '#10B981', '#8B5CF6'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-max">
      
      {/* 1. Stat Grid (Top Row) */}
      <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bento-card p-8 group hover:border-primary/60 transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-[1.5rem] bg-gradient-to-br ${stat.color} border border-white/5`}>
                <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
              </div>
              <div className="flex flex-col items-end">
                <TrendingUp className="w-5 h-5 text-green-500 animate-pulse-slow" />
                <span className="text-[10px] font-bold text-green-500 mt-1">+12%</span>
              </div>
            </div>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.title}</p>
            <h3 className="text-5xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* 2. Style Distribution (Large Bento) */}
      <Card className="bento-card lg:col-span-8 p-1">
        <CardHeader className="p-10">
           <div className="flex justify-between items-start">
             <div>
               <CardTitle className="font-serif text-4xl mb-2">Architectural Census</CardTitle>
               <p className="text-muted-foreground font-medium">Real-time distribution of indexed heritage styles.</p>
             </div>
             <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Analysis</span>
             </div>
           </div>
        </CardHeader>
        <CardContent className="h-[450px] p-10 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="hsla(var(--border),0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="hsla(var(--muted-foreground),0.3)" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                dy={10}
                className="font-bold uppercase tracking-tighter"
              />
              <YAxis 
                stroke="hsla(var(--muted-foreground),0.3)" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                className="font-bold"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsla(var(--card),0.8)', 
                  backdropFilter: 'blur(20px)', 
                  borderRadius: '24px', 
                  border: '1px solid hsla(var(--border),0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 3. Recent Activity (Sidebar Bento) */}
      <Card className="bento-card lg:col-span-4 p-1">
        <CardHeader className="p-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 animate-float">
               <History className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="font-serif text-3xl">Portal Feed</CardTitle>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">Status: Active</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          <div className="space-y-10">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex gap-6 relative group">
                {i < 5 && <div className="absolute left-[13px] top-8 bottom-[-32px] w-[2px] bg-gradient-to-b from-primary/30 to-transparent" />}
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black border-2 ${i % 2 === 0 ? 'bg-primary/10 text-primary border-primary/30' : 'bg-accent/10 text-accent border-accent/30'}`}>
                  {i}
                </div>
                <div>
                  <p className="text-sm text-foreground/90 leading-relaxed"><span className="font-black text-foreground">Siri_User_{122 + i}</span> and 4 others exploring <span className="text-primary font-bold italic">Rajasthani Marvels</span>.</p>
                  <p className="text-[10px] font-bold text-muted-foreground mt-2 opacity-60 flex items-center gap-2 uppercase tracking-tighter">
                    <History className="w-2.5 h-2.5" /> Synchronized {i * 12} mins ago
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-12 rounded-2xl h-14 border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-xs">Access Detailed Logs</Button>
        </CardContent>
      </Card>

      {/* 4. Monument Management (Bottom Row) */}
      <Card className="bento-card lg:col-span-12 p-1">
        <CardHeader className="p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <CardTitle className="font-serif text-5xl mb-3 leading-none">Monument Inventory</CardTitle>
            <p className="text-muted-foreground text-lg font-medium">Manage and index the architectural treasures of the subcontinent.</p>
          </div>
          <AddMonumentDialog>
            <Button size="lg" className="rounded-[2rem] h-20 px-12 text-lg font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(var(--primary),0.3)] bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
              <Plus className="w-7 h-7 mr-4 stroke-[3]" /> Index New Site
            </Button>
          </AddMonumentDialog>
        </CardHeader>
        <CardContent className="p-12 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {(monuments || []).map((m, idx) => (
                <motion.div 
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                  className="flex flex-col p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group hover:bg-white/[0.06] hover:border-primary/30 transition-all shadow-xl"
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-2xl">
                    <img 
                      src={resolveImageUrl(m.image)} 
                      alt={m.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="flex-grow mb-6">
                    <h4 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{m.name}</h4>
                    <p className="text-xs font-bold text-muted-foreground flex items-center gap-2 opacity-80 uppercase tracking-tighter">
                       <Map className="w-3.5 h-3.5 text-primary" /> {m.location}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <AddMonumentDialog initialData={m}>
                      <Button variant="secondary" className="flex-grow rounded-2xl h-12 gap-2 font-bold transition-all hover:bg-primary hover:text-primary-foreground border-none">
                        <Edit2 className="w-4 h-4" /> Edit
                      </Button>
                    </AddMonumentDialog>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl"
                      onClick={() => handleDelete(m.id, m.name)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

function EnthusiastView() {
  const { data: monuments } = useMonuments();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
      
      {/* 1. Level Bento */}
      <Card className="bento-card lg:col-span-4 p-12 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors" />
        <CardHeader className="p-0 mb-10">
          <Badge className="w-fit mb-6 rounded-xl bg-primary/15 text-primary border-primary/20 px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">Active Archivist</Badge>
          <CardTitle className="text-5xl font-serif font-bold leading-none">Explorer Rank</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-9xl font-bold text-foreground tracking-tighter drop-shadow-2xl">4</span>
            <span className="text-2xl text-muted-foreground font-medium opacity-50">/ 10</span>
          </div>
          <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-10">Expert Cultural Custodian</p>
          <div className="w-full bg-white/[0.03] h-6 rounded-3xl overflow-hidden shadow-inner border border-white/5 p-1">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "70%" }}
               transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
               className="bg-gradient-to-r from-primary via-accent to-primary h-full rounded-2xl shadow-[0_0_30px_rgba(var(--primary),0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:50px_50px] animate-[shimmer_2s_infinite_linear]" />
            </motion.div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-[10px] text-muted-foreground font-black opacity-40 uppercase tracking-widest">Next Reward: Ancient Script Access</p>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest">300 XP</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. History/Saved Tours Bento */}
      <Card className="bento-card lg:col-span-8 p-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-primary/5 -z-10" />
        <CardHeader className="p-0 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
           <div>
             <CardTitle className="text-5xl font-serif font-bold leading-none mb-3">Resume Journey</CardTitle>
             <p className="text-muted-foreground text-lg font-medium">Continue your exploration of India's architectural marvels.</p>
           </div>
           <Button variant="ghost" className="text-primary font-bold uppercase tracking-widest text-xs gap-2 group/btn">
             View Archives <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
           </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid sm:grid-cols-2 gap-8">
            {(monuments || []).slice(0, 2).map((m, i) => (
              <motion.div 
                key={m.id}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative h-64 rounded-[3rem] overflow-hidden group/item cursor-pointer shadow-2xl border border-white/10"
              >
                <img src={resolveImageUrl(m.image)} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <Badge className="mb-4 bg-white/10 backdrop-blur-xl text-white border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Level {i+1} Progress</Badge>
                  <h4 className="text-3xl font-serif font-bold text-white mb-3 tracking-tight">{m.name}</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow bg-white/10 h-2 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: "45%" }}
                         transition={{ duration: 1.5, delay: 0.5 }}
                         className="bg-primary h-full shadow-[0_0_15px_rgba(var(--primary),1)]" 
                       />
                    </div>
                    <span className="text-xs text-white/80 font-black tracking-widest">45%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Quick Tips Bento */}
      <div className="lg:col-span-12 mt-4">
        <Card className="premium-card p-14 bg-gradient-to-br from-primary/10 via-background to-accent/5 border-primary/20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
           <div className="bg-primary p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(var(--primary),0.4)] animate-float shrink-0 relative z-10">
              <Sparkles className="w-16 h-16 text-white" />
           </div>
           <div className="relative z-10 text-center lg:text-left">
              <h3 className="text-5xl font-serif font-bold mb-6 leading-tight">Catalyze Your <span className="text-primary italic">Heritage Journey</span></h3>
              <p className="text-muted-foreground text-xl mb-10 leading-relaxed max-w-3xl">
                Unlock deeper historical insights by visiting new regions. Each state you explore adds to your <span className="text-foreground font-bold italic underline decoration-primary/30 underline-offset-4">Cultural Archivist XP</span> and allows you to curate personalized heritage boards.
              </p>
              <Link href="/explore">
                 <Button size="lg" className="rounded-[2rem] h-20 px-12 text-lg font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(var(--primary),0.3)] bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                   Explore Regional Archives
                 </Button>
              </Link>
           </div>
        </Card>
      </div>

    </div>
  );
}

