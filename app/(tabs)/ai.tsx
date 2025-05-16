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
    "Other",
  ];

  const categoryQuestions = {
    Wedding: [
      "What are the names of the couple?",
      "What's the wedding date and time?",
      "What's the venue name and address?",
      "Any specific theme or color scheme?",
      "Any special message to include?",
    ],
    Birthday: [
      "What's the name of the birthday person?",
      "How old will they be turning?",
      "When and where is the celebration?",
      "Any theme for the party?",
      "What should guests bring?",
    ],
    Party: [
      "What is the occasion for the party?",
      "When and where will it take place?",
      "Is there a dress code or theme?",
      "Who is hosting the party?",
      "Any special instructions for guests?",
    ],
    Anniversary: [
      "Who is celebrating the anniversary?",
      "Which anniversary year is it?",
      "Date and time of the celebration?",
      "Venue details?",
      "Any message or quote to include?",
    ],
    "Baby Shower": [
      "Who is the baby shower for?",
      "Date and time of the event?",
      "Venue details?",
      "Is there a gift registry or theme?",
      "Any special instructions for guests?",
    ],
    Graduation: [
      "Who is graduating?",
      "What school or university?",
      "Date and time of the ceremony or party?",
      "Venue details?",
      "Any message or quote to include?",
    ],
    Festival: [
      "Which festival is being celebrated?",
      "Date and time of the event?",
      "Venue details?",
      "Any dress code or theme?",
      "Any special message or wishes?",
    ],
    Corporate: [
      "What is the event name or purpose?",
      "Date and time of the event?",
      "Venue and company name?",
      "Dress code or agenda?",
      "RSVP or contact details?",
    ],
    Housewarming: [
      "Who is hosting the housewarming?",
      "Date and time of the event?",
      "New address?",
      "Any theme or instructions?",
      "Any special message to guests?",
    ],
    "Bachelorette Party": [
      "Who is the party for?",
      "Date and time of the celebration?",
      "Venue or meeting point?",
      "Theme or dress code?",
      "Any special activities planned?",
    ],
    "Bridal Shower": [
      "Who is the bride-to-be?",
      "Date and time of the shower?",
      "Venue details?",
      "Theme or registry information?",
      "Any special instructions for guests?",
    ],
    Engagement: [
      "Who are the engaged couple?",
      "Date and time of the party?",
      "Venue details?",
      "Theme or dress code?",
      "Any special message or RSVP info?",
    ],
    Farewell: [
      "Who is the farewell for?",
      "Date and time of the event?",
      "Venue details?",
      "Reason for farewell (optional)?",
      "Any message or wishes?",
    ],
    Welcome: [
      "Who is being welcomed?",
      "Date and time of the event?",
      "Venue details?",
      "Any theme or special activities?",
      "Any message or wishes?",
    ],
    Retirement: [
      "Who is retiring?",
      "Date and time of the celebration?",
      "Venue details?",
      "Career highlights to mention?",
      "Any message or wishes?",
    ],
    "Save the Date": [
      "What is the event?",
      "Who is hosting or being celebrated?",
      "Date and time to save?",
      "Venue (if known)?",
      "Any additional notes?",
    ],
    Memorial: [
      "Who is being remembered?",
      "Date and time of the memorial?",
      "Venue or location?",
      "Any special requests for attendees?",
      "Message or quote to include?",
    ],
    "Children's Party": [
      "Who is the party for?",
      "Age of the child?",
      "Date and time of the party?",
      "Venue details?",
      "Theme or activities planned?",
    ],
    Religious: [
      "What is the religious occasion?",
      "Date and time of the event?",
      "Venue or place of worship?",
      "Dress code or customs?",
      "Any message or blessings?",
    ],
    Achievement: [
      "Who is being celebrated?",
      "What is the achievement?",
      "Date and time of the celebration?",
      "Venue details?",
      "Any special message or quote?",
    ],
    Appreciation: [
      "Who is being appreciated?",
      "Reason for appreciation?",
      "Date and time of the event (if any)?",
      "Venue (if any)?",
      "Any special message or wishes?",
    ],
    "Mother's Day": [
      "Who is being celebrated?",
      "Date and time of the event?",
      "Venue details?",
      "Any special activities or theme?",
      "Message or wishes for mothers?",
    ],
    "Father's Day": [
      "Who is being celebrated?",
      "Date and time of the event?",
      "Venue details?",
      "Any special activities or theme?",
      "Message or wishes for fathers?",
    ],
    "Teacher's Day": [
      "Who is being celebrated?",
      "Date and time of the event?",
      "Venue details?",
      "Any special activities or theme?",
      "Message or wishes for teachers?",
    ],
    "Women's Day": [
      "Who is being celebrated?",
      "Date and time of the event?",
      "Venue details?",
      "Any special activities or theme?",
      "Message or wishes for women?",
    ],
    Congratulations: [
      "Who is being congratulated?",
      "Reason for congratulations?",
      "Date and time of the celebration (if any)?",
      "Venue (if any)?",
      "Any special message or wishes?",
    ],
    "Good Morning": [
      "Who is the message for?",
      "Any specific occasion or reason?",
      "Any quote or wish to include?",
      "Preferred tone (cheerful, formal, etc.)?",
      "Any additional notes?",
    ],
    "Good Night": [
      "Who is the message for?",
      "Any specific occasion or reason?",
      "Any quote or wish to include?",
      "Preferred tone (calm, loving, etc.)?",
      "Any additional notes?",
    ],
    Motivation: [
      "Who is the message for?",
      "What is the goal or challenge?",
      "Any specific quote or phrase to include?",
      "Preferred tone (inspiring, supportive, etc.)?",
      "Any additional notes?",
    ],
    Family: [
      "What is the family occasion?",
      "Date and time of the event?",
      "Venue details?",
      "Any theme or dress code?",
      "Any special message or wishes?",
    ],
    Friendship: [
      "Who is the message or event for?",
      "Occasion (if any)?",
      "Date and time (if event)?",
      "Venue (if event)?",
      "Any special message or wishes?",
    ],
    Apology: [
      "Who is the apology for?",
      "Reason for the apology?",
      "Any specific message to include?",
      "Preferred tone (formal, heartfelt, etc.)?",
      "Any additional notes?",
    ],
    Sorry: [
      "Who is the message for?",
      "Reason for saying sorry?",
      "Any specific message to include?",
      "Preferred tone (formal, heartfelt, etc.)?",
      "Any additional notes?",
    ],
    Other: [
      "What is the name of your event?",
      "Who is hosting or organizing the event?",
      "What is the date and time?",
      "Where will the event be held (venue or address)?",
      "What is the purpose or theme of the event?",
      "Who is invited (target audience)?",
      "Are there any special instructions or requests for attendees?",
      "Would you like to include a message, quote, or RSVP details?",
    ],
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
            Answer a few questions and let AI create the perfect invitation.
          </Text>
        </View>

        {/* Category Search & Grid */}
        <View className="mx-5 mb-3 bg-white rounded-2xl p-3 flex-row items-center shadow shadow-black/10">
          <Ionicons name="search" size={20} color="#C67C4E" />
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#aaa"
            className="flex-1 ml-2 text-base text-[#222]"
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
        <View className="flex-row flex-wrap gap-2 mx-5 mb-5 justify-start">
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => {
                setSelectedCategory(category);
                setShowCategories(false);
              }}
              className={[
                "flex-row items-center m-1 rounded-full py-2 px-4",
                selectedCategory === category
                  ? "bg-[#C67C4E] shadow shadow-[#C67C4E]/20"
                  : "bg-gray-100 shadow shadow-black/5",
              ].join(" ")}
              activeOpacity={0.85}
              style={{
                elevation: selectedCategory === category ? 4 : 1,
              }}
            >
              <Ionicons
                name={categoryIcons[category] || "albums"}
                size={18}
                color={selectedCategory === category ? "#fff" : "#C67C4E"}
                style={{ marginRight: 7 }}
              />
              <Text
                className={[
                  selectedCategory === category
                    ? "text-white font-bold"
                    : "text-[#222] font-medium",
                  "text-[15px]",
                ].join(" ")}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Glassmorphism Card for Questions */}
        <View
          className="mx-4 p-4 rounded-[28px] bg-white/80 border border-[#e9d5ff] shadow shadow-[#C67C4E]/10 mb-8"
          style={{ elevation: 10 }}
        >
          <Text className="text-[20px] font-bold text-[#C67C4E] mb-3 tracking-wide">
            {selectedCategory} Details
          </Text>
          {currentQuestions.map((question, idx) => (
            <View key={idx} className="mb-4.5">
              <Text className="text-gray-500 font-semibold mb-1 text-[15px]">
                {idx + 1}. {question}
              </Text>
              <View
                className="bg-gray-100 rounded-xl border border-[#ede9fe] shadow shadow-[#C67C4E]/5 px-3"
                style={{
                  elevation: 2,
                  paddingVertical: Platform.OS === "ios" ? 14 : 10,
                }}
              >
                <TextInput
                  placeholder="Type your answer..."
                  placeholderTextColor="#bbb"
                  className="text-base text-[#222] font-medium py-0"
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
          <View className="bg-[#fdf6e3] rounded-xl p-3 mt-2.5 flex-row items-center">
            <Ionicons name="bulb-outline" size={18} color="#C67C4E" />
            <Text className="ml-2 text-[#C67C4E] font-semibold text-sm">
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
            className="bg-[#C67C4E] rounded-2xl py-4 items-center shadow shadow-[#C67C4E]/20 "
            style={{ elevation: 10 }}
          >
            <Text className="text-white font-bold text-lg ">
              Generate Invitation ✨
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      <View className="pb-20"></View>
    </LinearGradient>
  );
}
