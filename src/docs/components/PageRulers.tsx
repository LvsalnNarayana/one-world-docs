import { Box, Tooltip } from "@mui/material";
import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

type Margins = { top: number; bottom: number; left: number; right: number };

type DragKind = "left" | "right" | "top" | "bottom";

const MIN_MARGIN = 16;
const MIN_CONTENT = 120;
const PX_PER_MM = 96 / 25.4;

interface PageRulersProps {
  pageWidth: number;
  pageHeight: number;
  margins: Margins;
  onMarginsChange: (next: Margins) => void;
  onMarginsCommit: (next: Margins) => void;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export default function PageRulers({
  pageWidth,
  pageHeight,
  margins,
  onMarginsChange,
  onMarginsCommit,
}: PageRulersProps) {
  const dragRef = useRef<{ kind: DragKind; start: Margins } | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const verticalRef = useRef<HTMLDivElement | null>(null);

  const onPointerMove = useCallback(
    (e: globalThis.PointerEvent) => {
      if (!dragRef.current) return;
      const { kind, start } = dragRef.current;
      const next = { ...start };

      if (kind === "left") {
        const x = e.clientX - (horizontalRef.current?.getBoundingClientRect().left ?? 0);
        next.left = clamp(x, MIN_MARGIN, pageWidth - start.right - MIN_CONTENT);
      } else if (kind === "right") {
        const x = e.clientX - (horizontalRef.current?.getBoundingClientRect().left ?? 0);
        const right = pageWidth - x;
        next.right = clamp(right, MIN_MARGIN, pageWidth - start.left - MIN_CONTENT);
      } else if (kind === "top") {
        const y = e.clientY - (verticalRef.current?.getBoundingClientRect().top ?? 0);
        next.top = clamp(y, MIN_MARGIN, pageHeight - start.bottom - MIN_CONTENT);
      } else if (kind === "bottom") {
        const y = e.clientY - (verticalRef.current?.getBoundingClientRect().top ?? 0);
        const bottom = pageHeight - y;
        next.bottom = clamp(bottom, MIN_MARGIN, pageHeight - start.top - MIN_CONTENT);
      }
      onMarginsChange(next);
    },
    [onMarginsChange, pageHeight, pageWidth]
  );

  const onPointerUp = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    onMarginsCommit(margins);
  }, [margins, onMarginsCommit]);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const startDrag = (kind: DragKind) => (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = { kind, start: { ...margins } };
  };

  const mmTicksX = Array.from(
    { length: Math.floor(pageWidth / PX_PER_MM) + 1 },
    (_, i) => i
  );
  const mmTicksY = Array.from(
    { length: Math.floor(pageHeight / PX_PER_MM) + 1 },
    (_, i) => i
  );
  const RULER = 30;
  const pxToCm = (px: number) => (px / PX_PER_MM / 10).toFixed(2);

  return (
    <>
      <Box
        className="no-print"
        sx={{
          position: "absolute",
          top: -RULER,
          left: -RULER,
          width: RULER,
          height: RULER,
          background: "transparent",
          zIndex: 7,
          overflow: "visible",
        }}
      />
      <Box
        className="no-print"
        ref={horizontalRef}
        sx={{
          position: "absolute",
          top: -RULER,
          left: 0,
          width: `${pageWidth}px`,
          height: RULER,
          background: "transparent",
          zIndex: 6,
          overflow: "visible",
        }}
      >
        {mmTicksX.map((mm) => {
          const x = mm * PX_PER_MM;
          const isCm = mm % 10 === 0;
          const isHalfCm = mm % 5 === 0;
          return (
            <Box
              key={`x-mm-${mm}`}
              sx={{
                position: "absolute",
                left: `${x}px`,
                bottom: 0,
                width: 0,
                height: isCm ? 10 : isHalfCm ? 6 : 3,
                borderLeft: `1px solid ${isCm ? "#5f6870" : isHalfCm ? "#788089" : "#9aa2ab"}`,
                opacity: isCm ? 0.9 : isHalfCm ? 0.75 : 0.55,
              }}
            />
          );
        })}
        {mmTicksX.filter((mm) => mm % 10 === 0 && mm > 0).map((mm) => (
          <Box
            key={`x-cm-label-${mm}`}
            sx={{
              position: "absolute",
              left: `${mm * PX_PER_MM + 1}px`,
              top: 2,
              fontSize: 8,
              color: "#7a828c",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            {mm / 10}
          </Box>
        ))}
        <Tooltip title={`Left margin: ${pxToCm(margins.left)} cm`} arrow>
          <Box
            sx={{
              position: "absolute",
              left: `${margins.left - 6}px`,
              top: 16,
              width: 12,
              height: 10,
              bgcolor: "#5b84fa",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              cursor: "ew-resize",
            }}
            onPointerDown={startDrag("left")}
          />
        </Tooltip>
        <Tooltip title={`Right margin: ${pxToCm(margins.right)} cm`} arrow>
          <Box
            sx={{
              position: "absolute",
              left: `${pageWidth - margins.right - 6}px`,
              top: 16,
              width: 12,
              height: 10,
              bgcolor: "#5b84fa",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              cursor: "ew-resize",
            }}
            onPointerDown={startDrag("right")}
          />
        </Tooltip>
      </Box>

      <Box
        className="no-print"
        ref={verticalRef}
        sx={{
          position: "absolute",
          top: 0,
          left: -RULER,
          width: RULER,
          height: `${pageHeight}px`,
          background: "transparent",
          zIndex: 6,
          overflow: "visible",
        }}
      >
        {mmTicksY.map((mm) => {
          const y = mm * PX_PER_MM;
          const isCm = mm % 10 === 0;
          const isHalfCm = mm % 5 === 0;
          return (
            <Box
              key={`y-mm-${mm}`}
              sx={{
                position: "absolute",
                top: `${y}px`,
                right: 0,
                height: 0,
                width: isCm ? 10 : isHalfCm ? 6 : 3,
                borderTop: `1px solid ${isCm ? "#5f6870" : isHalfCm ? "#788089" : "#9aa2ab"}`,
                opacity: isCm ? 0.9 : isHalfCm ? 0.75 : 0.55,
              }}
            />
          );
        })}
        {mmTicksY.filter((mm) => mm % 10 === 0 && mm > 0).map((mm) => (
          <Box
            key={`y-cm-label-${mm}`}
            sx={{
              position: "absolute",
              top: `${mm * PX_PER_MM + 1}px`,
              left: -3,
              fontSize: 8,
              color: "#7a828c",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            {mm / 10}
          </Box>
        ))}
        <Tooltip title={`Top margin: ${pxToCm(margins.top)} cm`} arrow>
          <Box
            sx={{
              position: "absolute",
              top: `${margins.top - 7}px`,
              left: 6,
              width: 12,
              height: 10,
              bgcolor: "#5b84fa",
              clipPath: "polygon(0 0, 0 100%, 100% 50%)",
              cursor: "ns-resize",
            }}
            onPointerDown={startDrag("top")}
          />
        </Tooltip>
        <Tooltip title={`Bottom margin: ${pxToCm(margins.bottom)} cm`} arrow>
          <Box
            sx={{
              position: "absolute",
              top: `${pageHeight - margins.bottom - 7}px`,
              left: 6,
              width: 12,
              height: 10,
              bgcolor: "#5b84fa",
              clipPath: "polygon(0 0, 0 100%, 100% 50%)",
              cursor: "ns-resize",
            }}
            onPointerDown={startDrag("bottom")}
          />
        </Tooltip>
      </Box>
    </>
  );
}

