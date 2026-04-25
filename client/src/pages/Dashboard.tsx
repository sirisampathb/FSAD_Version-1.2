import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  History, 
  Map, 
  Users, 
  Building2, 
  MessageSquare, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronRight,
  Globe,
  Compass,
  Zap,
  Star
} from "lucide-react";
import { useMonuments, useDeleteMonument } from "@/hooks/useMonuments";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AddMonumentDialog } from "@/components/AddMonumentDialog";
import { resolveImageUrl } from "@/lib/queryClient";
import { useState, useEffect } from "react";

const translations: Record<string, any> = {
  en: {
    greeting: ["Auspicious Morning", "Splendid Afternoon", "Eternal Evening"],
    status: "Verified",
    role: { admin: "Imperial Curator", user: "Cultural Voyager" },
    nodeStatus: "Divine Node Active",
    stats: ["Citizens", "Archives", "Expeditions", "Echoes"],
    vaultTitle: "Imperial Vault",
    vaultSub: "Architectural mastery indexed for eternity.",
    rankTitle: "Heritage Rank",
    rankSub: "Elite Voyager",
    voyageTitle: "Eternal Voyages",
    ctaTitle: "Forge Your Divine Legacy",
    ctaSub: "The chronicles are incomplete without your journey.",
    ctaBtn: "Invoke Expedition"
  },
  hi: {
    greeting: ["शुभ सवेर", "सुखद दोपहर", "अनंत संध्या"],
    status: "सत्यापित",
    role: { admin: "शाही क्यूरेटर", user: "सांस्कृतिक यात्री" },
    nodeStatus: "दिव्य नोड सक्रिय",
    stats: ["नागरिक", "संग्रह", "अभियान", "गूँज"],
    vaultTitle: "शाही तिजोरी",
    vaultSub: "अनंत काल के लिए अनुक्रमित वास्तुकला महारत।",
    rankTitle: "विरासत रैंक",
    rankSub: "अभिजात वर्ग यात्री",
    voyageTitle: "शाश्वत यात्राएं",
    ctaTitle: "अपनी दिव्य विरासत बनाएं",
    ctaSub: "आपकी यात्रा के बिना इतिहास अधूरा है।",
    ctaBtn: "अभियान का आह्वान करें"
  },
  sa: {
    greeting: ["शुभ प्रभातम्", "शुभ मध्याह्नम्", "अनन्त सायंकालः"],
    status: "प्रमाणितम्",
    role: { admin: "राजकीय संग्रहाध्यक्ष", user: "सांस्कृतिक यात्री" },
    nodeStatus: "दिव्य केन्द्रः सक्रियः",
    stats: ["नागरिकाः", "लेखागाराः", "प्रयाणाः", "प्रतिध्वनयः"],
    vaultTitle: "राजकीय कोशः",
    vaultSub: "अनन्तकालाय वास्तुकलाकौशलं सूचितम्।",
    rankTitle: "विरासत श्रेणी",
    rankSub: "श्रेष्ठ यात्री",
    voyageTitle: "शाश्वत यात्राः",
    ctaTitle: "भवतः दिव्यपरम्परां रचयतु",
    ctaSub: "भवतः यात्रया विना इतिहासः अपूर्णः अस्ति।",
    ctaBtn: "अभियानम् आह्वयतु"
  },
  te: {
    greeting: ["శుభోదయం", "శుభ మధ్యాహ్నం", "అనంత సాయంత్రం"],
    status: "ధృవీకరించబడింది",
    role: { admin: "రాజకీయ క్యూరేటర్", user: "సాంస్కృతిక యాత్రికుడు" },
    nodeStatus: "దైవిక నోడ్ సక్రియంగా ఉంది",
    stats: ["పౌరులు", "ఆర్కైవ్స్", "యాత్రలు", "ప్రతిధ్వనులు"],
    vaultTitle: "రాజకీయ ఖజానా",
    vaultSub: "నిరంతరాయంగా ఇండెక్స్ చేయబడిన నిర్మాణ నైపుణ్యం.",
    rankTitle: "వారసత్వ ర్యాంక్",
    rankSub: "ఎలైట్ యాత్రికుడు",
    voyageTitle: "శాశ్వత యాత్రలు",
    ctaTitle: "మీ దైవిక వారసత్వాన్ని సృష్టించండి",
    ctaSub: "మీ ప్రయాణం లేకుండా చరిత్ర అసంపూర్ణం.",
    ctaBtn: "యాత్రను ప్రారంభించండి"
  }
};

