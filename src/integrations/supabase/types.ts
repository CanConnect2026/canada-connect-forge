export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      advertising_inquiries: {
        Row: {
          budget_range: string | null
          company_name: string
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string | null
          phone: string | null
        }
        Insert: {
          budget_range?: string | null
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
        }
        Update: {
          budget_range?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      article_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          category: string
          checklist: Json | null
          city: string | null
          content: Json
          created_at: string
          created_by: string | null
          estimated_read_minutes: number | null
          featured_image_url: string | null
          id: string
          is_featured: boolean
          is_published: boolean
          province: string | null
          slug: string
          summary: string | null
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          checklist?: Json | null
          city?: string | null
          content?: Json
          created_at?: string
          created_by?: string | null
          estimated_read_minutes?: number | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          province?: string | null
          slug: string
          summary?: string | null
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          checklist?: Json | null
          city?: string | null
          content?: Json
          created_at?: string
          created_by?: string | null
          estimated_read_minutes?: number | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          province?: string | null
          slug?: string
          summary?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_partner_applications: {
        Row: {
          admin_notes: string | null
          billing_address: string
          city: string
          company_name: string | null
          country: string
          created_at: string
          email: string
          id: string
          is_visible: boolean
          name_on_card: string
          payment_status: string
          postal_code: string
          province: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_renewal_date: string | null
          subscription_start_date: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          billing_address: string
          city: string
          company_name?: string | null
          country?: string
          created_at?: string
          email: string
          id?: string
          is_visible?: boolean
          name_on_card: string
          payment_status?: string
          postal_code: string
          province: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_renewal_date?: string | null
          subscription_start_date?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          billing_address?: string
          city?: string
          company_name?: string | null
          country?: string
          created_at?: string
          email?: string
          id?: string
          is_visible?: boolean
          name_on_card?: string
          payment_status?: string
          postal_code?: string
          province?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_renewal_date?: string | null
          subscription_start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      checklist_progress: {
        Row: {
          checked_items: string[]
          created_at: string
          id: string
          stream_slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          checked_items?: string[]
          created_at?: string
          id?: string
          stream_slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          checked_items?: string[]
          created_at?: string
          id?: string
          stream_slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      community_partner_applications: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          contact_person: string
          created_at: string
          email: string
          expires_at: string | null
          id: string
          organization_name: string
          organization_type: string
          phone: string | null
          primary_services: string | null
          short_description: string | null
          status: string
          target_communities: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          contact_person: string
          created_at?: string
          email: string
          expires_at?: string | null
          id?: string
          organization_name: string
          organization_type?: string
          phone?: string | null
          primary_services?: string | null
          short_description?: string | null
          status?: string
          target_communities?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          contact_person?: string
          created_at?: string
          email?: string
          expires_at?: string | null
          id?: string
          organization_name?: string
          organization_type?: string
          phone?: string | null
          primary_services?: string | null
          short_description?: string | null
          status?: string
          target_communities?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      contributions: {
        Row: {
          contribution_types: string[]
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
        }
        Insert: {
          contribution_types?: string[]
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
        }
        Update: {
          contribution_types?: string[]
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string | null
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          cost_type: string
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string | null
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean
          is_published: boolean
          languages: string[]
          latitude: number | null
          location: string | null
          longitude: number | null
          social_links: Json | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"]
          submitted_by_type: string
          tags: string[]
          title: string
          updated_at: string
          website: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          cost_type?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          languages?: string[]
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          social_links?: Json | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          submitted_by_type?: string
          tags?: string[]
          title: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          cost_type?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          languages?: string[]
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          social_links?: Json | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          submitted_by_type?: string
          tags?: string[]
          title?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      issue_reports: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          issue_description: string
          related_event_id: string | null
          related_listing_id: string | null
          related_url: string | null
          reporter_email: string | null
          reporter_name: string | null
          status: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          issue_description: string
          related_event_id?: string | null
          related_listing_id?: string | null
          related_url?: string | null
          reporter_email?: string | null
          reporter_name?: string | null
          status?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          issue_description?: string
          related_event_id?: string | null
          related_listing_id?: string | null
          related_url?: string | null
          reporter_email?: string | null
          reporter_name?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_reports_related_event_id_fkey"
            columns: ["related_event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issue_reports_related_listing_id_fkey"
            columns: ["related_listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_claims: {
        Row: {
          admin_notes: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string
          external_circle_id: string | null
          id: string
          listing_id: string
          organization_name: string
          proof_description: string | null
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          external_circle_id?: string | null
          id?: string
          listing_id: string
          organization_name: string
          proof_description?: string | null
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          external_circle_id?: string | null
          id?: string
          listing_id?: string
          organization_name?: string
          proof_description?: string | null
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_claims_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category: string
          city: string
          claim_status: Database["public"]["Enums"]["claim_status"]
          claimed_by: string | null
          created_at: string
          cuisine: string | null
          description_en: string | null
          description_fr: string | null
          email: string | null
          external_reference: string | null
          firstbites_eligible: boolean
          full_address: string | null
          google_places_id: string | null
          halal: boolean
          id: string
          image_url: string | null
          images: string[] | null
          is_featured: boolean
          is_published: boolean
          kosher: boolean
          languages_served: string[]
          latitude: number | null
          listing_type: Database["public"]["Enums"]["listing_type"]
          logo_url: string | null
          longitude: number | null
          monetization_tier: string
          name: string
          neighborhood: string | null
          opening_hours: Json | null
          owner_home_country: string | null
          owner_name: string | null
          owner_story: string | null
          phone: string | null
          price_range: string | null
          pricing_info: string | null
          province: string
          services_provided: string[] | null
          slug: string | null
          social_links: Json | null
          tags: string[]
          updated_at: string
          vegan_friendly: boolean
          vegetarian_friendly: boolean
          verification_status: Database["public"]["Enums"]["verification_status"]
          website: string | null
        }
        Insert: {
          category: string
          city: string
          claim_status?: Database["public"]["Enums"]["claim_status"]
          claimed_by?: string | null
          created_at?: string
          cuisine?: string | null
          description_en?: string | null
          description_fr?: string | null
          email?: string | null
          external_reference?: string | null
          firstbites_eligible?: boolean
          full_address?: string | null
          google_places_id?: string | null
          halal?: boolean
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_featured?: boolean
          is_published?: boolean
          kosher?: boolean
          languages_served?: string[]
          latitude?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"]
          logo_url?: string | null
          longitude?: number | null
          monetization_tier?: string
          name: string
          neighborhood?: string | null
          opening_hours?: Json | null
          owner_home_country?: string | null
          owner_name?: string | null
          owner_story?: string | null
          phone?: string | null
          price_range?: string | null
          pricing_info?: string | null
          province?: string
          services_provided?: string[] | null
          slug?: string | null
          social_links?: Json | null
          tags?: string[]
          updated_at?: string
          vegan_friendly?: boolean
          vegetarian_friendly?: boolean
          verification_status?: Database["public"]["Enums"]["verification_status"]
          website?: string | null
        }
        Update: {
          category?: string
          city?: string
          claim_status?: Database["public"]["Enums"]["claim_status"]
          claimed_by?: string | null
          created_at?: string
          cuisine?: string | null
          description_en?: string | null
          description_fr?: string | null
          email?: string | null
          external_reference?: string | null
          firstbites_eligible?: boolean
          full_address?: string | null
          google_places_id?: string | null
          halal?: boolean
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_featured?: boolean
          is_published?: boolean
          kosher?: boolean
          languages_served?: string[]
          latitude?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"]
          logo_url?: string | null
          longitude?: number | null
          monetization_tier?: string
          name?: string
          neighborhood?: string | null
          opening_hours?: Json | null
          owner_home_country?: string | null
          owner_name?: string | null
          owner_story?: string | null
          phone?: string | null
          price_range?: string | null
          pricing_info?: string | null
          province?: string
          services_provided?: string[] | null
          slug?: string | null
          social_links?: Json | null
          tags?: string[]
          updated_at?: string
          vegan_friendly?: boolean
          vegetarian_friendly?: boolean
          verification_status?: Database["public"]["Enums"]["verification_status"]
          website?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          name: string | null
          source: string | null
          status: string
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          name?: string | null
          source?: string | null
          status?: string
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          name?: string | null
          source?: string | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          created_at: string
          cuisine: string
          description: string | null
          full_address: string | null
          google_places_id: string | null
          halal: boolean
          id: string
          image_url: string | null
          is_published: boolean
          kosher: boolean
          latitude: number | null
          longitude: number | null
          name: string
          neighborhood: string
          owner_home_country: string | null
          owner_name: string | null
          owner_story: string | null
          phone: string | null
          price_range: string
          slug: string | null
          updated_at: string
          vegan_friendly: boolean
          vegetarian_friendly: boolean
          website: string | null
        }
        Insert: {
          created_at?: string
          cuisine: string
          description?: string | null
          full_address?: string | null
          google_places_id?: string | null
          halal?: boolean
          id?: string
          image_url?: string | null
          is_published?: boolean
          kosher?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          neighborhood: string
          owner_home_country?: string | null
          owner_name?: string | null
          owner_story?: string | null
          phone?: string | null
          price_range?: string
          slug?: string | null
          updated_at?: string
          vegan_friendly?: boolean
          vegetarian_friendly?: boolean
          website?: string | null
        }
        Update: {
          created_at?: string
          cuisine?: string
          description?: string | null
          full_address?: string | null
          google_places_id?: string | null
          halal?: boolean
          id?: string
          image_url?: string | null
          is_published?: boolean
          kosher?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          neighborhood?: string
          owner_home_country?: string | null
          owner_name?: string | null
          owner_story?: string | null
          phone?: string | null
          price_range?: string
          slug?: string | null
          updated_at?: string
          vegan_friendly?: boolean
          vegetarian_friendly?: boolean
          website?: string | null
        }
        Relationships: []
      }
      suggested_services: {
        Row: {
          admin_notes: string | null
          category: string | null
          city: string | null
          created_at: string
          id: string
          is_free: boolean | null
          languages: string[] | null
          notes: string | null
          organization_name: string
          province: string | null
          status: string
          submitted_by: string | null
          website: string | null
        }
        Insert: {
          admin_notes?: string | null
          category?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_free?: boolean | null
          languages?: string[] | null
          notes?: string | null
          organization_name: string
          province?: string | null
          status?: string
          submitted_by?: string | null
          website?: string | null
        }
        Update: {
          admin_notes?: string | null
          category?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_free?: boolean | null
          languages?: string[] | null
          notes?: string | null
          organization_name?: string
          province?: string | null
          status?: string
          submitted_by?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_tips: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          platform: string
          social_channel_label: string | null
          social_channel_url: string | null
          sort_order: number
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          platform?: string
          social_channel_label?: string | null
          social_channel_url?: string | null
          sort_order?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          platform?: string
          social_channel_label?: string | null
          social_channel_url?: string | null
          sort_order?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_listing_claims: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string | null
          listing_id: string | null
          organization_name: string | null
          proof_description: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string | null
          listing_id?: string | null
          organization_name?: string | null
          proof_description?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string | null
          listing_id?: string | null
          organization_name?: string | null
          proof_description?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_claims_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      claim_status: "unclaimed" | "pending" | "approved" | "rejected"
      event_status: "pending" | "approved" | "expired"
      listing_type: "free" | "nonprofit" | "paid"
      verification_status: "unverified" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      claim_status: ["unclaimed", "pending", "approved", "rejected"],
      event_status: ["pending", "approved", "expired"],
      listing_type: ["free", "nonprofit", "paid"],
      verification_status: ["unverified", "verified", "rejected"],
    },
  },
} as const
