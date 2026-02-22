import { useState } from "react";
import { ADMIN_STATS, MONUMENTS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Map, MessageSquare, Trash2, Edit2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

// A mock dashboard that shows different views based on a prop or state.
// Since we don't have real auth, we'll use a local state to toggle for demonstration.

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">
            {isAdmin ? 'Command Center' : 'My Cultural Journey'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isAdmin ? 'Manage platform content and users.' : 'Track your explorations and saved heritage sites.'}
          </p>
        </div>
        <Button 
          variant={isAdmin ? "destructive" : "default"} 
          onClick={() => setIsAdmin(!isAdmin)}
          className="gap-2"
        >
          <ShieldAlert className="w-4 h-4" />
          Toggle to {isAdmin ? 'Enthusiast' : 'Admin'} View
        </Button>
      </div>

      {isAdmin ? <AdminView /> : <EnthusiastView />}
    </div>
  );
}

function AdminView() {
  const statCards = [
    { title: "Total Users", value: ADMIN_STATS.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500" },
    { title: "Monuments", value: ADMIN_STATS.totalMonuments, icon: Building2, color: "text-primary" },
    { title: "Active Virtual Tours", value: ADMIN_STATS.activeTours.toLocaleString(), icon: Map, color: "text-green-500" },
    { title: "Discussions", value: ADMIN_STATS.discussions.toLocaleString(), icon: MessageSquare, color: "text-accent" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-serif text-2xl">Manage Monuments</CardTitle>
                <Button size="sm" className="bg-primary text-primary-foreground">Add New</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MONUMENTS.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                    <div className="flex items-center gap-4">
                      <img src={m.image} alt={m.name} className="w-16 h-12 object-cover rounded-md" />
                      <div>
                        <div className="font-semibold text-foreground">{m.name}</div>
                        <div className="text-sm text-muted-foreground">{m.location}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                    <div>
                      <p className="text-sm text-foreground"><span className="font-semibold">User_{102+i}</span> joined as Cultural Enthusiast.</p>
                      <p className="text-xs text-muted-foreground mt-1">{i} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EnthusiastView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-border overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <CardHeader>
            <CardTitle className="text-xl">Explorer Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">Level 4</div>
            <p className="text-sm text-muted-foreground">Master of Mughal Architecture</p>
            <div className="w-full bg-secondary h-2 rounded-full mt-4">
              <div className="bg-primary h-2 rounded-full w-[70%]" />
            </div>
            <p className="text-xs text-right mt-1 text-muted-foreground">300 XP to next level</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border overflow-hidden md:col-span-2">
          <div className="h-2 bg-accent w-full" />
          <CardHeader>
            <CardTitle className="text-xl">Saved Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {MONUMENTS.slice(0,2).map(m => (
                <div key={m.id} className="relative h-32 rounded-xl overflow-hidden group cursor-pointer">
                  <img src={m.image} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h4 className="text-white font-bold">{m.name}</h4>
                    <p className="text-white/80 text-xs">Resume Tour</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