export default function Dashboard() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [time, setTime] = useState(new Date());
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return t.greeting[0];
    if (hour < 17) return t.greeting[1];
    return t.greeting[2];
  };

  const changeLang = (l: string) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-screen text-center flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="premium-glass p-12 rounded-[3rem] max-w-lg border-white/10 shadow-2xl"
        >
          <ShieldAlert className="w-20 h-20 text-primary/40 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Secure Access Only</h1>
          <p className="text-muted-foreground mb-10 text-lg opacity-80 italic">The chronicles of Bharat require an authorized voyager. Please identify yourself.</p>
          <div className="flex justify-center gap-6">
            <Link href="/login">
              <Button className="rounded-2xl px-10 h-14 text-base bg-primary text-black hover:bg-white transition-all shadow-2xl shadow-primary/20" size="lg">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="rounded-2xl px-10 h-14 text-base border-white/20 hover:bg-white/5" size="lg">Register</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-32 overflow-hidden relative">
      {/* Mesmerizing Background Blobs */}
      <div className="blob-container">
        <div className="blob w-[600px] h-[600px] bg-primary/20 top-[-10%] left-[-10%] delay-0" />
        <div className="blob w-[500px] h-[500px] bg-accent/20 bottom-[-10%] right-[-10%] delay-2000" />
        <div className="blob w-[400px] h-[400px] bg-blue-500/10 top-[40%] left-[30%] delay-4000" />
      </div>

      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Mesmerizing Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20 px-2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="bg-primary/20 p-3 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(225,29,72,0.2)]"
               >
                 <Sparkles className="w-6 h-6 text-primary" />
               </motion.div>
               <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl">
                 {["en", "hi", "sa", "te"].map((l) => (
                   <button
                     key={l}
                     onClick={() => changeLang(l)}
                     className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                       lang === l ? "bg-primary text-white shadow-xl" : "text-muted-foreground hover:text-foreground"
                     }`}
                   >
                     {l}
                   </button>
                 ))}
               </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground tracking-tighter leading-none mb-6">
              {getGreeting()}, <br />
              <span className="text-gradient-rose animate-text-gradient italic font-medium drop-shadow-2xl">{user.username}</span>
            </h1>
            <div className="flex items-center gap-6 mt-8">
               <div className="premium-glass px-6 py-3 rounded-2xl border-white/10 flex items-center gap-4">
                 <History className="w-5 h-5 text-primary animate-spin-slow" />
                 <span className="text-xl font-serif font-bold tracking-widest text-foreground/80">
                   {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                 </span>
               </div>
               <p className="text-muted-foreground text-sm font-medium italic opacity-60">
                 "The spirit of Bharat breathes in sync with your journey."
               </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex items-center gap-8 premium-glass p-8 rounded-[2.5rem] border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-aurora opacity-20 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-6">
              <motion.div 
                whileHover={{ rotate: 180, scale: 1.1 }}
                className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center border border-white/20 shadow-2xl"
              >
                 <ShieldAlert className="w-10 h-10 text-white stroke-[2.5]" />
              </motion.div>
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 opacity-60">Status: {t.status}</p>
                <h3 className="text-3xl font-serif font-bold text-foreground tracking-tight">{isAdmin ? t.role.admin : t.role.user}</h3>
                <div className="flex items-center gap-2 mt-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                   <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{t.nodeStatus}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        <main>
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

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMonument(id);
        toast({ title: "Archive Updated", description: `${name} has been moved to Eternal History.` });
      } catch (err: any) {
        toast({ title: "Update Failed", description: err.message, variant: "destructive" });
      }
    }
  };

  const statCards = [
    { title: "Citizens", value: "12,482", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Archives", value: monuments?.length || 0, icon: Building2, color: "text-primary", bg: "bg-primary/10" },
    { title: "Expeditions", value: "842", icon: Compass, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Echoes", value: "3.2K", icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Bento Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="premium-glass p-10 rounded-[3rem] border-white/5 hover:border-primary/40 transition-all duration-700 relative overflow-hidden group rose-glow-border"
          >
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-8 shadow-xl border border-white/5`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-3 opacity-40">{t.stats[i]}</p>
            <h3 className="text-5xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* 2. Style Distribution Chart */}
        <Card className="premium-glass lg:col-span-8 p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-aurora opacity-10 pointer-events-none" />
          <CardHeader className="p-0 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <CardTitle className="text-4xl font-serif font-bold tracking-tight mb-2">Census of Splendor</CardTitle>
              <p className="text-muted-foreground text-sm font-medium opacity-60 uppercase tracking-widest">Heritage Distribution Analysis</p>
            </div>
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-2 rounded-2xl border border-primary/20">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Feed Active</span>
            </div>
          </CardHeader>
          <div className="h-[400px]">
             <DistributionChart monuments={monuments} />
          </div>
        </Card>

        {/* 3. Global Activity */}
        <Card className="premium-glass lg:col-span-4 p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
          <CardHeader className="p-0 mb-10">
            <h3 className="text-3xl font-serif font-bold tracking-tight">The Chronicle</h3>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-40 mt-2">Latest User Insights</p>
          </CardHeader>
          <div className="space-y-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-6 items-start group/item">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl group-hover/item:border-primary/50 transition-colors">
                   <History className="w-5 h-5 text-primary/60" />
                </div>
                <div>
                   <p className="text-foreground text-base leading-relaxed">
                     <span className="font-black text-primary">Sage_Archivist</span> unlocked the vault of <span className="italic font-serif">Hawa Mahal</span>.
                   </p>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2 opacity-30">{i * 14} Minutes Ago</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-12 h-14 rounded-2xl border border-white/5 hover:bg-primary/10 hover:text-primary font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 group/btn overflow-hidden relative">
            <span className="relative z-10">Access Full Logs</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          </Button>
        </Card>
      </div>

      {/* 4. Vault Management */}
      <Card className="premium-glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden">
        <header className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-serif font-bold tracking-tight mb-3 italic">{t.vaultTitle}</h2>
            <p className="text-muted-foreground text-lg opacity-60">{t.vaultSub}</p>
          </div>
          <AddMonumentDialog>
            <Button className="rounded-2xl h-16 px-12 text-sm font-black uppercase tracking-[0.3em] bg-primary text-white hover:bg-white hover:text-black transition-all duration-700 shadow-[0_20px_50px_rgba(225,29,72,0.3)] group overflow-hidden relative">
               <span className="relative z-10 flex items-center">
                 <Plus className="w-6 h-6 mr-3 stroke-[3] group-hover:rotate-90 transition-transform duration-500" /> Add New Asset
               </span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
          </AddMonumentDialog>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {monuments?.map((m, i) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -15 }}
              transition={{ delay: i * 0.05 }}
              className="premium-glass p-6 rounded-[2.5rem] group hover:border-primary/50 transition-all duration-700 shadow-2xl relative overflow-hidden"
            >
              <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-8 relative">
                <img src={resolveImageUrl(m.image)} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                   <div className="flex items-center gap-2">
                     <Map className="w-4 h-4 text-primary" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{m.location}</span>
                   </div>
                </div>
              </div>
              <h4 className="text-2xl font-serif font-bold mb-8 tracking-tight group-hover:text-primary transition-colors">{m.name}</h4>
              <div className="flex gap-4">
                <AddMonumentDialog initialData={m}>
                   <Button variant="secondary" className="flex-grow rounded-xl h-12 text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-all">
                     <Edit2 className="w-4 h-4 mr-2" /> Edit
                   </Button>
                </AddMonumentDialog>
                <Button 
                  onClick={() => handleDelete(m.id, m.name)}
                  variant="ghost" 
                  size="icon" 
                  className="w-12 h-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-white/5"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function EnthusiastView() {
  const { data: monuments } = useMonuments();
  
  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* 1. Mesmerizing Level Bento */}
        <Card className="premium-glass lg:col-span-5 p-12 rounded-[4rem] border-white/5 relative overflow-hidden group rose-glow-border">
          <div className="absolute inset-0 bg-aurora opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
               <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl">Elite Voyager</Badge>
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                 <Compass className="w-10 h-10 text-primary/40 stroke-[1.5]" />
               </motion.div>
            </div>
            <h3 className="text-6xl font-serif font-bold tracking-tighter mb-10 leading-none">{t.rankTitle} <br /><span className="text-gradient-rose italic">{t.rankSub}</span></h3>
            <div className="flex items-baseline gap-4 mb-10">
               <span className="text-9xl font-bold text-foreground leading-none">7</span>
               <span className="text-4xl text-muted-foreground font-black opacity-20 italic">/ 10</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Ancient Soul XP</span>
                 <span className="text-[10px] font-black text-foreground uppercase tracking-widest">740 / 1000</span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "74%" }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-accent rounded-full shadow-[0_0_20px_rgba(253,185,49,0.5)]" 
                />
              </div>
            </div>
            <div className="mt-12 p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-6 group hover:bg-white/10 transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-black shadow-2xl">
                 <Zap className="w-7 h-7 stroke-[2.5]" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Upcoming Transcendence</p>
                  <h4 className="text-lg font-serif font-bold italic">Master Chronicler</h4>
               </div>
            </div>
          </div>
        </Card>

        {/* 2. Mesmerizing Voyage Cards */}
        <Card className="premium-glass lg:col-span-7 p-12 rounded-[4rem] border-white/5 relative overflow-hidden group">
          <CardHeader className="p-0 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="text-5xl font-serif font-bold tracking-tighter italic">{t.voyageTitle}</h3>
              <p className="text-muted-foreground text-lg opacity-60">Resuming your path through the chronicles.</p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="rounded-2xl h-14 px-8 border-primary/30 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(225,29,72,0.1)] group">
                New Pilgrimage <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </CardHeader>
          <div className="grid md:grid-cols-2 gap-8">
            {monuments?.slice(0, 2).map((m, i) => (
              <motion.div 
                key={m.id}
                whileHover={{ y: -15, scale: 1.02 }}
                className="relative h-[400px] rounded-[3rem] overflow-hidden group/item cursor-pointer border border-white/5 shadow-2xl transition-all duration-700"
              >
                <img src={resolveImageUrl(m.image)} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-primary fill-primary animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Current Phase</span>
                  </div>
                  <h4 className="text-3xl font-serif font-bold text-white mb-6 tracking-tight leading-tight group-hover/item:text-primary transition-colors">{m.name}</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow bg-white/10 h-2 rounded-full overflow-hidden">
                       <motion.div animate={{ width: "65%" }} className="h-full bg-primary shadow-[0_0_10px_rgba(253,185,49,0.5)]" />
                    </div>
                    <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">65%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* 3. Immersive CTA */}
      <motion.div whileHover={{ scale: 1.01 }} className="mt-12">
        <Card className="premium-glass p-24 rounded-[5rem] bg-aurora border-white/5 relative overflow-hidden group text-center lg:text-left">
           <div className="absolute inset-0 bg-aurora opacity-30 animate-pulse pointer-events-none" />
           <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="w-40 h-40 bg-primary p-12 rounded-[4rem] shadow-[0_40px_80px_rgba(253,185,49,0.4)] flex items-center justify-center text-black border border-white/20 shrink-0"
              >
                <Globe className="w-20 h-20 stroke-[1.5]" />
              </motion.div>
              <div>
                <h3 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tighter leading-none italic">{t.ctaTitle}</h3>
                <p className="text-muted-foreground text-2xl mb-12 leading-relaxed max-w-3xl font-medium opacity-60">
                  {t.ctaSub}
                </p>
                <Link href="/explore">
                  <Button className="rounded-[2rem] h-20 px-16 text-lg font-black uppercase tracking-[0.4em] bg-primary text-white hover:bg-white hover:text-black transition-all duration-700 shadow-[0_30px_60px_rgba(225,29,72,0.4)] group overflow-hidden relative">
                    <span className="relative z-10">{t.ctaBtn}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                </Link>
              </div>
           </div>
        </Card>
      </motion.div>
    </div>
  );
}

function DistributionChart({ monuments }: { monuments: any[] | undefined }) {
  const chartData = (monuments || []).reduce((acc: any[], current) => {
    const style = current.style || "Other";
    const existing = acc.find(a => a.name === style);
    if (existing) existing.value += 1;
    else acc.push({ name: style, value: 1 });
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
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
          className="font-bold uppercase tracking-widest opacity-50"
          dy={15}
        />
        <YAxis 
          stroke="hsla(var(--muted-foreground),0.3)" 
          fontSize={11} 
          tickLine={false}
          axisLine={false}
          className="font-bold opacity-50"
        />
        <Tooltip 
          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
          contentStyle={{ 
            backgroundColor: 'hsla(var(--background),0.8)', 
            backdropFilter: 'blur(32px)', 
            borderRadius: '24px', 
            border: '1px solid hsla(var(--white),0.1)',
            padding: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--primary))" 
          strokeWidth={5}
          fillOpacity={1} 
          fill="url(#colorValue)" 
          animationDuration={3000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block bg-primary/20 p-4 rounded-3xl mb-8"
        >
          <Sparkles className="w-12 h-12 text-primary" />
        </motion.div>
        <p className="text-xl font-serif font-bold italic opacity-60 animate-pulse">Invoking the Imperial Archives...</p>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: any }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md premium-glass p-12 rounded-[3rem] border-destructive/20">
        <ShieldAlert className="w-20 h-20 text-destructive/60 mx-auto mb-8" />
        <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Vault Access Failure</h2>
        <p className="text-muted-foreground mb-10 italic">{error instanceof Error ? error.message : "The connection to the sacred nodes was lost."}</p>
        <Button onClick={() => window.location.reload()} className="rounded-2xl h-14 px-10 bg-destructive text-white hover:bg-white hover:text-black transition-all shadow-2xl shadow-destructive/20">
          Restore Connection
        </Button>
      </div>
    </div>
  );
}
