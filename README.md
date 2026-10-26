# Smart Food Expiry Tracker

A simple React Native and Expo app for viewing food expiry information. The UI uses plain JavaScript, basic React state, Expo Router, and React Native `StyleSheet` objects.

## Run the app

```bash
npm install
npx expo start
```

Then open the app in Expo Go, an Android emulator, an iOS simulator, or a web browser.

## Project structure

- `app/` contains the nine screens and the Expo Router layouts.
- `app/(tabs)/` contains Home, Inventory, Notifications, Statistics, and Settings.
- `components/` contains small UI pieces shared by more than one screen.
- `data/sampleData.js` contains the temporary data displayed by the UI.
- `assets/` contains app icons and fonts.

Route file names such as `add-item.jsx` stay lowercase because Expo Router uses those names as URLs. Each route exports a clearly named screen function such as `AddItemScreen`.

## Beginner guide

Start with `app/(tabs)/index.jsx`. A screen has three simple parts:

1. State values near the top remember user choices.
2. Small functions respond to button presses.
3. JSX describes what appears on screen, followed by its styles.

The shared components are `SimpleButton`, `SimpleInput`, `FoodItemCard`, `ScreenHeader`, `NumberCard`, and `SimplePickerModal`.

This refactor only organizes and simplifies the UI. It does not add, remove, or change database behavior.
