import { useEffect } from "react";
import { AppClock } from "./AppClock";
import { AppLayout } from "./AppLayout";
import { chrono } from "./chrono";

function App() {
  return (
    <AppLayout>
      <AppClock />
    </AppLayout>
  );
}

export default App;
