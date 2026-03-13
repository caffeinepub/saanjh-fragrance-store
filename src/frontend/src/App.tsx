import { useCallback, useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "923267011101";
const WHATSAPP_CATALOG = "https://wa.me/c/923267011101";

interface Product {
  id: number;
  name: string;
  size: string;
  originalPrice: number;
  salePrice: number;
  message: string;
  images: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Waddi Sarkar",
    size: "50 ML",
    originalPrice: 2400,
    salePrice: 2199,
    message: "I want to order Waddi Sarkar (50ML)",
    images: [
      "/assets/uploads/Saanjh-Store-Extra_7611526269569797399-Slide0-1.jpeg",
      "/assets/uploads/Saanjh-Store-Extra_7612330899186797846-Slide0-2.jpeg",
      "/assets/uploads/Saanjh-Store-Extra_7611604083392236822-Slide0-5.jpeg",
      "/assets/uploads/Saanjh-Store-Extra_7611940536857185539-Slide0-7.jpeg",
      "/assets/uploads/Saanjh-Store-Extra_7610858454856584470-Slide1-8.jpeg",
      "/assets/uploads/Saanjh-Store-Extra_7560652602526977302-Slide1-10.jpeg",
    ],
  },
  {
    id: 2,
    name: "101 Special",
    size: "50 ML",
    originalPrice: 2400,
    salePrice: 2199,
    message: "I want to order 101 Special (50ML)",
    images: [
      "/assets/uploads/Saanjh-Store_7615988968261307655-Slide0-3.jpeg",
      "/assets/uploads/Saanjh-Store_7614500340292963592-Slide0-4.jpeg",
      "/assets/uploads/Saanjh-Store_7615988968261307655-Slide0-1--6.jpeg",
    ],
  },
  {
    id: 3,
    name: "Yomoo Poloo",
    size: "30 ML",
    originalPrice: 1900,
    salePrice: 1499,
    message: "I want to order Yomoo Poloo (30ML)",
    images: [
      "/assets/uploads/Saanjh-Store-Extra_7569284247639346454-Slide1-11.jpeg",
      "/assets/uploads/Saanjh-Store-Extra_7560632198114708758-Slide0-12.jpeg",
    ],
  },
];

const REVIEWS = [
  {
    id: "ahmed-raza",
    name: "Ahmed Raza",
    city: "Lahore",
    rating: 5,
    text: "Waddi Sarkar is absolutely amazing! Lasted the whole day. The scent is powerful yet elegant — exactly what I wanted. Highly recommend to everyone!",
    initials: "AR",
  },
  {
    id: "sara-khan",
    name: "Sara Khan",
    city: "Karachi",
    rating: 5,
    text: "101 Special is my go-to perfume now. The packaging is so premium and the scent is absolutely divine. Will definitely order again and again!",
    initials: "SK",
  },
  {
    id: "muhammad-bilal",
    name: "Muhammad Bilal",
    city: "Islamabad",
    rating: 5,
    text: "Fast delivery, Cash on Delivery option, and the perfume quality is truly top-notch. Saanjh Fragrance exceeded all my expectations!",
    initials: "MB",
  },
  {
    id: "ayesha-noor",
    name: "Ayesha Noor",
    city: "Faisalabad",
    rating: 5,
    text: "Yomoo Poloo is a hidden gem. Unique scent, lasts for hours, and the bottle is gorgeous. Saanjh Fragrance never disappoints — 100% recommended!",
    initials: "AN",
  },
];

const TRUST_BADGES = [
  { id: "cod", icon: "🚚", text: "Free Cash On Delivery All Pakistan" },
  { id: "lasting", icon: "⏰", text: "8-10 Hours Lasting" },
  { id: "oils", icon: "🌿", text: "Imported Perfume Oils" },
  { id: "packaging", icon: "🎁", text: "Premium Packaging" },
  { id: "support", icon: "💬", text: "24/7 Customer Support" },
];

