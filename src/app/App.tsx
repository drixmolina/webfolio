import { useState, useEffect, useRef, type ReactNode, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "motion/react";
import {
  Github, Mail, Phone, MapPin, Linkedin, ArrowUp,
  Code2, Server, Database, Wrench, Network, Bot,
  ExternalLink, Download, Eye, Send, Command, X, Search,
  Zap, Globe, Shield, Terminal, Award, BookOpen,
  Briefcase, ChevronRight, FileText, Clock, Calendar, Layers, Star,
} from "lucide-react";
import { EnhancedCertificationsSection } from "./EnhancedCertificationSection";
import { CapstoneProjectSection } from "./CapstoneProjectSection";

// ─── Palette & reusable style objects ───────────────────────────────────────

const glass = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--glass-border)",
} as const;

const glassMid = {
  background: "var(--glass-mid-bg)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid var(--glass-mid-border)",
} as const;

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "hero",           label: "Home",       icon: <Globe size={16} /> },
  { id: "about",          label: "About",      icon: <BookOpen size={16} /> },
  { id: "skills",         label: "Skills",     icon: <Code2 size={16} /> },
  { id: "experience",     label: "Experience", icon: <Briefcase size={16} /> },
  { id: "projects",       label: "Projects",   icon: <Layers size={16} /> },
  { id: "capstone",       label: "Capstone",   icon: <Star size={16} /> },
  { id: "certifications", label: "Certs",      icon: <Award size={16} /> },
  { id: "resources",      label: "Resources",  icon: <FileText size={16} /> },
  { id: "contact",        label: "Contact",    icon: <Mail size={16} /> },
];

const ROLES = ["Full Stack Developer", "IT Specialist", "AI Automation Engineer", "Problem Solver", "Builder"];
const PROFILE_IMAGE = "/profile/drix-portrait.png";
const HERO_PROFILE_IMAGE = "/profile/drix-portrait-cutout.png";
const CV_PATH = "/resume/Drix_Molina_CV.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/drix-molina-a1ba62321/";

const SKILLS_DATA: Record<string, { icon: ReactNode; skills: string[] }> = {
  Frontend:    { icon: <Code2 size={20} />,    skills: ["HTML5", "CSS3", "JavaScript", "React"] },
  Backend:     { icon: <Server size={20} />,   skills: ["Node.js", "Express", "PHP"] },
  Database:    { icon: <Database size={20} />, skills: ["MySQL", "MongoDB", "Firebase"] },
  Tools:       { icon: <Wrench size={20} />,   skills: ["Git", "GitHub", "VS Code", "Figma"] },
  Networking:  { icon: <Network size={20} />,  skills: ["Cisco", "Network Security", "Device Config"] },
  Automation:  { icon: <Bot size={20} />,      skills: ["AI Automation", "Prompt Engineering"] },
};

const STATS = [
  { n: 5,   suffix: "+", label: "Technical Certifications", icon: <Award size={26} /> },
  { n: 3,   suffix: "",  label: "Major Projects",           icon: <Layers size={26} /> },
  { n: 4,   suffix: "+", label: "Years Learning",           icon: <BookOpen size={26} /> },
  { n: 100, suffix: "%", label: "Passion for Development",  icon: <Zap size={26} /> },
];

const PROJECTS = [
  {
    id: 1,
    title: "Highly Succeed Enterprise Employee Management System",
    desc: "A web-based internal enterprise system for employee records, attendance and timekeeping, leave management, onboarding, inventory, payroll, resources, reports, QR ID workflows, and admin role control.",
    role: "Web Developer / Frontend Developer",
    tags: ["React", "JavaScript", "Enterprise System", "HRIS", "RBAC"],
    image: "/projects/highly-succeed/login.jpeg",
    github: "https://github.com/drixmolina/Highlysucceed.git",
    demo: "",
    status: "Recent Project",
    screenshots: [
      { url: "/projects/highly-succeed/login.jpeg", caption: "Login screen with demo role credentials", group: "Web Application" },
      { url: "/projects/highly-succeed/employee-management.jpeg", caption: "Employee Management dashboard", group: "Web Application" },
      { url: "/projects/highly-succeed/attendance-timekeeping.jpeg", caption: "Attendance & Timekeeping records", group: "Web Application" },
      { url: "/projects/highly-succeed/leave-management.jpeg", caption: "Leave Management approval table", group: "Web Application" },
      { url: "/projects/highly-succeed/admin-panel.jpeg", caption: "Admin Panel user management", group: "Web Application" },
      { url: "/projects/highly-succeed/employee-cards.jpeg", caption: "Employee cards and search filters", group: "Web Application" },
    ],
  },
  {
    id: 2,
    title: "FacilitEASE",
    desc: "A web and mobile property management system for FEU Diliman Facilities Office with venue reservations, service requests, personnel dispatch, inventory, and push notifications.",
    role: "Capstone Developer / Research Documentation / System Testing",
    tags: ["Kotlin", "PHP", "JavaScript", "Web App", "Mobile App"],
    image: "/projects/facilitease-thumbnail.png",
    github: "",
    demo: "#capstone",
    status: "Capstone Project",
    screenshots: [
      { url: "/projects/facilitease-extra/web-login.jpeg", caption: "Web login screen", group: "Web Application" },
      { url: "/projects/facilitease-extra/web-dashboard.jpeg", caption: "Web dashboard", group: "Web Application" },
      { url: "/projects/facilitease-extra/web-master-records.jpeg", caption: "Web master records / reservations", group: "Web Application" },
      { url: "/projects/facilitease-extra/mobile-login.jpeg", caption: "Mobile login screen", group: "Mobile Application" },
      { url: "/projects/facilitease-extra/mobile-dashboard.jpeg", caption: "Mobile dashboard", group: "Mobile Application" },
      { url: "/projects/facilitease-extra/mobile-reservation-request.jpeg", caption: "Mobile reservation request form", group: "Mobile Application" },
      { url: "/projects/facilitease-extra/mobile-service-request.jpeg", caption: "Mobile service request form", group: "Mobile Application" },
    ],
  }
];

