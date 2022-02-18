import { Box } from "@chakra-ui/react";
import { AppClock } from "./components/AppClock";
import { AppLayout } from "./components/AppLayout";
import { SettingsProvider } from "./context/settings";

function App() {
  return (
    <SettingsProvider>
      <AppLayout>
        <Box pt="28">
          <AppClock />
        </Box>
      </AppLayout>
    </SettingsProvider>
  );
}

export default App;