const PROMISE_FEATURES = [
  {
    id: "quality",
    icon: "✦",
    title: "Premium Quality",
    desc: "Every oil is hand-selected from top international fragrance houses.",
  },
  {
    id: "delivery",
    icon: "🚚",
    title: "Free COD Delivery",
    desc: "Cash on delivery — no advance payment. Delivered across all of Pakistan.",
  },
  {
    id: "longevity",
    icon: "⏳",
    title: "8–10 Hour Lasting",
    desc: "Our concentration ensures your scent stays with you all day long.",
  },
  {
    id: "support",
    icon: "💎",
    title: "White Glove Support",
    desc: "24/7 personal support. We answer every question before and after your order.",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".fade-in-up, .fade-in");
    for (const el of Array.from(elements)) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}

function useParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      el.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return ref;
}

function useCardTilt(cardRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-14px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.01)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "";
      card.style.transition =
        "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };

    const handleMouseEnter = () => {
      card.style.transition = "transform 0.1s ease";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cardRef]);
}

function useCounter(target: string, trigger: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    const num = Number.parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/[0-9]/g, "");
    if (Number.isNaN(num)) {
      setDisplay(target);
      return;
    }
    let start = 0;
    const duration = 1200;
    const step = duration / num;
    const timer = setInterval(() => {
      start += Math.max(1, Math.floor(num / 40));
      if (start >= num) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(`${start}${suffix}`);
      }
    }, step);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return display;
}

// ─── WhatsApp SVG Icon ────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────

