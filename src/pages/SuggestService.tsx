import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Heart, Users, Building2, Shield, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { sendNotification } from "@/hooks/useNotification";

const categories = [
  "Settlement",
  "Employment",
  "Legal",
  "Housing",
  "Community",
  "Education",
  "Healthcare",
  "Language",
  "Cultural",
  "Financial",
  "Other",
];

const formSchema = z.object({
  yourName: z.string().max(100).optional(),
  yourEmail: z.string().email({ message: "Invalid email" }).max(255).optional().or(z.literal("")),
  organizationName: z.string().trim().min(1, "Organization name is required").max(200),
  category: z.string().min(1, "Please select a category"),
  city: z.string().trim().min(1, "City or region is required").max(100),
  website: z.string().max(500).optional(),
  isFree: z.enum(["free", "paid"], { required_error: "Please select one" }),
  recommendation: z.string().max(1000).optional(),
  additionalNotes: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SuggestService() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
      yourEmail: "",
      organizationName: "",
      category: "",
      city: "",
      website: "",
      isFree: undefined,
      recommendation: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("suggested_services").insert({
        organization_name: values.organizationName,
        category: values.category,
        city: values.city,
        website: values.website || null,
        is_free: values.isFree === "free",
        notes: [
          values.recommendation ? `Recommendation: ${values.recommendation}` : "",
          values.additionalNotes ? `Additional: ${values.additionalNotes}` : "",
          values.yourName ? `Submitted by: ${values.yourName}` : "",
          values.yourEmail ? `Contact: ${values.yourEmail}` : "",
        ]
          .filter(Boolean)
          .join("\n") || null,
        submitted_by: user?.id ?? null,
      });

      if (error) throw error;

      await sendNotification({
        type: "add_service",
        data: {
          first_name: values.yourName || undefined,
          organization_name: values.organizationName,
          email: values.yourEmail || undefined,
        },
      });

      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-display text-3xl mb-3">Thank You!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your suggestion has been submitted for review. Our team will verify the service and, if approved, it may be added to CanConnect.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
        {/* Left column — copy */}
        <div className="lg:col-span-2 lg:sticky lg:top-24">
          <h1 className="font-display text-3xl md:text-4xl mb-3">Suggest a Service</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Know a trusted organization that supports newcomers in Ontario? Help us grow the directory — suggest it here and our team will review every submission.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Non-profits & community organizations</span>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Newcomer-focused small businesses</span>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Cultural & social groups</span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-5 text-sm space-y-3 mb-6">
            <p className="font-medium text-foreground">What happens next?</p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-0.5">
              <li>Our team reviews your suggestion</li>
              <li>We verify the service meets our criteria</li>
              <li>If approved, it's added to CanConnect</li>
            </ol>
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <p>Submission does not guarantee listing. Services must operate in Ontario and actively support newcomer communities.</p>
          </div>
        </div>

        {/* Right column — form */}
        <div className="lg:col-span-3">
          <div className="bg-card border rounded-2xl p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Optional personal info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="yourName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                      <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="yourEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                      <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Organization Name */}
                <FormField control={form.control} name="organizationName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization / Business Name *</FormLabel>
                    <FormControl><Input placeholder="e.g. Ontario Newcomer Centre" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Category + City */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City / Region Served *</FormLabel>
                      <FormControl><Input placeholder="e.g. Toronto, GTA" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Website */}
                <FormField control={form.control} name="website" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website or Social Link <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                    <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Free or Paid */}
                <FormField control={form.control} name="isFree" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is this service free or paid? *</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 pt-1">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free">Free / Non-Profit</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="paid" id="paid" />
                          <Label htmlFor="paid">Paid / For-Profit</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Recommendation */}
                <FormField control={form.control} name="recommendation" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why are you recommending this service? <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                    <FormControl><Textarea placeholder="Short description or personal experience" rows={2} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Additional Notes */}
                <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anything else we should know? <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                    <FormControl><Textarea placeholder="Languages offered, newcomer focus, accessibility, etc." rows={2} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Submitting..." : "Submit for Review"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your information will only be used to review this submission. We respect your privacy.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
