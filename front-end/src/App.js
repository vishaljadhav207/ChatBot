import { ChakraProvider, theme } from "@chakra-ui/react";
import "./App.css";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Chat />
      </ChakraProvider>
    </>
  );
}

export default App;
