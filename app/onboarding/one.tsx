import IMAGES from "@/constants/image";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function OnboardingOne() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Animation setup
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Dynamic gradient background */}
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={{ position: "absolute", width, height }}
      />

      {/* Floating decoration elements */}
      <Animated.View
        style={{
          position: "absolute",
          top: height * 0.15,
          right: -30,
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: "rgba(198, 124, 78, 0.08)",
          transform: [{ rotate: spin }],
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          bottom: height * 0.2,
          left: -60,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          transform: [{ rotate: spin }],
        }}
      />

      {/* Main content */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
        }}
        className="px-6 pt-16 pb-10 justify-between"
      >
        {/* Top section with 3D card showcase */}
        <View className="items-center mt-8">
          <View className="w-full h-[260px] justify-center items-center">
            {/* 3D rotating invitation mockups */}
            <View className="relative w-full h-full">
              <Animated.View
                style={{
                  position: "absolute",
                  left: width * 0.1,
                  transform: [
                    { perspective: 850 },
                    { rotateY: "-10deg" },
                    { scale: 0.85 },
                  ],
                  elevation: 15,
                }}
                className="shadow-2xl"
              >
                <Image
                  source={IMAGES.templates.floral}
                  style={{
                    width: 180,
                    height: 240,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                />
              </Animated.View>

              <Animated.View
                style={{
                  position: "absolute",
                  left: width * 0.25,
                  top: 10,
                  transform: [
                    { perspective: 850 },
                    { rotateY: "0deg" },
                    { scale: 1 },
                  ],
                  elevation: 20,
                  zIndex: 2,
                }}
                className="shadow-2xl"
              >
                <Image
                  source={IMAGES.templates.flowers}
                  style={{
                    width: 200,
                    height: 260,
                    borderRadius: 12,
                    borderWidth: 3,
                    borderColor: "#fff",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 10,
                    right: -15,
                    backgroundColor: "#FF5757",
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    borderRadius: 20,
                    transform: [{ rotate: "12deg" }],
                  }}
                >
                  <Text className="text-white font-bold">AI Generated!</Text>
                </View>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Middle section - Title with gradient text effect */}
        <View className="items-center px-4 mt-10">
          <MaskedView
            maskElement={
              <Text
                className="text-[32px] font-bold text-center mb-2"
                style={{ fontFamily: "Arial" }}
              >
                Invitation Magic with AI
              </Text>
            }
          >
            <LinearGradient
              colors={["#FF9966", "#FF5E62", "#C67C4E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                className="text-[32px] opacity-0 font-bold text-center mb-2"
                style={{ fontFamily: "Arial" }}
              >
                Invitation Magic with AI
              </Text>
            </LinearGradient>
          </MaskedView>

          <Text className="text-gray-300 text-center text-base leading-6 mb-8">
            Create stunning invitations in seconds using the power of AI — no
            design skills required
          </Text>

          {/* Feature highlights with animation */}
          <View className="w-full space-y-4 mt-4">
            <Animated.View
              className="flex-row items-center"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }],
              }}
            >
              <View className="w-10 h-10 rounded-full bg-[#FF5757] items-center justify-center mr-3">
                <Ionicons name="flash" size={22} color="#fff" />
              </View>
              <View className="flex-1 bg-white/10 p-3 rounded-lg">
                <Text className="text-white font-bold">Instant Creation</Text>
                <Text className="text-gray-300 text-sm">
                  From idea to beautiful invitation in seconds
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              className="flex-row items-center"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }],
              }}
            >
              <View className="w-10 h-10 rounded-full bg-[#FF5757] items-center justify-center mr-3">
                <Ionicons name="color-wand" size={22} color="#fff" />
              </View>
              <View className="flex-1 bg-white/10 p-3 rounded-lg">
                <Text className="text-white font-bold">AI Design Power</Text>
                <Text className="text-gray-300 text-sm">
                  Just describe what you want in plain English
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>

        {/* Bottom section */}
        <View className="mt-8">
          <TouchableOpacity
            onPress={() => router.push("/onboarding/two")}
            activeOpacity={0.8}
            className="mb-4"
          >
            <LinearGradient
              colors={["#FF5757", "#FF5E62", "#FF9966"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-xl py-4 items-center shadow-lg"
            >
              <Text className="text-white font-bold text-lg">
                See Features →
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            className="bg-white/10 py-3 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">
              Skip Introduction
            </Text>
          </TouchableOpacity>

          {/* Pagination dots */}
          <View className="flex-row justify-center mt-6">
            <View className="w-8 h-2 bg-[#FF5757] rounded-full mx-1" />
            <View className="w-2 h-2 bg-gray-400 rounded-full mx-1" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
