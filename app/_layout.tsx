import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

// Keep splash screen visible while checking onboarding status
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [hasOnboarded, setHasOnboarded] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    async function checkOnboardingStatus() {
      try {
        const value = await AsyncStorage.getItem("hasCompletedOnboarding1"); //(used wrong for testing)correct key-> hasCompletedOnboarding
        setHasOnboarded(value === "true");
      } catch (error) {
        console.error("Failed to get onboarding status:", error);
        // Default to not onboarded if error occurs
        setHasOnboarded(false);
      } finally {
        // We're ready to render
        setIsReady(true);
        // Hide splash screen once we determine the route
        await SplashScreen.hideAsync();
      }
    }

    checkOnboardingStatus();
  }, []);

  // While checking AsyncStorage, don't render anything
  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {hasOnboarded === false && <Redirect href="/onboarding/one" />}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="invitations" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            // Prevent going back to onboarding after completion
            gestureEnabled: false,
          }}
        />

      </Stack>
    </GestureHandlerRootView>
  );
}
