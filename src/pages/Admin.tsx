import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminListings from "@/components/admin/AdminListings";
import AdminClaims from "@/components/admin/AdminClaims";
import AdminSuggestions from "@/components/admin/AdminSuggestions";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminCommunityPartners from "@/components/admin/AdminCommunityPartners";
import AdminBusinessPartners from "@/components/admin/AdminBusinessPartners";

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-8">
        <div className="container">
          <h1 className="text-3xl font-display text-primary-foreground">Admin Dashboard</h1>
          <p className="text-primary-foreground/70 mt-1">Manage listings, claims, and submissions</p>
        </div>
      </div>
      <div className="container py-8">
        <Tabs defaultValue="listings">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="community">Community Partners</TabsTrigger>
            <TabsTrigger value="business">Business Partners</TabsTrigger>
          </TabsList>
          <TabsContent value="listings"><AdminListings /></TabsContent>
          <TabsContent value="events"><AdminEvents /></TabsContent>
          <TabsContent value="guides"><AdminArticles /></TabsContent>
          <TabsContent value="claims"><AdminClaims /></TabsContent>
          <TabsContent value="suggestions"><AdminSuggestions /></TabsContent>
          <TabsContent value="community"><AdminCommunityPartners /></TabsContent>
          <TabsContent value="business"><AdminBusinessPartners /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
