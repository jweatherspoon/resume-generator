import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CustomThemeContext from '../config/theme/CustomThemeContext';
import { useState } from 'react';
import { defaultTheme } from '../config/theme/default-theme';
import { ThemeProvider } from '@mui/system';

function MyApp({ Component, pageProps }: AppProps) {
  const [resumeTheme, setResumeTheme] = useState(defaultTheme);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomThemeContext.Provider value={{ theme: resumeTheme, setTheme: setResumeTheme }}>
        <Component {...pageProps} />
      </CustomThemeContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
