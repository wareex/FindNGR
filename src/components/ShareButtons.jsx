// src/components/ShareButtons.jsx

import { useState } from "react";

const ShareButtons = ({ personName = "a missing person", reportId = "" }) => {
  const [copied, setCopied] = useState(false);

  // The URL to share — deeplinks to the specific report if you have IDs, else homepage
  const shareUrl = reportId
    ? `${window.location.origin}/?report=${reportId}`
    : window.location.origin;

  const shareText = `🚨 MISSING PERSON ALERT: Help find ${personName}! Please share widely. Every share could save a life. Report via FindNGR — Nigeria's missing persons platform.`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const platforms = [
    {
      name: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: "#25D366",
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: "X (Twitter)",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "#000000",
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      color: "#0088cc",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
      color: "#E4405F",
      // Instagram has no web share API — opens DMs
      url: `https://www.instagram.com/`,
      note: "Copy text & paste to your Story/DM",
    },
    {
      name: "Threads",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.868 1.206 8.602.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.859 3.13 3.513 5.466l-2.256.611c-1.099-4.06-3.986-6.022-8.097-6.048-2.944.02-5.13.932-6.49 2.717C4.56 6.16 3.877 8.577 3.852 12c.025 3.405.71 5.821 2.084 7.153 1.36 1.797 3.556 2.71 6.502 2.729 2.574-.013 4.226-.629 5.396-2.024.987-1.171 1.584-3.022 1.741-5.285a7.48 7.48 0 0 1-3.564.87c-2.835 0-5.318-1.395-6.177-3.461-.472-1.121-.482-2.39-.028-3.584.623-1.67 2.098-2.931 4.02-3.432a9.137 9.137 0 0 1 5.192.3c-.096-.967-.347-1.803-.768-2.485-.617-1.003-1.586-1.573-2.878-1.695l.217-2.254c1.993.191 3.537 1.104 4.49 2.641.688 1.117 1.059 2.564 1.102 4.3l.003.157-.138.07a11.255 11.255 0 0 1 1.354 1.225l.038.043-.02.056c.054.69.08 1.388.077 2.085-.003 3.164-.704 5.642-2.085 7.363C18.717 23.158 15.989 24 12.186 24zm.376-10.552c1.54 0 2.91-.559 3.78-1.531.085-.096.163-.197.234-.302-.918-.398-2.021-.582-3.13-.522-1.488.082-2.603.779-2.891 1.784-.14.493-.066 1.006.208 1.444.408.651 1.141.99 2.17 1.009a6.37 6.37 0 0 0 .443-.015c-.272-.289-.568-.657-.814-1.135l2.003-.997c.283.568.647 1.006 1.045 1.283a7.32 7.32 0 0 1-2.862.592c-.032 0-.064 0-.096-.001l-.09-.608z" />
        </svg>
      ),
      color: "#000000",
      url: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = `${shareText}\n\n${shareUrl}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Missing Person: ${personName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    }
  };

  return (
    <div className="share-section">
      <p className="share-label">📢 Spread the word — every share matters</p>

      <div className="share-buttons">
        {platforms.map((platform) => (
          
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
            style={{ "--platform-color": platform.color }}
            title={platform.note || `Share on ${platform.name}`}
          >
            {platform.icon}
            <span>{platform.name}</span>
          </a>
        ))}

        {/* Copy Link */}
        <button
          className={`share-btn share-btn--copy ${copied ? "copied" : ""}`}
          onClick={handleCopyLink}
          style={{ "--platform-color": "#6B7280" }}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>

        {/* Native Share (mobile) */}
        {typeof navigator !== "undefined" && navigator.share && (
          <button
            className="share-btn share-btn--native"
            onClick={handleNativeShare}
            style={{ "--platform-color": "#8B5CF6" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span>More</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;