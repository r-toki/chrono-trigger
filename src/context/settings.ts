import useLocalStorage from "react-use/lib/useLocalStorage";
import { Dispatch, SetStateAction } from "react";
import { createContainer } from "unstated-next";

type State = {
  startAtHour: string;
  endAtHour: string;
  hoursToGenerate: string;
};

const useSettingsContainer = () => {
  const [value, set] = useLocalStorage<State>("chrono-trigger:settings", {
    startAtHour: "9",
    endAtHour: "18",
    hoursToGenerate: "1",
  });

  return { settings: value!, setSetting: set as Dispatch<SetStateAction<State>> };
};

const Settings = createContainer(useSettingsContainer);
export const SettingsProvider = Settings.Provider;
export const useSettings = Settings.useContainer;