const STAR_KEYS = [1, 2, 3, 4, 5];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.slice(0, count).map((k) => (
        <svg
          key={k}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#f5c518"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── ProductCard ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useCardTilt(cardRef);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  }, [product.images.length]);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  }, [product.images.length]);

  useEffect(() => {
    const timer = setInterval(nextImage, 3500);
    return () => clearInterval(timer);
  }, [nextImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? nextImage() : prevImage();
    }
    touchStartX.current = null;
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product.message)}`;
  const delay = index * 180;
  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100,
  );

  return (
    <div
      ref={cardRef}
      className="product-card fade-in-up rounded-2xl overflow-hidden relative"
      style={{ transitionDelay: `${delay}ms`, transformStyle: "preserve-3d" }}
      data-ocid={`product.card.${index + 1}`}
    >
      {/* Glow border overlay */}
      <div className="product-card-glow" />

      {/* ── Image carousel ── */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "340px",
          background: "oklch(16% 0.018 285)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {product.images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${product.name} view ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentImage ? "float-image" : ""}`}
            style={{ opacity: i === currentImage ? 1 : 0 }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(18% 0.02 285 / 0.9))",
          }}
        />

        {/* Navigation arrows */}
        {product.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-black/80 hover:scale-110 z-10"
              aria-label="Previous image"
              data-ocid={`product.pagination_prev.${index + 1}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:bg-black/80 hover:scale-110 z-10"
              aria-label="Next image"
              data-ocid={`product.pagination_next.${index + 1}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {product.images.map((imgSrc, i) => (
              <button
                type="button"
                key={imgSrc}
                onClick={() => setCurrentImage(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentImage ? "22px" : "6px",
                  height: "6px",
                  background:
                    i === currentImage
                      ? "oklch(86% 0.14 88)"
                      : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Sale badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full tracking-wider"
            style={{
              background:
                "linear-gradient(135deg, oklch(86% 0.14 88), oklch(72% 0.12 80))",
              color: "oklch(12% 0.01 285)",
              boxShadow: "0 2px 12px oklch(78% 0.13 82 / 0.5)",
            }}
          >
            SALE
          </span>
        </div>

        {/* Discount badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-xs font-bold px-2.5 py-1.5 rounded-full"
            style={{
              background: "oklch(55% 0.18 25)",
              color: "white",
            }}
          >
            -{discount}%
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="product-card-body px-5 py-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="font-display text-xl font-bold"
              style={{ color: "oklch(94% 0.012 85)" }}
            >
              {product.name}
            </h3>
            <p
              className="font-body text-xs tracking-wider mt-0.5"
              style={{ color: "oklch(62% 0.02 85)" }}
            >
              {product.size} · EAU DE PARFUM
            </p>
          </div>
          <div className="text-right">
            <p
              className="font-display text-xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(88% 0.15 88), oklch(72% 0.12 80))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PKR {product.salePrice.toLocaleString()}
            </p>
            <p
              className="font-body text-xs line-through mt-0.5"
              style={{ color: "oklch(50% 0.015 85)" }}
            >
              PKR {product.originalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Stars count={5} />
          <span
            className="font-body text-xs"
            style={{ color: "oklch(58% 0.015 85)" }}
          >
            (48 reviews)
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-semibold text-sm"
          data-ocid={`product.primary_button.${index + 1}`}
        >
          <WhatsAppIcon size={18} />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "oklch(13% 0.014 285 / 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid oklch(78% 0.13 82 / 0.14)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Text-only brand logo — no photo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            {/* Decorative ornament */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 group-hover:scale-110"
              style={{
                borderColor: "oklch(78% 0.13 82 / 0.45)",
                background: "oklch(78% 0.13 82 / 0.08)",
                boxShadow: "0 0 16px oklch(78% 0.13 82 / 0.25)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 2 L18.5 13 L29 8 L21 17 L30 22 L18.5 20 L20 31 L16 22 L12 31 L13.5 20 L2 22 L11 17 L3 8 L13.5 13 Z"
                  fill="oklch(86% 0.14 88)"
                  opacity="0.9"
                />
              </svg>
            </div>
            <div className="leading-tight">
              <span
                className="font-display font-bold text-sm md:text-base block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(92% 0.12 90), oklch(78% 0.13 82) 50%, oklch(96% 0.09 92))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Saanjh
              </span>
              <span
                className="font-body text-xs tracking-widest uppercase"
                style={{ color: "oklch(60% 0.018 85)" }}
              >
                Fragrance
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-body text-sm font-medium text-foreground/80 hover:text-foreground"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_CATALOG}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn px-5 py-2.5 rounded-full text-sm font-semibold"
              data-ocid="nav.primary_button"
            >
              Order Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderColor: "oklch(78% 0.13 82 / 0.2)" }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm font-medium text-foreground/80 py-2"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_CATALOG}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn py-3 px-5 rounded-xl font-semibold text-sm text-center"
                data-ocid="nav.primary_button"
              >
                Order Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────

function HeroParticles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    size: 2.5 + ((i * 1.618) % 5.5),
    left: (i * 4.78) % 100,
    duration: 9 + ((i * 2.1) % 13),
    delay: (i * 0.8) % 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Section Divider ─────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="section-divider w-full max-w-xs mx-auto my-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
          fill="oklch(86% 0.14 88)"
        />
      </svg>
    </div>
  );
}

// ─── Stat Counter ─────────────────────────────────────────────────────────────

function StatCounter({ number, label }: { number: string; label: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const displayed = useCounter(number, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex-1 min-w-[80px] p-4 rounded-xl text-center"
      style={{
        border: "1px solid oklch(78% 0.13 82 / 0.2)",
        background: "oklch(78% 0.13 82 / 0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p
        className="font-display text-2xl font-bold counter-animate"
        style={{
          background:
            "linear-gradient(135deg, oklch(92% 0.12 90), oklch(78% 0.13 82))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayed}
      </p>
      <p
        className="font-body text-xs mt-1"
        style={{ color: "oklch(58% 0.015 85)" }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useScrollReveal();
  const parallaxRef = useParallax();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(13% 0.014 285)" }}
      >
        {/* Parallax background image */}
        <div
          ref={parallaxRef}
          className="parallax-bg absolute inset-0"
          style={{
            backgroundImage:
              "url('/assets/uploads/Saanjh-Store-Extra_7611526269569797399-Slide0-1.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "60% center",
            opacity: 0.28,
            transform: "scale(1.1)",
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, oklch(13% 0.014 285 / 0.97) 0%, oklch(13% 0.014 285 / 0.78) 45%, oklch(13% 0.014 285 / 0.35) 100%)",
          }}
        />

        {/* Gold orb left */}
        <div
          className="absolute top-1/4 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "oklch(78% 0.13 82 / 0.14)",
            animation: "ring-pulse 7s ease-in-out infinite",
          }}
        />
        {/* Gold orb right */}
        <div
          className="absolute -bottom-16 -right-20 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
          style={{
            background: "oklch(72% 0.11 80 / 0.12)",
            animation: "ring-pulse 9s ease-in-out 1s infinite",
          }}
        />

        {/* Golden floral SVG motif — editorial background element */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07]"
          width="560"
          height="560"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <g fill="oklch(86% 0.14 88)">
            {/* Concentric decorative petals */}
            <circle cx="100" cy="100" r="8" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = 100 + 30 * Math.cos(rad);
              const y = 100 + 30 * Math.sin(rad);
              return (
                <ellipse
                  key={deg}
                  cx={x}
                  cy={y}
                  rx="7"
                  ry="14"
                  transform={`rotate(${deg + 90} ${x} ${y})`}
                  opacity="0.7"
                />
              );
            })}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = 100 + 62 * Math.cos(rad);
              const y = 100 + 62 * Math.sin(rad);
              return (
                <ellipse
                  key={`outer-${deg}`}
                  cx={x}
                  cy={y}
                  rx="5"
                  ry="11"
                  transform={`rotate(${deg + 90} ${x} ${y})`}
                  opacity="0.45"
                />
              );
            })}
            <circle
              cx="100"
              cy="100"
              r="48"
              strokeWidth="0.8"
              stroke="oklch(86% 0.14 88)"
              fill="none"
              opacity="0.4"
            />
            <circle
              cx="100"
              cy="100"
              r="72"
              strokeWidth="0.5"
              stroke="oklch(86% 0.14 88)"
              fill="none"
              opacity="0.25"
            />
            <circle
              cx="100"
              cy="100"
              r="95"
              strokeWidth="0.3"
              stroke="oklch(86% 0.14 88)"
              fill="none"
              opacity="0.15"
            />
          </g>
        </svg>

        {/* Decorative rings */}
        <div
          className="hero-ring absolute"
          style={{
            width: "580px",
            height: "580px",
            right: "-170px",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "oklch(78% 0.13 82 / 0.09)",
          }}
        />
        <div
          className="hero-ring absolute"
          style={{
            width: "400px",
            height: "400px",
            right: "-80px",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "oklch(78% 0.13 82 / 0.13)",
            animationDelay: "2s",
          }}
        />
        <div
          className="hero-ring absolute"
          style={{
            width: "250px",
            height: "250px",
            right: "-5px",
            top: "50%",
            transform: "translateY(-50%)",
            borderColor: "oklch(78% 0.13 82 / 0.18)",
            animationDelay: "4s",
          }}
        />

        <HeroParticles />

        {/* Hero content */}
        <div
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
          style={{ animation: "hero-fade 0.8s ease both" }}
        >
          <p
            className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-5"
            style={{
              color: "oklch(80% 0.13 82)",
              animation: "hero-fade 0.7s ease 0.1s both",
            }}
          >
            Luxury · Premium · Pakistani
          </p>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] mb-3"
            style={{ animation: "hero-fade 0.8s ease 0.2s both" }}
          >
            <span className="shimmer-heading">Saanjh</span>
            <br />
            <span
              className="font-display"
              style={{ color: "oklch(94% 0.012 85)", fontStyle: "italic" }}
            >
              Fragrance
            </span>
          </h1>

          <div
            className="w-24 h-px mx-auto my-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(78% 0.13 82 / 0.8), transparent)",
              animation: "hero-fade 0.8s ease 0.35s both",
            }}
          />

          <p
            className="font-body text-base md:text-lg max-w-md mx-auto mb-9"
            style={{
              color: "oklch(68% 0.018 85)",
              animation: "hero-fade 0.8s ease 0.5s both",
            }}
          >
            Premium Imported Fragrances · Free Cash on Delivery All Pakistan
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "hero-fade 0.9s ease 0.7s both" }}
          >
            <a
              href="#products"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(88% 0.15 88), oklch(72% 0.12 80))",
                color: "oklch(12% 0.01 285)",
                boxShadow: "0 4px 28px oklch(78% 0.13 82 / 0.55)",
              }}
              data-ocid="hero.primary_button"
            >
              Shop Now
            </a>
            <a
              href={WHATSAPP_CATALOG}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide border transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "oklch(78% 0.13 82 / 0.5)",
                color: "oklch(86% 0.14 88)",
                background: "oklch(78% 0.13 82 / 0.08)",
                backdropFilter: "blur(8px)",
              }}
              data-ocid="hero.secondary_button"
            >
              View Catalog
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "oklch(55% 0.015 85)" }}
          >
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1"
            style={{ borderColor: "oklch(78% 0.13 82 / 0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: "oklch(78% 0.13 82)",
                animation: "bounce 1.5s infinite",
              }}
            />
          </div>
        </div>

        <div className="hero-vignette" />
      </section>

      {/* ── Trust Badges ── */}
      <section
        className="py-4 overflow-hidden"
        style={{
          background: "oklch(78% 0.13 82 / 0.04)",
          borderTop: "1px solid oklch(78% 0.13 82 / 0.2)",
          borderBottom: "1px solid oklch(78% 0.13 82 / 0.2)",
        }}
      >
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...TRUST_BADGES, ...TRUST_BADGES, ...TRUST_BADGES].map(
              (badge, i) => (
                <div
                  key={`${badge.id}-${i}`}
                  className="flex items-center gap-3 px-8 whitespace-nowrap py-3"
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span
                    className="font-body text-sm font-semibold tracking-wide"
                    style={{ color: "oklch(82% 0.11 84)" }}
                  >
                    {badge.text}
                  </span>
                  <span
                    style={{
                      color: "oklch(78% 0.13 82 / 0.4)",
                      marginLeft: "10px",
                      fontSize: "9px",
                    }}
                  >
                    ✦
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Our Promise ── */}
      <section
        className="py-20 md:py-24 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(13% 0.014 285) 0%, oklch(16% 0.018 285) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 fade-in-up">
            <p
              className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(78% 0.13 82)" }}
            >
              Why Choose Saanjh
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Our <span className="shimmer-heading">Promise</span>
            </h2>
            <SectionDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROMISE_FEATURES.map((feat, i) => (
              <div
                key={feat.id}
                className="promise-card fade-in-up rounded-2xl p-6 text-center"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg"
                  style={{
                    background: "oklch(78% 0.13 82 / 0.12)",
                    border: "1px solid oklch(78% 0.13 82 / 0.25)",
                  }}
                >
                  {feat.icon}
                </div>
                <h3
                  className="font-display text-base font-bold mb-2"
                  style={{ color: "oklch(92% 0.012 85)" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: "oklch(60% 0.015 85)" }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section
        id="products"
        className="py-20 md:py-28 px-4 sm:px-6 relative"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(22% 0.03 80 / 0.08) 0%, transparent 70%), oklch(15% 0.016 285)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <p
              className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(78% 0.13 82)" }}
            >
              Handcrafted with Imported Oils
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Signature <span className="shimmer-heading">Fragrances</span>
            </h2>
            <p
              className="font-body max-w-md mx-auto text-sm"
              style={{ color: "oklch(62% 0.018 85)" }}
            >
              Each scent is designed to last 8–10 hours and leave a lasting
              impression.
            </p>
            <SectionDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Founder ── */}
      <section
        id="about"
        className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, oklch(22% 0.035 80 / 0.14) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Founder photo — FIXED: now uses 1773359477230-13.jpg (the actual founder photo) */}
            <div className="flex justify-center fade-in">
              <div className="relative">
                {/* Outer glow */}
                <div
                  className="absolute -inset-6 rounded-3xl blur-3xl"
                  style={{ background: "oklch(78% 0.13 82 / 0.14)" }}
                />
                {/* Inner glow ring */}
                <div
                  className="absolute -inset-2 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(86% 0.14 88 / 0.15), transparent 60%, oklch(78% 0.13 82 / 0.1))",
                  }}
                />
                {/* Founder photo with corner frame */}
                <div
                  className="founder-frame shimmer-border relative rounded-2xl overflow-hidden"
                  style={{ width: "280px", height: "370px" }}
                >
                  <img
                    src="/assets/uploads/1773359477230-13.jpg"
                    alt="LaLa Saraiki — Founder of Saanjh Fragrance"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Name overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(10% 0.01 285 / 0.97) 0%, oklch(10% 0.01 285 / 0.5) 60%, transparent 100%)",
                    }}
                  >
                    <p
                      className="font-display text-lg font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(92% 0.12 90), oklch(78% 0.13 82))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      LaLa Saraiki
                    </p>
                    <p
                      className="font-body text-xs mt-0.5"
                      style={{ color: "oklch(60% 0.02 85)" }}
                    >
                      Founder, Saanjh Fragrance
                    </p>
                  </div>
                </div>
                {/* Corner ornament */}
                <div
                  className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full border flex items-center justify-center"
                  style={{
                    borderColor: "oklch(78% 0.13 82 / 0.3)",
                    background: "oklch(78% 0.13 82 / 0.04)",
                  }}
                >
                  <span
                    style={{
                      color: "oklch(78% 0.13 82 / 0.7)",
                      fontSize: "18px",
                    }}
                  >
                    ✦
                  </span>
                </div>
                {/* Top-left secondary ornament */}
                <div
                  className="absolute -top-4 -left-4 w-10 h-10 rounded-full border flex items-center justify-center"
                  style={{
                    borderColor: "oklch(78% 0.13 82 / 0.2)",
                    background: "oklch(78% 0.13 82 / 0.03)",
                  }}
                >
                  <span
                    style={{
                      color: "oklch(78% 0.13 82 / 0.5)",
                      fontSize: "10px",
                    }}
                  >
                    ◆
                  </span>
                </div>
              </div>
            </div>

            {/* About text */}
            <div className="fade-in-up">
              <p
                className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(78% 0.13 82)" }}
              >
                Our Story
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Passion Bottled{" "}
                <span className="shimmer-heading">in Every Drop</span>
              </h2>
              <div
                className="space-y-4 font-body leading-relaxed text-sm"
                style={{ color: "oklch(68% 0.018 85)" }}
              >
                <p>
                  Our journey began with a single belief — that luxury
                  fragrances should be accessible to everyone in Pakistan, not
                  just a privileged few.
                </p>
                <p>
                  Every bottle of Saanjh is crafted with{" "}
                  <span style={{ color: "oklch(86% 0.14 88)" }}>
                    premium imported perfume oils
                  </span>
                  , giving you a fragrance experience that rivals the finest
                  international brands — at an honest, fair price.
                </p>
                <p>
                  LaLa Saraiki personally selects every fragrance note, ensuring
                  that when you wear Saanjh, you carry something truly
                  extraordinary — a scent that tells your story.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <StatCounter number="500+" label="Happy Customers" />
                <StatCounter number="3" label="Signature Scents" />
                <StatCounter number="8-10h" label="Lasting Power" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section
        className="py-20 md:py-28 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(16% 0.016 285) 0%, oklch(14% 0.015 285) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <p
              className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(78% 0.13 82)" }}
            >
              Customer Love
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Voices of <span className="shimmer-heading">Saanjh</span>
            </h2>
            <SectionDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((review, i) => (
              <div
                key={review.id}
                className="review-card fade-in-up rounded-2xl p-6 pb-6 flex flex-col gap-3"
                style={{
                  transitionDelay: `${i * 130}ms`,
                  background:
                    "linear-gradient(160deg, oklch(22% 0.024 80 / 0.5) 0%, oklch(19% 0.02 285) 100%)",
                  border: "1px solid oklch(78% 0.13 82 / 0.1)",
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 oklch(86% 0.14 88 / 0.05)",
                  backdropFilter: "blur(8px)",
                }}
                data-ocid={`reviews.item.${i + 1}`}
              >
                <Stars count={review.rating} />
                <p
                  className="font-body text-sm leading-relaxed flex-1 relative z-10"
                  style={{ color: "oklch(74% 0.015 85)" }}
                >
                  {review.text}
                </p>
                <div
                  className="flex items-center gap-3 pt-3 relative z-10"
                  style={{
                    borderTop: "1px solid oklch(78% 0.13 82 / 0.1)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(78% 0.13 82), oklch(62% 0.1 80))",
                      color: "oklch(12% 0.01 285)",
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p
                      className="font-body text-sm font-semibold"
                      style={{ color: "oklch(88% 0.012 85)" }}
                    >
                      {review.name}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(54% 0.015 85)" }}
                    >
                      {review.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(25% 0.04 80 / 0.18) 0%, oklch(13% 0.014 285) 70%)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="fade-in-up">
            <p
              className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "oklch(78% 0.13 82)" }}
            >
              Get in Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready to <span className="shimmer-heading">Order?</span>
            </h2>
            <p
              className="font-body mb-10"
              style={{ color: "oklch(62% 0.018 85)" }}
            >
              Free Cash on Delivery · All Pakistan · 24/7 Support
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={WHATSAPP_CATALOG}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold"
                data-ocid="contact.primary_button"
              >
                <WhatsAppIcon size={22} />
                View Full Catalog
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-semibold border transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "oklch(78% 0.13 82 / 0.4)",
                  color: "oklch(86% 0.14 88)",
                  background: "oklch(78% 0.13 82 / 0.06)",
                }}
                data-ocid="contact.secondary_button"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.4 10.84 19.79 19.79 0 01.32 2.22 2 2 0 012.32.04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.07 6.07l1.27-.76a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Chat: 0326-7011101
              </a>
            </div>

            <div
              className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs"
              style={{ color: "oklch(52% 0.015 85)" }}
            >
              <span>🚚 Free Cash on Delivery</span>
              <span>🇵🇰 All Pakistan</span>
              <span>💬 24/7 Support</span>
              <span>🌿 Imported Oils</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-4 sm:px-6 border-t"
        style={{ borderColor: "oklch(78% 0.13 82 / 0.12)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Text-only brand — no photo in footer */}
            <a href="#home" className="flex items-center gap-2 group">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: "oklch(78% 0.13 82 / 0.35)",
                  background: "oklch(78% 0.13 82 / 0.07)",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M16 2 L18.5 13 L29 8 L21 17 L30 22 L18.5 20 L20 31 L16 22 L12 31 L13.5 20 L2 22 L11 17 L3 8 L13.5 13 Z"
                    fill="oklch(86% 0.14 88)"
                    opacity="0.9"
                  />
                </svg>
              </div>
              <span
                className="font-display font-bold text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(88% 0.13 88), oklch(74% 0.12 82))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Saanjh Fragrance
              </span>
            </a>

            <p
              className="font-body text-xs text-center"
              style={{ color: "oklch(45% 0.015 85)" }}
            >
              © {new Date().getFullYear()} Saanjh Fragrance. All rights
              reserved.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "#25D366" }}
              data-ocid="footer.link"
            >
              <WhatsAppIcon size={18} />
              WhatsApp Us
            </a>
          </div>

          <div
            className="mt-6 pt-6 border-t text-center"
            style={{ borderColor: "oklch(78% 0.13 82 / 0.08)" }}
          >
            <p
              className="font-body text-xs"
              style={{ color: "oklch(40% 0.012 85)" }}
            >
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "oklch(62% 0.12 82)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
