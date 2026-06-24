// Enhanced Certification Card and Section Components
import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Award, FileText, ExternalLink } from "lucide-react";
import { PDFModal } from "./PDFModal";
import { CertificateData, loadCertificates } from "./certificateUtils";

interface EnhancedCertCardProps {
  cert: CertificateData;
  onViewPDF: (cert: CertificateData) => void;
}

export function EnhancedCertCard({ cert, onViewPDF }: EnhancedCertCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -8, scale: 1.03 }}
      className="flex-shrink-0 w-80 rounded-2xl p-6 cursor-pointer transition-all duration-300 backdrop-blur-md"
      style={{
        background: "rgba(var(--surface-rgb), 0.8)",
        border: hov ? `2px solid ${cert.color}88` : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hov ? `0 0 60px ${cert.color}22, 0 0 30px ${cert.color}11, 0 20px 60px rgba(0,0,0,0.6)` : "0 4px 20px rgba(0,0,0,0.3)",
      }}
      onClick={() => onViewPDF(cert)}
    >
      {/* Certificate icon */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all" 
        style={{ 
          background: hov ? `${cert.color}22` : `${cert.color}15`, 
          border: `1px solid ${cert.color}40` 
        }}>
        <Award size={24} style={{ color: cert.color }} />
      </div>

      {/* Title and Organization */}
      <h3 className="font-bold font-sora text-base leading-tight mb-1.5" style={{ color: "var(--text)" }}>
        {cert.title}
      </h3>
      <div className="text-xs font-jetbrains mb-3" style={{ color: cert.color }}>
        {cert.organization}
      </div>

      {/* Issue Date and Credential */}
      <div className="flex items-center justify-between text-xs mb-4">
        <span style={{ color: "rgba(var(--text-rgb),0.4)" }}>Issued: {cert.issueDate}</span>
        {cert.credentialId && (
          <span className="px-2 py-1 rounded" style={{ background: `${cert.color}15`, color: cert.color, fontSize: '10px' }}>
            {cert.credentialId}
          </span>
        )}
      </div>

      {/* Description */}
      {cert.description && (
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.45)" }}>
          {cert.description}
        </p>
      )}

      {/* Hover Preview */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-xs">
              <FileText size={14} style={{ color: cert.color }} />
              <span style={{ color: "rgba(var(--text-rgb),0.6)" }}>Click to view certificate PDF</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 flex gap-2"
            >
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-jetbrains text-xs font-semibold transition-all hover:scale-105"
                style={{
                  background: `${cert.color}22`,
                  color: cert.color,
                  border: `1px solid ${cert.color}40`,
                }}
              >
                <FileText size={12} /> View PDF
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-jetbrains text-xs font-semibold transition-all hover:scale-105"
                style={{
                  background: `${cert.color}22`,
                  color: cert.color,
                  border: `1px solid ${cert.color}40`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const link = document.createElement('a');
                  link.href = cert.pdfPath;
                  link.download = cert.title;
                  link.click();
                }}
              >
                <ExternalLink size={12} /> Download
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface EnhancedCertificationsSectionProps {
  glass: React.CSSProperties;
  glassMid: React.CSSProperties;
}

export function EnhancedCertificationsSection({
  glass,
  glassMid,
}: EnhancedCertificationsSectionProps) {
  const [certs, setCerts] = useState<CertificateData[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCerts = async () => {
      try {
        const loadedCerts = await loadCertificates();
        setCerts(loadedCerts);
      } catch (error) {
        console.error('Failed to load certificates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCerts();
  }, []);

  return (
    <>
      <section id="certifications" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-jetbrains tracking-[0.3em] uppercase mb-4 block" style={{ color: "var(--accent)" }}>Credentials</span>
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-5" style={{ color: "var(--text)" }}>Certifications</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(var(--text-rgb),0.45)" }}>Industry-recognised certifications that validate my technical skills.</p>
          </div>

          {!isLoading && (
            <>
              <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide max-w-full px-2">
                {certs.map((cert) => (
                  <EnhancedCertCard
                    key={cert.id}
                    cert={cert}
                    onViewPDF={(cert) => setSelectedCert(cert)}
                  />
                ))}
              </div>
              <p className="text-center text-xs font-jetbrains mt-6" style={{ color: "rgba(var(--text-rgb),0.2)" }}>
                ← Click cards to view · Scroll for more →
              </p>
            </>
          )}
        </div>
      </section>

      {/* PDF Modal */}
      {selectedCert && (
        <PDFModal
          isOpen={true}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          pdfPath={selectedCert.pdfPath}
        />
      )}
    </>
  );
}
