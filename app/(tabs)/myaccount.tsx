import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MyAccount() {
  const router = useRouter();

  const menuItems = [
    {
      icon: "calendar-outline",
      label: "My Events",
      subtitle: "View all your created events",
      count: 3,
    },
    {
      icon: "heart-outline",
      label: "Favorites",
      subtitle: "Templates you've saved",
      count: 7,
    },
    {
      icon: "document-outline",
      label: "Drafts",
      subtitle: "Continue your work",
      count: 2,
    },
    {
      icon: "download-outline",
      label: "Downloads",
      subtitle: "Your downloaded templates",
      count: 5,
    },
    {
      icon: "card-outline",
      label: "Billing",
      subtitle: "Manage your payments",
      count: 0,
    },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      subtitle: "Get assistance with the app",
      count: 0,
    },
  ];

  return (
    <View className="flex-1 bg-[#F8F8F8]">
      <StatusBar barStyle="light-content" backgroundColor="#C67C4E" />

      {/* Fixed Header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          zIndex: 10,
        }}
      >
        <LinearGradient
          colors={["#C67C4E", "#A05A2F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full h-full"
        >
          {/* Top bar with settings */}
          <View className="flex-row justify-between items-center px-5 pt-10">
            <Text className="text-white text-xl font-bold">Profile</Text>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => {
                // Handle settings navigation
              }}
            >
              <Ionicons name="settings-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 140, paddingBottom: 40 }}
      >
        {/* Profile Card */}
        <View
          className="mx-5 bg-white rounded-2xl overflow-hidden shadow-md"
          style={{
            elevation: Platform.OS === "android" ? 5 : 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
        >
          <View className="px-5 pt-5 pb-6 items-center">
            {/* Profile Image */}
            <View className="w-24 h-24 mb-3">
              <View className="w-24 h-24 rounded-full bg-[#E0F0FF] items-center justify-center border-4 border-white">
                <Text className="text-4xl font-bold text-blue-500">T</Text>
              </View>
              <View className="absolute bottom-0 right-0 bg-blue-500 w-7 h-7 rounded-full items-center justify-center border-2 border-white">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
            </View>

            {/* Name without animation */}
            <View className="items-center">
              <Text className="text-gray-800 text-xl font-bold">
                Tejas Billava
              </Text>
              <View className="flex-row items-center mt-1 mb-4">
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text className="text-gray-500 text-sm ml-1">
                  Silver Member
                </Text>
              </View>
            </View>

            {/* Stats Row */}
            <View className="flex-row justify-between w-full pt-5 border-t border-gray-100">
              <View className="items-center flex-1">
                <Text className="text-gray-800 text-lg font-bold">12</Text>
                <Text className="text-gray-500 text-xs">Invitations</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-gray-800 text-lg font-bold">86</Text>
                <Text className="text-gray-500 text-xs">Shares</Text>
              </View>
            </View>
          </View>

          {/* Upgrade Button */}
          <TouchableOpacity
            className="w-full"
            onPress={() => router.push("/(tabs)/premium")}
          >
            <LinearGradient
              colors={["#FFD700", "#FFC107"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3 px-5 flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <Ionicons name="trophy" size={18} color="#333" />
                <Text className="text-gray-800 font-bold ml-2">
                  Upgrade to Premium
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#333" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View className="mx-5 mt-6 mb-4">
          <Text className="text-gray-800 font-bold text-lg mb-3">
            Account Settings
          </Text>
        </View>

        <View className="bg-white mx-5 rounded-2xl shadow-sm mb-8">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center px-5 py-4 ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <View className="w-10 h-10 rounded-xl bg-[#F5F5F5] items-center justify-center mr-4">
                <Ionicons name={item.icon} size={20} color="#C67C4E" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">{item.label}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">
                  {item.subtitle}
                </Text>
              </View>
              {item.count > 0 ? (
                <View className="bg-[#C67C4E]/10 px-2 py-1 rounded-full">
                  <Text className="text-[#C67C4E] text-xs font-medium">
                    {item.count}
                  </Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity className="mx-5 bg-[#F8F8F8] border border-gray-200 rounded-xl py-3 mb-10">
          <Text className="text-center text-red-500 font-medium">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
