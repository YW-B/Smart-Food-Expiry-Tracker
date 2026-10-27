import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';
import 'react-native-reanimated';
import { colors } from '@/constants/theme';
import { setupDatabase } from '@/database/database';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

export {
  // Da bey3red error screen law 7asal error fel navigation.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="smart-food.db" onInit={setupDatabase}>
      <ThemeProvider value={appTheme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add-item" options={{ headerShown: false }} />
          <Stack.Screen name="scanner" options={{ headerShown: false }} />
          <Stack.Screen name="item-details" options={{ headerShown: false }} />
          <Stack.Screen name="categories" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
