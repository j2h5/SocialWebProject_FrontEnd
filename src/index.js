import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './Router';

import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

//process.env.REACT_APP_KAKAO
window.Kakao.init('045e5cdfda71848f679f20270c996545');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router />
  </ThemeProvider>
);
