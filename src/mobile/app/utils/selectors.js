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

export const feedEventItems = createSelector(
  state => state.app.feedEvents,
  events => events.map(event => {
    console.log(event)
    switch(event.status) {
      case 'pending':
        return { type: 'pending_event', data: event }
      case 'processing':
        return { type: 'processing_event', data: event }
      default:
       return null;
    }
  })
);
