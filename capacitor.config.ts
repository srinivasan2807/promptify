import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.srini.promptify",
  appName: "promptify",
  webDir: "out",
  server: {
    url:"http://192.168.105.56:3000",
    cleartext: true,
  },
};

export default config;
