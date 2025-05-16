import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function generateLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="question" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
