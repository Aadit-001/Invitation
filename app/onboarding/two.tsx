import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Featured categories (optimized selection)
const featuredCategories = [
  { id: 1, name: "Wedding", icon: "heart" },
  { id: 2, name: "Birthday", icon: "gift" },
  { id: 3, name: "Party", icon: "people" },
  { id: 4, name: "Good Morning", icon: "sunny" },
];

// Full category list
const fullCategories = [
  "All",
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

// Category groups
const categoryGroups = [
  {
    title: "Life Celebrations",
    description: "From weddings to birthdays and anniversaries",
    icon: "sparkles",
    examples: ["Wedding", "Birthday", "Anniversary"],
  },
  {
    title: "Daily Connections",
    description: "Perfect for seniors and everyday messages",
    icon: "sunny",
    examples: ["Good Morning", "Good Night", "Motivation"],
  },
  {
    title: "Special Occasions",
    description: "Milestones that deserve recognition",
    icon: "calendar",
    examples: ["Retirement", "Baby Shower", "Engagement"],
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

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
  }, [currentScreen]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Handle navigation between screens
  const goToNextScreen = () => {
    if (currentScreen === 1) {
      fadeAnim.setValue(0);
      slideUpAnim.setValue(50);
      setCurrentScreen(2);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    } else {
      router.push("/(tabs)");
    }
  };

  const skipToApp = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          top: height * 0.25,
          left: -30,
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: "rgba(198, 124, 78, 0.08)",
          transform: [{ rotate: spin }],
          zIndex: 1,
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          bottom: height * 0.15,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          transform: [{ rotate: spin }],
          zIndex: 1,
        }}
      />

      {/* Skip button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          right: 24,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.15)",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
        }}
        onPress={skipToApp}
      >
        <Text style={{ color: "white" }}>Skip</Text>
      </TouchableOpacity>

      {/* Main content ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }],
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 40,
          }}
        >
          {/* SCREEN 1: Category Introduction */}
          {currentScreen === 1 && (
            <>
              {/* Header with title */}
              <View
                style={{
                  alignItems: "center",
                  marginTop: 40,
                  marginBottom: 30,
                }}
              >
                <MaskedView
                  maskElement={
                    <Text
                      style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 8,
                        fontFamily: "Arial",
                      }}
                    >
                      Endless Possibilities
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={["#FF9966", "#FF5E62", "#C67C4E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text
                      style={{
                        fontSize: 36,
                        opacity: 0,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 8,
                        fontFamily: "Arial",
                      }}
                    >
                      Endless Possibilities
                    </Text>
                  </LinearGradient>
                </MaskedView>

                <Text
                  style={{
                    color: "rgb(209, 213, 219)",
                    textAlign: "center",
                    fontSize: 16,
                    lineHeight: 24,
                    marginBottom: 16,
                    paddingHorizontal: 20,
                  }}
                >
                  Create beautiful invitations for any occasion with our 30+
                  categories
                </Text>
              </View>

              {/* Featured Categories */}
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 16,
                  }}
                >
                  Featured Categories
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {featuredCategories.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        alignItems: "center",
                        width: (width - 80) / 4,
                      }}
                    >
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          backgroundColor: "rgba(255, 87, 87, 0.2)",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Ionicons name={item.icon} size={30} color="#FF5757" />
                      </View>
                      <Text style={{ color: "white", textAlign: "center" }}>
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Category Count */}
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  padding: 20,
                  borderRadius: 16,
                  marginBottom: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FF5757",
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 24 }}
                  >
                    {fullCategories.length}+
                  </Text>
                </View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginBottom: 8,
                  }}
                >
                  Diverse Categories
                </Text>
                <Text
                  style={{
                    color: "rgb(209, 213, 219)",
                    textAlign: "center",
                    lineHeight: 22,
                  }}
                >
                  From celebrations to daily greetings - we have something for
                  everyone, of all ages
                </Text>
              </View>
            </>
          )}

          {/* SCREEN 2: How It Works & Category Groups */}
          {currentScreen === 2 && (
            <>
              {/* How It Works Section */}
              <View style={{ marginTop: 30, marginBottom: 30 }}>
                <MaskedView
                  maskElement={
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 24,
                        fontFamily: "Arial",
                      }}
                    >
                      How It Works
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={["#FF9966", "#FF5E62", "#C67C4E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text
                      style={{
                        fontSize: 32,
                        opacity: 0,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 24,
                        fontFamily: "Arial",
                      }}
                    >
                      How It Works
                    </Text>
                  </LinearGradient>
                </MaskedView>

                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    padding: 24,
                    borderRadius: 16,
                    marginBottom: 20,
                  }}
                >
                  {[1, 2, 3].map((step) => (
                    <View
                      key={step}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: step < 3 ? 20 : 0,
                      }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: "#FF5757",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 16,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          {step}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 4,
                          }}
                        >
                          {step === 1
                            ? "Select a category"
                            : step === 2
                            ? "Answer simple questions"
                            : "Get your AI design"}
                        </Text>
                        <Text
                          style={{ color: "rgb(209, 213, 219)", fontSize: 14 }}
                        >
                          {step === 1
                            ? "Choose from our wide range of categories"
                            : step === 2
                            ? "Tell us about your event or message"
                            : "Your perfect invitation is generated instantly"}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Category Groups - Simplified */}
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 16,
                  }}
                >
                  Explore Categories
                </Text>

                {categoryGroups.map((group, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 12,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: "#FF5757",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                        }}
                      >
                        <Ionicons name={group.icon} size={20} color="#fff" />
                      </View>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {group.title}
                      </Text>
                    </View>
                    <Text
                      style={{ color: "rgb(209, 213, 219)", marginBottom: 10 }}
                    >
                      {group.description}
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {group.examples.map((category, idx) => (
                        <View
                          key={idx}
                          style={{
                            backgroundColor: "rgba(255, 87, 87, 0.2)",
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 12,
                            marginRight: 8,
                            marginBottom: 4,
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 12 }}>
                            {category}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Bottom section with CTA and pagination */}
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={goToNextScreen}
              activeOpacity={0.8}
              style={{ marginBottom: 20 }}
            >
              <LinearGradient
                colors={["#FF5757", "#FF5E62", "#FF9966"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                >
                  {currentScreen === 1 ? "Next" : "Get Started"} →
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Pagination dots */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: currentScreen === 1 ? 24 : 8,
                  height: 8,
                  backgroundColor:
                    currentScreen === 1 ? "#FF5757" : "rgb(156, 163, 175)",
                  borderRadius: 4,
                  marginHorizontal: 4,
                }}
              />
              <View
                style={{
                  width: currentScreen === 2 ? 24 : 8,
                  height: 8,
                  backgroundColor:
                    currentScreen === 2 ? "#FF5757" : "rgb(156, 163, 175)",
                  borderRadius: 4,
                  marginHorizontal: 4,
                }}
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
