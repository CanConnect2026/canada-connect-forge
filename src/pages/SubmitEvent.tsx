import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { EVENT_CATEGORIES } from "@/data/eventCategories";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().max(2000).optional(),
  event_date: z.string().min(1, "Event date is required"),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  location: z.string().max(300).optional(),
  city: z.string().trim().min(1, "City is required").max(100),
  category: z.string().min(1, "Please select a category"),
  cost_type: z.enum(["Free", "Paid"], { required_error: "Please select one" }),
  languages: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  contact_email: z.string().email().optional().or(z.literal("")),
  contact_phone: z.string().max(20).optional(),
  social_facebook: z.string().optional(),
  social_instagram: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitEvent() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "", description: "", event_date: "", start_time: "", end_time: "",
      location: "", city: "Toronto", category: "", cost_type: undefined,
      languages: "English", website: "", contact_email: "", contact_phone: "",
      social_facebook: "", social_instagram: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 2 - imageFiles.length;
    const toAdd = files.slice(0, remaining);
    setImageFiles(prev => [...prev, ...toAdd]);
    setImagePreviews(prev => [...prev, ...toAdd.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (i: number) => {
    setImageFiles(prev => prev.filter((_, idx) => idx !== i));
    setImagePreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  if (authLoading) return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      let image_url: string | null = null;
      const uploadedUrls: string[] = [];

      for (const file of imageFiles) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("event-images").upload(path, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("event-images").getPublicUrl(path);
        uploadedUrls.push(urlData.publicUrl);
      }

      image_url = uploadedUrls[0] || null;

      const langs = values.languages
        ? values.languages.split(",").map(l => l.trim()).filter(Boolean)
        : ["English"];

      const social_links: Record<string, string> = {};
      if (values.social_facebook) social_links.facebook = values.social_facebook;
      if (values.social_instagram) social_links.instagram = values.social_instagram;

      const { error } = await supabase.from("events").insert({
        title: values.title,
        description: values.description || null,
        event_date: values.event_date,
        start_time: values.start_time || null,
        end_time: values.end_time || null,
        location: values.location || null,
        city: values.city,
        category: values.category,
        cost_type: values.cost_type,
        languages: langs,
        image_url,
        created_by: user.id,
        submitted_by_type: "user",
        status: "pending" as any,
        is_published: false,
        website: values.website || null,
        contact_email: values.contact_email || null,
        contact_phone: values.contact_phone || null,
        social_links: Object.keys(social_links).length > 0 ? social_links : null,
      } as any);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message || "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-display text-3xl mb-3">Event Submitted!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your event has been submitted for review. Our team will review it and, if approved, it will appear on the events page.
          </p>
          <Link to="/events" className="inline-block mt-6 text-accent hover:underline text-sm">← Back to Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-8">
        <div className="container">
          <h1 className="text-3xl font-display text-primary-foreground">Submit an Event</h1>
          <p className="text-primary-foreground/70 mt-1">Share community events with newcomers across Ontario</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Info sidebar */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-6">
            <div className="bg-muted/50 rounded-xl p-5 text-sm space-y-3">
              <p className="font-medium text-foreground">Submission Guidelines</p>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li>Events are <strong>free to submit</strong> for the first year</li>
                <li>All events are reviewed before going live</li>
                <li>Events must be relevant to newcomers in Ontario</li>
                <li>Upload up to 2 images for better visibility</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-xl p-5 text-sm space-y-3">
              <p className="font-medium text-foreground">Who can submit?</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Non-profits & community groups</li>
                <li>Public organizations</li>
                <li>Individuals hosting newcomer events</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-xl p-5 text-sm space-y-3">
              <p className="font-medium text-foreground">What happens after you submit</p>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li>Your event will be reviewed by the CanConnect team</li>
                <li>Review typically takes 1–3 business days</li>
                <li>If approved, your event will be published on the Events page</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card border rounded-2xl p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title *</FormLabel>
                      <FormControl><Input placeholder="e.g. Newcomer Welcome Night" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea placeholder="Tell people about the event..." rows={4} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                          <SelectContent>{EVENT_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl><Input placeholder="e.g. Toronto" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="event_date" render={({ field }) => (
                      <FormItem><FormLabel>Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="start_time" render={({ field }) => (
                      <FormItem><FormLabel>Start Time</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="end_time" render={({ field }) => (
                      <FormItem><FormLabel>End Time</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>Venue / Address</FormLabel><FormControl><Input placeholder="e.g. Metro Toronto Convention Centre" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <FormField control={form.control} name="cost_type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is this event free? *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 pt-1">
                          <div className="flex items-center gap-2"><RadioGroupItem value="Free" id="cost-free" /><Label htmlFor="cost-free">Free</Label></div>
                          <div className="flex items-center gap-2"><RadioGroupItem value="Paid" id="cost-paid" /><Label htmlFor="cost-paid">Paid</Label></div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="languages" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages <span className="text-muted-foreground font-normal">(comma separated)</span></FormLabel>
                      <FormControl><Input placeholder="English, French, Arabic" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Contact & Links */}
                  <div className="border-t pt-5 mt-5">
                    <h3 className="font-semibold text-foreground text-sm mb-4">Contact & Links</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="contact_email" render={({ field }) => (
                        <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="events@org.ca" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="contact_phone" render={({ field }) => (
                        <FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input placeholder="(416) 555-0123" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <FormField control={form.control} name="social_facebook" render={({ field }) => (
                        <FormItem><FormLabel>Facebook URL</FormLabel><FormControl><Input placeholder="https://facebook.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="social_instagram" render={({ field }) => (
                        <FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input placeholder="https://instagram.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Image upload */}
                  <div>
                    <Label className="mb-2 block">Event Images <span className="text-muted-foreground font-normal">(up to 2)</span></Label>
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-3 mb-3">
                        {imagePreviews.map((src, i) => (
                          <div key={i} className="relative w-32 h-24 rounded-lg overflow-hidden border">
                            <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-background/80 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive hover:text-destructive-foreground">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                    {imageFiles.length < 2 && (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-accent transition-colors bg-muted/30">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload an image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? "Submitting..." : "Submit Event for Review"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    All events are reviewed before being published. This usually takes 1–2 business days.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
