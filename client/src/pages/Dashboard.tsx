import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Sparkles, TrendingUp, History, Map, Users, Building2, MessageSquare, Plus, Edit2, Trash2, ChevronRight } from "lucide-react";
import { useMonuments, useDeleteMonument } from "@/hooks/useMonuments";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AddMonumentDialog } from "@/components/AddMonumentDialog";
import { resolveImageUrl } from "@/lib/queryClient";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-screen text-center flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }}>
          <ShieldAlert className="w-16 h-16 text-primary/40 mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Secure Access Only</h1>
          <p className="text-muted-foreground mb-10 text-base max-w-md mx-auto opacity-80">Please sign in to unlock your personalized heritage journey and tour archives.</p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button className="rounded-xl px-8 h-12 text-base shadow-lg shadow-primary/10" size="lg">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="rounded-xl px-8 h-12 text-base border-primary/20 hover:bg-primary/5" size="lg">Register</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.role === "admin" || user.role === "enthusiast";

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 mesh-gradient overflow-hidden noise-overlay">
      <div className="container mx-auto px-6 relative">
        {/* Ambient background decoration */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-gold opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10 animate-float opacity-20" />

        {/* Classical Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 px-4">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                 <Sparkles className="w-5 h-5 text-primary" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80">Imperial Archive Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight mb-4">
              Welcome, <span className="text-primary italic font-medium">{user.username}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl font-medium opacity-60 italic leading-relaxed">
              Curated access to the architectural spirit of Bharat.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 glass-panel p-5 border-primary/10 shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/80 to-accent flex items-center justify-center border border-white/10 shadow-lg">
               <ShieldAlert className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-primary/60 uppercase tracking-[0.2em] mb-1">Authorization</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-serif font-bold text-foreground">{user.role === 'admin' ? 'Imperial Curator' : 'Cultural Voyager'}</span>
                <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
            </div>
          </motion.div>
        </header>

        <main className="relative z-10">
           {isAdmin ? <AdminView /> : <EnthusiastView />}
        </main>
      </div>
    </div>
  );
}

function AdminView() {
  const { data: monuments, isLoading, error } = useMonuments();
  const { mutateAsync: deleteMonument } = useDeleteMonument();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading your Imperial Archive...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 text-destructive/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Failed to load archives</h2>
          <p className="text-muted-foreground mb-6">{error instanceof Error ? error.message : "An error occurred while fetching monuments"}</p>
          <Button onClick={() => window.location.reload()} className="rounded-xl">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMonument(id);
        toast({ title: "Archived Successfully", description: `${name} has been moved to history.` });
      } catch (err: any) {
        toast({ title: "Action failed", description: err.message, variant: "destructive" });
      }
    }
  };

  const statCards = [
    { title: "Imperial Citizens", value: "12.4K", icon: Users, color: "bg-blue-500/10 text-blue-500 border-blue-500/10" },
    { title: "Divine Anchors", value: monuments?.length || 84, icon: Building2, color: "bg-primary/10 text-primary border-primary/10" },
    { title: "Visions Unfolded", value: "1.2K", icon: Map, color: "bg-green-500/10 text-green-500 border-green-500/10" },
    { title: "Ancient Voices", value: "5.4K", icon: MessageSquare, color: "bg-purple-500/10 text-purple-500 border-purple-500/10" },
  ];

  const chartData = (monuments || []).reduce((acc: any[], current) => {
    const style = current.style || "Other";
    const existing = acc.find(a => a.name === style);
    if (existing) existing.value += 1;
    else acc.push({ name: style, value: 1 });
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-max">
      
      {/* 1. Stat Grid */}
      <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-8 group border-primary/5 hover:border-primary/20 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} border shadow-sm group-hover:scale-105 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-end opacity-60">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-[9px] font-bold text-green-500 mt-1 uppercase tracking-widest">+12%</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.title}</p>
            <h3 className="text-4xl font-serif font-bold text-foreground transition-colors">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* 2. Style Distribution */}
      <Card className="glass-panel lg:col-span-8 p-1 border-primary/5">
        <CardHeader className="p-10">
           <div className="flex justify-between items-start">
             <div>
               <CardTitle className="font-serif text-3xl mb-2 tracking-tight">Census of Splendor</CardTitle>
               <p className="text-muted-foreground text-sm font-medium opacity-60">Architectural heritage distribution overview.</p>
             </div>
             <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Live Data</span>
             </div>
           </div>
        </CardHeader>
        <CardContent className="h-[400px] p-10 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="hsla(var(--border),0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="hsla(var(--muted-foreground),0.4)" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                dy={10}
                className="font-bold uppercase tracking-widest opacity-60"
              />
              <YAxis 
                stroke="hsla(var(--muted-foreground),0.4)" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                className="font-bold opacity-60"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsla(var(--card),0.95)', 
                  backdropFilter: 'blur(16px)', 
                  borderRadius: '16px', 
                  border: '1px solid hsla(var(--primary),0.1)',
                  padding: '12px'
                }}
                itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold', fontSize: '12px' }}
                labelStyle={{ color: 'white', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 3. Recent Activity */}
      <Card className="glass-panel lg:col-span-4 p-1 border-primary/5">
        <CardHeader className="p-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
               <History className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-serif text-2xl">Chronicle</CardTitle>
              <p className="text-[9px] font-bold text-primary/60 uppercase tracking-[0.2em] mt-1">Recent Insights</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-10 pt-0">
          <div className="space-y-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-5 relative group/item">
                {i < 4 && <div className="absolute left-[8px] top-6 bottom-[-34px] w-[2px] bg-primary/20" />}
                <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[8px] font-bold border-2 ${i % 2 === 0 ? 'bg-primary/20 text-primary border-primary/30' : 'bg-accent/20 text-accent border-accent/30'}`}>
                  {i}
                </div>
                <div>
                  <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                    <span className="font-bold text-foreground">Sage_Voyager_{122 + i}</span> unveiled secrets of <span className="text-primary italic">Ancient Temple Ruins</span>.
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground mt-1 opacity-50 uppercase tracking-widest leading-none">
                    {i * 12} mins ago
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-10 rounded-xl h-12 border border-white/5 hover:bg-white/5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all">
            Access Sacred Logs
          </Button>
        </CardContent>
      </Card>

      {/* 4. Monument Management */}
      <Card className="glass-panel lg:col-span-12 p-1 border-primary/5">
        <CardHeader className="p-12 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-primary/5">
          <div className="text-center lg:text-left">
            <CardTitle className="font-serif text-4xl mb-2">Imperial Vault</CardTitle>
            <p className="text-muted-foreground text-sm font-medium opacity-60">Definitive index of India&apos;s architectural legacy.</p>
          </div>
          <AddMonumentDialog>
            <Button className="rounded-xl h-12 px-8 text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/10 bg-primary text-black hover:bg-white transition-all">
               <Plus className="w-5 h-5 mr-3 stroke-[3]" /> New Archive
            </Button>
          </AddMonumentDialog>
        </CardHeader>
        <CardContent className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {(monuments || []).map((m, idx) => (
                <motion.div 
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  viewport={{ once: true }}
                  className="flex flex-col p-6 rounded-3xl bg-card/40 border border-white/5 group hover:border-primary/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-sm">
                    <img 
                      src={resolveImageUrl(m.image)} 
                      alt={m.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  </div>
                  
                  <div className="flex-grow mb-6">
                    <div className="flex items-center gap-2 mb-2 opacity-60">
                       <Map className="w-3 h-3 text-primary" />
                       <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{m.location}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">{m.name}</h4>
                  </div>

                  <div className="flex gap-3">
                    <AddMonumentDialog initialData={m}>
                      <Button variant="secondary" className="flex-grow rounded-xl h-10 gap-2 font-bold uppercase tracking-widest text-[9px] hover:bg-primary hover:text-black shadow-sm">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </Button>
                    </AddMonumentDialog>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all border border-white/5"
                      onClick={() => handleDelete(m.id, m.name)}
                    >
                      <Trash2 className="w-4 h-4" />
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
  const { data: monuments, isLoading, error } = useMonuments();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Discovering architectural wonders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 text-destructive/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Unable to load monuments</h2>
          <p className="text-muted-foreground mb-6">{error instanceof Error ? error.message : "An error occurred"}</p>
          <Button onClick={() => window.location.reload()} className="rounded-xl">
            Retry
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
      
      {/* 1. Level Bento */}
      <Card className="glass-panel lg:col-span-4 p-10 relative overflow-hidden group border-primary/5">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors animate-float" />
        <CardHeader className="p-0 mb-10">
          <Badge className="w-fit mb-6 rounded-lg bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 font-bold uppercase tracking-[0.2em] text-[9px]">Grand Archivist</Badge>
          <CardTitle className="text-4xl font-serif font-bold tracking-tight">Explorer Rank</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-7xl font-bold text-foreground drop-shadow-sm">4</span>
            <span className="text-2xl text-muted-foreground font-bold opacity-30 italic">/ 10</span>
          </div>
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-[9px] mb-8 flex items-center gap-3 italic">
             <Sparkles className="w-3.5 h-3.5" /> Sacred Cultural Custodian
          </p>
          <div className="w-full bg-white/5 h-6 rounded-full overflow-hidden shadow-inner border border-white/5 p-1">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "70%" }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="bg-primary h-full rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-[9px] text-muted-foreground font-bold opacity-40 uppercase tracking-widest italic">Progressing to next cycle...</p>
            <p className="text-[9px] text-primary/80 font-bold uppercase tracking-widest">300 XP to Transcend</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. History/Saved Tours */}
      <Card className="glass-panel lg:col-span-8 p-10 border-primary/5">
        <CardHeader className="p-0 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
           <div>
             <CardTitle className="text-4xl font-serif font-bold tracking-tight mb-2">Eternal <span className="text-primary/70 italic font-medium">Voyage</span></CardTitle>
             <p className="text-muted-foreground text-base font-medium opacity-60">Resume your pilgrimage through architectural wonders.</p>
           </div>
           <Button variant="outline" className="rounded-xl h-12 px-6 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] gap-2 hover:bg-primary hover:text-black transition-all">
             Archives <ChevronRight className="w-4 h-4" />
           </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid sm:grid-cols-2 gap-8">
            {(monuments || []).slice(0, 2).map((m, i) => (
              <motion.div 
                key={m.id}
                whileHover={{ y: -8 }}
                className="relative h-64 rounded-3xl overflow-hidden group/item cursor-pointer border border-white/5 shadow-sm"
              >
                <img src={resolveImageUrl(m.image)} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <Badge className="mb-4 bg-primary/20 backdrop-blur-md text-primary border border-primary/30 px-3 py-1 text-[8px] font-bold uppercase tracking-widest">Stage {i+1}</Badge>
                  <h4 className="text-2xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">{m.name}</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow bg-white/10 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: "45%" }}
                         transition={{ duration: 1.5, delay: 0.5 }}
                         className="bg-primary h-full rounded-full" 
                       />
                    </div>
                    <span className="text-[8px] text-white font-bold tracking-widest uppercase opacity-60">45%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Quick Tips */}
      <div className="lg:col-span-12 mt-4">
        <Card className="glass-panel p-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/10 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group">
           <div className="bg-primary p-8 rounded-3xl shadow-lg animate-float shrink-0 border border-white/10 group-hover:rotate-6 transition-transform">
              <Sparkles className="w-12 h-12 text-black stroke-[2]" />
           </div>
           <div className="text-center lg:text-left">
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tighter">Awaken Your <span className="text-primary italic font-medium">Inner Chronicler</span></h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-4xl font-medium opacity-60 italic">
                Every journey adds to your <span className="text-foreground underline decoration-primary/30 underline-offset-4">Divine Archivist XP</span>.
              </p>
              <Link href="/explore">
                 <Button className="rounded-xl h-14 px-10 text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/10 bg-primary text-black hover:bg-white transition-all">
                   Unveil Regions
                 </Button>
              </Link>
           </div>
        </Card>
      </div>
    </div>
  );
}

