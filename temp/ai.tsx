import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
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
const router = useRouter();
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
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
      "What are the full names of the couple?",
      "What is the exact wedding date, time, and timezone?",
      "What is the venue name, address, and any landmark details?",
      "What overall style or theme do you envision (e.g., minimalist, watercolor, vintage)?",
      "What color palette and florals/motifs should be included?",
      "Any special typography or wording (e.g., monograms, quotes)?",
    ],
    Birthday: [
      "What is the birthday person’s name and age?",
      "What is the date, time, and venue of the party?",
      "Do you have a preferred theme or character (e.g., superhero, princess)?",
      "What color scheme or party decorations should we feature?",
      "Any special props or items (e.g., balloons, cake style)?",
      "What tone should the design convey (e.g., playful, elegant)?",
    ],
    Party: [
      "What is the occasion or title of the party?",
      "When (date/time) and where (venue/address) is it happening?",
      "Is there a specific theme or dress code?",
      "What mood should the visuals convey (e.g., energetic, chic)?",
      "Any signature elements (e.g., cocktail glass, disco ball)?",
      "Preferred color palette or lighting style?",
    ],
    Anniversary: [
      "Who is celebrating and which anniversary year is it?",
      "What date, time, and location are set for the celebration?",
      "Do you want a romantic, classy, or playful style?",
      "What color palette and symbols (e.g., rings, hearts) to include?",
      "Any special message, quote, or monogram to feature?",
    ],
    "Baby Shower": [
      "Who is the guest of honor (parent’s name)?",
      "What is the date, time, and venue of the shower?",
      "Boy, girl, or surprise—any color scheme or motif?",
      "Do you have preferred icons (e.g., stork, baby carriage, blocks)?",
      "What overall vibe—cute, modern, rustic?",
      "Any registry or gift-note to display?",
    ],
    Graduation: [
      "Who is graduating and from which school/university?",
      "What is the date, time, and venue of the ceremony/party?",
      "Do you want academic symbols (cap, diploma) or personal photos?",
      "What color palette matches the school or graduate’s preference?",
      "Any inspirational quote or message to include?",
    ],
    Festival: [
      "Which festival or holiday are you celebrating?",
      "What is the event date, time, and venue?",
      "Do you prefer traditional, modern, or fusion visuals?",
      "What color palette and symbols (e.g., lanterns, kalash) to include?",
      "Any dress code or cultural motifs to highlight?",
    ],
    Corporate: [
      "What is the event name and purpose?",
      "What date, time, and company location should be listed?",
      "Do you want a formal, creative, or tech-oriented style?",
      "What branding colors, logos, or typography to use?",
      "Any agenda highlights or RSVP/contact details?",
    ],
    Housewarming: [
      "Who is hosting the housewarming?",
      "What is the date, time, and new address?",
      "Do you have a home style (e.g., modern, rustic, boho)?",
      "What color palette and home icons (e.g., keys, door) to include?",
      "Any special instructions (parking, gifts) to display?",
    ],
    "Bachelorette Party": [
      "Who is the bride-to-be?",
      "What are the date, time, and meeting point or venue?",
      "What theme or dress code should guests follow?",
      "Any signature icons (e.g., champagne, tiaras, sashes)?",
      "What mood—glamorous, fun, chic?",
    ],
    "Bridal Shower": [
      "Who is the bride-to-be and host(s)?",
      "What date, time, and venue should be shown?",
      "Do you want floral, tea-party, or modern décor style?",
      "What color palette and motifs (e.g., cake, flowers)?",
      "Any registry link or special instructions?",
    ],
    Engagement: [
      "Who are the engaged couple?",
      "What’s the date, time, and venue of the celebration?",
      "Preferred theme or style (e.g., romantic, boho)?",
      "What color palette and ring/motif to include?",
      "Any personal message or RSVP info?",
    ],
    Farewell: [
      "Who or what are we saying farewell to?",
      "What is the date, time, and venue of the event?",
      "Do you want a sentimental, humorous, or formal tone?",
      "What color palette and icons (e.g., suitcase, memories)?",
      "Any special message or quote to include?",
    ],
    Welcome: [
      "Who is being welcomed and why?",
      "What date, time, and venue should be listed?",
      "Do you have a theme or color scheme in mind?",
      "Any icons (e.g., welcome mat, balloons) to feature?",
      "Any special message or greeting text?",
    ],
    Retirement: [
      "Who is retiring and from which organization?",
      "What date, time, and venue does the send-off have?",
      "Do you want a formal, playful, or gratitude-focused style?",
      "What color palette and icons (e.g., clock, chair)?",
      "Any highlights of career achievements to showcase?",
    ],
    "Save the Date": [
      "What event are we saving the date for?",
      "Who is hosting or being celebrated?",
      "What date, time, and location (if known)?",
      "Preferred style (minimalist, illustrated, photo-based)?",
      "What color palette and motifs to include?",
      "Any RSVP or “formal invitation to follow” note?",
    ],
    Memorial: [
      "Who is being remembered?",
      "What is the date, time, and venue of the memorial?",
      "Do you want a solemn, uplifting, or floral design?",
      "What color palette and symbols (e.g., candle, dove)?",
      "Any favorite quote or passage to include?",
    ],
    "Children's Party": [
      "Who is the child and how old are they turning?",
      "What date, time, and venue of the party?",
      "Preferred theme (e.g., animals, superheroes, unicorns)?",
      "What color palette and character icons?",
      "Any special activities or game motifs to show?",
    ],
    Religious: [
      "What religious occasion is this?",
      "What date, time, and place of worship is it at?",
      "Do you want traditional or modern religious symbols?",
      "What color palette and motifs (e.g., lotus, cross)?",
      "Any blessings, verses, or prayers to include?",
    ],
    Achievement: [
      "Who is being celebrated and for what achievement?",
      "What date, time, and venue of the celebration?",
      "Do you want formal, fun, or motivational style?",
      "What color palette and icons (e.g., trophy, stars)?",
      "Any special quote or message to feature?",
    ],
    Appreciation: [
      "Who is being appreciated and why?",
      "Is there a date, time, or venue for the event?",
      "Do you want formal, heartfelt, or playful tone?",
      "What color palette and icons (e.g., handshake, flowers)?",
      "Any special message or certificate style?",
    ],
    "Mother's Day": [
      "Who are we celebrating and how are they related?",
      "What date, time, and venue (if an event)?",
      "Do you want floral, photo-based, or typographic style?",
      "What color palette and motifs (e.g., roses, hearts)?",
      "Any special message or poem to include?",
    ],
    "Father's Day": [
      "Who are we celebrating and how are they related?",
      "What date, time, and venue (if an event)?",
      "Do you want masculine, vintage, or modern style?",
      "What color palette and motifs (e.g., ties, tools)?",
      "Any special message or quote to include?",
    ],
    "Teacher's Day": [
      "Which teacher are we honoring?",
      "What date, time, and venue (if an event)?",
      "Do you want chalkboard, book, or apple motif?",
      "What color palette and style (playful, formal)?",
      "Any special thank-you message or quote?",
    ],
    "Women's Day": [
      "Who is being celebrated or which group?",
      "What date, time, and venue (if an event)?",
      "Do you want empowering, floral, or modern style?",
      "What color palette and symbols (e.g., Venus sign)?",
      "Any inspirational quote or message?",
    ],
    Congratulations: [
      "Who is being congratulated and for what?",
      "What date, time, and venue (if known)?",
      "Do you want festive, formal, or playful style?",
      "What color palette and icons (e.g., confetti, balloons)?",
      "Any special congratulatory message or quote?",
    ],
    "Good Morning": [
      "Who is the greeting for?",
      "Any specific occasion (e.g., birthday, meeting)?",
      "Do you want bright, calm, or whimsical style?",
      "What color palette and motifs (e.g., sunrise, coffee)?",
      "Any uplifting quote or message to include?",
    ],
    "Good Night": [
      "Who is the greeting for?",
      "Any specific occasion (e.g., sleepover, bedtime)?",
      "Do you want dreamy, calming, or playful style?",
      "What color palette and motifs (e.g., moon, stars)?",
      "Any warm message or quote to include?",
    ],
    Motivation: [
      "Who is the motivational message for?",
      "What goal or challenge are they facing?",
      "Do you have a favorite quote or phrase to include?",
      "What tone (inspiring, supportive, bold)?",
      "What color palette and icons (e.g., mountain, arrow)?",
    ],
    Family: [
      "What family occasion or gathering is this?",
      "What date, time, and venue?",
      "Do you want casual, cozy, or festive style?",
      "What color palette and motifs (e.g., house, tree)?",
      "Any special family message or quote?",
    ],
    Friendship: [
      "Who is this for and what’s the occasion?",
      "What date, time, and venue (if event)?",
      "Do you want fun, heartfelt, or minimalist style?",
      "What color palette and icons (e.g., handshake, hearts)?",
      "Any special message or inside joke to include?",
    ],
    Apology: [
      "Who is the apology directed to?",
      "What is the reason for the apology?",
      "Do you want formal, heartfelt, or lighthearted tone?",
      "What color palette and motifs (e.g., flowers, pen)?",
      "Any specific wording or message to include?",
    ],
    Sorry: [
      "Who are you apologizing to?",
      "What happened or needs apologizing?",
      "Do you want sincere, gentle, or playful style?",
      "What color palette and icons (e.g., tear, flower)?",
      "Any special wording or quote?",
    ],
    Other: [
      "What is the name and purpose of your event?",
      "Who is hosting or being celebrated?",
      "What date, time, and venue/address?",
      "What style, theme, or color palette do you want?",
      "Any key motifs or icons to include?",
      "Any special message, quote, or RSVP details?",
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

  const generateAIPrompt = async () => {
    // Visual feedback animation
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

    setIsGenerating(true);

    try {
      // Format the answers into a prompt
      const categoryAnswers = answers[selectedCategory] || {};
      const questions = categoryQuestions[selectedCategory];

      let prompt = `Create a beautiful ${selectedCategory} invitation with the following details:\n`;

      // Add each answered question to the prompt
      questions.forEach((question, idx) => {
        const answer = categoryAnswers[idx];
        if (answer && answer.trim()) {
          // Extract the core question without numbering
          const cleanQuestion = question.replace(/^\d+\.\s*/, "");
          prompt += `- ${cleanQuestion}: ${answer}\n`;
        }
      });

      // Add some style guidelines
      prompt += `Style: Modern, elegant design with appropriate imagery and typography for a ${selectedCategory} invitation.`;

      console.log("Generated prompt:", prompt);

      // // Call your AI image generation API
      // const response = await generateImageWithAI(prompt);
      // setGeneratedImage(response.imageUrl);

      // Navigate to the result screen
      // router.push({
      //   pathname: `/invitations/${Date.now()}`,
      //   params: {
      //     imageUrl: response.imageUrl,
      //     category: selectedCategory,
      //     prompt,
      //   },
      // });
    } catch (error) {
      console.error("Error generating invitation:", error);
      // Show error message to user
      Alert.alert("Error", "Failed to generate invitation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
