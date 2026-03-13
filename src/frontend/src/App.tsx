import { useCallback, useEffect, useRef, useState } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const WA_ORDER = "https://wa.me/923267011101";
const WA_CATALOG = "https://wa.me/c/923267011101";
const AMBASSADOR_IMG =
  "/assets/uploads/Saanjh-Store-Extra_7611526269569797399-Slide0-1-1.jpeg";
const LOGO_IMG = "/assets/uploads/1773359477230-13.jpg";

const STORE_IMGS = [
  "/assets/uploads/Saanjh-Store-Extra_7611526269569797399-Slide0-1.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7612330899186797846-Slide0-2.jpeg",
  "/assets/uploads/Saanjh-Store_7615988968261307655-Slide0-3.jpeg",
  "/assets/uploads/Saanjh-Store_7614500340292963592-Slide0-4.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7611604083392236822-Slide0-5.jpeg",
  "/assets/uploads/Saanjh-Store_7615988968261307655-Slide0-1--6.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7611940536857185539-Slide0-7.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7610858454856584470-Slide1-8.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7560652602526977302-Slide1-10.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7569284247639346454-Slide1-11.jpeg",
  "/assets/uploads/Saanjh-Store-Extra_7560632198114708758-Slide0-12.jpeg",
];

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };
    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isClickable = el.closest(
        "a, button, [role='button'], input, select, textarea, label, [data-ocid]",
      );
      setHovering(!!isClickable);
    };
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", checkHover);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", checkHover);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor ${hovering ? "hovering" : ""}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
      />
    </>
  );
}

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, Number.parseInt(delay));
          }
        }
      },
      { threshold: 0.1 },
    );
    const elements = document.querySelectorAll(".section-reveal, .card-reveal");
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={`star-${i}`}
          className={i <= rating ? "star-filled" : "star-empty"}
          style={{ fontSize: "16px" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const letters = "SAANJH".split("");

  useEffect(() => {
    const timer = setTimeout(onDone, 3200);
    return () => clearTimeout(timer);
  }, [onDone]);

  // Particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    duration: `${3 + Math.random() * 5}s`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Gold particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: 0.4 + Math.random() * 0.6,
          }}
        />
      ))}

      {/* Main content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        {/* SAANJH letters */}
        <div
          style={{
            display: "flex",
            gap: "0.1em",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={letter + String(i)}
              className="letter-animate"
              style={{
                fontSize: "clamp(56px, 12vw, 120px)",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #B8960C, #FFD700, #D4AF37, #FFF1A8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.15em",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* FRAGRANCE subtitle */}
        <div
          className="fade-subtitle"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(12px, 3vw, 18px)",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            opacity: 0,
            marginBottom: "40px",
          }}
        >
          FRAGRANCE
        </div>

        {/* Loading bar container */}
        <div
          style={{
            width: "200px",
            height: "2px",
            background: "rgba(212,175,55,0.2)",
            borderRadius: "2px",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <div
            className="loading-bar-fill shimmer-bar"
            style={{ height: "100%", width: 0, borderRadius: "2px" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── POPUP ────────────────────────────────────────────────────────────────────
function PromoPopup({ onClose }: { onClose: () => void }) {
  const [seconds, setSeconds] = useState(3600); // 1 hour

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      data-ocid="promo.modal"
    >
      <div
        style={{
          background: "linear-gradient(160deg, #0e0e0e, #1a1505)",
          border: "1px solid rgba(212,175,55,0.4)",
          borderRadius: "12px",
          maxWidth: "480px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Gold shimmer top bar */}
        <div className="shimmer-bar" style={{ height: "4px", width: "100%" }} />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="promo.close_button"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "rgba(212,175,55,0.7)",
            fontSize: "24px",
            lineHeight: 1,
            padding: "4px",
            zIndex: 1,
          }}
        >
          ×
        </button>

        <div style={{ padding: "32px 32px 28px" }}>
          {/* Headline */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "#D4AF37",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              ✦ Limited Time Only ✦
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 5vw, 30px)",
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              Exclusive Offer
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
              Order now and get free home delivery!
            </p>
          </div>

          {/* Timer */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
              padding: "16px",
              background: "rgba(212,175,55,0.07)",
              borderRadius: "8px",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#D4AF37",
                marginBottom: "6px",
              }}
            >
              OFFER EXPIRES IN
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 8vw, 42px)",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #B8960C, #FFD700, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.05em",
              }}
            >
              {formatTime(seconds)}
            </div>
          </div>

          {/* Benefits */}
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              "Free Cash on Delivery — All Pakistan",
              "8-10 Hours Lasting Fragrance",
              "Premium Luxury Packaging",
            ].map((benefit) => (
              <div
                key={benefit}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "rgba(212,175,55,0.15)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "12px",
                    color: "#D4AF37",
                  }}
                >
                  ✓
                </div>
                <span
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={WA_ORDER}
            target="_blank"
            rel="noreferrer"
            data-ocid="promo.primary_button"
            style={{
              display: "block",
              textAlign: "center",
              padding: "14px 24px",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "15px",
              letterSpacing: "0.05em",
              textDecoration: "none",
              color: "#0a0a0a",
              marginBottom: "14px",
            }}
            className="shimmer-bar"
          >
            Claim Offer on WhatsApp →
          </a>

          {/* Skip */}
          <button
            type="button"
            onClick={onClose}
            data-ocid="promo.cancel_button"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.35)",
              fontSize: "12px",
              display: "block",
              width: "100%",
              textAlign: "center",
              textDecoration: "underline",
              padding: "4px",
            }}
          >
            No thanks, I'll pay full price and miss this deal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "16px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background 0.4s ease, padding 0.3s ease",
    background: scrolled ? "rgba(5,5,5,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={LOGO_IMG}
          alt="Saanjh Fragrance Logo"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #B8960C, #FFD700, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.1em",
            }}
          >
            SAANJH
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(212,175,55,0.6)",
              marginTop: "-2px",
            }}
          >
            FRAGRANCE
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["Home", "Perfumes", "Ambassador", "Reviews"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-ocid={`nav.${item.toLowerCase()}.link`}
            style={{
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontSize: "13px",
              letterSpacing: "0.05em",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.75)";
            }}
          >
            {item}
          </a>
        ))}
        <a
          href={WA_ORDER}
          target="_blank"
          rel="noreferrer"
          data-ocid="nav.order.primary_button"
          style={{
            padding: "8px 20px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            color: "#0a0a0a",
            letterSpacing: "0.05em",
          }}
          className="shimmer-bar"
        >
          Order Now
        </a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${AMBASSADOR_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark gradient overlay - bottom to top so person visible at top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      {/* Side dark gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 20px",
          paddingBottom: "80px",
          marginTop: "auto",
          width: "100%",
          maxWidth: "800px",
          alignSelf: "flex-end",
          paddingTop: "40vh",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            marginBottom: "16px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✦ PREMIUM FRAGRANCES FROM PAKISTAN ✦
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 10vw, 90px)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "16px",
            color: "#fff",
          }}
        >
          SAANJH{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8960C, #FFD700, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FRAGRANCE
          </span>
        </h1>
        <p
          style={{
            fontSize: "clamp(14px, 2.5vw, 19px)",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "36px",
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
            letterSpacing: "0.03em",
          }}
        >
          Imported Oils · 8–10 Hours Lasting · Free COD All Pakistan
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={WA_ORDER}
            target="_blank"
            rel="noreferrer"
            data-ocid="hero.primary_button"
            style={{
              padding: "14px 32px",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              color: "#0a0a0a",
              letterSpacing: "0.08em",
              display: "inline-block",
            }}
            className="shimmer-bar"
          >
            Order on WhatsApp
          </a>
          <a
            href={WA_CATALOG}
            target="_blank"
            rel="noreferrer"
            data-ocid="hero.secondary_button"
            style={{
              padding: "14px 32px",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.6)",
              letterSpacing: "0.08em",
              display: "inline-block",
              background: "rgba(212,175,55,0.06)",
            }}
          >
            View Catalog
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(212,175,55,0.6)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span>SCROLL</span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}

// ─── TRUST BADGES MARQUEE ─────────────────────────────────────────────────────
function TrustMarquee() {
  const badges = [
    "🚚 Free Cash On Delivery",
    "⏱️ 8–10 Hours Lasting",
    "📦 Premium Packaging",
    "💯 100% Original Oils",
    "📞 24/7 WhatsApp Support",
    "🌿 Imported Natural Oils",
    "🎁 Gift Ready",
    "⭐ 4.8/5 Customer Rating",
  ];
  const doubled = [...badges, ...badges];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(212,175,55,0.2)",
        borderBottom: "1px solid rgba(212,175,55,0.2)",
        background: "rgba(212,175,55,0.04)",
        padding: "14px 0",
      }}
    >
      <div
        className="trust-marquee"
        style={{ display: "flex", gap: "60px", width: "max-content" }}
      >
        {doubled.map((b, i) => (
          <span
            key={b + String(i)}
            style={{
              color: "rgba(212,175,55,0.8)",
              fontSize: "13px",
              letterSpacing: "0.1em",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PERFUME CARD ─────────────────────────────────────────────────────────────
interface PerfumeCardProps {
  name: string;
  size: string;
  priceRange: string;
  primaryImg: string;
  hoverImg: string;
  description: string;
  index: number;
}

function PerfumeCard({
  name,
  size,
  priceRange,
  primaryImg,
  hoverImg,
  description,
  index,
}: PerfumeCardProps) {
  return (
    <div
      className="perfume-card card-reveal"
      data-delay={`${index * 150}`}
      data-ocid={`perfume.card.${index + 1}`}
      style={{
        background: "linear-gradient(145deg, #111, #0e0c04)",
        border: "1px solid rgba(212,175,55,0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(212,175,55,0.7)";
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-8px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 20px 60px rgba(212,175,55,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(212,175,55,0.2)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Image swap container */}
      <div
        style={{ position: "relative", height: "320px", overflow: "hidden" }}
      >
        <img
          src={primaryImg}
          alt={name}
          className="hover-swap-img img-primary"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <img
          src={hoverImg}
          alt={`${name} alternate`}
          className="hover-swap-img img-secondary"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Hover label */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "rgba(212,175,55,0.8)",
            fontFamily: "'DM Sans', sans-serif",
            background: "rgba(0,0,0,0.6)",
            padding: "4px 8px",
            borderRadius: "3px",
          }}
        >
          HOVER TO PREVIEW
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "rgba(212,175,55,0.6)",
            marginBottom: "6px",
          }}
        >
          {size}
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            color: "#fff",
            marginBottom: "8px",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "16px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {priceRange}
          </span>
          <Stars rating={5} />
        </div>
        <a
          href={`${WA_ORDER}?text=Assalam o Alaikum! I want to order: ${encodeURIComponent(name)}`}
          target="_blank"
          rel="noreferrer"
          data-ocid={`perfume.order_button.${index + 1}`}
          style={{
            display: "block",
            textAlign: "center",
            padding: "12px",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "#0a0a0a",
          }}
          className="shimmer-bar"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── PERFUMES SECTION ────────────────────────────────────────────────────────
