/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: "https://jsonplaceholder.typicode.com",

  FIREBASE_CONFIG: {
    googleServicesFile: {
      ios: "./src/config/firebase/GoogleService-Info.plist",
      android: "./src/config/firebase/google-services.json",
    },
  },
}
