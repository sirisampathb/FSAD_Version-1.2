import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateMonument, useUpdateMonument } from "@/hooks/useMonuments";
import { insertMonumentSchema, type InsertMonument, type Monument } from "@shared/schema";
import { Plus, Trash2, Image as ImageIcon, MapPin, AlignLeft, Clock, Save, Edit, Landmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddMonumentDialog({ children, initialData }: { children: React.ReactNode, initialData?: Monument }) {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("basics");
    const { mutateAsync: createMonument, isPending: isCreating } = useCreateMonument();
    const { mutateAsync: updateMonument, isPending: isUpdating } = useUpdateMonument();
    const isPending = isCreating || isUpdating;
    const isEditing = !!initialData;
    const { toast } = useToast();

    const form = useForm<InsertMonument>({
        resolver: zodResolver(insertMonumentSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            location: initialData.location,
            builtYear: initialData.builtYear,
            dynasty: initialData.dynasty,
            style: initialData.style,
            description: initialData.description,
            image: initialData.image || "",
            unesco: initialData.unesco || false,
            timeline: initialData.timeline || [{ year: "", event: "" }],
            funFacts: initialData.funFacts || [""],
        } : {
            name: "",
            location: "",
            builtYear: "",
            dynasty: "",
            style: "",
            description: "",
            image: "",
            unesco: false,
            timeline: [{ year: "", event: "" }],
            funFacts: [""],
        },
    });

    const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
        control: form.control,
        name: "timeline",
    });

    const { fields: factsFields, append: appendFact, remove: removeFact } = useFieldArray({
        control: form.control,
        name: "funFacts" as never,
    });

    const onSubmit = async (data: InsertMonument) => {
        try {
            // Clean up empty lines
            data.timeline = (data.timeline || []).filter((t: any) => t.year?.trim() !== "" || t.event?.trim() !== "");
            data.funFacts = (data.funFacts || []).filter((f: any) => typeof f === 'string' ? f.trim() !== "" : f.value?.trim() !== "").map((f: any) => typeof f === 'string' ? f : f.value);

            if (isEditing && initialData) {
                await updateMonument({ id: initialData.id, monument: data });
                toast({ title: "Updated!", description: "Heritage site information has been updated." });
            } else {
                await createMonument(data);
                toast({ title: "Success!", description: "Heritage site added to the collection." });
            }
            
            setOpen(false);
            if (!isEditing) form.reset();
            setActiveTab("basics");
        } catch (error: any) {
            toast({ title: "Unable to save", description: error.message, variant: "destructive" });
        }
    };

    const currentImageUrl = form.watch("image");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background border-border">
                <div className="px-6 py-4 border-b border-border bg-card/50">
                    <DialogTitle className="text-2xl font-serif text-foreground flex items-center gap-2">
                        {isEditing ? <Edit className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
                        {isEditing ? "Edit Heritage Site" : "Add New Heritage Site"}
                    </DialogTitle>
                    <DialogDescription>
                        Enter the details of the historical place. We've organized this into sections so it's easier to fill out.
                    </DialogDescription>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="px-6 border-b border-border bg-card/30">
                                <TabsList className="h-12 bg-transparent">
                                    <TabsTrigger value="basics" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none">
                                        <MapPin className="w-4 h-4 mr-2" /> Basic Info
                                    </TabsTrigger>
                                    <TabsTrigger value="history" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none">
                                        <AlignLeft className="w-4 h-4 mr-2" /> Description
                                    </TabsTrigger>
                                    <TabsTrigger value="timeline" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none">
                                        <Clock className="w-4 h-4 mr-2" /> Time & Facts
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="p-6 max-h-[60vh] overflow-y-auto">
                                <TabsContent value="basics" className="space-y-6 mt-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <FormField control={form.control} name="name" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Monument Name *</FormLabel>
                                                    <FormControl><Input placeholder="e.g. Taj Mahal" {...field} value={field.value || ""} className="bg-background" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="location" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location *</FormLabel>
                                                    <FormControl><Input placeholder="e.g. Agra, Uttar Pradesh" {...field} value={field.value || ""} className="bg-background" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField control={form.control} name="dynasty" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Dynasty/Era</FormLabel>
                                                        <FormControl><Input placeholder="e.g. Mughal" {...field} value={field.value || ""} className="bg-background" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="builtYear" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Year Built</FormLabel>
                                                        <FormControl><Input placeholder="e.g. 1632" {...field} value={field.value || ""} className="bg-background" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <FormField control={form.control} name="style" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Architecture Style</FormLabel>
                                                    <FormControl><Input placeholder="e.g. Indo-Islamic" {...field} value={field.value || ""} className="bg-background" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="unesco" render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg p-3 bg-primary/5 border border-primary/20">
                                                    <FormControl>
                                                        <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="font-semibold text-primary">UNESCO World Heritage</FormLabel>
                                                        <FormDescription className="text-xs">Check if officially recognized.</FormDescription>
                                                    </div>
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="image" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Image URL</FormLabel>
                                                    <FormControl><Input placeholder="https://example.com/asset.jpg" {...field} value={field.value || ""} className="bg-background" /></FormControl>
                                                    {currentImageUrl && (
                                                        <div className="mt-2 text-xs text-muted-foreground">Preview:</div>
                                                    )}
                                                    {currentImageUrl && (
                                                        <div className="relative h-24 w-full rounded-md overflow-hidden border border-border mt-1">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={currentImageUrl} alt="Preview" className="object-cover w-full h-full" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image'; }} />
                                                        </div>
                                                    )}
                                                </FormItem>
                                            )} />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-border">
                                        <Button type="button" onClick={() => setActiveTab("history")}>Next: Description</Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="history" className="space-y-4 mt-0">
                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full History & Significance</FormLabel>
                                            <FormDescription>Take your time to describe what makes this place special. You can add bullet points or multiple paragraphs.</FormDescription>
                                            <FormControl>
                                                <Textarea placeholder="Share the majestic history..." className="min-h-[250px] resize-y bg-background" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="flex justify-between pt-4 border-t border-border">
                                        <Button type="button" variant="outline" onClick={() => setActiveTab("basics")}>Back</Button>
                                        <Button type="button" onClick={() => setActiveTab("timeline")}>Next: Timeline & Facts</Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="timeline" className="space-y-8 mt-0">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h4 className="font-semibold text-lg">Timeline Events</h4>
                                                <p className="text-sm text-muted-foreground">Capture pivotal moments in its history.</p>
                                            </div>
                                            <Button type="button" variant="outline" size="sm" onClick={() => appendTimeline({ year: "", event: "" })} className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10">
                                                <Plus className="w-4 h-4 mr-2" /> Add Event
                                            </Button>
                                        </div>
                                        {timelineFields.length === 0 && (
                                            <div className="p-4 text-center border border-dashed rounded-lg text-muted-foreground text-sm">No events added yet.</div>
                                        )}
                                        <div className="space-y-3">
                                            {timelineFields.map((field, index) => (
                                                <Card key={field.id} className="bg-card shadow-sm border-border">
                                                    <CardContent className="p-3 flex gap-3 items-start">
                                                        <div className="w-1/4">
                                                            <FormField control={form.control} name={`timeline.${index}.year`} render={({ field }) => (
                                                                <FormItem><FormControl><Input placeholder="Year (e.g. 1632)" {...field} value={field.value || ""} className="bg-background" /></FormControl></FormItem>
                                                            )} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <FormField control={form.control} name={`timeline.${index}.event`} render={({ field }) => (
                                                                <FormItem><FormControl><Input placeholder="What happened?" {...field} value={field.value || ""} className="bg-background" /></FormControl></FormItem>
                                                            )} />
                                                        </div>
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeTimeline(index)} className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 shrink-0">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h4 className="font-semibold text-lg">Fun Facts</h4>
                                                <p className="text-sm text-muted-foreground">Short, interesting trivia about this place.</p>
                                            </div>
                                            <Button type="button" variant="outline" size="sm" onClick={() => appendFact({ value: "" } as any)} className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10">
                                                <Plus className="w-4 h-4 mr-2" /> Add Fact
                                            </Button>
                                        </div>
                                        {factsFields.length === 0 && (
                                            <div className="p-4 text-center border border-dashed rounded-lg text-muted-foreground text-sm">No facts added yet.</div>
                                        )}
                                        <div className="space-y-3">
                                            {factsFields.map((field, index) => (
                                                <Card key={field.id} className="bg-card shadow-sm border-border">
                                                    <CardContent className="p-3 flex gap-3 items-center">
                                                        <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">{index + 1}</div>
                                                        <div className="flex-1">
                                                            <FormField control={form.control} name={`funFacts.${index}`} render={({ field }) => (
                                                                <FormItem><FormControl><Input placeholder="Did you know?" {...field} value={typeof field.value === 'string' ? field.value : (field.value as any)?.value || ""} onChange={(e) => field.onChange({ value: e.target.value })} className="bg-background" /></FormControl></FormItem>
                                                            )} />
                                                        </div>
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFact(index)} className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 shrink-0">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-8 border-t border-border">
                                        <Button type="button" variant="outline" onClick={() => setActiveTab("history")}>Back</Button>
                                        <Button type="submit" disabled={isPending} size="lg" className="px-8 shadow-md">
                                            {isPending ? "Connecting to Database..." : "Save Monument to Database"}
                                        </Button>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