function PerfumesSection() {
  const perfumes: PerfumeCardProps[] = [
    {
      name: "Waddi Sarkar",
      size: "50 ML",
      priceRange: "PKR 2,199 – 2,400",
      primaryImg: AMBASSADOR_IMG,
      hoverImg: STORE_IMGS[2],
      description:
        "A bold, earthy outdoor fragrance with deep green notes. The signature scent of Saanjh — powerful and long-lasting.",
      index: 0,
    },
    {
      name: "101 Special",
      size: "50 ML",
      priceRange: "PKR 2,199 – 2,400",
      primaryImg: STORE_IMGS[4],
      hoverImg: STORE_IMGS[5],
      description:
        "A refined, sophisticated blend with warm woody undertones. Perfect for evening and formal occasions.",
      index: 1,
    },
    {
      name: "Yomoo Poloo",
      size: "30 ML",
      priceRange: "PKR 1,499 – 1,900",
      primaryImg: STORE_IMGS[7],
      hoverImg: STORE_IMGS[6],
      description:
        "Elegant and fresh — a light fragrance for daily wear with delicate floral notes over a warm base.",
      index: 2,
    },
  ];

  return (
    <section
      id="perfumes"
      style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div
        className="section-reveal"
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✦ OUR COLLECTION ✦
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Signature{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Perfumes
          </span>
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "15px",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Crafted with imported oils, designed to leave an unforgettable
          impression.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
        }}
      >
        {perfumes.map((p) => (
          <PerfumeCard key={p.name} {...p} />
        ))}
      </div>
    </section>
  );
}

