import { Ionicons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

export default function AIQuestions() {
  const params = useLocalSearchParams();
  const category = params.category || "Wedding";
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = useRef([]);

  // Same categoryQuestions object as before
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

  // Default questions for any category missing from the mapping
  const defaultQuestions = [
    "What is the name and purpose of your event?",
    "Who is hosting or being celebrated?",
    "What date, time, and venue/address?",
    "What style, theme, or color palette do you want?",
    "Any key motifs or icons to include?",
    "Any special message, quote, or RSVP details?",
  ];

  const currentQuestions = categoryQuestions[category] || defaultQuestions;

  // Animation for progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentQuestionIndex + 1) / currentQuestions.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const handleInputChange = (text, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: text,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }
  };

  const generateAIPrompt = async () => {
    // Animation for button press
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
      let prompt = `Create a beautiful ${category} invitation with the following details:\n`;

      // Add each answered question to the prompt
      currentQuestions.forEach((question, idx) => {
        const answer = answers[idx];
        if (answer && answer.trim()) {
          // Extract the core question without numbering
          const cleanQuestion = question.replace(/^\d+\.\s*/, "");
          prompt += `- ${cleanQuestion}: ${answer}\n`;
        }
      });

      // Add some style guidelines
      prompt += `Style: Modern, elegant design with appropriate imagery and typography for a ${category} invitation.`;

      // Simulate API call with timeout (replace with your actual API call)
      const uniqueId = await Crypto.randomUUID();
      setTimeout(() => {
        router.push({
          pathname: "/invitations/[id]",
          params: {
            id: uniqueId,
            category,
            prompt,
          },
        });
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating invitation:", error);
      Alert.alert("Error", "Failed to generate invitation. Please try again.");
      setIsGenerating(false);
    }
  };

  // Get icon for current category
  const getCategoryIcon = () => {
    const icons = {
      Wedding: "heart",
      Birthday: "gift",
      Party: "beer",
      Anniversary: "ribbon",
      "Baby Shower": "balloon",
      Graduation: "school",
      Festival: "sparkles",
      Corporate: "briefcase",
    };
    return icons[category] || "albums";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#C67C4E"
        translucent
      />

      {/* Decorative top header */}
      <LinearGradient
        colors={["#C67C4E", "#A05A2F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-12 pb-6 rounded-b-[40px] shadow-xl"
        style={{ elevation: 10 }}
      >
        {/* Back button and title */}
        <View className="flex-row items-center px-6 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full mr-4"
            style={{ elevation: 2 }}
          >
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>

          <View className="flex-1">
            <View className="flex-row items-center">
              <Ionicons name={getCategoryIcon()} size={24} color="#FFF" />
              <Text className="text-white text-xl font-bold ml-2">
                {category}
              </Text>
            </View>
            <Text className="text-white/80 text-sm mt-0.5">
              Design your perfect invitation
            </Text>
          </View>
        </View>

        {/* Progress indicator */}
        <View className="px-6 mt-2">
          <View className="flex-row items-center mb-1">
            <Text className="text-white font-medium text-sm">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </Text>
            <View className="flex-row ml-auto">
              <Text className="text-white/80 text-xs">
                {Math.round(
                  ((currentQuestionIndex + 1) / currentQuestions.length) * 100
                )}
                % Complete
              </Text>
            </View>
          </View>

          <View className="h-2 bg-white/20 rounded-full overflow-hidden">
            <Animated.View
              className="h-full bg-white rounded-full"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              }}
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        className="px-5 pt-6"
      >
        {/* Current question card with animation */}
        <Animated.View
          className="bg-white rounded-3xl p-5 shadow-lg mb-6"
          style={{
            elevation: 4,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-9 h-9 rounded-full bg-[#C67C4E] items-center justify-center">
              <Text className="text-white font-bold text-lg">Q</Text>
            </View>
            <Text className="text-[#333] font-bold text-lg ml-3 flex-1">
              {currentQuestions[currentQuestionIndex]}
            </Text>
          </View>

          <View className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mb-3">
            <TextInput
              ref={(ref) => {
                inputRefs.current[currentQuestionIndex] = ref;
              }}
              placeholder="Type your answer here..."
              placeholderTextColor="#AAA"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="text-[16px] text-[#333] min-h-[80px]"
              value={answers[currentQuestionIndex] || ""}
              onChangeText={(text) =>
                handleInputChange(text, currentQuestionIndex)
              }
            />
          </View>

          {/* Tips section with icon */}
          <View className="bg-[#FFF8E1] rounded-xl p-3 flex-row items-start">
            <Ionicons
              name="bulb"
              size={18}
              color="#FFC107"
              className="mt-0.5"
            />
            <Text className="ml-2 text-[#755A00] text-sm flex-1">
              {category === "Wedding" || category === "Engagement"
                ? "Pro tip: Including specific details like full names, dress code, and dietary preferences shows thoughtfulness and helps guests prepare better."
                : category === "Birthday"
                ? "Pro tip: Mention the age, theme colors, and whether gifts are welcome to create a more personalized invitation."
                : category === "Corporate"
                ? "Pro tip: Include key information like parking details, agenda highlights, and dress code for a comprehensive invitation."
                : "Pro tip: Be specific about colors, themes, and any special instructions to create a truly customized invitation."}
            </Text>
          </View>
        </Animated.View>

        {/* Examples for inspiration */}
        <View className="mb-4">
          <Text className="text-[#666] font-semibold mb-3">
            Need inspiration?
          </Text>
          <View className="bg-white rounded-xl p-3 shadow-md">
            <Text className="text-[#333] italic">
              {category === "Wedding"
                ? '"We invite you to celebrate our love story as Jane Smith & John Doe join hands in marriage. September 30, 2025 at Sunset Gardens."'
                : category === "Birthday"
                ? '"Join us for a magical celebration as Emma turns 10! Unicorn-themed fun awaits at Rainbow Valley Park."'
                : '"Sample answer: Let\'s celebrate at Golden Bay Resort, featuring elegant blue and silver décor with a coastal theme."'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Navigation buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white pt-2 pb-8 px-5 shadow-lg border-t border-gray-100">
        <View className="flex-row justify-between items-center mb-3">
          <TouchableOpacity
            onPress={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`p-2 rounded-lg ${
              currentQuestionIndex === 0 ? "opacity-30" : ""
            }`}
          >
            <Text className="text-[#C67C4E] font-semibold">Previous</Text>
          </TouchableOpacity>

          {currentQuestionIndex < currentQuestions.length - 1 ? (
            <TouchableOpacity
              onPress={handleNextQuestion}
              className="bg-[#C67C4E] py-3 px-6 rounded-xl shadow"
              style={{ elevation: 2 }}
            >
              <Text className="text-white font-bold">Next Question</Text>
            </TouchableOpacity>
          ) : (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={generateAIPrompt}
                disabled={isGenerating}
                className="bg-[#C67C4E] py-3 px-6 rounded-xl shadow flex-row items-center"
                style={{ elevation: 3 }}
              >
                {isGenerating ? (
                  <View className="flex-row items-center">
                    <View className="h-5 w-5 mr-2">
                      <ActivityIndicator size="small" color="#FFF" />
                    </View>
                    <Text className="text-white font-bold">Creating...</Text>
                  </View>
                ) : (
                  <View className="flex-row items-center">
                    <Text className="text-white font-bold mr-2">
                      Generate Invitation
                    </Text>
                    <Ionicons name="sparkles" size={18} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Small indicator dots */}
        <View className="flex-row justify-center">
          {currentQuestions.map((_, index) => (
            <View
              key={index}
              className={`h-1.5 mx-0.5 rounded-full ${
                currentQuestionIndex === index
                  ? "w-5 bg-[#C67C4E]"
                  : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

// Actual API call would look like:
// const response = await generateImageWithAI(prompt);
// router.push({
//   pathname: "/ai-result",
//   params: {
//     imageUrl: response.imageUrl,
//     category,
//     prompt,
//   },
// });
