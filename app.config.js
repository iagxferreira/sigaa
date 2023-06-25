const LIGHT_SPLASH = {
  image: "./assets/SIGAALOGIN.png",
  backgroundColor: "#FFFFFF",
  resizeMode: "contain",
};

const DARK_SPLASH = {
  image: "./assets/SIGAALOGIN.png",
  backgroundColor: "#000000",
  resizeMode: "contain",
};

const SHARED_SPLASH = {
  splash: {
    ...LIGHT_SPLASH,
    dark: {
      ...DARK_SPLASH,
    },
  },
};

const config = {
  name: "SIGAA Mobile",
  slug: "sigaa",
  version: "1.0.39",
  orientation: "portrait",
  icon: "./assets/SIGAA.png",
  userInterfaceStyle: "automatic",
  splash: LIGHT_SPLASH,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    ...SHARED_SPLASH,
    supportsTablet: true,
    bundleIdentifier: "com.sigaa",
    buildNumber: "1.0.39",
  },
  android: {
    ...SHARED_SPLASH,
    package: "com.sigaa",
    versionCode: 39,
  },
  web: {
    favicon: "./assets/SIGAA.png",
    ...SHARED_SPLASH,
  },
  extra: {
    eas: {
      projectId: "ed6d4bca-d4ae-4bc2-94d6-07ba8baa5e09",
    },
  },
};

export default config;
