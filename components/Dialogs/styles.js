import React from 'react';


export const styles = theme => ({

      paper: {
          marginTop: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
      },
      avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
      },

      submit: {
          marginTop: theme.spacing(3),
      },
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      margin: {
        margin: theme.spacing(1),
      },
      select: {
       // flexBasis: 43,
        padding:2,
        marginRight:15,
        backgroundColor:'#f7f7f7',
      },
      textField: {
       // flexBasis: 36,
        padding:2,
        marginRight:2,
        backgroundColor:'#f7f7f7',
        borderBottom:1,
      },
    button: {
    margin: theme.spacing(1),
  },
});
