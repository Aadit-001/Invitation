import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Use the same icons and questions as before
const categoryIcons = {
  Wedding: "heart",
  Birthday: "gift",
  Party: "beer",
  Anniversary: "ribbon",
  "Baby Shower": "baby",
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
  Religious: "church",
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

const categoryQuestions = {
  Wedding: [
    "What are the names of the couple?",
    "What's the wedding date and time?",
    "What's the venue name and address?",
    "Any specific theme or color scheme?",
    "Any special message to include?"
  ],
  Birthday: [
    "What's the name of the birthday person?",
    "How old will they be turning?",
    "When and where is the celebration?",
    "Any theme for the party?",
    "What should guests bring?"
  ],
  // ...repeat for all categories as above
};

export default function GenerateQuestion() {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedCategory } = route.params;
  const [answers, setAnswers] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const currentQuestions = categoryQuestions[selectedCategory] || [];

  const handleInputChange = (text, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: text,
    });
  };

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    // You can now use {selectedCategory, answers} to generate the invitation or go to the next step
    // For example: navigation.navigate("PreviewInvitation", { selectedCategory, answers })
  };

  return (
    <LinearGradient
      colors={["#f8fafc", "#e0e7ef", "#f0e4ff"]}
      style={{ flex: 1 }}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, minHeight: "100%" }}
      >
        {/* Header */}
        <View style={{ paddingTop: 48, paddingHorizontal: 24, marginBottom: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#262626", letterSpacing: 1 }}>
            <Ionicons name={categoryIcons[selectedCategory] || "albums"} size={28} color="#C67C4E" />  {selectedCategory} Details
          </Text>
          <Text style={{ color: "#6b7280", fontSize: 16, marginTop: 6 }}>
            Answer the questions to generate your invitation.
          </Text>
        </View>

        {/* Glassmorphism Card for Questions */}
        <View style={{
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
          borderColor: "#e9d5ff"
        }}>
          {currentQuestions.map((question, idx) => (
            <View key={idx} style={{ marginBottom: 18 }}>
              <Text style={{ color: "#6b7280", fontWeight: "600", marginBottom: 5, fontSize: 15 }}>
                {idx + 1}. {question}
              </Text>
              <View style={{
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
              }}>
                <TextInput
                  placeholder="Type your answer..."
                  placeholderTextColor="#bbb"
                  style={{
                    fontSize: 16,
                    color: "#222",
                    paddingVertical: 0,
                    fontWeight: "500"
                  }}
                  value={answers[idx] || ""}
                  onChangeText={text => handleInputChange(text, idx)}
                />
              </View>
            </View>
          ))}

          {/* Tips */}
          <View style={{
            backgroundColor: "#fdf6e3",
            borderRadius: 14,
            padding: 12,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Ionicons name="bulb-outline" size={18} color="#C67C4E" />
            <Text style={{ marginLeft: 8, color: "#C67C4E", fontWeight: "600", fontSize: 14 }}>
              {selectedCategory === "Wedding" || selectedCategory === "Engagement"
                ? "Include full names, venue, and any special instructions for guests."
                : selectedCategory === "Birthday"
                  ? "Specify age, theme, and gift preferences for a standout invitation."
                  : selectedCategory === "Corporate"
                    ? "Include branding, agenda, and RSVP details for professional invites."
                    : "Be specific with details like colors, themes, and instructions for a better invitation!"
              }
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
            transform: [{ scale: scaleAnim }]
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
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
              Submit Answers ✨
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}