// ─── AMBASSADOR SECTION ───────────────────────────────────────────────────────
function AmbassadorSection() {
  return (
    <section
      id="ambassador"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 40px",
      }}
    >
      {/* Blurred background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${AMBASSADOR_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.25)",
          transform: "scale(1.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,4,1,0.7)",
        }}
      />

      <div
        className="section-reveal"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* Portrait */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Outer glow */}
          <div
            className="pulse-gold"
            style={{
              width: "300px",
              height: "380px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            {/* Corner frames */}
            <div
              className="corner-frame"
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
            />
            <div
              className="corner-frame-inner"
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
            />
            <img
              src={AMBASSADOR_IMG}
              alt="Brand Ambassador"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                borderRadius: "4px",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "#D4AF37",
              marginBottom: "12px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ✦ BRAND AMBASSADOR ✦
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              color: "#fff",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Our Brand{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B8960C, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ambassador
            </span>
          </h2>
          <blockquote
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.8)",
              borderLeft: "3px solid #D4AF37",
              paddingLeft: "20px",
              marginBottom: "20px",
              lineHeight: 1.7,
            }}
          >
            "Saanjh ka scent mujhe apna laga — it's not just a fragrance, it's a
            feeling. Pure, lasting, and unforgettable."
          </blockquote>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Holding the iconic Waddi Sarkar bottle — our ambassador represents
            the spirit of Saanjh Fragrance: bold, authentic, and rooted in the
            culture of Pakistan.
          </p>
          <a
            href={WA_ORDER}
            target="_blank"
            rel="noreferrer"
            data-ocid="ambassador.primary_button"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              color: "#0a0a0a",
              letterSpacing: "0.05em",
            }}
            className="shimmer-bar"
          >
            Order His Fragrance →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── WHY SAANJH ───────────────────────────────────────────────────────────────
