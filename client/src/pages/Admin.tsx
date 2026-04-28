import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  Users, 
  Landmark, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck,
  LayoutDashboard,
  Calendar,
  Settings,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Database
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const COLORS = ['#FFD700', '#C0C0C0', '#CD7F32', '#4169E1', '#8B0000', '#006400'];

export default function Admin() {
  const [, setLocation] = useLocation();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => fetch("/api/analytics/dashboard").then(res => res.json())
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 bg-background min-h-screen pt-24">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Skeleton className="h-[400px] rounded-3xl" />
           <Skeleton className="h-[400px] rounded-3xl" />
        </div>
      </div>
    );
  }

  const dynastyData = Object.entries(stats?.monumentsByDynasty || {}).map(([name, value]) => ({ name, value }));
  const styleData = Object.entries(stats?.monumentsByStyle || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 lg:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Imperial Command</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            Heritage Analytics
          </h1>
        </div>
        <div className="flex items-center gap-4">
           <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-xl flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             Live Archive Active
           </Badge>
           <button 
             onClick={() => setLocation("/")}
             className="px-6 py-3 rounded-xl bg-card border border-border font-bold text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
           >
             Exit Dashboard <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total Explorers" 
          value={stats?.totalUsers || 0} 
          icon={<Users className="w-6 h-6" />} 
          trend="+12% from last moon"
        />
        <StatCard 
          title="Sacred Monuments" 
          value={stats?.totalMonuments || 0} 
          icon={<Database className="w-6 h-6" />} 
          trend="Static Archive"
        />
        <StatCard 
          title="Explorer Chronicles" 
          value={stats?.totalReviews || 0} 
          icon={<MessageSquare className="w-6 h-6" />} 
          trend="+5 today"
        />
        <StatCard 
          title="Engagement Rate" 
          value="84%" 
          icon={<TrendingUp className="w-6 h-6" />} 
          trend="Legendary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Dynasty Distribution */}
        <Card className="premium-card p-8 rounded-3xl border-white/10 bg-card/50 backdrop-blur-xl">
          <CardHeader className="p-0 mb-8">
             <CardTitle className="text-2xl font-serif font-bold flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-primary" />
               Dynasty Distribution
             </CardTitle>
          </CardHeader>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynastyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#FFD700' }}
                />
                <Bar dataKey="value" fill="#FFD700" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Style Analytics */}
        <Card className="premium-card p-8 rounded-3xl border-white/10 bg-card/50 backdrop-blur-xl">
          <CardHeader className="p-0 mb-8">
             <CardTitle className="text-2xl font-serif font-bold flex items-center gap-3">
               <LayoutDashboard className="w-6 h-6 text-primary" />
               Architectural Styles
             </CardTitle>
          </CardHeader>
          <div className="h-[350px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={styleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {styleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-lg">
             <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold font-serif mb-1">Secure Imperial Access</h4>
            <p className="text-muted-foreground text-sm">You are currently viewing the administrative layer of the Royal Heritage Archive.</p>
          </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="rounded-xl font-bold">System Logs</Button>
           <Button className="rounded-xl font-black bg-primary text-black">Database Sync</Button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden group"
    >
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/10 shadow-inner">
          {icon}
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-serif font-bold text-foreground">{value}</h3>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5">
        <span className="text-[10px] font-bold text-primary/70 uppercase tracking-tighter">{trend}</span>
      </div>
    </motion.div>
  );
}
