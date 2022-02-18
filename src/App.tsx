import { Center } from "@chakra-ui/react";
import { AppClock } from "./AppClock";
import { AppLayout } from "./AppLayout";

function App() {
  return (
    <AppLayout>
      <AppClock />
    </AppLayout>
  );
}

export default App;
