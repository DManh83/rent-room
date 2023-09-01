import { ChakraProvider, ColorModeScript, extendTheme, theme } from "@chakra-ui/react";
import React from "react";
import { AppRouter } from "./components";
import { AuthContextProvider } from "./contexts/AuthContext";

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  colors: {
    primary: theme.colors.pink
  }
})

function App() {
  return (
    <React.StrictMode>
      <ChakraProvider theme={customTheme}>
        <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
