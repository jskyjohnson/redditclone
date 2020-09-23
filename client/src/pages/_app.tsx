import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  LightMode,
} from "@chakra-ui/core";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        {/* Permanently adds a light mode... Change this when needed... */}
        <LightMode> 
          <CSSReset />
          <Component {...pageProps} />
        </LightMode>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
