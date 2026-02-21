import { useParams, Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import { useArticle, useRelatedArticles } from "@/hooks/useArticles";
import { ChevronLeft, Clock, Calendar, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticle(slug || "");
  const { data: relatedArticles = [] } = useRelatedArticles(article);

  if (isLoading) return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  if (!article) return <div className="container py-16 text-center text-muted-foreground">Guide not found.</div>;

  const updatedDate = format(new Date(article.updated_at), "MMMM d, yyyy");
  const contentBlocks = Array.isArray(article.content) ? article.content : [];
  const checklistItems = Array.isArray(article.checklist) ? article.checklist : [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      {article.featured_image_url && (
        <div className="w-full h-[250px] md:h-[350px] bg-muted overflow-hidden">
          <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: "How-To Guides", to: "/how-to" },
            { label: article.title },
          ]}
          className="mb-6"
        />

        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-accent uppercase">{article.category}</span>
              <h1 className="text-3xl font-display text-foreground mt-1">{article.title}</h1>
              {article.summary && (
                <p className="text-muted-foreground mt-2 text-lg leading-relaxed">{article.summary}</p>
              )}
            </div>
            <ShareButton title={article.title} text={article.summary || article.title} variant="button" />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {article.estimated_read_minutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Updated {updatedDate}
            </span>
            {article.city && (
              <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{article.city}, {article.province || "ON"}</span>
            )}
          </div>

          {/* Step-by-step content */}
          <div className="space-y-6">
            {contentBlocks.map((block: any, i: number) => (
              <div key={i} className="bg-card rounded-lg border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-accent">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    {block.heading && (
                      <h2 className="font-display text-lg text-foreground mb-2">{block.heading}</h2>
                    )}
                    {block.body && (
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{block.body}</p>
                    )}
                    {block.tip && (
                      <div className="mt-3 bg-accent/5 border border-accent/20 rounded-md p-3 text-sm text-foreground">
                        💡 <strong>Tip:</strong> {block.tip}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checklist */}
          {checklistItems.length > 0 && (
            <div className="bg-card rounded-lg border p-6 mt-8">
              <h2 className="font-display text-xl text-foreground mb-4">Quick Checklist</h2>
              <ul className="space-y-2.5">
                {checklistItems.map((item: any, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{typeof item === "string" ? item : item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA to Community */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mt-8 text-center">
            <h3 className="font-display text-lg text-foreground mb-2">Want more help?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get a printable checklist or advice from other newcomers in the community.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Join the Community <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Related Guides */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-display text-foreground mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((a) => (
                <Link
                  key={a.id}
                  to={`/how-to/${a.slug}`}
                  className="group bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                >
                  {a.featured_image_url ? (
                    <div className="h-32 bg-muted">
                      <img src={a.featured_image_url} alt={a.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-32 bg-muted flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-muted-foreground opacity-30" />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs font-semibold text-accent uppercase">{a.category}</span>
                    <h3 className="font-semibold mt-1 text-foreground text-sm group-hover:text-accent transition-colors">
                      {a.title}
                    </h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {a.estimated_read_minutes} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
