import { useEffect } from "react";
import { AppClock } from "./AppClock";
import { AppLayout } from "./AppLayout";
import { chrono } from "./chrono";

function App() {
  useEffect(() => {
    const currentDate = new Date(2022, 2 - 1, 18, 23, 59);

    const startDate = new Date(2022, 2 - 1, 18, 9, 0);
    const endDate = new Date(2022, 2 - 1, 18, 18, 0);

    const hoursToGenerate = 1;

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    console.log(chronoDate);
  }, []);
  return (
    <AppLayout>
      <AppClock />
    </AppLayout>
  );
}

export default App;
