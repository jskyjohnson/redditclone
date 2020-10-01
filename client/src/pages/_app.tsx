import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API as string,
  credentials: "include",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {/* <ColorModeProvider> */}
        {/* Permanently adds a light mode... Change this when needed... */}
        {/* <LightMode> */}
        <CSSReset />
        <Component {...pageProps} />
        {/* </LightMode> */}
        {/* </ColorModeProvider> */}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
