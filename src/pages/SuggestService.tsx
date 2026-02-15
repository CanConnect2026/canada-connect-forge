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
    <div>
      {/* Hero */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Suggest a Service</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Know a service that supports newcomers? CanConnect is built with and for the community. If you know a trusted organization or business that supports newcomers in Ontario, we'd love to hear about it.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Suggesting a service helps us expand access to reliable support — from settlement and employment services to legal help, community groups, and cultural organizations.
          </p>
        </div>
      </section>

      {/* What You Can Suggest */}
      <section className="py-14">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl mb-8 text-center">What You Can Suggest</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card border rounded-xl p-6 text-center">
              <Building2 className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Non-Profit Organizations</h3>
              <p className="text-sm text-muted-foreground">Community organizations providing newcomer support</p>
            </div>
            <div className="bg-card border rounded-xl p-6 text-center">
              <Heart className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Small Businesses</h3>
              <p className="text-sm text-muted-foreground">Businesses offering newcomer-focused services</p>
            </div>
            <div className="bg-card border rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Cultural & Social Groups</h3>
              <p className="text-sm text-muted-foreground">Groups that bring communities together</p>
            </div>
          </div>

          <div className="mt-8 bg-muted/50 rounded-xl p-6 text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">The service should:</p>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>Operate in Ontario</li>
              <li>Clearly support immigrants or newcomer communities</li>
              <li>Be legitimate and active</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-secondary py-14">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl mb-8 text-center">What Happens Next</h2>
          <div className="space-y-4">
            {[
              { step: "1", text: "Our team reviews the information provided" },
              { step: "2", text: "We verify the service based on our review criteria" },
              { step: "3", text: "If approved, the service may be added to CanConnect" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  {step}
                </span>
                <p className="text-muted-foreground pt-1">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>Submission does not guarantee listing. Our goal is to maintain a trusted and reliable platform for newcomers.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-14" id="form">
        <div className="container max-w-2xl">
          <h2 className="font-display text-2xl mb-8 text-center">Suggest a Service</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormControl><Textarea placeholder="Short description or personal experience" rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Additional Notes */}
              <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything else we should know? <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                  <FormControl><Textarea placeholder="Languages offered, newcomer focus, accessibility, etc." rows={3} {...field} /></FormControl>
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
      </section>
    </div>
  );
}
