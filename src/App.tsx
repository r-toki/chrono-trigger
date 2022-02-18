import { AppClock } from "./components/AppClock";
import { AppLayout } from "./components/AppLayout";
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
