import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { useArticles, useFeaturedArticles, useArticleCategories } from "@/hooks/useArticles";
import { format } from "date-fns";
import VideoTipModule from "@/components/VideoTipModule";

export default function HowToGuides() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories = [] } = useArticleCategories();
  const { data: featured = [] } = useFeaturedArticles(3);
  const { data: articles = [], isLoading } = useArticles({
    category: selectedCategory,
    search,
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-display text-primary-foreground mb-3">
            How-To Guides
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Practical, step-by-step guides to help you navigate essential services and daily life in Canada.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <div>
            {/* Search & Filters */}
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 bg-card rounded-lg border px-3 py-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Guides */}
            {!search && !selectedCategory && featured.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-display text-foreground mb-6">Featured Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featured.map((article) => (
                    <ArticleCard key={article.id} article={article} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Guides */}
            <div>
              <h2 className="text-2xl font-display text-foreground mb-6">
                {selectedCategory || "All Guides"}
              </h2>
              {isLoading ? (
                <p className="text-muted-foreground text-center py-8">Loading guides...</p>
              ) : articles.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No guides available yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We're working on practical guides for newcomers. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last space-y-4">
            <div className="sticky top-20">
              <VideoTipModule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, featured = false }: { article: any; featured?: boolean }) {
  return (
    <Link
      to={`/how-to/${article.slug}`}
      className="group bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
    >
      {article.featured_image_url ? (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-muted flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-muted-foreground/30" />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-accent uppercase">{article.category}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.estimated_read_minutes} min read
          </span>
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{article.summary}</p>
        )}
        <span className="text-accent text-sm font-semibold flex items-center gap-1 mt-3">
          Read Guide <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
