// Design principle constants
const BASE_FONT_SIZE = 16;
const TYPE_SCALE = 1.25;
export const typeScale = (exponent: number) =>
  `${(BASE_FONT_SIZE / 16) * Math.pow(TYPE_SCALE, exponent)}rem`;

export const fontConstants = {
  lineHeight: 1.5,
  fontWeightBold: 700,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
  htmlFontSize: BASE_FONT_SIZE,
};

export default function themeTypography() {
  return {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    // Body text variants
    body1: {
      margin: 0,
      fontSize: typeScale(-1),
      lineHeight: fontConstants.lineHeight,
    },
    h6: {
      fontWeight: 500,
      fontSize: typeScale(0),
      lineHeight: fontConstants.lineHeight,
    },
    body2: {
      margin: 0,
      fontSize: typeScale(-1.25),
      lineHeight: fontConstants.lineHeight,
    },
    // Heading hierarchy
    h1: {
      margin: 0,
      fontWeight: 700,
      fontSize: typeScale(4),
      lineHeight: fontConstants.lineHeight,
    },
    h2: {
      margin: 0,
      fontWeight: 700,
      fontSize: typeScale(3),
      lineHeight: fontConstants.lineHeight,
    },
    h3: {
      margin: 0,
      fontWeight: 600,
      fontSize: typeScale(2),
      lineHeight: fontConstants.lineHeight,
    },

    h4: {
      margin: 0,
      fontWeight: 600,
      fontSize: typeScale(1),
      lineHeight: fontConstants.lineHeight,
    },
    h5: {
      margin: 0,
      fontWeight: 500,
      fontSize: typeScale(0.5),
      lineHeight: fontConstants.lineHeight,
    },

    // Caption and overline
    caption: {
      margin: 0,
      fontWeight: 400,
      fontSize: typeScale(-0.5),
      lineHeight: fontConstants.lineHeight,
    },
    // Subtitle variants
    subtitle1: {
      margin: 0,
      fontWeight: 500,
      fontSize: typeScale(0.25),
      lineHeight: fontConstants.lineHeight,
    },

    overline: {
      margin: 0,
      fontWeight: 500,
      fontSize: typeScale(-0.75),
      lineHeight: fontConstants.lineHeight,
    },
    subtitle2: {
      margin: 0,
      fontWeight: 400,
      fontSize: typeScale(-0.125),
      lineHeight: fontConstants.lineHeight,
    },
  };
}
