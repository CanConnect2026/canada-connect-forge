import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checklistStreams, type ChecklistPhase } from "@/data/checklistData";
import Breadcrumb from "@/components/Breadcrumb";

function getStorageKey(streamSlug: string) {
  return `canconnect-checklist-${streamSlug}`;
}

function loadChecked(streamSlug: string): Set<string> {
  try {
    const raw = localStorage.getItem(getStorageKey(streamSlug));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveChecked(streamSlug: string, checked: Set<string>) {
  localStorage.setItem(getStorageKey(streamSlug), JSON.stringify([...checked]));
}

export default function NewcomerChecklist() {
  const { stream } = useParams<{ stream: string }>();
  const streamData = checklistStreams.find((s) => s.slug === stream);
  const [activePhase, setActivePhase] = useState(0);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (stream) {
      setChecked(loadChecked(stream));
      setActivePhase(0);
    }
  }, [stream]);

  const toggleItem = useCallback(
    (itemId: string) => {
      if (!stream) return;
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) next.delete(itemId);
        else next.add(itemId);
        saveChecked(stream, next);
        return next;
      });
    },
    [stream]
  );

  if (!streamData) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-display text-foreground mb-4">Checklist not found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find a checklist for that pathway.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const phase = streamData.phases[activePhase];
  const totalItems = streamData.phases.reduce((sum, p) => sum + p.items.length, 0);
  const totalChecked = streamData.phases.reduce(
    (sum, p) => sum + p.items.filter((i) => checked.has(i.id)).length,
    0
  );
  const progressPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const phaseCheckedCount = (p: ChecklistPhase) => p.items.filter((i) => checked.has(i.id)).length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Newcomer Checklists", to: "/#checklists" },
          { label: streamData.label },
        ]}
      />

      <section className="py-10 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <Link to="/#checklists" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" /> All Checklists
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{streamData.emoji}</span>
              <h1 className="text-3xl md:text-4xl font-display text-foreground">{streamData.label} Checklist</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">{streamData.description}</p>
          </div>

          {/* Overall progress */}
          <div className="bg-card border border-border/60 rounded-xl p-5 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {totalChecked} of {totalItems} tasks completed
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your progress saves automatically in your browser — come back anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Phase sidebar */}
            <nav className="space-y-2">
              {streamData.phases.map((p, i) => {
                const done = phaseCheckedCount(p);
                const total = p.items.length;
                const isActive = activePhase === i;
                const isComplete = done === total;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePhase(i)}
                    className={`w-full text-left rounded-lg px-4 py-3 border transition-all ${
                      isActive
                        ? "bg-accent/10 border-accent text-foreground"
                        : "bg-card border-border/60 text-muted-foreground hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{p.title}</span>
                      {isComplete && total > 0 ? (
                        <span className="bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">✓</span>
                      ) : (
                        <span className="text-xs">{done}/{total}</span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5 opacity-70">{p.subtitle}</p>
                  </button>
                );
              })}
            </nav>

            {/* Checklist items */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-display text-foreground">{phase.title}</h2>
                <p className="text-muted-foreground text-sm">{phase.subtitle}</p>
              </div>

              <div className="space-y-3">
                {phase.items.map((item) => {
                  const isDone = checked.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`bg-card border rounded-lg p-4 transition-all ${
                        isDone ? "border-accent/40 bg-accent/5" : "border-border/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`mt-0.5 w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                            isDone
                              ? "bg-accent border-accent text-accent-foreground"
                              : "border-muted-foreground/40 hover:border-accent"
                          }`}
                          aria-label={isDone ? `Uncheck: ${item.label}` : `Check: ${item.label}`}
                        >
                          {isDone && <Check className="w-3 h-3" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`font-medium text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}
                          >
                            {item.label}
                          </span>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.directoryCategory && (
                              <Link
                                to={`/directory?category=${encodeURIComponent(item.directoryCategory)}`}
                                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                              >
                                Find services <ChevronRight className="w-3 h-3" />
                              </Link>
                            )}
                            {item.externalUrl && (
                              <a
                                href={item.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                              >
                                Official resource <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Phase navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
                <Button
                  variant="outline"
                  disabled={activePhase === 0}
                  onClick={() => setActivePhase((p) => p - 1)}
                  className="gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous Phase
                </Button>
                <Button
                  disabled={activePhase === streamData.phases.length - 1}
                  onClick={() => setActivePhase((p) => p + 1)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1"
                >
                  Next Phase <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
