import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Shield, Sparkles, Layers, SprayCan, Car, Wrench, Brush, Droplets,
  CheckCircle2, Award, Clock, BadgeCheck, Phone, MessageCircle, MapPin,
  Instagram, Facebook, ChevronLeft, ChevronRight, ArrowRight, Star, Menu, X,
} from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import blacksandLogo from "@/assets/blacksand-logo.png";
import galCeramic from "@/assets/gallery-ceramic.jpg";
import galInterior from "@/assets/gallery-interior.jpg";
import galWash from "@/assets/gallery-wash.jpg";
import galEngine from "@/assets/gallery-engine.jpg";
import galExterior from "@/assets/gallery-exterior.jpg";
import galPPF from "@/assets/gallery-ppf.jpg";

const WHATSAPP = "https://wa.me/254700000000";
const PHONE = "tel:+254700000000";
const MAPS = "https://maps.google.com/?q=DDC+Milimani+Nairobi";

/* ---------- Reusable building blocks ---------- */

function SectionTitle({ kicker, title, subtitle, center = true }: { kicker: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--silver)] mb-4`}>
        <span className="h-px w-8 bg-primary" />
        {kicker}
      </div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ---------- Nav ---------- */

const NAV = [
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}>
          <a href="#top" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-white p-1 shrink-0 grid place-items-center">
              <img src={blacksandLogo} alt="Blacksand logo" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight min-w-0">
              <div className="font-display font-bold tracking-wide text-sm sm:text-base truncate">BLACKSAND</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--silver)]">Auto &amp; Car Spa</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a href="#book" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow">
              Book Appointment <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <button onClick={() => setOpen(o => !o)} className="lg:hidden inline-grid place-items-center h-10 w-10 rounded-lg glass">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1"
            >
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg hover:bg-white/5 text-sm">
                  {n.label}
                </a>
              ))}
              <a href="#book" onClick={() => setOpen(false)} className="mt-2 text-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold">
                Book Appointment
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden pt-24">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img src={heroCar} alt="Luxury black car" className="absolute inset-0 h-full w-full object-cover opacity-70" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.12 0 0 / 0.4) 0%, oklch(0.12 0 0 / 0.2) 40%, oklch(0.12 0 0 / 0.95) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </motion.div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-24 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--silver)]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Nairobi &bull; Premium Auto Detailing
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-6 text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] max-w-5xl">
          Premium Car <br className="hidden sm:block" />
          Detailing &amp; <span className="text-gradient-blue">Protection</span> Services
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground">
          Restore. Protect. Elevate your vehicle with professional detailing crafted for those who refuse the ordinary.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#book" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-semibold hover:shadow-[0_0_40px_-5px_var(--primary)] transition-all">
            Book Appointment <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-sm font-semibold hover:border-primary/50 transition-colors">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="absolute bottom-8 inset-x-0 overflow-hidden border-y border-white/5 py-3">
          <div className="flex gap-12 animate-[shimmer_30s_linear_infinite] whitespace-nowrap text-xs uppercase tracking-[0.3em] text-[var(--silver)]">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12 shrink-0">
                <span>Ceramic Coating</span><span>&bull;</span>
                <span>Paint Protection Film</span><span>&bull;</span>
                <span>Graphene Coating</span><span>&bull;</span>
                <span>Paint Correction</span><span>&bull;</span>
                <span>Interior Detailing</span><span>&bull;</span>
                <span>Engine Bay</span><span>&bull;</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const STATS = [
  { value: 1000, suffix: "+", label: "Vehicles Detailed" },
  { value: 6000, suffix: "+", label: "Happy Customers" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Customer Satisfaction" },
];

function Stats() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative glass rounded-2xl p-6 sm:p-8 overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(50% 50% at 50% 0%, oklch(0.72 0.18 232 / 0.15), transparent)" }} />
              <div className="relative">
                <div className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient-silver"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Shield, title: "Paint Protection Film (PPF)", desc: "Self-healing transparent armour against stones, scratches and swirls." },
  { icon: Sparkles, title: "Ceramic Coating", desc: "Hydrophobic glass-like layer for years of mirror-deep gloss." },
  { icon: Layers, title: "Graphene Coating", desc: "Next-generation hardness with superior heat and UV resistance." },
  { icon: Brush, title: "Interior Detailing", desc: "Leather, fabric and plastics restored to showroom condition." },
  { icon: Car, title: "Exterior Detailing", desc: "Decontamination, polishing and sealants for a flawless finish." },
  { icon: Wrench, title: "Engine Bay Cleaning", desc: "Safe degrease and dress for a clean, presentable bay." },
  { icon: SprayCan, title: "Paint Correction", desc: "Multi-stage polishing removes swirls and oxidation." },
  { icon: Droplets, title: "Deep Cleaning", desc: "Steam, extraction and decon — a true reset for your vehicle." },
];

function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Our Craft" title="Services engineered for perfection." subtitle="Each treatment is performed by certified detailers using premium global products." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }} className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500" style={{ background: "var(--gradient-blue)" }} />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl glass grid place-items-center mb-5 group-hover:ring-glow transition-shadow"><s.icon className="h-5 w-5 text-primary" /></div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <a href="#book" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary group/btn">Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { icon: Award, title: "Skilled Professionals", desc: "Certified detailers with thousands of hours behind the polisher." },
  { icon: BadgeCheck, title: "Premium Products", desc: "Only globally recognised brands trusted by elite detailers." },
  { icon: Sparkles, title: "Attention To Detail", desc: "Hours spent on what others overlook — that's our signature." },
  { icon: Clock, title: "On-Time Delivery", desc: "Transparent timelines. Your vehicle ready when promised." },
];

function WhyUs() {
  return (
    <section className="relative py-24 sm:py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Why Blacksand" title="A standard the ordinary can't match." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-strong rounded-2xl p-7 text-center group hover:border-primary/40 transition-colors">
              <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center mb-5 transition-transform group-hover:scale-110" style={{ background: "var(--gradient-blue)" }}><w.icon className="h-6 w-6 text-primary-foreground" /></div>
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Vehicle Inspection", desc: "We assess paint, interior and mechanical condition in detail." },
  { n: "02", title: "Deep Cleaning", desc: "Foam wash, decontamination and safe two-bucket method." },
  { n: "03", title: "Paint Correction", desc: "Multi-stage machine polishing removes defects." },
  { n: "04", title: "Protection Application", desc: "Ceramic, graphene or PPF tailored to your usage." },
  { n: "05", title: "Final Quality Check", desc: "Inspected under multi-angle LED before handover." },
];

function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Our Process" title="Five precise steps. Zero compromise." />
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="relative z-10 mx-auto h-24 w-24 rounded-full glass-strong grid place-items-center ring-glow"><span className="text-2xl font-display font-bold text-gradient-blue">{s.n}</span></div>
                <h3 className="mt-6 text-center text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CATEGORIES = ["All", "Ceramic Coating", "Interior Detailing", "Deep Cleaning", "Engine Care", "Exterior Wash"] as const;
const GALLERY = [
  { src: galCeramic, cat: "Ceramic Coating", title: "Mirror-Deep Gloss" },
  { src: galInterior, cat: "Interior Detailing", title: "Cabin Restoration" },
  { src: galWash, cat: "Deep Cleaning", title: "Foam Decontamination" },
  { src: galEngine, cat: "Engine Care", title: "Bay Showcase Finish" },
  { src: galExterior, cat: "Exterior Wash", title: "Wheel & Tyre Detail" },
  { src: galPPF, cat: "Ceramic Coating", title: "Paint Protection Film" },
];

function Gallery() {
  const [active, setActive] = useState<typeof CATEGORIES[number]>("All");
  const items = active === "All" ? GALLERY : GALLERY.filter(g => g.cat === active);
  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Portfolio" title="Before & after, side by side." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(c => (<button key={c} onClick={() => setActive(c)} className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all ${active === c ? "bg-primary text-primary-foreground" : "glass hover:border-primary/40"}`}>{c}</button>))}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {items.map(g => (
              <motion.figure layout key={g.title + g.cat} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="group relative overflow-hidden rounded-2xl glass aspect-square">
                <img src={g.src} alt={g.title} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{g.cat}</div>
                  <div className="text-lg font-semibold mt-1">{g.title}</div>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "James Mwangi", car: "Mercedes C-Class", text: "Incredible attention to detail. My car looks better than when I drove it out of the showroom.", rating: 5 },
  { name: "Aisha Hassan", car: "Range Rover Sport", text: "Ceramic coating from Blacksand is on another level. Two years in and water still beads like day one.", rating: 5 },
  { name: "Brian Otieno", car: "BMW M3", text: "Paint correction transformed my BMW. The depth of gloss is unbelievable. Highly recommend.", rating: 5 },
  { name: "Wanjiku Kamau", car: "Toyota Land Cruiser", text: "Interior was destroyed by kids and dust. They brought it back to life. Worth every shilling.", rating: 5 },
  { name: "Daniel Kiprop", car: "Porsche Cayenne", text: "Professional, on time and the result speaks for itself. The only place I trust with my Porsche.", rating: 5 },
  { name: "Faith Njeri", car: "Audi Q5", text: "PPF install was flawless — no edges, no bubbles. These guys really know their craft.", rating: 5 },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx(i => (i + 1) % REVIEWS.length);
  const prev = () => setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length);
  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, []);
  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle kicker="Reviews" title="Trusted by Nairobi's most discerning drivers." />
        <div className="relative glass-strong rounded-3xl p-8 sm:p-14 shadow-luxe overflow-hidden">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-blue)" }} />
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="relative">
              <div className="flex gap-1 mb-6">{Array.from({ length: REVIEWS[idx].rating }).map((_, i) => (<Star key={i} className="h-5 w-5 fill-primary text-primary" />))}</div>
              <blockquote className="text-2xl sm:text-3xl font-display leading-snug">"{REVIEWS[idx].text}"</blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full grid place-items-center font-display font-bold" style={{ background: "var(--gradient-blue)" }}>{REVIEWS[idx].name.charAt(0)}</div>
                <div><div className="font-semibold">{REVIEWS[idx].name}</div><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{REVIEWS[idx].car}</div></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-1.5">{REVIEWS.map((_, i) => (<button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-1.5 bg-white/20"}`} />))}</div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous" className="h-10 w-10 grid place-items-center rounded-full glass hover:border-primary/50"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={next} aria-label="Next" className="h-10 w-10 grid place-items-center rounded-full glass hover:border-primary/50"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramFeed() {
  const images = [galCeramic, galInterior, galWash, galEngine, galExterior, galPPF];
  return (
    <section className="relative py-24 sm:py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="@blacksandauto" title="Follow the craft on Instagram." subtitle="Daily transformations, behind-the-scenes and detailing tips." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {images.map((src, i) => (
            <a key={i} href="https://instagram.com/blacksandauto" target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={src} alt="Instagram post" loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center"><Instagram className="h-6 w-6 text-primary" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Visit Us" title="Bring your vehicle home." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-3xl p-8 sm:p-10 flex flex-col">
            <h3 className="text-2xl font-display font-bold">Blacksand Auto & Car Spa</h3>
            <div className="mt-6 space-y-5 text-sm">
              <div className="flex gap-4"><div className="h-10 w-10 shrink-0 grid place-items-center rounded-xl glass"><MapPin className="h-4 w-4 text-primary" /></div><div><div className="font-semibold">Location</div><div className="text-muted-foreground">DDC Milimani, nearby Milimani City</div></div></div>
              <div className="flex gap-4"><div className="h-10 w-10 shrink-0 grid place-items-center rounded-xl glass"><Clock className="h-4 w-4 text-primary" /></div><div><div className="font-semibold">Working Hours</div><div className="text-muted-foreground">Mon – Sat: 8 AM – 9 PM</div><div className="text-muted-foreground">Sunday: 10 AM – 9 PM</div></div></div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href={PHONE} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:shadow-[0_0_30px_-5px_var(--primary)] transition-shadow"><Phone className="h-4 w-4" /> Call Now</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold hover:border-primary/50"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              <a href={MAPS} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold hover:border-primary/50"><MapPin className="h-4 w-4" /> Directions</a>
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
              <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=36.80%2C-1.30%2C36.83%2C-1.27&layer=mapnik" className="w-full h-full grayscale contrast-125 opacity-80" loading="lazy" />
            </div>
          </div>
          <form id="book" onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass-strong rounded-3xl p-8 sm:p-10">
            <h3 className="text-2xl font-display font-bold">Book your appointment</h3>
            <p className="mt-2 text-sm text-muted-foreground">We'll confirm via WhatsApp within minutes.</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" />
              <Field label="Mobile Number" name="phone" type="tel" />
              <Field label="Vehicle Model" name="vehicle" />
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Service Required</label>
                <select name="service" className="mt-2 w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none">{SERVICES.map(s => <option key={s.title} className="bg-background">{s.title}</option>)}</select>
              </div>
              <Field label="Preferred Date" name="date" type="date" full />
              <div className="sm:col-span-2"><label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label><textarea name="message" rows={4} className="mt-2 w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none" /></div>
            </div>
            <button type="submit" className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-sm font-semibold hover:shadow-[0_0_40px_-5px_var(--primary)] transition-shadow">{sent ? "Request Sent — We'll Be In Touch" : "Request Appointment"} <ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", full = false }: { label: string; name: string; type?: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input type={type} name={name} required className="mt-2 w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none" />
    </div>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-12 w-12 grid place-items-center rounded-full bg-[#25D366] text-white shadow-luxe hover:scale-110 transition-transform"><MessageCircle className="h-5 w-5" /></a>
      <a href={PHONE} aria-label="Call" className="h-12 w-12 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-luxe hover:scale-110 transition-transform"><Phone className="h-5 w-5" /></a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 bg-card/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white p-1 grid place-items-center">
                <img src={blacksandLogo} alt="Blacksand logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="font-display font-bold tracking-wide">BLACKSAND</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--silver)]">Auto & Car Spa</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">Premium car detailing and protection studio in Nairobi. Restore, protect and elevate.</p>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com/blacksandauto" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full glass hover:border-primary/50 transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full glass hover:border-primary/50 transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 grid place-items-center rounded-full glass hover:border-primary/50 transition-colors"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--silver)] mb-4">Services</div>
            <ul className="space-y-2 text-sm text-muted-foreground">{SERVICES.slice(0, 5).map(s => <li key={s.title}><a href="#services" className="hover:text-foreground transition-colors">{s.title}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--silver)] mb-4">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#process" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-foreground transition-colors">Gallery</a></li>
              <li><a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="https://instagram.com/blacksandauto" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} Blacksand Auto & Car Spa. All rights reserved.</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Crafted in Nairobi</div>
        </div>
      </div>
    </footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blacksand Auto & Car Spa — Premium Detailing in Nairobi" },
      { name: "description", content: "Ceramic coating, PPF, paint correction and luxury detailing in Milimani, Nairobi. Restore, protect and elevate your vehicle." },
      { property: "og:title", content: "Blacksand Auto & Car Spa" },
      { property: "og:description", content: "Premium car detailing & protection services." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Process />
        <Gallery />
        <Testimonials />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
