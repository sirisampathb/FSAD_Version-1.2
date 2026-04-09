import { useState } from "react";
import { Link } from "wouter";
import { ADMIN_STATS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Map, MessageSquare, Trash2, Edit2, ShieldAlert, Sparkles, Plus, TrendingUp, History } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background pt-28 pb-20 mesh-gradient">
      <div className="container mx-auto px-4">
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
               <div className="bg-primary/20 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-primary" /></div>
               <span className="text-sm font-bold uppercase tracking-widest text-primary/80">User Dashboard</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-none">
              Welcome back, <span className="text-primary italic">{user.username}</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-card/40 backdrop-blur-md p-2 rounded-2xl border border-white/10"
          >
            <div className="px-4 py-2">
              <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Current Role</p>
              <p className="text-sm font-bold text-foreground">{user.role === 'admin' ? 'Administrator' : 'Cultural Enthusiast'}</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
              <ShieldAlert className="w-5 h-5" />
            </Button>
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
    { title: "Total Users", value: "12.4K", icon: Users, color: "bg-blue-500/10 text-blue-500" },
    { title: "Heritage Sites", value: monuments?.length || 84, icon: Building2, color: "bg-primary/10 text-primary" },
    { title: "Virtual Tours", value: "1.2K", icon: Map, color: "bg-green-500/10 text-green-500" },
    { title: "Discussions", value: "5.4K", icon: MessageSquare, color: "bg-purple-500/10 text-purple-500" },
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

  const COLORS = ['hsl(var(--primary))', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-max">
      
      {/* 1. Stat Grid (Top Row) */}
      <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            className="bento-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-20`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500 opacity-60" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
            <h3 className="text-4xl font-serif font-bold mt-1 text-foreground">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* 2. Style Distribution (Large Bento) */}
      <Card className="bento-card lg:col-span-8 p-1">
        <CardHeader className="p-8">
           <div className="flex justify-between items-center">
             <CardTitle className="font-serif text-2xl">Architectural Distribution</CardTitle>
             <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs font-bold text-muted-foreground tracking-tighter uppercase">Current Database Analysis</span>
             </div>
           </div>
        </CardHeader>
        <CardContent className="h-[400px] p-8 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--border),0.1)" />
              <XAxis dataKey="name" stroke="hsla(var(--muted-foreground),0.5)" fontSize={12} />
              <YAxis stroke="hsla(var(--muted-foreground),0.5)" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsla(var(--card),0.9)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid hsla(var(--border),0.2)' }}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 3. Recent Activity (Sidebar Bento) */}
      <Card className="bento-card lg:col-span-4 p-1">
        <CardHeader className="p-8">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-primary" />
            <CardTitle className="font-serif text-2xl">Live Feed</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex gap-4 relative">
                {i < 5 && <div className="absolute left-[11px] top-6 bottom-[-20px] w-px bg-border/40" />}
                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${i % 2 === 0 ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                  {i}
                </div>
                <div>
                  <p className="text-sm text-foreground/90"><span className="font-bold text-foreground">Siri_User_{122 + i}</span> exploring Rajasthani Heritage.</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <History className="w-3 h-3" /> {i * 12} mins ago
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-10 rounded-2xl border-white/10 hover:bg-white/5">View Full Analytics</Button>
        </CardContent>
      </Card>

      {/* 4. Monument Management (Bottom Row) */}
      <Card className="bento-card lg:col-span-12 p-1">
        <CardHeader className="p-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-serif text-3xl">Asset Management</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">Total indexed monuments are active and available.</p>
          </div>
          <AddMonumentDialog>
            <Button size="lg" className="rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-3" /> Index New Site
            </Button>
          </AddMonumentDialog>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {(monuments || []).map((m, idx) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                      <img src={resolveImageUrl(m.image)} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-foreground">{m.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 opacity-70">
                         <Map className="w-3 h-3" /> {m.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <AddMonumentDialog initialData={m}>
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary rounded-xl"><Edit2 className="w-4 h-4" /></Button>
                    </AddMonumentDialog>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-muted-foreground hover:text-destructive rounded-xl"
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
  const { data: monuments } = useMonuments();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
      
      {/* 1. Level Bento */}
      <Card className="bento-card lg:col-span-4 p-8 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <CardHeader className="p-0 mb-6">
          <Badge className="w-fit mb-4 rounded-lg bg-primary/20 text-primary border-none">Active Rank</Badge>
          <CardTitle className="text-3xl font-serif font-bold">Explorer Level</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-7xl font-bold text-foreground">4</span>
            <span className="text-xl text-muted-foreground">/ 10</span>
          </div>
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-6">Expert Cultural Archivist</p>
          <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden shadow-inner border border-white/5">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "70%" }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="bg-gradient-to-r from-primary to-accent h-full shadow-[0_0_20px_rgba(255,165,0,0.4)]"
            />
          </div>
          <p className="text-xs text-center mt-3 text-muted-foreground font-bold opacity-60">NEXT REWARD: UNLOCKING ANCIENT SCRIPT ACCESS (300 XP)</p>
        </CardContent>
      </Card>

      {/* 2. History/Saved Tours Bento */}
      <Card className="bento-card lg:col-span-8 p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-primary/5 -z-10" />
        <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
           <CardTitle className="text-3xl font-serif font-bold">Resume Exploration</CardTitle>
           <Button variant="ghost" className="text-primary">View Archives <ChevronRight className="w-4 h-4 ml-2" /></Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid sm:grid-cols-2 gap-6">
            {(monuments || []).slice(0, 2).map((m, i) => (
              <motion.div 
                key={m.id}
                whileHover={{ y: -5 }}
                className="relative h-48 rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/5"
              >
                <img src={resolveImageUrl(m.image)} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <Badge className="mb-2 bg-white/10 backdrop-blur-md text-white border-white/10">Level {i+1} Progress</Badge>
                  <h4 className="text-xl font-bold text-white mb-1">{m.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-white/20 h-1 rounded-full overflow-hidden">
                       <div className="bg-primary h-full w-[45%]" />
                    </div>
                    <span className="text-[10px] text-white/60 font-bold">45%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Quick Tips Bento */}
      <div className="lg:col-span-12">
        <Card className="bento-card p-10 bg-primary/10 border-primary/20 flex flex-col md:flex-row items-center gap-8">
           <div className="bg-primary p-6 rounded-[2rem] shadow-2xl shadow-primary/40 animate-float shrink-0">
              <Sparkles className="w-12 h-12 text-white" />
           </div>
           <div>
              <h3 className="text-3xl font-serif font-bold mb-3">Expand your Journey</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Unlock deeper insights by visiting new regions. Each state you explore adds to your Cultural XP and allows you to curate personalized heritage boards.
              </p>
              <Link href="/explore">
                 <Button size="lg" className="rounded-2xl px-8 shadow-xl shadow-primary/20">Explore Regional Heritage</Button>
              </Link>
           </div>
        </Card>
      </div>

    </div>
  );
}

