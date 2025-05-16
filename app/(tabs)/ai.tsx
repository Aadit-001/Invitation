import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Example icons for categories (customize as needed)
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

export default function ai() {
  const [selectedCategory, setSelectedCategory] = useState("Wedding");
  const [answers, setAnswers] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);

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
  ];

  // ... (categoryQuestions stays the same as your code)

  const categoryQuestions = {
    /* ... your questions ... */
  };

  const currentQuestions = categoryQuestions[selectedCategory] || [];

  const handleInputChange = (text, questionIndex) => {
    setAnswers({
      ...answers,
      [selectedCategory]: {
        ...(answers[selectedCategory] || {}),
        [questionIndex]: text,
      },
    });
  };

  const generateAIPrompt = () => {
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
    // ...submit logic
  };

  // Filter categories by search
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
        <View
          style={{ paddingTop: 48, paddingHorizontal: 24, marginBottom: 16 }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#262626",
              letterSpacing: 1,
            }}
          >
            🎉 AI Invitation Designer
          </Text>
          <Text style={{ color: "#6b7280", fontSize: 16, marginTop: 6 }}>
            Answer a few questions and let AI create the perfect invitation.
          </Text>
        </View>

        {/* Category Search & Grid */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 12,
            backgroundColor: "#fff",
            borderRadius: 18,
            padding: 12,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="search" size={20} color="#C67C4E" />
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#aaa"
            style={{ flex: 1, marginLeft: 8, fontSize: 16, color: "#222" }}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setShowCategories(true)}
          />
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              setShowCategories(false);
            }}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#bbb"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        {/* Category Pills Grid */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginHorizontal: 20,
            marginBottom: 20,
            justifyContent: "flex-start",
          }}
        >
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => {
                setSelectedCategory(category);
                setShowCategories(false);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 4,
                backgroundColor:
                  selectedCategory === category ? "#C67C4E" : "#f3f4f6",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 16,
                shadowColor: selectedCategory === category ? "#C67C4E" : "#000",
                shadowOpacity: selectedCategory === category ? 0.14 : 0.05,
                shadowRadius: 4,
                elevation: selectedCategory === category ? 4 : 1,
              }}
              activeOpacity={0.85}
            >
              <Ionicons
                name={categoryIcons[category] || "albums"}
                size={18}
                color={selectedCategory === category ? "#fff" : "#C67C4E"}
                style={{ marginRight: 7 }}
              />
              <Text
                style={{
                  color: selectedCategory === category ? "#fff" : "#222",
                  fontWeight: selectedCategory === category ? "bold" : "500",
                  fontSize: 15,
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Glassmorphism Card for Questions */}
        <View
          style={{
            marginHorizontal: 16,
            padding: 18,
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.82)",
            shadowColor: "#C67C4E",
            shadowOpacity: 0.13,
            shadowRadius: 16,
            elevation: 10,
            marginBottom: 32,
            borderWidth: 1,
            borderColor: "#e9d5ff",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#C67C4E",
              marginBottom: 14,
              letterSpacing: 0.5,
            }}
          >
            {selectedCategory} Details
          </Text>
          {currentQuestions.map((question, idx) => (
            <View key={idx} style={{ marginBottom: 18 }}>
              <Text
                style={{
                  color: "#6b7280",
                  fontWeight: "600",
                  marginBottom: 5,
                  fontSize: 15,
                }}
              >
                {idx + 1}. {question}
              </Text>
              <View
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "#ede9fe",
                  shadowColor: "#C67C4E",
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                  paddingHorizontal: 12,
                  paddingVertical: Platform.OS === "ios" ? 14 : 10,
                }}
              >
                <TextInput
                  placeholder="Type your answer..."
                  placeholderTextColor="#bbb"
                  style={{
                    fontSize: 16,
                    color: "#222",
                    paddingVertical: 0,
                    fontWeight: "500",
                  }}
                  value={
                    answers[selectedCategory]
                      ? answers[selectedCategory][idx] || ""
                      : ""
                  }
                  onChangeText={(text) => handleInputChange(text, idx)}
                />
              </View>
            </View>
          ))}

          {/* Tips */}
          <View
            style={{
              backgroundColor: "#fdf6e3",
              borderRadius: 14,
              padding: 12,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="bulb-outline" size={18} color="#C67C4E" />
            <Text
              style={{
                marginLeft: 8,
                color: "#C67C4E",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              {selectedCategory === "Wedding" ||
              selectedCategory === "Engagement"
                ? "Include full names, venue, and any special instructions for guests."
                : selectedCategory === "Birthday"
                ? "Specify age, theme, and gift preferences for a standout invitation."
                : selectedCategory === "Corporate"
                ? "Include branding, agenda, and RSVP details for professional invites."
                : "Be specific with details like colors, themes, and instructions for a better invitation!"}
            </Text>
          </View>
        </View>

        {/* Floating Action Button */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 32,
            left: width / 2 - 90,
            width: 180,
            zIndex: 10,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <TouchableOpacity
            onPress={generateAIPrompt}
            activeOpacity={0.92}
            style={{
              backgroundColor: "#C67C4E",
              borderRadius: 24,
              paddingVertical: 16,
              alignItems: "center",
              shadowColor: "#C67C4E",
              shadowOpacity: 0.18,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Generate Invitation ✨
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}
