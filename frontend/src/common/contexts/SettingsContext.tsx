import { createContext, ReactNode, useEffect, useState } from "react";
import _ from "lodash";
import { THEMES } from "../libs/mui/option";

interface SettingsType {
  theme: "DARK" | "LIGHT";
}

const defaultSettings = {
  theme: THEMES.LIGHT,
} as SettingsType;

// contextの作成
const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: (update: any) => {},
});

// localStorageに設定の値を保存する
const storeSettings = (settings: SettingsType) => {
  window.localStorage.setItem("settings", JSON.stringify(settings));
};

// localStorageの値を取得する
export const getStoredSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem("settings");
    if (storedData) {
      settings = JSON.parse(storedData) as SettingsType;
    }
  } catch (error) {
    console.error(error);
  }

  return settings;
};

// Providerの生成
export const SettingsProvider = ({
  children,
  settings,
}: {
  children: ReactNode;
  settings?: SettingsType | null;
}) => {
  const [currentSettings, setCurrentSettings] = useState(defaultSettings);

  const handleSaveSettings = (update = {}) => {
    const mergedSettings = _.merge({}, currentSettings, update);
    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    const storedSettings = getStoredSettings();

    if (storedSettings) {
      setCurrentSettings(storedSettings);
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
