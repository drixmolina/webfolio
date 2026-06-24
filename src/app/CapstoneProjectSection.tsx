// Featured Capstone Project Section Component
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Download, FileText, ExternalLink, Code2, Zap, Target, Layers, BookOpen, Trophy } from "lucide-react";
import { getCapstoneProject } from "./certificateUtils";

interface CapstoneProjectSectionProps {
  glass: React.CSSProperties;
  glassMid: React.CSSProperties;
}

export function CapstoneProjectSection({
  glass,
  glassMid,
}: CapstoneProjectSectionProps) {
  const project = getCapstoneProject();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });


  return (
    <>
      <section id="capstone" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-xs font-jetbrains tracking-[0.3em] uppercase mb-4 block" style={{ color: "var(--accent)" }}>Featured Project</span>
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-5" style={{ color: "var(--text)" }}>Capstone Project</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.45)" }}>My real capstone case study with project demo photos, awards recognition, and the full research paper.</p>
          </div>

          <div ref={ref} className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer h-96"
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h2 className="text-4xl md:text-5xl font-bold font-sora mb-3" style={{ color: "var(--text)" }}>
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="text-sm md:text-base max-w-3xl leading-relaxed mb-3" style={{ color: "var(--accent)" }}>
                    {project.subtitle}
                  </p>
                )}
                <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.8)" }}>
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Objectives */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <Target size={20} />
                  </div>
                  <h3 className="font-bold font-sora" style={{ color: "var(--text)" }}>
                    Objectives
                  </h3>
                </div>
                <ul className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: "var(--accent)" }} className="mt-1 flex-shrink-0">
                        •
                      </span>
                      <span style={{ color: "rgba(var(--text-rgb),0.7)" }}>{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Problem Statement */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <Zap size={20} />
                  </div>
                  <h3 className="font-bold font-sora" style={{ color: "var(--text)" }}>
                    Challenge
                  </h3>
                </div>
                <p style={{ color: "rgba(var(--text-rgb),0.7)" }} className="text-sm leading-relaxed">
                  {project.problemStatement}
                </p>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <Code2 size={20} />
                  </div>
                  <h3 className="font-bold font-sora" style={{ color: "var(--text)" }}>
                    Key Features
                  </h3>
                </div>
                <ul className="space-y-2">
                  {project.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: "var(--accent)" }} className="mt-1 flex-shrink-0">
                        ✓
                      </span>
                      <span style={{ color: "rgba(var(--text-rgb),0.7)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Full Case Study */}
            <motion.div
              id="facilitease-case-study"
              whileHover={{ y: -5 }}
              className="rounded-2xl p-8 transition-all"
              style={glassMid}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-sora" style={{ color: "var(--text)" }}>FacilitEASE Case Study</h3>
                  <p className="text-sm" style={{ color: "rgba(var(--text-rgb),0.5)" }}>A complete capstone breakdown from problem discovery to implementation and presentation.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  ["Overview", "A web and mobile property management system created for FEU Diliman Facilities Office to centralize reservations, service requests, inventory, dispatch, and notifications."],
                  ["Challenge", "Manual paper-based processes caused delays, weak tracking, double-booking risks, unclear communication, and difficulty monitoring pending job orders."],
                  ["Solution", "FacilitEASE digitizes the workflow through role-based access, real-time reservation visibility, job order tracking, personnel dispatch, and push notifications."],
                  ["My Role", "Contributed to documentation, system testing, UI/UX support, research revisions, visual aids, and project presentation preparation."],
                  ["Result", "Presented during the capstone exhibit and recognized through awards night activities, highlighting the system’s real-world value and practical workflow improvements."],
                  ["Future Improvements", "Add analytics dashboards, advanced reporting, offline mobile support, stronger notification rules, and expanded asset lifecycle tracking."]
                ].map(([title, body], index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-xl p-5"
                    style={{ background: "rgba(var(--accent-rgb),0.07)", border: "1px solid rgba(var(--accent-rgb),0.14)" }}
                  >
                    <div className="text-sm font-bold font-sora mb-2" style={{ color: "var(--accent)" }}>{title}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.66)" }}>{body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl p-8 transition-all"
              style={glassMid}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                >
                  <Layers size={24} />
                </div>
                <h3 className="text-2xl font-bold font-sora" style={{ color: "var(--text)" }}>
                  Technology Stack
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-xl text-center text-sm font-jetbrains"
                    style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Web and Mobile Moving Screens */}
            {project.screenshotGroups && project.screenshotGroups.length > 0 && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all overflow-hidden"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-sora" style={{ color: "var(--text)" }}>
                      Project Screenshots
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "rgba(var(--text-rgb),0.5)" }}>
                      Web screens move left to right, while mobile screens move right to left.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {project.screenshotGroups.map((group, groupIndex) => (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.65, delay: groupIndex * 0.08 }}
                      className="screenshot-group-card overflow-hidden rounded-2xl py-5"
                    >
                      <div className="mb-4 px-5">
                        <div className="text-xs font-jetbrains uppercase tracking-[0.25em] mb-2" style={{ color: "var(--accent)" }}>
                          {group.type === "web" ? "Web Screens" : "Mobile Screens"}
                        </div>
                        <h4 className="screenshot-group-title text-xl font-bold font-sora">
                          {group.type === "web" ? "Web Application Screens" : "Mobile Application Screens"}
                        </h4>
                      </div>

                      <div className="screenshot-marquee">
                        <div className={`screenshot-marquee-track ${group.type === "mobile" ? "screenshot-marquee-track-reverse" : ""}`}>
                          {[...group.shots, ...group.shots].map((shot, index) => (
                            <div
                              key={`${group.title}-${shot.url}-${index}`}
                              className="screenshot-marquee-card group"
                            >
                              <img src={shot.url} alt={shot.caption} />
                              <span>{shot.caption}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Capstone Experience Photos */}
            {project.experiencePhotos && project.experiencePhotos.length > 0 && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all overflow-hidden"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-sora" style={{ color: "var(--text)" }}>
                      Capstone Experience
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "rgba(var(--text-rgb),0.5)" }}>
                      Behind-the-scenes and recognition photos from our completed FacilitEASE capstone journey.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {project.experiencePhotos.map((photo, index) => (
                    <motion.div
                      key={photo.url}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: index * 0.06 }}
                      className="group relative overflow-hidden rounded-2xl"
                      style={{ border: "1px solid rgba(var(--accent-rgb),0.16)", background: "rgba(255,255,255,0.03)" }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm font-jetbrains" style={{ color: "var(--text)" }}>{photo.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Awards and Recognition */}
            {project.awards && project.awards.length > 0 && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <Trophy size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-sora" style={{ color: "var(--text)" }}>
                    Awards & Recognition
                  </h3>
                </div>
                <div className="grid md:grid-cols-4 gap-3">
                  {project.awards.map((award, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3 text-sm font-jetbrains text-center"
                      style={{ background: "rgba(var(--accent-rgb),0.1)", border: "1px solid rgba(var(--accent-rgb),0.2)", color: "var(--text)" }}
                    >
                      {award}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Development Process */}
            {project.developmentProcess && project.developmentProcess.length > 0 && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                  >
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-sora" style={{ color: "var(--text)" }}>
                    Development Process
                  </h3>
                </div>

                <div className="space-y-3">
                  {project.developmentProcess.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{ background: "rgba(var(--accent-rgb),0.2)", color: "var(--accent)" }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ color: "rgba(var(--text-rgb),0.7)" }} className="text-sm pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Architecture & Documentation */}
            {project.architecture && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all"
                style={glassMid}
              >
                <h3 className="text-2xl font-bold font-sora mb-4" style={{ color: "var(--text)" }}>
                  Architecture
                </h3>
                <p style={{ color: "rgba(var(--text-rgb),0.7)" }} className="text-sm leading-relaxed">
                  {project.architecture}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              {project.documentation && (
                <motion.a
                  href={project.documentation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-jetbrains font-semibold transition-all"
                  style={{
                    border: "2px solid var(--accent)",
                    color: "var(--accent)",
                    background: "transparent",
                  }}
                >
                  <FileText size={18} /> View Paper
                </motion.a>
              )}

              {project.documentation && (
                <motion.a
                  href={project.documentation.url}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-jetbrains font-semibold transition-all text-white"
                  style={{
                    background: "linear-gradient(135deg,var(--accent),#9e1717)",
                    boxShadow: "0 4px 22px rgba(var(--accent-rgb),0.42)",
                  }}
                >
                  <Download size={18} /> Download Paper
                </motion.a>
              )}

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-jetbrains font-semibold transition-all"
                style={{
                  border: "2px solid rgba(var(--text-rgb),0.18)",
                  color: "var(--text)",
                  background: "rgba(var(--text-rgb),0.06)",
                }}
              >
                <ExternalLink size={18} /> View Gallery
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
