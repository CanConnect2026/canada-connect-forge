import { useState, useRef, useEffect } from "react";
import { Share2, Copy, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: "icon" | "button";
}

export default function ShareButton({ title, text, url, className = "", variant = "icon" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const menuRef = useRef<HTMLDivElement>(null);
  const shareUrl = url || window.location.href;
  const shareText = text || title;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        return;
      } catch {
        // User cancelled or not supported, fall through to menu
      }
    }
    setOpen(true);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link copied", description: "The link has been copied to your clipboard." });
    setTimeout(() => { setCopied(false); setOpen(false); }, 1500);
  };

  const shareOptions = [
    { label: "Copy Link", icon: copied ? Check : Copy, action: copyLink },
    { label: "WhatsApp", icon: null, emoji: "💬", href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}` },
    { label: "Facebook", icon: null, emoji: "📘", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { label: "X", icon: null, emoji: "𝕏", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
    { label: "LinkedIn", icon: null, emoji: "💼", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { label: "Email", icon: null, emoji: "✉️", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}` },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className={
          variant === "button"
            ? "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors px-3 py-1.5 rounded-md border border-border hover:border-accent/30"
            : "inline-flex items-center justify-center text-muted-foreground hover:text-accent transition-colors p-1.5 rounded-md hover:bg-muted"
        }
        title="Share"
      >
        <Share2 className="w-4 h-4" />
        {variant === "button" && <span>Share</span>}
      </button>

      {open && (
        <div ref={menuRef} className="absolute right-0 top-full mt-2 z-50 bg-card border rounded-lg shadow-lg p-2 min-w-[180px]">
          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b">
            <span className="text-xs font-medium text-muted-foreground">Share</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {shareOptions.map(opt => (
            opt.action ? (
              <button
                key={opt.label}
                onClick={opt.action}
                className="flex items-center gap-2.5 w-full px-2 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {opt.icon && <opt.icon className="w-4 h-4" />}
                {opt.label}
              </button>
            ) : (
              <a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 w-full px-2 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <span className="w-4 text-center text-sm">{opt.emoji}</span>
                {opt.label}
              </a>
            )
          ))}
        </div>
      )}
    </div>
  );
}
