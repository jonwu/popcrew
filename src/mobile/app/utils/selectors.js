import { createSelector } from 'reselect';

// Generate Theme

export const generateStylesSelector = generateStyles => {
  const themeSelector = theme => theme;
  return createSelector(themeSelector, theme => {
    return generateStyles(theme);
  });
};

export const stylesSelector = generateStyles => {
  const themeSelector = theme => theme;
  return createSelector(themeSelector, theme => {
    return generateStyles(theme);
  });
};
