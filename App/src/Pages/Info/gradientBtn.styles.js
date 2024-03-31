import React from 'react';

export default ({ palette, shadows }) => ({
    root: ({ chubby }) => ({
      minWidth: 100,
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
      background:
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        'linear-gradient(to right, #41b4c8, #832be1)',
      '&:hover': {
        transform: 'scale(1.1)',
      },
      ...(chubby && {
        borderRadius: 50,
      }),
    }),
    label: {
      color: palette.common.white,
      textTransform: 'none',
      fontSize: 15,
      fontWeight: 700,
    },
    contained: {
      minHeight: 30,
      boxShadow: shadows[0],
      '&:active': {
        boxShadow: shadows[0],
      },
    },
  });