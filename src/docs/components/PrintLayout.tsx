import type { ReactNode } from "react";

/** Injects print styles — hide chrome when printing; show A4 page only */
export default function PrintLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .ow-docs-print-root {
            overflow: visible !important;
            height: auto !important;
          }
          .ow-docs-canvas-scroll {
            overflow: visible !important;
            height: auto !important;
          }
          .ow-docs-zoom-wrapper,
          .ow-docs-zoom-inner {
            zoom: 1 !important;
            transform: none !important;
          }
          .page-canvas-print {
            box-shadow: none !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
      {children}
    </>
  );
}
