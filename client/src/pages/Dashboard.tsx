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
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                 className="bg-primary/10 p-2 rounded-xl border border-primary/20"
               >
                 <Sparkles className="w-5 h-5 text-primary" />
               </motion.div>
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80 animate-pulse">Imperial Archive Portal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tight mb-4">
              Welcome, <span className="text-gradient-gold animate-text-gradient italic font-medium">{user.username}</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-muted-foreground text-lg max-w-xl font-medium italic leading-relaxed"
            >
              Curated access to the architectural spirit of Bharat.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }} 
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-6 premium-glass p-6 rounded-[2rem] border-white/5 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(253,185,49,0.3)] relative z-10"
            >
               <ShieldAlert className="w-8 h-8 text-black" />
            </motion.div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em] mb-1.5">Authorization</p>
              <div className="flex items-center gap-3">
                <span className="text-xl font-serif font-bold text-foreground">{user.role === 'admin' ? 'Imperial Curator' : 'Cultural Voyager'}</span>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" 
                />
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
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ 
              delay: i * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="premium-glass p-8 group border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2.5rem] relative overflow-hidden gold-glow-border"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className={`p-4 rounded-2xl ${stat.color} border shadow-inner transition-all duration-500`}
              >
                <stat.icon className="w-6 h-6" />
              </motion.div>
              <div className="flex flex-col items-end">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </motion.div>
                <span className="text-[10px] font-bold text-green-500 mt-1 uppercase tracking-[0.2em]">+12.4%</span>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-2.5 opacity-60">{stat.title}</p>
              <h3 className="text-5xl font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-500">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Style Distribution */}
      <Card className="premium-glass lg:col-span-8 p-1 border-white/5 rounded-[3rem] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <CardHeader className="p-12 relative z-10">
           <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
             <div>
               <CardTitle className="font-serif text-4xl mb-3 tracking-tight">Census of Splendor</CardTitle>
               <p className="text-muted-foreground text-base font-medium opacity-60 max-w-md">Real-time architectural heritage distribution across the imperial archive.</p>
             </div>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 backdrop-blur-md"
             >
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Live Archive</span>
             </motion.div>
           </div>
        </CardHeader>
        <CardContent className="h-[450px] p-12 pt-0 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="hsla(var(--border),0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="hsla(var(--muted-foreground),0.3)" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                dy={15}
                className="font-bold uppercase tracking-[0.2em] opacity-50"
              />
              <YAxis 
                stroke="hsla(var(--muted-foreground),0.3)" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                dx={-10}
                className="font-bold opacity-50"
              />
              <Tooltip 
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{ 
                  backgroundColor: 'hsla(var(--background),0.8)', 
                  backdropFilter: 'blur(24px)', 
                  borderRadius: '24px', 
                  border: '1px solid hsla(var(--white),0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  padding: '20px'
                }}
                itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                labelStyle={{ color: 'white', marginBottom: '8px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', opacity: 0.5 }}
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -15 }}
                  transition={{ 
                    delay: idx * 0.05,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col p-6 rounded-[2.5rem] premium-glass border-white/5 group hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(253,185,49,0.15)] transition-all duration-700 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-[4/5] rounded-[1.8rem] overflow-hidden mb-7 shadow-2xl relative z-10">
                    <motion.img 
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      src={resolveImageUrl(m.image)} 
                      alt={m.name} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                    
                    <div className="absolute bottom-5 left-5 right-5">
                       <motion.div
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         className="flex items-center gap-2 mb-1"
                       >
                         <Map className="w-3.5 h-3.5 text-primary" />
                         <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{m.location}</span>
                       </motion.div>
                    </div>
                  </div>
                  
                  <div className="flex-grow mb-7 relative z-10">
                    <h4 className="font-serif text-2xl font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-500">{m.name}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-[0.3em] opacity-40">{m.style} Architecture</p>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <AddMonumentDialog initialData={m}>
                      <Button variant="secondary" className="flex-grow rounded-2xl h-12 gap-2 font-bold uppercase tracking-widest text-[10px] bg-white/5 border-white/5 hover:bg-primary hover:text-black transition-all duration-500 shadow-xl">
                        <Edit2 className="w-4 h-4" /> Edit Profile
                      </Button>
                    </AddMonumentDialog>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all border border-white/5 bg-white/[0.02]"
                        onClick={() => handleDelete(m.id, m.name)}
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </motion.div>
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
      <Card className="premium-glass lg:col-span-4 p-10 relative overflow-hidden group border-white/5 rounded-[3rem] gold-glow-border">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors animate-float" />
        <CardHeader className="p-0 mb-10 relative z-10">
          <Badge className="w-fit mb-6 rounded-lg bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 font-bold uppercase tracking-[0.3em] text-[9px] animate-pulse">Grand Archivist</Badge>
          <CardTitle className="text-5xl font-serif font-bold tracking-tight">Explorer <br />Rank</CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
          <div className="flex items-baseline gap-3 mb-8">
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl font-bold text-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              4
            </motion.span>
            <span className="text-3xl text-muted-foreground font-bold opacity-20 italic">/ 10</span>
          </div>
          <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-10 flex items-center gap-3 italic">
             <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}><Sparkles className="w-4 h-4" /></motion.span>
             Sacred Cultural Custodian
          </p>
          <div className="w-full bg-white/5 h-8 rounded-full overflow-hidden shadow-inner border border-white/5 p-1.5">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "70%" }}
               transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
               className="bg-gradient-to-r from-primary to-accent h-full rounded-full shadow-[0_0_20px_rgba(253,185,49,0.4)]"
            />
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-[10px] text-muted-foreground font-bold opacity-30 uppercase tracking-[0.2em] italic">Progressing to next cycle...</p>
            <p className="text-[10px] text-primary/80 font-bold uppercase tracking-[0.2em]">300 XP to Transcend</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. History/Saved Tours */}
      <Card className="premium-glass lg:col-span-8 p-12 border-white/5 rounded-[3rem] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <CardHeader className="p-0 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative z-10">
           <div>
             <CardTitle className="text-5xl font-serif font-bold tracking-tight mb-3">Eternal <span className="text-gradient-gold animate-text-gradient italic font-medium">Voyage</span></CardTitle>
             <p className="text-muted-foreground text-lg font-medium opacity-60">Resume your pilgrimage through architectural wonders.</p>
           </div>
           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <Button variant="outline" className="rounded-2xl h-14 px-8 border-primary/20 text-primary font-bold uppercase tracking-[0.3em] text-[10px] gap-3 hover:bg-primary hover:text-black transition-all duration-500 shadow-xl">
               Access Archives <ChevronRight className="w-5 h-5" />
             </Button>
           </motion.div>
        </CardHeader>
        <CardContent className="p-0 relative z-10">
          <div className="grid sm:grid-cols-2 gap-10">
            {(monuments || []).slice(0, 2).map((m, i) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative h-80 rounded-[2.5rem] overflow-hidden group/item cursor-pointer border border-white/5 shadow-2xl transition-all duration-700"
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.5 }}
                  src={resolveImageUrl(m.image)} 
                  alt={m.name} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <Badge className="mb-5 bg-primary/20 backdrop-blur-xl text-primary border border-primary/30 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em]">Stage {i+1}</Badge>
                  <h4 className="text-3xl font-serif font-bold text-white mb-6 tracking-tight leading-tight group-hover/item:text-primary transition-colors duration-500">{m.name}</h4>
                  <div className="flex items-center gap-5">
                    <div className="flex-grow bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: "45%" }}
                         transition={{ duration: 2, delay: 1 }}
                         className="bg-gradient-to-r from-primary to-accent h-full rounded-full" 
                       />
                    </div>
                    <span className="text-[10px] text-white font-bold tracking-[0.2em] uppercase opacity-60">45%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Quick Tips */}
      <div className="lg:col-span-12 mt-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="premium-glass p-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-white/5 rounded-[4rem] flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden group shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
             <motion.div 
               animate={{ 
                 y: [0, -15, 0],
                 rotate: [0, 5, -5, 0]
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 6,
                 ease: "easeInOut"
               }}
               className="bg-primary p-12 rounded-[3rem] shadow-[0_0_50px_rgba(253,185,49,0.3)] shrink-0 border border-white/20 relative z-10"
             >
                <Sparkles className="w-16 h-16 text-black stroke-[2.5]" />
             </motion.div>
             <div className="text-center lg:text-left relative z-10">
                <h3 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter leading-none">Awaken Your <span className="text-gradient-gold animate-text-gradient italic font-medium">Inner Chronicler</span></h3>
                <p className="text-muted-foreground text-xl mb-12 leading-relaxed max-w-4xl font-medium opacity-60 italic">
                  Every journey adds to your <span className="text-foreground underline decoration-primary/30 underline-offset-8">Divine Archivist XP</span>. The ancients await your discovery.
                </p>
                <Link href="/explore">
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                     <Button className="rounded-[1.5rem] h-16 px-12 text-sm font-bold uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(253,185,49,0.2)] bg-primary text-black hover:bg-white hover:text-black transition-all duration-500">
                       Unveil Sacred Regions
                     </Button>
                   </motion.div>
                </Link>
             </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

