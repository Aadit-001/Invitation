import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

const categoryIcons = {
  Wedding: "heart",
  Birthday: "gift",
  Party: "beer",
  Anniversary: "ribbon",
  "Baby Shower": "balloon",
  Graduation: "school",
  Festival: "sparkles",
  Corporate: "briefcase",
  Housewarming: "home",
  "Bachelorette Party": "woman",
  "Bridal Shower": "rose",
  Engagement: "diamond",
  Farewell: "airplane",
  Welcome: "hand-right",
  Retirement: "cafe",
  "Save the Date": "calendar",
  Memorial: "flower",
  "Children's Party": "balloon",
  Religious: "home",
  Achievement: "trophy",
  Appreciation: "star",
  "Mother's Day": "female",
  "Father's Day": "male",
  "Teacher's Day": "book",
  "Women's Day": "female",
  Congratulations: "happy",
  "Good Morning": "sunny",
  "Good Night": "moon",
  Motivation: "flash",
  Family: "people",
  Friendship: "chatbubbles",
  Apology: "sad",
  Sorry: "cloud",
};

export default function AI() {
  const [search, setSearch] = useState("");

  const categories = [
    "Wedding",
    "Birthday",
    "Party",
    "Anniversary",
    "Baby Shower",
    "Graduation",
    "Festival",
    "Corporate",
    "Housewarming",
    "Bachelorette Party",
    "Bridal Shower",
    "Engagement",
    "Farewell",
    "Welcome",
    "Retirement",
    "Save the Date",
    "Memorial",
    "Children's Party",
    "Religious",
    "Achievement",
    "Appreciation",
    "Mother's Day",
    "Father's Day",
    "Teacher's Day",
    "Women's Day",
    "Congratulations",
    "Good Morning",
    "Good Night",
    "Motivation",
    "Family",
    "Friendship",
    "Apology",
    "Sorry",
    "Other",
  ];

  const navigateToQuestions = (category) => {
    router.push({
      pathname: "/invitations/ai-question",
      params: { category },
    });
  };

  const filteredCategories = search.trim()
    ? categories.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : categories;

  return (
    <LinearGradient
      colors={["#f8fafc", "#e0e7ef", "#f0e4ff"]}
      style={{ flex: 1 }}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, minHeight: "100%" }}
      >
        {/* Header */}
        <View className="pt-12 px-6 mb-4">
          <Text className="text-[28px] font-bold text-[#262626] tracking-wide">
            🎉 AI Invitation Designer
          </Text>
          <Text className="text-gray-500 text-base mt-1.5">
            Select a category to create your perfect invitation.
          </Text>
        </View>

        {/* Category Search */}
        <View className="mx-5 mb-3 bg-white rounded-2xl p-3 flex-row items-center shadow shadow-black/10">
          <Ionicons name="search" size={20} color="#C67C4E" />
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#aaa"
            className="flex-1 ml-2 text-base text-[#222]"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color="#bbb"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills Grid with Arrows */}
        <View className="flex-row flex-wrap gap-2 mx-5 mb-5 justify-start">
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => navigateToQuestions(category)}
              className="bg-white shadow shadow-black/5 flex-row items-center m-1 rounded-full py-2.5 px-4"
              activeOpacity={0.85}
              style={{ elevation: 2 }}
            >
              <Ionicons
                name={categoryIcons[category] || "albums"}
                size={18}
                color="#C67C4E"
                style={{ marginRight: 7 }}
              />
              <Text className="text-[#222] font-medium text-[15px]">
                {category}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#C67C4E"
                style={{ marginLeft: 7 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Instructions Card */}
        {/* Enhanced How It Works Card */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 3,
            borderWidth: 1,
            borderColor: "#f0f0f0",
          }}
        >
          {/* Card Header with Icon */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(198, 124, 78, 0.1)",
            }}
          >
            <LinearGradient
              colors={["#CF8A56", "#C67C4E", "#A05A2F"]}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="bulb" size={20} color="#fff" />
            </LinearGradient>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#262626",
              }}
            >
              How It Works
            </Text>
          </View>

          {/* Step 1 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#C67C4E",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
                marginTop: 2,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
              >
                1
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: "#262626", fontWeight: "600", fontSize: 15 }}
              >
                Select a category
              </Text>
              <Text
                style={{
                  color: "#777777",
                  fontSize: 13,
                  marginTop: 2,
                  lineHeight: 18,
                }}
              >
                Choose from over 30 event types
              </Text>
            </View>
          </View>

          {/* Step 2 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#C67C4E",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
                marginTop: 2,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
              >
                2
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: "#262626", fontWeight: "600", fontSize: 15 }}
              >
                Answer questions
              </Text>
              <Text
                style={{
                  color: "#777777",
                  fontSize: 13,
                  marginTop: 2,
                  lineHeight: 18,
                }}
              >
                Tell us about your event details
              </Text>
            </View>
          </View>

          {/* Step 3 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#C67C4E",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
                marginTop: 2,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
              >
                3
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: "#262626", fontWeight: "600", fontSize: 15 }}
              >
                Get your design
              </Text>
              <Text
                style={{
                  color: "#777777",
                  fontSize: 13,
                  marginTop: 2,
                  lineHeight: 18,
                }}
              >
                Our AI creates a perfect invitation for you
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
