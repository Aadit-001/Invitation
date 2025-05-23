import IMAGES from "@/constants/image";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";

const { width, height } = Dimensions.get("window");

// Sample example prompts - you can replace with your own
const examplePrompts = [
  "Elegant wedding with gold foil and flowers",
  "Birthday party with balloons and confetti",
  "Beach wedding with palm trees and sunset",
  "Corporate event with modern minimal design",
  "Elegant party invitation with baroque style",
  "Minimalist birthday card with pastel colors",
  "Vintage wedding invitation with floral elements",
  "Tropical themed birthday bash invitation",
  "Christmas party invitation with snowflakes",
];

export default function CreateWithAI() {
  const navigation = useNavigation();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const viewShotRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Hide tab bar when this screen is focused
  useLayoutEffect(() => {
    const parent = navigation?.getParent();
    if (parent) {
      // Hide the tab bar
      parent.setOptions({
        tabBarStyle: { display: "none" },
      });
    }

    // Restore tab bar when unmounting
    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: undefined,
        });
      }
    };
  }, [navigation]);

  // AI models that user can select
  const aiModels = [
    { id: "sdxl", name: "Stable Diffusion XL", premium: false },
    { id: "sdxl-turbo", name: "SDXL Turbo", premium: false },
    { id: "kandinsky", name: "Kandinsky", premium: false },
    { id: "flux", name: "Flux", premium: true },
  ];

  // Request permissions for saving images
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Animate the bottom button when generated image changes
  useEffect(() => {
    if (generatedImage) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      buttonOpacity.setValue(0);
    }
  }, [generatedImage]);

  // Generate a random prompt when the dice is clicked
  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * examplePrompts.length);
    setPrompt(examplePrompts[randomIndex]);
  };

  // Generate the image from the prompt
  const generateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert("Empty Prompt", "Please enter a description first");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // In a real app, you would make an API call to an AI service here
      // This is a simulation for demonstration purposes

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // For demo, we'll just use a placeholder image
      // In a real app, this would be the URL returned from your AI service
      setGeneratedImage(IMAGES.templates.flowers);

      // Animate the appearance of the generated image
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      Alert.alert("Error", "Failed to generate image. Please try again.");
      console.error("Image generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save the generated image to the device
  const saveImage = async () => {
    if (!generatedImage) return;

    try {
      if (!hasPermission) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "We need permission to save images to your device."
          );
          return;
        }
      }

      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);

      Alert.alert("Success", "Image saved to your gallery!");
    } catch (error) {
      Alert.alert("Error", "Failed to save image");
      console.error("Save error:", error);
    }
  };

  // Share the generated image
  const shareImage = async () => {
    if (!generatedImage) return;

    try {
      const uri = await viewShotRef.current.capture();

      if (Platform.OS === "ios") {
        await Share.share({
          url: uri,
        });
      } else {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to share image");
      console.error("Share error:", error);
    }
  };

  // The bottom tab height (if you need to add additional padding)
  const TAB_BAR_HEIGHT = 60;

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1">
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

        {/* Decorative elements */}
        <View className="absolute -top-[70px] -right-[70px] w-[200px] h-[200px] rounded-full bg-[rgba(255,87,87,0.08)]" />
        <View className="absolute -bottom-[70px] -left-[70px] w-[200px] h-[200px] rounded-full bg-[rgba(198,124,78,0.06)]" />

        {/* Main scrollable content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: (insets.bottom || 16) + (generatedImage ? 80 : 0),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-14 pb-10">
            {/* Back button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/10 p-2.5 rounded-full self-start mb-4"
            >
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            {/* Header section */}
            <View className="items-center mb-6">
              <Text className="text-[32px] font-bold text-white text-center mb-3">
                Create with AI
              </Text>
              <Text className="text-gray-300 text-center text-base">
                Describe what you want, and our AI will create it for you
              </Text>
            </View>

            {/* AI Creation Section */}
            <View className="bg-white/10 rounded-3xl p-5 mb-5">
              {/* Prompt input */}
              <Text className="text-white font-bold text-lg mb-3">
                Describe what you want to create
              </Text>

              <View className="bg-white/10 rounded-xl mb-4 border border-white/20 relative">
                <TextInput
                  value={prompt}
                  onChangeText={setPrompt}
                  placeholder="E.g., Elegant wedding invitation with gold foil and flowers..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  multiline
                  numberOfLines={4}
                  className="text-white text-base p-4"
                  style={{ minHeight: 120 }}
                  textAlignVertical="top"
                />
                {/* Random prompt generator button */}
                <TouchableOpacity
                  onPress={generateRandomPrompt}
                  className="absolute bottom-3 right-3 bg-white/20 w-10 h-10 rounded-full items-center justify-center"
                >
                  <Ionicons name="dice" size={22} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Model selection */}
              <Text className="text-white font-bold text-base mb-2">
                Select AI Model:
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
                className="mb-4"
              >
                {aiModels.map((model, index) => (
                  <TouchableOpacity
                    key={model.id}
                    onPress={() => setSelectedModelIndex(index)}
                    className={`mr-2 px-4 py-2 rounded-full border ${
                      selectedModelIndex === index
                        ? "border-[#FF5757] bg-[#FF5757]/20"
                        : "border-white/20 bg-white/10"
                    } flex-row items-center`}
                  >
                    <Text className="text-white font-medium">{model.name}</Text>
                    {model.premium && (
                      <View className="ml-2 bg-[#FFD700]/20 px-2 rounded-full">
                        <Text className="text-[#FFD700] text-xs">PRO</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Generate button */}
              <TouchableOpacity
                onPress={generateImage}
                disabled={isGenerating || !prompt.trim()}
                activeOpacity={0.8}
                className={`py-3 px-4 rounded-xl flex-row justify-center items-center mb-6 ${
                  isGenerating || !prompt.trim()
                    ? "bg-gray-500/50"
                    : "bg-[#FF5757]"
                }`}
              >
                {isGenerating ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="flash" size={20} color="#fff" />
                    <Text className="text-white font-bold text-base ml-2">
                      Generate Image
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Image result section */}
              <Text className="text-white font-bold text-lg mb-3">
                Your creation will appear here
              </Text>

              <ViewShot
                ref={viewShotRef}
                options={{ format: "jpg", quality: 0.9 }}
                className="bg-white/10 rounded-xl overflow-hidden"
                style={{ aspectRatio: 1 }}
              >
                {isGenerating ? (
                  <View className="items-center justify-center h-full">
                    <ActivityIndicator size="large" color="#FF5757" />
                    <Text className="text-white mt-4 text-center">
                      Creating your design...{"\n"}
                      <Text className="text-white/60 text-sm">
                        This takes just a few seconds
                      </Text>
                    </Text>
                  </View>
                ) : generatedImage ? (
                  <Animated.View
                    style={{
                      opacity: fadeAnim,
                      transform: [{ scale: scaleAnim }],
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      source={generatedImage}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                    {/* Subtle watermark */}
                    <View
                      style={{
                        position: "absolute",
                        bottom: 8, // Moved to bottom corner
                        right: 8,
                        backgroundColor: "rgba(255, 87, 87, 0.4)", // Reduced opacity
                        paddingHorizontal: 8, // Smaller padding
                        paddingVertical: 3,
                        borderRadius: 12,
                        shadowColor: "#000", // Added subtle shadow for legibility
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 10, // Smaller text
                          fontWeight: "500", // Less bold
                          opacity: 0.9,
                        }}
                      >
                        APP NAME
                      </Text>
                    </View>
                  </Animated.View>
                ) : (
                  <View className="items-center justify-center h-full py-16">
                    <Ionicons
                      name="images"
                      size={64}
                      color="rgba(255,255,255,0.2)"
                    />
                    <Text className="text-white/40 mt-4 text-center px-6">
                      Enter a prompt and click "Generate Image" to start
                    </Text>
                  </View>
                )}
              </ViewShot>

              {/* Image actions - only show when there's a generated image */}
              {generatedImage && (
                <View className="flex-row justify-around mt-5">
                  <TouchableOpacity
                    onPress={saveImage}
                    className="items-center"
                  >
                    <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-2">
                      <FontAwesome5 name="download" size={18} color="#FF5757" />
                    </View>
                    <Text className="text-white text-xs">Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={shareImage}
                    className="items-center"
                  >
                    <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-2">
                      <FontAwesome5
                        name="share-alt"
                        size={18}
                        color="#FF5757"
                      />
                    </View>
                    <Text className="text-white text-xs">Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="items-center">
                    <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-2">
                      <FontAwesome5 name="edit" size={18} color="#FF5757" />
                    </View>
                    <Text className="text-white text-xs">Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="items-center">
                    <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-2">
                      <FontAwesome5 name="heart" size={18} color="#FF5757" />
                    </View>
                    <Text className="text-white text-xs">Like</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Pro features showcase */}
            <View className="bg-white/10 rounded-3xl p-5 mb-5">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 rounded-full bg-[#FFD700]/20 items-center justify-center mr-3">
                  <Ionicons name="star" size={20} color="#FFD700" />
                </View>
                <Text className="text-white font-bold text-lg">
                  PRO Features
                </Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#FF5757"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white">Access to premium AI models</Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#FF5757"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white">Higher resolution outputs</Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#FF5757"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white">
                  No watermarks on your creations
                </Text>
              </View>

              <TouchableOpacity className="bg-[#FFD700]/20 py-3 rounded-xl items-center mt-4">
                <Text className="text-[#FFD700] font-bold">Upgrade to PRO</Text>
              </TouchableOpacity>
            </View>
            {generatedImage && (
              <View
                className="left-0 right-0 bottom-0 px-6 pt-2"
                style={{
                  paddingBottom: insets.bottom || 16,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setPrompt("");
                    setGeneratedImage(null);
                  }}
                  activeOpacity={0.8}
                  className="overflow-hidden rounded-xl"
                >
                  <LinearGradient
                    colors={["#FF5757", "#FF5E62", "#FF9966"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-4 items-center"
                  >
                    <Text className="text-white font-bold text-lg">
                      Create Something New
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Fixed bottom button with fixes to prevent being hidden by navigation */}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