const EXPERIENCE = [
  {
    role: "Web Development Junior Intern",
    company: "Highly Succeed Inc.",
    period: "2024",
    type: "Internship",
    desc: "Developed responsive web pages and built reusable UI components. Collaborated with cross-functional teams to improve performance, debug features, and optimise the end-user experience.",
    tags: ["HTML/CSS", "JavaScript", "React", "UI/UX"],
    color: "var(--accent)",
  },
  {
    role: "Junior Associate",
    company: "Assemblage of Programmers and Developers",
    period: "2023 – 2026",
    type: "Organisation",
    desc: "Active member contributing to programming initiatives, collaborative projects, IT week activities, and knowledge-sharing within a community of developers.",
    tags: ["Collaboration", "Development", "Community"],
    color: "var(--accent)",
    imageCaption: "Assemblage of Programmers and Developers · Activities & General Assembly",
    images: [
      {
        src: "/experience/apd-it-week-2025.jpg",
        alt: "Drix Molina with fellow members of Assemblage of Programmers and Developers during IT Week 2025",
      },
      {
        src: "/experience/apd-general-assembly-1.jpg",
        alt: "Drix Molina with fellow members during an Assemblage of Programmers and Developers general assembly event",
      },
      {
        src: "/experience/apd-general-assembly-2.jpg",
        alt: "Portrait of Drix Molina during an Assemblage of Programmers and Developers general assembly",
      },
    ],
  },
];

const CURRENT_WORK = [
  "Building and refining my Highly Succeed Enterprise Employee Management System project",
  "Improving my portfolio with real project screenshots, certificates, and professional case studies",
  "Expanding my skills in React, Firebase, PHP, networking, and AI-assisted development",
];

const ORBIT_TECH = ["React", "JS", "PHP", "MySQL", "Firebase", "GitHub", "AI", "Cisco"];

const TESTIMONIALS = [
  {
    name: "Capstone Adviser / Professor",
    role: "Academic Feedback",
    quote: "Placeholder recommendation for Drix’s capstone documentation, teamwork, system testing, and presentation performance.",
  },
  {
    name: "OJT Supervisor",
    role: "Professional Feedback",
    quote: "Placeholder recommendation for Drix’s web development internship performance, reliability, and willingness to learn.",
  },
  {
    name: "Team Member",
    role: "Collaboration Feedback",
    quote: "Placeholder recommendation for Drix’s contribution to project coordination, debugging, documentation, and implementation support.",
  },
];

const RESOURCE_DOCS = [
  {
    title: "FacilitEASE Research Paper",
    desc: "Full capstone paper with objectives, scope, methodology, modules, evaluation, and documentation.",
    view: "/projects/facilitease-paper.pdf",
    download: "/projects/facilitease-paper.pdf",
  },
  {
    title: "Highly Succeed GitHub Repository",
    desc: "Source code repository for my recent enterprise employee management system project.",
    view: "https://github.com/drixmolina/Highlysucceed.git",
    download: "https://github.com/drixmolina/Highlysucceed.git",
  },
  {
    title: "Drix Molina CV",
    desc: "ATS-friendly resume PDF for internship, IT, and web development applications.",
    view: CV_PATH,
    download: CV_PATH,
  },
  {
    title: "Certifications",
    desc: "View and download my IT Specialist, networking, security, and web certificates.",
    view: "#certifications",
    download: "#certifications",
  },
];

