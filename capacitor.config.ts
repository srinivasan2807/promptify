import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.srini.promptify",
  appName: "promptify",
  webDir: "out",
  server: {
    url: "https://promptify-blush.vercel.app",
    androidScheme: "https",
  },
};

export default config;
