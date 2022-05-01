import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { SettingsProvider } from "./common/contexts/SettingsContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </RecoilRoot>
);
