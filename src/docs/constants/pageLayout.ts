/** Gray gap between stacked pages (screen), similar to Google Docs */
export const PAGE_GAP_PX = 24;

export function getA4Dimensions(orientation: "portrait" | "landscape") {
  const isLandscape = orientation === "landscape";
  return {
    pageWidth: isLandscape ? "297mm" : "210mm",
    pageHeight: isLandscape ? "210mm" : "297mm",
  };
}

export function getPageFlowSpacerHeight(
  marginTop: number,
  marginBottom: number
): number {
  return PAGE_GAP_PX + marginTop + marginBottom;
}
