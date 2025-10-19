# Simple Login & Data Feed

React Native (Expo) app with Google authentication and data feed.

Built with Ignite CLI boilerplate, Feature-based architecture.

**Demo:** [Watch on Google Drive](https://drive.google.com/file/d/1KLfZgSUmq9gQgpnjXBcYMOKqbH-8asme/view)

## Setup

```bash
# Install dependencies
yarn install
# or
npm install

# Prebuild native code
yarn prebuild:clean
# or
npm run prebuild:clean

# Start development server
yarn start
# or
npm start
```

Then run on device:

```bash
# iOS
yarn ios
# or
npm run ios

# Android
yarn android
# or
npm run android
```

## Implemented

- Login screen with Google Sign-In (Firebase Auth) and Apple Sign-In
- Form validation with Zod
- Home screen with RandomUser API data
- Infinite scroll (pagination)
- Pull-to-refresh
- Logout
- Language switching (i18n)
- Theme switching (light/dark)
- Session persistence between app launches
- React Navigation (Expo Router)
- TypeScript
- Loading/error states
- Zustand state management

## Tech Stack

- React Native (Expo) with dev-client
- TypeScript
- Expo Router
- Firebase Auth + Google Sign-In + Apple Sign-In
- Zustand
- React Query
- React Hook Form
- Zod
- i18next
- @legendapp/list
- Ky (HTTP client)
- MMKV storage
- JSONPlaceholder API

## Future Improvements

- Unit and integration tests (Jest, Testing Library)
