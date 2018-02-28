import * as colors from './colors';

const size = {
  container: 1056,
  footnote: 10,
  small: 12,
  regular: 14,
  H5: 16,
  H4: 18,
  H3: 24,
  H2: 32,
  H1: 36,
  H0: 48,
  spacing_1: 24,
  spacing_2: 16,
  spacing_3: 12,
  spacing_4: 8,
  spacing_5: 4,
  separator: 1,
  borderWidth: 1,
  borderRadius: 4,
  red: colors.RED,
  blue: colors.BLUE,
  yellow: colors.YELLOW,
  green: colors.GREEN,
  orange: colors.ORANGE,
  light: colors.LIGHT,
  dark: colors.DARK,
};

const collections = {
  1: {
    id: 1,
    name: 'Dark Theme',
    text: colors.LIGHT,
    bg: colors.ONYX_EXTRA_SLATE,
    bg2: colors.ONYX_SLATE,
    borderColor: colors.LIGHT(0.05),
    shadow: colors.LIGHT(0.1),
    ...size,
  },
  0: {
    id: 0,
    name: 'Light Theme',
    text: colors.DARK,
    bg: colors.ONYX_SLATE,
    bg2: colors.ONYX_EXTRA_SLATE,
    borderColor: colors.DARK(0.1),
    shadow: colors.DARK(0.1),
    ...size,
  },
};

export default collections;
