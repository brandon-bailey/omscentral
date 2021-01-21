import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { theme } from 'src/constants';

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
