import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false, statusBarHidden: true }}>
      <Stack.Screen name="one" />
      <Stack.Screen name="two" />
      {/* <Stack.Screen name="Details" />  */}
    </Stack>
  );
}
