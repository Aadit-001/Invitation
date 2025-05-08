import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#333333",
          borderTopWidth: 0,
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 0,
        },
        tabBarActiveTintColor: "#C67C4E", // Blue color for active tab
        tabBarInactiveTintColor: "#676D75", // Gray color for inactive tabs
        headerShown: false, // Hide the header
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ai"
        options={{
          title: "AI",
          tabBarIcon: ({ color }) => (
            <Ionicons name="sparkles" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          // tabBarLabel: () => null, // Hide label for the center tab
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: "#C67C4E", // Your custom coffee color
                width: 48,
                height: 48,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -20, // Lift it up a bit
              }}
            >
              <Ionicons name="add" size={28} color="white" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="myaccount"
        options={{
          title: "My Account",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="premium"
        options={{
          title: "Premium",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assests/icons/crown.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