// ─── Neural Network Canvas ───────────────────────────────────────────────────

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const themeHost = document.querySelector("[data-theme]") as HTMLElement | null;
      const styles = getComputedStyle(themeHost || document.documentElement);
      const accentRgb = styles.getPropertyValue("--accent-rgb").trim() || "215,35,35";

      [
        [canvas.width * 0.15, canvas.height * 0.25, 380, accentRgb,   0.09],
        [canvas.width * 0.85, canvas.height * 0.65, 300, accentRgb,  0.07],
        [canvas.width * 0.5,  canvas.height * 0.85, 220, accentRgb,   0.05],
      ].forEach(([x, y, r, rgb, a]) => {
        const g = ctx.createRadialGradient(+x, +y, 0, +x, +y, +r);
        g.addColorStop(0, `rgba(${rgb}, ${a})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      pts.forEach((p, i) => {
        const mx = mouse.x - p.x, my = mouse.y - p.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 200) { p.vx += mx * 0.00012; p.vy += my * 0.00012; }

        p.x += p.vx; p.y += p.vy;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.8) { p.vx *= 0.8 / spd; p.vy *= 0.8 / spd; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        glow.addColorStop(0, `rgba(${accentRgb},0.55)`);
        glow.addColorStop(1, `rgba(${accentRgb},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb},0.8)`; ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const o = pts[j];
          const dx = p.x - o.x, dy = p.y - o.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(${accentRgb},${(1 - d / 135) * 0.22})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVis(true); };
    const leave = () => setVis(false);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[1] transition-opacity duration-500"
      style={{
        left: pos.x - 250, top: pos.y - 250,
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(var(--accent-rgb),0.07) 0%, transparent 70%)",
        opacity: vis ? 1 : 0,
      }}
    />
  );
}

// ─── Scroll Progress ──────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      style={{ scaleX, transformOrigin: "left", background: "linear-gradient(90deg,var(--accent),var(--accent),var(--accent))" }}
    />
  );
}

// ─── Page Loader ──────────────────────────────────────────────────────────────

function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
      style={{ background: "var(--bg)" }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold font-sora"
        style={{ background: "linear-gradient(135deg,var(--text),var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        DM.
      </motion.div>
      <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg,var(--accent),var(--accent))" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs font-jetbrains tracking-widest"
        style={{ color: "rgba(var(--text-rgb),0.25)" }}
      >
        LOADING PORTFOLIO
      </motion.p>
    </motion.div>
  );
}

// ─── Shared Utilities ─────────────────────────────────────────────────────────

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string; }) {
  return (
    <div className="text-center mb-20">
      <span className="text-xs font-jetbrains tracking-[0.3em] uppercase mb-4 block" style={{ color: "var(--accent)" }}>{tag}</span>
      <h2 className="text-4xl md:text-5xl font-bold font-sora mb-5" style={{ color: "var(--text)" }}>{title}</h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.45)" }}>{subtitle}</p>}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TypingEffect({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!del && text === word) {
      const t = setTimeout(() => setDel(true), 2200); return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false); setIdx(i => (i + 1) % words.length); return;
    }
    const t = setTimeout(() => setText(del ? text.slice(0, -1) : word.slice(0, text.length + 1)), del ? 42 : 90);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return (
    <span style={{ color: "var(--accent)" }}>
      {text}
      <span className="inline-block w-0.5 h-7 ml-1 animate-pulse align-middle rounded-full" style={{ background: "var(--accent)" }} />
    </span>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / 55;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(t); } else setN(Math.floor(cur));
    }, 22);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onCmdOpen }: { onCmdOpen: () => void }) {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35, rootMargin: "-15% 0px -55% 0px" },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3"
      >
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 max-w-[calc(100vw-1.5rem)]"
          style={scrolled ? glassMid : { background: "transparent" }}
        >
          <button
            onClick={() => goto("hero")}
            className="font-bold font-sora mr-3 text-base"
            style={{ color: "var(--text)" }}
          >
            DM<span style={{ color: "var(--accent)" }}>.</span>
          </button>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className="relative px-3 py-1.5 rounded-xl text-sm transition-colors duration-200 overflow-hidden"
                style={{
                  color: active === item.id ? "var(--accent)" : "rgba(var(--text-rgb),0.5)",
                }}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active-shadow"
                    className="absolute inset-0 rounded-xl"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    style={{
                      background: "rgba(var(--accent-rgb),0.13)",
                      boxShadow: "0 0 22px rgba(var(--accent-rgb),0.38)",
                      border: "1px solid rgba(var(--accent-rgb),0.18)",
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onCmdOpen}
            className="ml-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs transition-all duration-200 hover:opacity-70"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(var(--text-rgb),0.35)" }}
          >
            <Command size={12} />
            <span className="hidden sm:block font-jetbrains">K</span>
          </button>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden ml-1 w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: "rgba(var(--text-rgb),0.6)" }}
          >
            {mobileOpen ? <X size={16} /> : <span className="text-base">☰</span>}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-4"
            style={glassMid}
          >
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-colors overflow-hidden"
                style={{ color: active === item.id ? "var(--accent)" : "rgba(var(--text-rgb),0.7)" }}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="mobile-nav-active-shadow"
                    className="absolute inset-0 rounded-xl"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    style={{
                      background: "rgba(var(--accent-rgb),0.13)",
                      boxShadow: "0 0 22px rgba(var(--accent-rgb),0.32)",
                      border: "1px solid rgba(var(--accent-rgb),0.18)",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Command Palette ──────────────────────────────────────────────────────────

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => { if (open) setQ(""); }, [open]);

  const filtered = NAV.filter(n => n.label.toLowerCase().includes(q.toLowerCase()));

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-start justify-center pt-28 px-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: -16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: -16 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={glassMid}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={15} style={{ color: "var(--accent)" }} />
              <input
                autoFocus
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Escape") onClose();
                  if (e.key === "Enter" && filtered[0]) goto(filtered[0].id);
                }}
                placeholder="Jump to section..."
                className="flex-1 bg-transparent outline-none text-sm font-jetbrains"
                style={{ color: "var(--text)" }}
              />
              <kbd className="text-xs font-jetbrains px-1.5 py-0.5 rounded" style={{ color: "rgba(var(--text-rgb),0.3)", background: "rgba(255,255,255,0.05)" }}>ESC</kbd>
            </div>
            <div className="py-2">
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => goto(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/5"
                  style={{ color: "var(--text)" }}
                >
                  <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                  {item.label}
                  <ChevronRight size={14} className="ml-auto" style={{ color: "rgba(var(--text-rgb),0.2)" }} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Floating Dock ────────────────────────────────────────────────────────────

function FloatingDock() {
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 z-50 hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl"
      style={{ ...glassMid, boxShadow: "0 8px 40px rgba(0,0,0,0.5)", transform: "translateX(-50%)" }}
    >
      {NAV.map(n => (
        <motion.button
          key={n.id}
          whileHover={{ scale: 1.3, y: -6 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goto(n.id)}
          title={n.label}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ color: "rgba(var(--text-rgb),0.4)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(var(--text-rgb),0.4)")}
        >
          {n.icon}
        </motion.button>
      ))}
    </motion.div>
  );
}

// ─── Back to Top ─────────────────────────────────────────────────────────────

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,var(--accent),var(--accent))", boxShadow: "0 4px 24px rgba(var(--accent-rgb),0.45)" }}
        >
          <ArrowUp size={18} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [time, setTime] = useState(new Date());
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <>
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(var(--accent-rgb),0.12)" }} />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[140px]" style={{ background: "rgba(var(--accent-rgb),0.08)" }} />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 2.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.65 }}
              className="flex items-center gap-2 w-fit mb-7 px-3.5 py-2 rounded-full"
              style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.25)" }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              <span className="text-xs font-jetbrains" style={{ color: "var(--accent)" }}>Available for opportunities</span>
              <span className="text-xs font-jetbrains ml-1" style={{ color: "rgba(var(--accent-rgb),0.5)" }}>
                · {time.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Manila" })} PHT
              </span>
            </motion.div>

            <div className="mb-3 text-sm font-jetbrains tracking-widest" style={{ color: "rgba(var(--text-rgb),0.35)" }}>
              Hi there, I'm
            </div>
            <h1 className="font-sora font-bold leading-none mb-5" style={{ fontSize: "clamp(3.5rem,9vw,7rem)" }}>
              <span
                className="block"
                style={{ background: "linear-gradient(135deg,var(--text) 0%,var(--accent) 55%,var(--accent) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                Drix
              </span>
              <span className="block" style={{ color: "var(--text)" }}>Molina</span>
            </h1>
            <div className="text-2xl md:text-3xl font-sora font-semibold mb-7 h-12 flex items-center">
              <TypingEffect words={ROLES} />
            </div>

            <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: "rgba(var(--text-rgb),0.5)" }}>
              Building intelligent, scalable, and modern digital experiences through clean code, automation, and innovation.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,var(--accent),var(--accent))", boxShadow: "0 4px 28px rgba(var(--accent-rgb),0.45)" }}
              >
                <Layers size={16} /> View Projects
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setPreviewOpen(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold"
                style={{ ...glass, color: "var(--text)" }}
              >
                <Eye size={16} /> View CV
              </motion.button>
              <motion.a
                href={CV_PATH}
                download="Drix_Molina_CV.pdf"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold"
                style={{ ...glass, color: "var(--accent)" }}
              >
                <Download size={16} /> Download CV
              </motion.a>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: <Github size={18} />, href: "https://github.com/drixmolina", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: LINKEDIN_URL, label: "LinkedIn" },
                { icon: <Mail size={18} />, href: "mailto:drixmolina31@gmail.com", label: "Email" },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ ...glass, color: "rgba(var(--text-rgb),0.5)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(var(--text-rgb),0.5)")}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 2.65 }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-3xl blur-2xl opacity-25 pointer-events-none"
                style={{ background: "linear-gradient(135deg,var(--accent),var(--accent),var(--accent))" }}
              />

              <div className="relative rounded-3xl p-8 w-[320px]" style={glassMid}>
                <div className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg,var(--surface),var(--accent))" }}
                >
                  <span className="text-3xl font-bold font-sora text-white z-10">DM</span>
                  <div className="absolute inset-0" style={{ background: "rgba(var(--accent-rgb),0.15)" }} />
                </div>

                <div className="font-jetbrains text-sm space-y-0.5 mb-6">
                  <div style={{ color: "rgba(var(--text-rgb),0.25)" }}>const dev = &#123;</div>
                  {[
                    ["name",    '"Drix Molina"',      "text-amber-300/80"],
                    ["stack",   '"Full Stack"',        "text-amber-300/80"],
                    ["ai",      "true",                "text-green-400/70"],
                    ["openTo",  '"opportunities"',     "text-[var(--accent)]/80"],
                  ].map(([k, v, vc]) => (
                    <div key={k} className="pl-4">
                      <span style={{ color: "var(--accent)" }}>{k}</span>
                      <span style={{ color: "rgba(var(--text-rgb),0.25)" }}>: </span>
                      <span className={vc}>{v}</span>
                      <span style={{ color: "rgba(var(--text-rgb),0.25)" }}>,</span>
                    </div>
                  ))}
                  <div style={{ color: "rgba(var(--text-rgb),0.25)" }}>&#125;</div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[["5+","Certs"], ["3","Projects"], ["4+","Years"]].map(([n, l]) => (
                    <div key={l} className="text-center p-2.5 rounded-xl" style={{ background: "rgba(var(--accent-rgb),0.1)" }}>
                      <div className="text-lg font-bold font-sora" style={{ color: "var(--accent)" }}>{n}</div>
                      <div className="text-xs" style={{ color: "rgba(var(--text-rgb),0.35)" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ x: [0, 6, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-5 -right-5 px-3 py-1.5 rounded-full text-xs font-jetbrains"
                style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.25)", color: "var(--accent)" }}
              >
                ⚡ AI Automation
              </motion.div>
              <motion.div
                animate={{ x: [0, -5, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: 1.2 }}
                className="absolute -bottom-5 -left-5 px-3 py-1.5 rounded-full text-xs font-jetbrains"
                style={{ background: "rgba(var(--accent-rgb),0.12)", border: "1px solid rgba(var(--accent-rgb),0.25)", color: "var(--accent)" }}
              >
                🌐 Full Stack Dev
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(var(--text-rgb),0.2)" }}
        >
          <span className="text-xs font-jetbrains tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-9" style={{ background: "linear-gradient(to bottom,rgba(var(--accent-rgb),0.4),transparent)" }} />
        </motion.div>
      </div>
    </section>

    <ResumePreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}

// ─── About Section ────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Who I Am" title="About Me" /></FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="rounded-3xl p-8" style={glassMid}>
              <div className="relative rounded-[28px] overflow-hidden mb-7" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(var(--accent-rgb),0.14), rgba(0,0,0,0.55))" }}>
                <div className="absolute -inset-10 opacity-45 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(var(--accent-rgb),0.35), transparent 60%)" }} />
                <motion.img
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={PROFILE_IMAGE}
                  alt="Drix Molina professional portrait"
                  className="relative w-full h-[420px] object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.08))" }}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.16)", border: "1px solid rgba(var(--accent-rgb),0.25)", color: "var(--text)" }}>Professional Portrait</span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-jetbrains" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(var(--text-rgb),0.8)" }}>Blended with site theme</span>
                  </div>
                  <div className="text-lg font-sora font-semibold" style={{ color: "var(--text)" }}>Drix Molina</div>
                  <div className="text-sm" style={{ color: "rgba(var(--text-rgb),0.55)" }}>Full Stack Developer · IT Specialist · AI Automation</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/08">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--accent-rgb),0.18)" }}>
                  <BookOpen size={22} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-semibold font-sora" style={{ color: "var(--text)" }}>Far Eastern University – Diliman</div>
                  <div className="text-sm" style={{ color: "rgba(var(--text-rgb),0.4)" }}>4th Year BSIT Student · 2022–Present</div>
                </div>
              </div>
              <p className="leading-relaxed mb-4 text-sm" style={{ color: "rgba(var(--text-rgb),0.6)" }}>
                I'm a 4th-year Bachelor of Science in Information Technology student majoring in Web and Mobile Application Development. My tech journey started with curiosity and has evolved into a deep passion for building scalable, intelligent systems.
              </p>
              <p className="leading-relaxed text-sm" style={{ color: "rgba(var(--text-rgb),0.6)" }}>
                I combine full-stack engineering, network security, and AI automation — merging technical precision with creative problem-solving to deliver digital experiences that are fast, secure, and impactful.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Node.js", "PHP", "MySQL", "AI/ML", "Cisco", "Security"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}>{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="space-y-3">
              {[
                { icon: <Code2 size={18} />,    title: "Frontend Development",  desc: "Crafting pixel-perfect, responsive UIs with React and modern CSS." },
                { icon: <Server size={18} />,   title: "Backend Development",   desc: "Building scalable APIs with Node.js, Express, and PHP." },
                { icon: <Bot size={18} />,      title: "AI Automation",         desc: "Designing intelligent workflows and automation pipelines." },
                { icon: <Shield size={18} />,   title: "Network Security",      desc: "Implementing secure network architectures and Cisco configurations." },
                { icon: <Terminal size={18} />, title: "Continuous Learning",   desc: "Always exploring emerging technologies and best practices." },
              ].map(item => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all"
                  style={glass}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm font-sora mb-0.5" style={{ color: "var(--text)" }}>{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.45)" }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section id="stats" className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 0 40px rgba(var(--accent-rgb),0.22), 0 20px 60px rgba(0,0,0,0.4)" }}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={glassMid}
              >
                <div className="flex justify-center mb-3" style={{ color: "var(--accent)" }}>{s.icon}</div>
                <div className="text-4xl font-bold font-sora mb-1" style={{ color: "var(--text)" }}>
                  <Counter target={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs leading-tight" style={{ color: "rgba(var(--text-rgb),0.45)" }}>{s.label}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Technical Toolbox" title="Skills & Expertise" /></FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SKILLS_DATA).map(([cat, { icon, skills }], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>
                  {icon}
                </div>
                <h3 className="font-bold font-sora mb-4" style={{ color: "var(--text)" }}>{cat}</h3>
                <div className="space-y-2">
                  {skills.map(s => (
                    <div
                      key={s}
                      className="px-3 py-1.5 rounded-lg text-xs font-jetbrains text-center"
                      style={{ background: "rgba(var(--accent-rgb),0.08)", border: "1px solid rgba(var(--accent-rgb),0.15)", color: "rgba(var(--text-rgb),0.7)" }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Professional Journey" title="Experience" /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-7 top-4 bottom-4 w-px" style={{ background: "linear-gradient(to bottom,var(--accent),var(--accent),transparent)" }} />

            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="relative pl-20 mb-12"
              >
                <div
                  className="absolute -left-4 top-2 w-6 h-6 rounded-full border-4"
                  style={{ borderColor: "var(--accent)", background: "var(--bg)" }}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl p-6 transition-all"
                  style={{
                    borderColor: exp.color + "44",
                    background: "var(--bg)",
                    boxShadow: `0 0 14px ${exp.color}55`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-sora" style={{ color: "var(--text)" }}>{exp.role}</h3>
                      <div className="text-sm font-medium mt-0.5" style={{ color: "var(--accent)" }}>{exp.company}</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg text-xs font-jetbrains" style={{ background: exp.color + "1a", color: exp.color }}>
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "rgba(var(--text-rgb),0.6)" }}>{exp.desc}</p>

                  {exp.images?.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className="mb-4 rounded-2xl overflow-hidden p-3"
                      style={{ border: "1px solid rgba(var(--accent-rgb),0.15)", background: "rgba(255,255,255,0.02)" }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.12)", border: "1px solid rgba(var(--accent-rgb),0.18)", color: "var(--text)" }}>
                          <Star size={12} style={{ color: "var(--accent)" }} />
                          {exp.imageCaption || exp.company}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {exp.images.map((item, imageIndex) => (
                          <motion.div
                            key={item.src}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.55, delay: imageIndex * 0.08, ease: "easeOut" }}
                            className={imageIndex === 0 ? "md:col-span-2" : ""}
                          >
                            <div className="relative overflow-hidden rounded-xl group">
                              <img
                                src={item.src}
                                alt={item.alt || exp.company}
                                className={imageIndex === 0 ? "w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105" : "w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-105"}
                              />
                              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.05) 48%, transparent)" }} />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded text-xs font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "rgba(var(--text-rgb),0.6)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openProject = (project: (typeof PROJECTS)[number], index = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(index);
  };

  const groupedScreenshots = selectedProject?.screenshots?.reduce((acc, shot) => {
    const key = shot.group || "Screenshots";
    if (!acc[key]) acc[key] = [];
    acc[key].push(shot);
    return acc;
  }, {} as Record<string, { url: string; caption: string; group?: string }[]>);

  return (
    <>
      <section id="projects" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <FadeIn><SectionHeader tag="Portfolio" title="Real Projects" subtitle="Actual systems and case studies from my web, mobile, and capstone work" /></FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {PROJECTS.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden transition-all"
                  style={{ ...glassMid }}
                >
                  <button type="button" onClick={() => proj.screenshots?.length ? openProject(proj) : undefined} className="relative h-52 overflow-hidden block w-full text-left">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity flex items-end p-4">
                      <div>
                        <div className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-jetbrains mb-2" style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.25)" }}>
                          {proj.status}
                        </div>
                        <div className="text-xs" style={{ color: "rgba(var(--text-rgb),0.72)" }}>
                          {proj.screenshots?.length ? `${proj.screenshots.length} screenshots · Click to view` : "Portfolio project"}
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="p-5">
                    <h3 className="font-bold font-sora text-lg mb-2" style={{ color: "var(--text)" }}>{proj.title}</h3>
                    <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.6)" }}>{proj.desc}</p>
                    <div className="text-xs font-jetbrains mb-4" style={{ color: "rgba(var(--accent-rgb),0.85)" }}>
                      Role: {proj.role}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {proj.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-xs font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.08)", border: "1px solid rgba(var(--accent-rgb),0.15)", color: "var(--accent)" }}>{t}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-jetbrains" style={{ ...glass, color: "var(--text)" }}>
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {proj.demo && (
                        <a href={proj.demo} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.14)", color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.22)" }}>
                          <ExternalLink size={14} /> {proj.demo.startsWith("#") ? "View Section" : "Live Demo"}
                        </a>
                      )}
                      {proj.screenshots?.length > 0 && (
                        <button onClick={() => openProject(proj)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-jetbrains" style={{ border: "1px solid rgba(var(--accent-rgb),0.25)", color: "var(--accent)" }}>
                          <Eye size={14} /> Gallery
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              className="w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col"
              style={glassMid}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 p-4 border-b border-white/10">
                <div>
                  <h3 className="font-bold font-sora" style={{ color: "var(--text)" }}>{selectedProject.title}</h3>
                  <p className="text-xs" style={{ color: "rgba(var(--text-rgb),0.45)" }}>{selectedProject.screenshots[selectedImageIndex]?.caption}</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.12)", color: "var(--accent)" }}>
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="relative mb-6">
                  <img
                    src={selectedProject.screenshots[selectedImageIndex]?.url}
                    alt={selectedProject.screenshots[selectedImageIndex]?.caption}
                    className="w-full max-h-[58vh] object-contain rounded-2xl bg-black/40"
                  />
                  {selectedProject.screenshots.length > 1 && (
                    <>
                      <button onClick={() => setSelectedImageIndex(i => (i - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl" style={{ background: "rgba(var(--accent-rgb),0.28)", color: "var(--text)" }}>←</button>
                      <button onClick={() => setSelectedImageIndex(i => (i + 1) % selectedProject.screenshots.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl" style={{ background: "rgba(var(--accent-rgb),0.28)", color: "var(--text)" }}>→</button>
                    </>
                  )}
                </div>

                <div className="space-y-5">
                  {groupedScreenshots && Object.entries(groupedScreenshots).map(([group, shots]) => (
                    <div key={group}>
                      <div className="text-xs font-jetbrains uppercase tracking-[0.22em] mb-3" style={{ color: "var(--accent)" }}>{group}</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {shots.map((shot) => {
                          const originalIndex = selectedProject.screenshots.findIndex(s => s.url === shot.url);
                          return (
                            <button
                              key={shot.url}
                              onClick={() => setSelectedImageIndex(originalIndex)}
                              className="relative rounded-xl overflow-hidden border group/thumb"
                              style={{ borderColor: originalIndex === selectedImageIndex ? "var(--accent)" : "rgba(var(--text-rgb),0.12)" }}
                            >
                              <img src={shot.url} alt={shot.caption} className="h-24 md:h-28 w-full object-cover group-hover/thumb:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/30" />
                              <div className="absolute bottom-0 left-0 right-0 p-2 text-[10px] text-left" style={{ color: "var(--text)" }}>{shot.caption}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────

function EducationSection() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn><SectionHeader tag="Academic Background" title="Education" /></FadeIn>
        <FadeIn delay={0.12}>
          <div className="rounded-3xl p-8 relative overflow-hidden" style={glassMid}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(var(--accent-rgb),0.1)" }} />
            <div className="relative">
              <div className="flex items-start gap-5 mb-7">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--accent-rgb),0.15)", border: "1px solid rgba(var(--accent-rgb),0.3)" }}>
                  <BookOpen size={24} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="text-xs font-jetbrains tracking-widest mb-1" style={{ color: "var(--accent)" }}>2022 – PRESENT · 4TH YEAR</div>
                  <h3 className="text-xl font-bold font-sora mb-1" style={{ color: "var(--text)" }}>Far Eastern University – Diliman</h3>
                  <div className="text-sm" style={{ color: "rgba(var(--text-rgb),0.55)" }}>Bachelor of Science in Information Technology</div>
                  <div className="text-xs font-jetbrains mt-1" style={{ color: "rgba(var(--accent-rgb),0.7)" }}>Major: Web and Mobile Application Development</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Web Development", "Mobile Apps", "Network Security", "AI Systems"].map(c => (
                  <div key={c} className="text-center p-3 rounded-xl text-xs font-jetbrains" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(var(--text-rgb),0.45)" }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Resume Section ───────────────────────────────────────────────────────────



function CurrentlyWorkingSection() {
  return (
    <section id="current" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Now" title="Currently Working On" /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
            {CURRENT_WORK.map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl p-6"
                style={glassMid}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-bold" style={{ background: "rgba(var(--accent-rgb),0.12)", color: "var(--accent)" }}>
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.68)" }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TechOrbitSection() {
  return (
    <section id="tech-orbit" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Interactive Stack" title="Tech Stack Orbit" subtitle="Core technologies I use in web, mobile, IT, and automation projects." /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative mx-auto w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/10" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {ORBIT_TECH.map((tech, i) => {
                const angle = (i / ORBIT_TECH.length) * Math.PI * 2;
                const radius = 155;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={tech}
                    className="absolute left-1/2 top-1/2 w-16 h-16 rounded-2xl flex items-center justify-center text-xs font-jetbrains font-bold"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      background: "rgba(var(--accent-rgb),0.13)",
                      border: "1px solid rgba(var(--accent-rgb),0.25)",
                      color: "var(--text)",
                      boxShadow: "0 0 24px rgba(var(--accent-rgb),0.18)",
                    }}
                  >
                    <motion.span animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>{tech}</motion.span>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="w-36 h-36 rounded-full flex flex-col items-center justify-center text-center" style={{ background: "rgba(var(--accent-rgb),0.16)", border: "1px solid rgba(var(--accent-rgb),0.28)", color: "var(--text)" }}>
              <Code2 size={28} style={{ color: "var(--accent)" }} />
              <div className="font-sora font-bold mt-2">Drix</div>
              <div className="text-xs" style={{ color: "rgba(var(--text-rgb),0.55)" }}>Full Stack</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function GitHubStatsSection() {
  return (
    <section id="github" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="GitHub" title="Developer Activity" subtitle="Live GitHub profile cards connected to my public GitHub account." /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
            {[
              `https://github-readme-stats.vercel.app/api?username=drixmolina&show_icons=true&theme=radical&hide_border=true&bg_color=000000&title_color=D72323&icon_color=D72323&text_color=F5EDED`,
              `https://github-readme-stats.vercel.app/api/top-langs/?username=drixmolina&layout=compact&theme=radical&hide_border=true&bg_color=000000&title_color=D72323&text_color=F5EDED`
            ].map((src, i) => (
              <motion.div key={src} whileHover={{ y: -6 }} className="rounded-2xl p-3 overflow-hidden" style={glassMid}>
                <img src={src} alt={i === 0 ? "GitHub stats" : "Top languages"} className="w-full rounded-xl" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectResourcesSection() {
  return (
    <section id="resources" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Downloads" title="Project Documents & Resources" subtitle="Important documents, resume, and portfolio resources in one place." /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {RESOURCE_DOCS.map((doc, i) => (
              <motion.div key={doc.title} whileHover={{ y: -6 }} className="rounded-2xl p-6" style={glassMid}>
                <FileText size={28} style={{ color: "var(--accent)" }} />
                <h3 className="font-bold font-sora mt-4 mb-2" style={{ color: "var(--text)" }}>{doc.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(var(--text-rgb),0.58)" }}>{doc.desc}</p>
                <div className="flex gap-2">
                  <a href={doc.view} target={doc.view.startsWith("#") ? undefined : "_blank"} rel="noopener noreferrer" className="flex-1 py-2 rounded-xl text-xs font-jetbrains text-center" style={{ border: "1px solid rgba(var(--accent-rgb),0.28)", color: "var(--accent)" }}>View</a>
                  <a href={doc.download} download className="flex-1 py-2 rounded-xl text-xs font-jetbrains text-center" style={{ background: "rgba(var(--accent-rgb),0.14)", color: "var(--text)" }}>Download</a>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Recommendations" title="Testimonials" subtitle="Placeholder recommendation cards that can be replaced with real feedback later." /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} whileHover={{ y: -6 }} className="rounded-2xl p-6" style={glassMid}>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} size={15} style={{ color: "var(--accent)" }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(var(--text-rgb),0.66)" }}>"{t.quote}"</p>
                <div className="font-bold font-sora text-sm" style={{ color: "var(--text)" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "rgba(var(--text-rgb),0.42)" }}>{t.role}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ResumePreviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.86)", backdropFilter: "blur(12px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            className="w-full max-w-5xl h-[82vh] rounded-3xl overflow-hidden flex flex-col"
            style={glassMid}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <h3 className="font-bold font-sora" style={{ color: "var(--text)" }}>Drix Molina CV</h3>
                <p className="text-xs" style={{ color: "rgba(var(--text-rgb),0.45)" }}>Preview resume before downloading</p>
              </div>
              <div className="flex gap-2">
                <a href={CV_PATH} download="Drix_Molina_CV.pdf" className="px-3 py-2 rounded-xl text-xs font-jetbrains" style={{ background: "rgba(var(--accent-rgb),0.14)", color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.22)" }}>
                  Download
                </a>
                <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.12)", color: "var(--accent)" }}>
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe src={CV_PATH} title="Drix Molina CV" className="flex-1 w-full bg-black" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResumeSection() {
  const [sent, setSent] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <section id="resume" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <FadeIn><SectionHeader tag="Resume" title="View & Download CV" /></FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-xl mx-auto rounded-3xl p-8 text-center" style={glassMid}>
              <Download size={40} className="mx-auto mb-4" style={{ color: "var(--accent)" }} />
              <h3 className="text-2xl font-bold font-sora mb-2" style={{ color: "var(--text)" }}>Professional Resume</h3>
              <p style={{ color: "rgba(var(--text-rgb),0.6)" }} className="text-sm mb-6">Preview my resume in the website or download the PDF copy.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl font-jetbrains font-semibold transition-all flex items-center justify-center gap-2"
                  style={{ border: "1px solid rgba(var(--accent-rgb),0.34)", color: "var(--accent)", background: "rgba(var(--accent-rgb),0.08)" }}
                >
                  <Eye size={16} /> View CV
                </motion.button>
                <motion.a
                  href={CV_PATH}
                  download="Drix_Molina_CV.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl font-jetbrains font-semibold transition-all flex items-center justify-center gap-2"
                  style={{
                    background: sent ? "linear-gradient(135deg,#00c859,#00a589)" : "linear-gradient(135deg,var(--accent),var(--accent))",
                    boxShadow: "0 4px 22px rgba(var(--accent-rgb),0.42)",
                    color: "#ffffff",
                  }}
                  onClick={() => setSent(true)}
                >
                  <Download size={16} /> {sent ? "✓ Downloaded" : "Download CV"}
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <ResumePreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}


// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
    window.location.href = `mailto:drixmolina31@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => { setSent(false); setName(""); setEmail(""); setMsg(""); }, 3000);
  };

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <FadeIn><SectionHeader tag="Get in Touch" title="Contact Me" subtitle="Let's build something amazing together" /></FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: <Mail size={24} />, title: "Email", text: "drixmolina31@gmail.com", href: "mailto:drixmolina31@gmail.com" },
                { icon: <Github size={24} />, title: "GitHub", text: "github.com/drixmolina", href: "https://github.com/drixmolina" },
                { icon: <Linkedin size={24} />, title: "LinkedIn", text: "linkedin.com/in/drix-molina-a1ba62321", href: LINKEDIN_URL },
              ].map(c => (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:scale-105" style={glass}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--accent-rgb),0.1)", color: "var(--accent)" }}>{c.icon}</div>
                  <div>
                    <div className="text-sm transition-colors" style={{ color: "var(--text)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                    >{c.title}</div>
                    <div className="text-xs" style={{ color: "rgba(var(--text-rgb),0.4)" }}>{c.text}</div>
                  </div>
                </a>
              ))}
            </div>

            <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm transition-all focus:border-white/20" style={{ color: "var(--text)" }} required />
              <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm transition-all focus:border-white/20" style={{ color: "var(--text)" }} required />
              <textarea placeholder="Your Message" rows={4} value={msg} onChange={e => setMsg(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm transition-all focus:border-white/20" style={{ color: "var(--text)" }} required />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-jetbrains font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: sent ? "linear-gradient(135deg,#00c859,#00a589)" : "linear-gradient(135deg,var(--accent),var(--accent))",
                  boxShadow: "0 4px 22px rgba(var(--accent-rgb),0.42)",
                  color: "#ffffff",
                }}
              >
                {sent ? <span>✓ Sent!</span> : <><Send size={16} /> Send Message</>}
              </motion.button>
            </motion.form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const [year] = useState(new Date().getFullYear());
  return (
    <footer className="py-12 relative z-10 border-t border-white/06" style={{ background: "rgba(var(--surface-rgb), 0.3)" }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold font-sora mb-2" style={{ color: "var(--text)" }}>
            Drix<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { text: "Home", href: "#hero" },
              { text: "About", href: "#about" },
              { text: "Projects", href: "#projects" },
              { text: "Contact", href: "#contact" },
            ].map(l => (
              <a key={l.text} href={l.href} className="text-sm transition-colors" style={{ color: "var(--text)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
              >{l.text}</a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/06 text-center text-xs" style={{ color: "rgba(var(--text-rgb),0.3)" }}>
          © {year} Drix Molina. All rights reserved. | Designed & built with passion
        </div>
      </div>
    </footer>
  );
}

// ─── Main App Component ───────────────────────────────────────────────────────

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div data-theme="dark" className="min-h-screen overflow-x-hidden theme-dark" style={{ background: "var(--bg)" }}>
      <AnimatePresence>
        {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      </AnimatePresence>

      {loaderDone && (
        <>
          <div className="theme-content">
          <NeuralCanvas />
          <CursorGlow />
          <ScrollProgress />
          <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
          <Navbar onCmdOpen={() => setCmdOpen(true)} />

          <main>
            <HeroSection />
            <AboutSection />
            <StatsSection />
            <SkillsSection />
            <TechOrbitSection />
            <ExperienceSection />
            <CurrentlyWorkingSection />
            <ProjectsSection />
            <GitHubStatsSection />
            <CapstoneProjectSection glass={glass} glassMid={glassMid} />
            <EnhancedCertificationsSection glass={glass} glassMid={glassMid} />
            <EducationSection />
            <ProjectResourcesSection />
            <ResumeSection />
            <ContactSection />
          </main>

          <Footer />
          <FloatingDock />
          <BackToTop />
          </div>
        </>
      )}
    </div>
  );
}
