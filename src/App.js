import { ChakraProvider, ColorModeScript, extendTheme, theme } from "@chakra-ui/react";
import React from "react";
import { AppRouter } from "./components";
import { ReducerContextProvider } from "./contexts/ReducerContext";

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
        <ReducerContextProvider>
          <AppRouter />
        </ReducerContextProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
