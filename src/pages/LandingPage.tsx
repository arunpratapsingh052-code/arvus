import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiInstagram, SiX, SiTiktok } from "react-icons/si";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 90);

const FEATURES = [
  {
    num: "01",
    title: "Oversized Architecture",
    desc: "Silhouettes engineered for dominance. Volume without excess. Every drape is deliberate.",
  },
  {
    num: "02",
    title: "Technical Fabrics",
    desc: "Heavyweight 500gsm cotton. Treated nylons. Materials that outlast seasons and trends.",
  },
  {
    num: "03",
    title: "Zero Compromise",
    desc: "No logos. No trend chasing. Only garments that exist on their own terms — forever.",
  },
];

export default function LandingPage() {
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = launchDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (_data: EmailFormValues) => {
    toast({ title: "Access Granted", description: "You are on the ARVUS list." });
    form.reset();
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80, skewY: 6 },
    visible: (i: number) => ({
      opacity: 1, y: 0, skewY: 0,
      transition: { delay: 0.1 + i * 0.07, duration: 1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-cyan-400/30 selection:text-cyan-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="noise-overlay" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass border-b border-subtle">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white text-sm tracking-[0.3em] uppercase font-medium text-glow"
        >
          ARVUS
        </motion.span>
        <div className="flex gap-8">
          <motion.a 
            whileHover={{ y: -2 }}
            href="#collection" 
            className="text-white/50 hover:text-cyan-400 text-xs tracking-widest uppercase transition-all duration-300 link-hover"
          >
            Collection
          </motion.a>
          <motion.a 
            whileHover={{ y: -2 }}
            href="#access" 
            className="text-white/50 hover:text-cyan-400 text-xs tracking-widest uppercase transition-all duration-300 link-hover"
          >
            Early Access
          </motion.a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,229,255,0.04)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_50%_100%,rgba(15,15,15,1)_0%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

        {/* Vertical scan lines */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)",
          backgroundSize: "100% 4px",
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 flex flex-col items-center">
          {/* ARVUS brand name */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="overflow-hidden mb-2"
          >
            <div className="flex" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem,20vw,18rem)", lineHeight: 0.88, letterSpacing: "-0.02em", color: "#ffffff" }}>
              {"ARVUS".split("").map((ch, i) => (
                <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate="visible" className="inline-block">
                  {ch}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tagline line */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
            <span className="text-xs tracking-[0.5em] uppercase text-cyan-400/70">Est. 2025</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60" />
          </motion.div>

          {/* COMING SOON */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mb-12"
          >
            <h2
              className="text-xl md:text-2xl tracking-[0.6em] uppercase font-light"
              style={{ color: "rgba(200,220,225,0.75)", textShadow: "0 0 40px rgba(0,229,255,0.25), 0 0 80px rgba(0,229,255,0.1)" }}
            >
              Coming Soon
            </h2>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            />
          </motion.div>

          {/* Countdown */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-4 gap-6 md:gap-16"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <motion.span
                    animate={{ textShadow: ["0 0 20px rgba(0,229,255,0.4)", "0 0 40px rgba(0,229,255,0.8)", "0 0 20px rgba(0,229,255,0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="block text-4xl md:text-6xl font-light tabular-nums"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e0f7fa", letterSpacing: "-0.02em" }}
                  >
                    {item.value.toString().padStart(2, "0")}
                  </motion.span>
                  <div className="absolute inset-0 blur-xl opacity-30" style={{ background: "rgba(0,229,255,0.3)" }} />
                </div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-14 text-base md:text-lg font-light max-w-md text-center leading-relaxed"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Streetwear without compromise. Built for those who move in silence.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-cyan-500/60 to-transparent"
          />
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Scroll</span>
        </motion.div>
      </section>

      {/* ── COLLECTION TEASER ── */}
      <section id="collection" className="py-40 px-6 relative border-t border-white/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(10,15,15,1)_0%,rgba(0,0,0,1)_100%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-cyan-500/50" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-cyan-400/60">The Drop</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-light text-white/90 leading-tight max-w-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              Nothing has been seen like this before.
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.04]">
            {FEATURES.map((card, idx) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="card-premium group bg-black hover:bg-white/[0.02]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at center, rgba(0,229,255,0.08), transparent 70%)" }} />
                <div className="relative z-10">
                  <span className="block text-xs text-cyan-500/60 font-mono tracking-widest mb-8 group-hover:text-cyan-400/80 transition-colors duration-500">{card.num}</span>
                  <h4 className="text-xl mb-4 text-white/80 group-hover:text-white transition-colors duration-500 font-medium tracking-wide">{card.title}</h4>
                  <p className="text-sm text-white/30 group-hover:text-white/50 leading-relaxed font-light transition-colors duration-500">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section id="access" className="py-48 px-6 relative border-t border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(0,229,255,0.03)_0%,transparent_80%)]" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-lg mx-auto text-center relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-cyan-500/40" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-cyan-400/50">Early Access</span>
            <div className="w-8 h-px bg-cyan-500/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-4 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
            Get in before the drop.
          </h2>
          <p className="text-sm text-white/30 mb-12 font-light leading-relaxed">
            Access to the inaugural ARVUS collection is strictly limited. Register now to secure your place.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col sm:flex-row gap-0 border-accent glass rounded-none bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 relative">
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/40 group-hover:text-cyan-400/60 transition-colors" />
                        <Input
                          placeholder="Your email address"
                          {...field}
                          className="bg-transparent border-0 border-r border-white/5 h-14 pl-12 text-white/70 placeholder:text-white/20 text-sm rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-cyan-500/30 transition-colors"
                          data-testid="input-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="absolute -bottom-6 left-4 text-red-400/80 text-xs" />
                  </FormItem>
                )}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-14 px-8 rounded-none bg-transparent border-0 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 font-medium tracking-[0.2em] uppercase text-xs group transition-all duration-300 btn-glow"
                style={{ textShadow: "0 0 20px rgba(0,229,255,0.4)" }}
                data-testid="button-subscribe"
              >
                Request Access
                <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </Form>
        </motion.div>
      </section>

      {/* ── ABOUT BRAND ── */}
      <section className="py-32 px-6 relative border-t border-subtle bg-gradient-to-b from-black to-black/80">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-gold-500/50" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-gold-400/60">About ARVUS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-8 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              Crafted by Arun Pratap Singh Chauhan
            </h2>
            <p className="text-lg text-white/40 mb-6 font-light leading-relaxed max-w-2xl">
              ARVUS is a vision of timeless streetwear design. Founded with the belief that clothing should transcend trends, every piece is engineered for those who understand that true style is silent, deliberate, and eternal.
            </p>
            <p className="text-base text-white/30 font-light leading-relaxed max-w-2xl">
              Every garment tells a story of meticulous craftsmanship, premium materials, and an uncompromising philosophy: no logos, no excuses, just pure design integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-32 px-6 relative border-t border-subtle">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-cyan-500/50" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-cyan-400/60">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white/90" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              Questions, Answered.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What makes ARVUS different?",
                a: "We focus on quality over quantity. Each piece is designed to last, using premium fabrics and construction techniques. No trends, no logos—just timeless design."
              },
              {
                q: "When does the first collection launch?",
                a: "The inaugural ARVUS collection launches in approximately 90 days. Early access members get first pick and exclusive pricing."
              },
              {
                q: "What is the return policy?",
                a: "All pieces come with a 30-day money-back guarantee. We stand behind the quality of every garment."
              },
              {
                q: "Do you offer international shipping?",
                a: "Yes. We ship worldwide with flat-rate international shipping. All orders include tracking and insurance."
              },
              {
                q: "How is ARVUS sustainable?",
                a: "We prioritize longevity over fast fashion. By creating pieces that last, we reduce waste. All packaging is recyclable."
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium bg-black/50 border-white/5 p-6 hover:border-cyan-500/30"
              >
                <h3 className="text-white/90 font-medium mb-3 tracking-wide text-lg">{faq.q}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="py-32 px-6 relative border-t border-subtle bg-gradient-to-b from-black/80 to-black">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-cyan-500/40" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-cyan-400/50">Get In Touch</span>
              <div className="w-8 h-px bg-cyan-500/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              Questions? We're Here.
            </h2>
            <p className="text-white/30 mb-10 font-light">
              For inquiries, collaborations, or just to chat about ARVUS:
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:hello@arvus.fashion"
                className="flex items-center gap-3 px-6 py-3 border border-cyan-500/30 hover:border-cyan-400/60 rounded-none glass transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                <span className="text-white/70 group-hover:text-white text-sm tracking-wide">hello@arvus.fashion</span>
              </motion.a>

              <div className="flex gap-6">
                {[
                  { icon: SiInstagram, link: "#", label: "Instagram" },
                  { icon: SiX, link: "#", label: "X/Twitter" },
                  { icon: SiTiktok, link: "#", label: "TikTok" }
                ].map(({ icon: Icon, link, label }) => (
                  <motion.a
                    key={label}
                    whileHover={{ y: -3 }}
                    href={link}
                    className="flex items-center justify-center w-10 h-10 border border-white/10 hover:border-cyan-400/50 rounded-none glass group transition-all duration-300"
                    title={label}
                  >
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MANIFESTO STRIP ── */}
      <div className="border-t border-b border-white/[0.04] py-6 overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-xs tracking-[0.5em] uppercase text-white/[0.08] flex-shrink-0">
              ARVUS &mdash; UNDEFINED BY SEASON &mdash; CONSTRUCTED FOR ETERNITY &mdash; NO RULES NO LIMITS &mdash;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-8 bg-black border-t border-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="md:col-span-1"
            >
              <div className="text-2xl font-light tracking-[0.3em] text-glow mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "rgba(255,255,255,0.8)" }}>
                ARVUS
              </div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-4">
                Crafted with Intent
              </p>
              <p className="text-[10px] text-white/30 leading-relaxed font-light">
                Founded by Arun Pratap Singh Chauhan
              </p>
            </motion.div>

            {/* Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white/80 text-xs tracking-[0.4em] uppercase font-medium mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#collection" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Collection</a></li>
                <li><a href="#access" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Early Access</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">About</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">FAQ</a></li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white/80 text-xs tracking-[0.4em] uppercase font-medium mb-4">Social</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Instagram</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Twitter / X</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">TikTok</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Discord</a></li>
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white/80 text-xs tracking-[0.4em] uppercase font-medium mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Privacy Policy</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Terms of Service</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Contact</a></li>
                <li><a href="#" className="text-white/40 hover:text-cyan-400 text-xs transition-colors link-hover">Shipping Info</a></li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[10px] tracking-[0.3em] uppercase text-white/15 text-center sm:text-left"
              >
                &copy; {new Date().getFullYear()} ARVUS. Designed & Founded by Arun Pratap Singh Chauhan. All rights reserved.
              </motion.div>

              <motion.div className="flex gap-6">
                {[
                  { icon: SiInstagram, label: "instagram" },
                  { icon: SiX, label: "twitter" },
                  { icon: SiTiktok, label: "tiktok" }
                ].map(({ icon: Icon, label }) => (
                  <motion.a 
                    key={label}
                    whileHover={{ y: -2, scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    href="#" 
                    className="text-white/20 hover:text-cyan-400 transition-colors duration-300" 
                    data-testid={`link-${label}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
