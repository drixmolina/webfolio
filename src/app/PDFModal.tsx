// PDF Modal Viewer Component
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Maximize2, ZoomIn, ZoomOut } from "lucide-react";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
}

export function PDFModal({ isOpen, onClose, title, pdfPath }: PDFModalProps) {
  const [scale, setScale] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setScale(Math.min(scale + 25, 300));
  const handleZoomOut = () => setScale(Math.max(scale - 25, 50));
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = title;
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-[201] bg-[var(--surface)] rounded-2xl overflow-hidden flex flex-col ${
              isFullscreen ? 'inset-0 m-0 rounded-none' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 max-w-4xl'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ZoomOut size={18} className="text-[var(--text)]" />
                </button>
                <span className="text-sm text-[var(--text)] w-12 text-center">{scale}%</span>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ZoomIn size={18} className="text-[var(--text)]" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title="Fullscreen"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Maximize2 size={18} className="text-[var(--text)]" />
                </button>
                <button
                  onClick={handleDownload}
                  title="Download"
                  className="p-2 hover:bg-[var(--accent)] rounded-lg transition-colors"
                >
                  <Download size={18} className="text-[var(--text)]" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--accent)] rounded-lg transition-colors"
                >
                  <X size={18} className="text-[var(--text)]" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-black/40">
              <div className="flex items-start justify-center p-4">
                <iframe
                  src={`${pdfPath}#zoom=${scale}`}
                  className="rounded-lg shadow-2xl"
                  style={{
                    width: `${scale}%`,
                    maxWidth: '100%',
                    height: 'auto',
                    aspectRatio: '8.5 / 11',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  title="PDF Viewer"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
