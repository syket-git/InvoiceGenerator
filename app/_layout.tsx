import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '../global.css';

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="invoices/generate" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
