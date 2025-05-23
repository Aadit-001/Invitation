import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false, statusBarHidden: true }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="ai-question" />
      {/* <Stack.Screen name="Details" />  */}
    </Stack>
  );
}
