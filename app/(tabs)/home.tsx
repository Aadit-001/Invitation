import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IMAGES from "../../constants/image";

const { width } = Dimensions.get("window");

export default function Home() {
  // States
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Animation for button press
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Featured templates (added a new section)
  const featuredTemplates = [
    {
      id: "f1",
      name: "Royal Wedding",
      image: IMAGES.templates.floral,
      featured: true,
    },
    {
      id: "f2",
      name: "Anniversary Special",
      image: IMAGES.templates.flowers,
      featured: true,
    },
    {
      id: "f3",
      name: "Birthday Bash",
      image: IMAGES.templates.flowers,
      featured: true,
    },
  ];

  // Sample data for invitation templates
  const templates = [
    { id: "1", name: "Shell Floral", image: IMAGES.templates.floral },
    { id: "2", name: "Golden Frame", image: IMAGES.templates.floral },
    { id: "3", name: "Blue Elegance", image: IMAGES.templates.flowers },
    { id: "4", name: "Party Lights", image: IMAGES.templates.flowers },
    { id: "5", name: "Rustic Wedding", image: IMAGES.templates.floral },
    { id: "6", name: "Baby Shower", image: IMAGES.templates.floral },
    { id: "7", name: "Festival Theme", image: IMAGES.templates.floral },
    { id: "8", name: "Corporate Event", image: IMAGES.templates.flowers },
  ];

  // Event categories
  const categories = [
    "Wedding", // Highest demand, most searched[3][5][6]
    "Birthday", // Universal, all ages[3][5][6]
    "Party", // Includes general, cocktail, dinner, pool, brunch, etc.[3]
    "Anniversary", // Major milestone, strong digital adoption[3][4]
    "Baby Shower", // Growing trend, especially digital[3][5]
    "Graduation", // High engagement, especially seasonal[3][6]
    "Festival", // Diwali, Christmas, Eid, New Year, Holi, etc.[3][6]
    "Corporate", // Business events, launches, conferences[4][6]
    "Housewarming", // Popular for new homes and apartments[3]
    "Bachelorette Party", // Pre-wedding, trending for young adults[3]
    "Bridal Shower", // Pre-wedding, closely tied to weddings[3]
    "Engagement", // Pre-wedding, high demand[3][5]
    "Farewell", // For job changes, moving, etc.[3][4]
    "Welcome", // New jobs, neighbors, teams[4]
    "Retirement", // Milestone, especially for corporate[4]
    "Save the Date", // For weddings, big events[3][5]
    "Memorial", // Remembrance events, growing digital trend[3]
    "Children’s Party", // Kids’ birthdays and events[3]
    "Religious", // Baptism, Communion, Bar/Bat Mitzvah, etc.[6]
    "Achievement", // Promotions, awards, milestones[4]
    "Appreciation", // Teacher’s Day, Women’s Day, etc.[3]
    "Mother’s Day", // Family, personal events[3]
    "Father’s Day", // Family, personal events[3]
    "Teacher’s Day", // School and college events[3]
    "Women’s Day", // Social, workplace events[3]
    "Congratulations", // General celebrations[4]
    "Good Morning", // Trending in digital/social, daily use
    "Good Night", // Trending in digital/social, daily use
    "Motivation", // Trending in digital/social, daily use
    "Family", // Family reunions, get-togethers[3]
    "Friendship", // Friendship Day, personal events[3]
    "Apology", // Niche, but present
    "Sorry", // Niche, but present
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#232323" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Enhanced Header Section */}
        <LinearGradient
          colors={["#2A2A2A", "#1F1F1F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="pt-12 pb-24"
        >
          {/* Greeting and User */}
          <View className="flex-row justify-between items-center px-5 mb-6">
            <View>
              <Text className="text-gray-300 text-base">Welcome back</Text>
              <Text className="text-white text-xl font-bold">Tejas 👋</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#333333] items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#C67C4E"
              />
            </TouchableOpacity>
          </View>

          {/* Improved Search bar and filter */}
          <View className="flex-row items-center justify-between px-5 mb-6">
            <View className="flex-row items-center bg-[#333333] rounded-xl px-4 py-3 flex-1 mr-3 border border-[#444444]">
              <Ionicons name="search" size={20} color="#C67C4E" />
              <TextInput
                placeholder="Search for templates..."
                placeholderTextColor="#999"
                className="ml-2 text-white flex-1"
              />
            </View>
            <TouchableOpacity className="w-12 h-12 rounded-xl bg-[#C67C4E] items-center justify-center">
              <Ionicons name="options-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Enhanced AI Magic banner with gradient */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              marginHorizontal: 16,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // animateButton();
                router.push("/ai");
              }}
            >
              <LinearGradient
                colors={["#CF8A56", "#C67C4E", "#A05A2F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-2xl p-5 shadow-lg"
              >
                <View className="bg-[#FF5757] px-3.5 py-1.5 rounded-full self-start mb-3 shadow-sm">
                  <Text className="text-white font-semibold">
                    ✨ Try AI Feature →
                  </Text>
                </View>
                <Text className="text-white text-2xl font-bold">
                  You IMAGINE. AI Designs.
                </Text>
                <Text className="text-white text-2xl font-bold mb-2">
                  TOGETHER, IT'S PERFECT
                </Text>
                <View className="flex-row">
                  <View className="flex-row -space-x-2">
                    {[1, 2, 4].map((i) => (
                      <View
                        key={i}
                        className="w-8 h-8 rounded-full bg-white/20 border border-white/40"
                      />
                    ))}
                  </View>
                  <Text className="text-white/80 ml-3 my-auto text-sm">
                    +1K users tried today
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>

        {/* Main Content Section */}
        <View className="bg-white flex-1 -mt-16 rounded-t-3xl px-4 pt-6">
          {/* Featured Templates Horizontal Scroll */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-neutral-800 text-lg font-bold">
                Featured Templates
              </Text>
              <TouchableOpacity>
                <Text className="text-[#C67C4E] text-sm">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              snapToInterval={width * 0.75 + 16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              {featuredTemplates.map((template, index) => {
                const inputRange = [
                  (index - 1) * (width * 0.75 + 16),
                  index * (width * 0.75 + 16),
                  (index + 1) * (width * 0.75 + 16),
                ];

                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.9, 1, 0.9],
                  extrapolate: "clamp",
                });

                return (
                  <Animated.View
                    key={template.id}
                    style={{
                      width: width * 0.75,
                      marginLeft: index === 0 ? 0 : 16,
                      transform: [{ scale }],
                    }}
                  >
                    <TouchableOpacity
                      className="bg-white rounded-xl shadow-md overflow-hidden"
                      activeOpacity={0.9}
                    >
                      <Image
                        source={template.image}
                        className="w-full h-[180px]"
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.7)"]}
                        className="absolute bottom-0 left-0 right-0 p-4"
                      >
                        <View className="bg-[#C67C4E] px-2.5 py-1 rounded-md self-start mb-1 opacity-90">
                          <Text className="text-white text-xs font-bold">
                            FEATURED
                          </Text>
                        </View>
                        <Text className="text-white text-lg font-bold">
                          {template.name}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </ScrollView>
          </View>

          {/* Improved Category filters */}
          <View className="mb-6 ">
            <Text className="text-neutral-800 text-lg font-bold mb-3 px-1 ">
              Categories
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
              style={{ flexGrow: 0 }}
              nestedScrollEnabled={true}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCategoryIndex(index)}
                  className={`mx-1 mb-1`}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={
                      index === selectedCategoryIndex
                        ? ["#CF8A56", "#C67C4E"]
                        : ["#F5F5F5", "#EDEDED"]
                    }
                    className="rounded-full px-5 py-3"
                  >
                    <Text
                      className={`${
                        index === selectedCategoryIndex
                          ? "text-white"
                          : "text-neutral-700"
                      } font-medium`}
                    >
                      {category}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Improved Template grid */}
          <View className="mb-6">
            <Text className="text-neutral-800 text-lg font-bold mb-3 px-1">
              {categories[selectedCategoryIndex]} Templates
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {templates.map((template, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] mb-4"
                  activeOpacity={0.9}
                >
                  <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <Image
                      source={template.image}
                      className="w-full h-[180px]"
                      resizeMode="cover"
                    />
                    <View className="p-2">
                      <Text className="text-neutral-800 font-medium">
                        {template.name}
                      </Text>
                      <View className="flex-row justify-between items-center mt-1">
                        <View className="flex-row items-center">
                          <Ionicons name="eye-outline" size={14} color="#999" />
                          <Text className="text-gray-500 text-xs ml-1">
                            2.3k
                          </Text>
                        </View>
                        <TouchableOpacity className="p-1">
                          <Ionicons
                            name="heart-outline"
                            size={16}
                            color="#FF5757"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
