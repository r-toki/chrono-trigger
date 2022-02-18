import { AppClock } from "./AppClock";
import { AppLayout } from "./AppLayout";
import { SettingsProvider } from "./context/settings";

function App() {
  return (
    <SettingsProvider>
      <AppLayout>
        <AppClock />
      </AppLayout>
    </SettingsProvider>
  );
}

export default App;
