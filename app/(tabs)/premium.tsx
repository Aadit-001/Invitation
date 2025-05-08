import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

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

  return (
    <ImageBackground className="flex-1" imageStyle={{ opacity: 10000 }}>
      <ScrollView
        className="flex-1 bg-[#232323]"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#232323" />

        {/* Header with gradient */}
        <LinearGradient
          colors={["#C67C4E", "#A05A2F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-6 pt-16 pb-8 rounded-b-3xl"
        >
          <Text className="text-white text-3xl font-bold mb-2">
            Unlock Premium
          </Text>
          <Text className="text-white opacity-80">
            Take your invitations to the next level
          </Text>
        </LinearGradient>

        <View className="px-5 -mt-4">
          {/* Premium Features Card */}
          <View className="bg-[#2C2C2C] rounded-2xl p-6 mb-8 shadow-lg">
            <Text className="text-white text-xl font-bold mb-4">
              Premium Benefits
            </Text>

            {/* Features list with improved spacing */}
            <View className="mb-2">
              {[
                "Unlimited Invitations",
                "One Click Checkout",
                "Exclusive Templates",
                "24/7 Priority Support",
              ].map((feature, index) => (
                <View key={index} className="flex-row items-center mb-4">
                  <View className="w-6 h-6 bg-[#C67C4E] rounded-full items-center justify-center mr-4">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                  <Text className="text-white text-base">{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Plan Selection Title */}
          <Text className="text-white text-xl font-bold mb-4">
            Choose Your Plan
          </Text>

          {/* Pricing Options with improved styling */}
          <View className="mb-8 space-y-4">
            {/* Regular Plan */}
            <TouchableOpacity
              className={`bg-[#2A2A2A] rounded-xl p-5 mb-4 ${
                selectedPlan === "monthly"
                  ? "border-2 border-[#C67C4E]"
                  : "border border-[#3A3A3A]"
              }`}
              onPress={() => setSelectedPlan("monthly")}
              activeOpacity={0.8}
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-white text-lg font-bold">Regular</Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    Monthly billing
                  </Text>
                </View>
                <View className="bg-[#333333] px-3 py-2 rounded-lg">
                  <Text className="text-white text-xl font-bold">$19.99</Text>
                  <Text className="text-gray-400 text-xs text-center">
                    per month
                  </Text>
                </View>
              </View>

              <View className="mt-3 pt-3 border-t border-[#3A3A3A]">
                <Text className="text-gray-400 text-xs">
                  Billed at $19.99 every month
                </Text>
              </View>
            </TouchableOpacity>

            {/* Discounted Plan */}
            <TouchableOpacity
              className={`bg-[#2A2A2A] rounded-xl p-5 ${
                selectedPlan === "yearly"
                  ? "border-2 border-[#C67C4E]"
                  : "border border-[#3A3A3A]"
              }`}
              onPress={() => setSelectedPlan("yearly")}
              activeOpacity={0.8}
            >
              <View className="absolute -top-2 right-4 bg-yellow-400 px-3 py-1.5 rounded-lg shadow-md">
                <Text className="text-black text-xs font-bold">SAVE 50%</Text>
              </View>

              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-white text-lg font-bold">Premium</Text>
                  <Text className="text-gray-400 text-xs mt-1">Best value</Text>
                </View>
                <View className="bg-[#333333] px-3 py-2 rounded-lg">
                  <Text className="text-white text-xl font-bold">$9.99</Text>
                  <Text className="text-gray-400 text-xs text-center">
                    per month
                  </Text>
                </View>
              </View>

              <View className="mt-3 pt-3 border-t border-[#3A3A3A]">
                <Text className="text-gray-400 text-xs">
                  Billed at $59.99 every 6 months
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Continue Button with animation */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                animateButton();
                // Your continue logic here
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#FFC107", "#FFB300"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 rounded-xl items-center justify-center"
              >
                <Text className="text-black text-lg font-bold">Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Additional information */}
          <View className="items-center pb-12">
            <Text className="text-gray-400 text-xs text-center mb-2">
              Cancel anytime, no questions asked
            </Text>
            <TouchableOpacity>
              <Text className="text-[#C67C4E] text-xs">
                Terms & Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