function WhySaanjhSection() {
  const cards = [
    {
      icon: "🚚",
      title: "Free Cash on Delivery",
      desc: "All over Pakistan — no advance payment needed",
    },
    {
      icon: "⏱️",
      title: "8-10 Hours Lasting",
      desc: "Long-lasting imported perfume oils that stay all day",
    },
    {
      icon: "📦",
      title: "Premium Packaging",
      desc: "Luxury gift-ready packaging for every order",
    },
    {
      icon: "💯",
      title: "100% Original",
      desc: "Imported perfume oils — no duplicates, no compromise",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      desc: "WhatsApp support available anytime, any day",
    },
    {
      icon: "🌿",
      title: "Natural Imported Oils",
      desc: "Finest natural and imported ingredients in every bottle",
    },
    {
      icon: "🎁",
      title: "Gift Ready",
      desc: "Perfect for gifts, weddings, and special occasions",
    },
    {
      icon: "⭐",
      title: "4.8/5 Rating",
      desc: "Loved by 500+ satisfied customers across Pakistan",
    },
  ];

  return (
    <section
      style={{
        padding: "100px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        className="section-reveal"
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✦ WHY CHOOSE US ✦
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            color: "#fff",
          }}
        >
          Why{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Saanjh?
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="card-reveal"
            data-delay={`${i * 80}`}
            data-ocid={`why.card.${i + 1}`}
            style={{
              background: "linear-gradient(145deg, #111108, #0e0c04)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: "8px",
              padding: "28px 24px",
              transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(212,175,55,0.5)";
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 10px 40px rgba(212,175,55,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(212,175,55,0.15)";
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "14px" }}>
              {card.icon}
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "17px",
                color: "#D4AF37",
                marginBottom: "8px",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── REVIEWS SECTION ─────────────────────────────────────────────────────────
function ReviewsSection() {
  const ratingBars = [
    { stars: 5, pct: 83 },
    { stars: 4, pct: 11 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  const reviews = [
    {
      name: "Ahmed Raza",
      rating: 5,
      date: "February 2026",
      text: "Bilkul shandar hai yeh fragrance! Main ne 2 bottle le liye — ek ghar ke liye, ek gift ke liye. Har koi poochta hai kaunsa scent hai. Literally best purchase of the year!",
    },
    {
      name: "Sara Khan",
      rating: 5,
      date: "January 2026",
      text: "Mashallah bahut acha scent hai. Lasting bhi kamaal ki hai — 8+ hours easily. Office mein log compliments dete hain. Packaging bhi bohot khoobsurat thi. Highly recommended!",
    },
    {
      name: "Muhammad Bilal",
      rating: 4,
      date: "March 2026",
      text: "Good product overall. Delivery bhi fast thi, 2 din mein aa gai. Packaging premium thi, bilkul gift jesi. Scent fresh aur long-lasting hai. Zaroor dobara order karunga.",
    },
    {
      name: "Ayesha Noor",
      rating: 3,
      date: "January 2026",
      text: "Scent acha hai lekin mujhe thoda zyada lasting chahiye thi. Shayad meri skin pe thoda kam rehta hai. Overall theek hai, packaging bohot achi thi. Service bhi fast thi.",
    },
    {
      name: "Usman Ali",
      rating: 5,
      date: "February 2026",
      text: "Saanjh fragrance ne dil jeet liya yaar! Main impress hua. Pehle doubt tha lekin order karne ke baad soch bhi nahi sakta tha aisa acha ho ga. Pure gold scent hai yeh!",
    },
    {
      name: "Fatima Malik",
      rating: 5,
      date: "December 2025",
      text: "Meri baji ki shaadi pe yeh gifted ki — sab ne poochha kahan se liya! Packaging aur fragrance dono pe sab impressed the. Saanjh ki quality ne expectations se zyada kiya.",
    },
  ];

  return (
    <section
      id="reviews"
      style={{
        padding: "100px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        className="section-reveal"
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✦ CUSTOMER REVIEWS ✦
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            color: "#fff",
          }}
        >
          What Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Customers Say
          </span>
        </h2>
      </div>

      {/* Rating overview */}
      <div
        className="section-reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "40px",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto 60px",
          padding: "32px",
          background: "linear-gradient(145deg, #111, #0e0c04)",
          border: "1px solid rgba(212,175,55,0.2)",
          borderRadius: "8px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "64px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            4.8
          </div>
          <Stars rating={5} />
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            500+ reviews
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {ratingBars.map((bar) => (
            <div
              key={bar.stars}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  width: "32px",
                  textAlign: "right",
                }}
              >
                {bar.stars}★
              </span>
              <div
                style={{
                  flex: 1,
                  height: "6px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="shimmer-bar"
                  style={{
                    height: "100%",
                    width: `${bar.pct}%`,
                    borderRadius: "3px",
                    transition: "width 1.5s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  width: "32px",
                }}
              >
                {bar.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {reviews.map((review, i) => (
          <div
            key={review.name}
            className="card-reveal"
            data-delay={`${i * 100}`}
            data-ocid={`reviews.item.${i + 1}`}
            style={{
              background: "linear-gradient(145deg, #111, #0e0c04)",
              border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "4px",
                  }}
                >
                  {review.name}
                </div>
                <Stars rating={review.rating} />
              </div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  padding: "3px 8px",
                  borderRadius: "3px",
                }}
              >
                ✓ Verified Purchase
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
              }}
            >
              {review.text}
            </p>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                marginTop: "12px",
              }}
            >
              {review.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
function GallerySection() {
  const allImages = [AMBASSADOR_IMG, ...STORE_IMGS.slice(0, 8)];

  return (
    <section
      style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div
        className="section-reveal"
        style={{ textAlign: "center", marginBottom: "50px" }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✦ GALLERY ✦
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4vw, 40px)",
            color: "#fff",
          }}
        >
          Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Collection
          </span>
        </h2>
      </div>

      <div
        className="section-reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "12px",
        }}
      >
        {/* First tile — large, spans 2 cols and 2 rows */}
        <div
          style={{
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
            position: "relative",
            overflow: "hidden",
            borderRadius: "8px",
            height: "400px",
          }}
          onMouseEnter={(e) => {
            const overlay = e.currentTarget.querySelector(
              ".gallery-overlay",
            ) as HTMLElement;
            if (overlay) overlay.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            const overlay = e.currentTarget.querySelector(
              ".gallery-overlay",
            ) as HTMLElement;
            if (overlay) overlay.style.opacity = "0";
          }}
        >
          <img
            src={allImages[0]}
            alt="Ambassador"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1)";
            }}
          />
          <div
            className="gallery-overlay"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(212,175,55,0.15)",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </div>

        {/* Remaining tiles */}
        {allImages.slice(1, 9).map((img, i) => (
          <div
            key={img}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
              height: "194px",
            }}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector(
                ".gallery-overlay",
              ) as HTMLElement;
              if (overlay) overlay.style.opacity = "1";
              const imgEl = e.currentTarget.querySelector(
                "img",
              ) as HTMLImageElement;
              if (imgEl) imgEl.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector(
                ".gallery-overlay",
              ) as HTMLElement;
              if (overlay) overlay.style.opacity = "0";
              const imgEl = e.currentTarget.querySelector(
                "img",
              ) as HTMLImageElement;
              if (imgEl) imgEl.style.transform = "scale(1)";
            }}
          >
            <img
              src={img}
              alt={`Gallery ${i + 2}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
            <div
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(212,175,55,0.15)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── OWNER SECTION ────────────────────────────────────────────────────────────
function OwnerSection() {
  return (
    <section
      style={{ padding: "80px 40px", maxWidth: "900px", margin: "0 auto" }}
    >
      <div
        className="section-reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "48px",
          alignItems: "center",
          padding: "40px",
          background: "linear-gradient(145deg, #111, #0e0c04)",
          border: "1px solid rgba(212,175,55,0.2)",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/assets/uploads/Screenshot_20260313-041954-9.jpg"
            alt="LaLa Saraiki — Founder"
            style={{
              width: "160px",
              height: "200px",
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: "8px",
              border: "2px solid rgba(212,175,55,0.4)",
              boxShadow: "0 0 30px rgba(212,175,55,0.2)",
            }}
          />
          <div
            style={{
              marginTop: "12px",
              fontSize: "13px",
              color: "rgba(212,175,55,0.8)",
              letterSpacing: "0.1em",
            }}
          >
            LaLa Saraiki
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
              marginTop: "2px",
            }}
          >
            Founder & Owner
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: "#D4AF37",
              marginBottom: "12px",
            }}
          >
            ✦ FOUNDER'S STORY ✦
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Made With{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B8960C, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Passion
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "15px",
              lineHeight: 1.8,
            }}
          >
            Saanjh Fragrance is a labor of love — born from a deep appreciation
            for the art of perfumery. Every bottle is handpicked and
            quality-checked to ensure you receive nothing but the finest
            fragrance experience. Cash on delivery, premium packaging, and 24/7
            support — because you deserve the best.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      style={{
        padding: "80px 40px",
        textAlign: "center",
        background:
          "linear-gradient(to bottom, transparent, rgba(212,175,55,0.03))",
      }}
    >
      <div className="section-reveal">
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#D4AF37",
            marginBottom: "12px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✦ GET IN TOUCH ✦
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Order Your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8960C, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Fragrance
          </span>
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "15px",
            marginBottom: "40px",
            maxWidth: "400px",
            margin: "0 auto 40px",
          }}
        >
          Reach us on WhatsApp for instant support and orders.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={WA_ORDER}
            target="_blank"
            rel="noreferrer"
            data-ocid="contact.primary_button"
            style={{
              padding: "14px 32px",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
              color: "#0a0a0a",
              letterSpacing: "0.05em",
            }}
            className="shimmer-bar"
          >
            📱 +92 326-7011101
          </a>
          <a
            href={WA_CATALOG}
            target="_blank"
            rel="noreferrer"
            data-ocid="contact.secondary_button"
            style={{
              padding: "14px 32px",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.5)",
              background: "rgba(212,175,55,0.05)",
              letterSpacing: "0.05em",
            }}
          >
            View Full Catalog →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const host =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(212,175,55,0.15)",
        padding: "40px",
        textAlign: "center",
        background: "rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <img
          src={LOGO_IMG}
          alt="Saanjh"
          style={{
            width: "32px",
            height: "32px",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "16px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #B8960C, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.15em",
          }}
        >
          SAANJH FRAGRANCE
        </span>
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: "13px",
          marginBottom: "8px",
        }}
      >
        Free COD · 8-10 Hours Lasting · Premium Packaging · All Pakistan
      </p>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
        © {year}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${host}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(212,175,55,0.4)", textDecoration: "none" }}
        >
          Built with ❤ using caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handleLoadingDone = useCallback(() => {
    setLoading(false);
    // Show popup after 2 seconds
    setTimeout(() => setShowPopup(true), 2000);
  }, []);

  useScrollReveal();

  return (
    <div style={{ minHeight: "100vh", background: "oklch(8% 0.01 30)" }}>
      <CustomCursor />

      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      {showPopup && <PromoPopup onClose={() => setShowPopup(false)} />}

      <Navbar />

      <main>
        <Hero />
        <TrustMarquee />
        <PerfumesSection />
        <AmbassadorSection />
        <WhySaanjhSection />
        <GallerySection />
        <ReviewsSection />
        <OwnerSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
