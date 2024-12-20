import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      FrontPageSecondary: '#292E3F',
      text: {
        default: 'gray.900',
        _dark: 'gray.50',
      },
    },
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  colors: {
    background: "red.500"
    // discord: 'white',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: {
      'html, #__next': {
        height: '100%',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
      },
      'body': {
        // todo check how to do this without breaking the site
        // height: '100%', // Push footer to bottom
        overflowY: 'scroll', // Always show scrollbar to avoid flickering
        backgroundColor: 'rgb(13,15,31, 1)',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        background: 'green.200',
        position: 'fixed',
        zIndex: '1031',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
      }
    },
  },
});