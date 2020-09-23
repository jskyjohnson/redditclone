import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  LightMode,
} from "@chakra-ui/core";
import { Provider, createClient } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          {/* Permanently adds a light mode... Change this when needed... */}
          <LightMode>
            <CSSReset />
            <Component {...pageProps} />
          </LightMode>
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
