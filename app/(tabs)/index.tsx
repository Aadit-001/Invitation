import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

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


import {COLORS,GRADIENTS} from "../../constants/theme";

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

export default function Home() {
  // States
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const categoryScrollRef = useRef(null);


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


  const featuredTemplates = [
    {
      id: "f1",
      name: "Royal Wedding",
      image: IMAGES.templates.floral,
      featured: true,

      category: "Wedding",

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
      category: "Birthday",

    },
  ];

  // Sample data for invitation templates
  const templates = [

    {
      id: "1",
      name: "Shell Floral",
      image: IMAGES.templates.floral,
      category: "Wedding",
    },
    {
      id: "2",
      name: "Golden Frame",
      image: IMAGES.templates.floral,
      category: "Anniversary",
    },
    {
      id: "3",
      name: "Blue Elegance",
      image: IMAGES.templates.flowers,
      category: "Birthday",
    },
    {
      id: "4",
      name: "Party Lights",
      image: IMAGES.templates.flowers,
      category: "Party",
    },
    {
      id: "5",
      name: "Rustic Wedding",
      image: IMAGES.templates.floral,
      category: "Wedding",
    },
    {
      id: "6",
      name: "Baby Shower",
      image: IMAGES.templates.floral,
      category: "Baby Shower",
    },
    {
      id: "7",
      name: "Festival Theme",
      image: IMAGES.templates.floral,
      category: "Festival",
    },
    {
      id: "8",
      name: "Corporate Event",
      image: IMAGES.templates.flowers,
      category: "Corporate",
    },

  ];

  // Event categories
  const categories = [
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

  // Scroll to selected category
  useEffect(() => {
    if (categoryScrollRef.current) {
      const itemWidth = 140; // Approximate width of each category item
      const position = selectedCategoryIndex * itemWidth;
      const offset = width / 2 - itemWidth / 2; // Center the selected item

      categoryScrollRef.current.scrollTo({
        x: Math.max(0, position - offset),
        animated: true,
      });
    }
  }, [selectedCategoryIndex]);

  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories);
      setIsSearching(false);
    } else {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
      setIsSearching(true);
    }
  }, [searchQuery]);

  // Filter ONLY regular templates based on selected category and search query
  useEffect(() => {
    const selectedCategory = categories[selectedCategoryIndex];

    // Filter templates
    let templatesResult = templates;

    // Apply category filter
    if (selectedCategory !== "All") {
      templatesResult = templatesResult.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Apply search filter to templates (optional)
    if (searchQuery && !isSearching) {
      const lowercasedQuery = searchQuery.toLowerCase();
      templatesResult = templatesResult.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedQuery) ||
          item.category.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredTemplates(templatesResult);
  }, [selectedCategoryIndex, searchQuery, isSearching]);

  // Initialize filtered data
  useEffect(() => {
    setFilteredTemplates(templates);
    setFilteredCategories(categories);
  }, []);

  // Clear search and reset filters
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerDark} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Enhanced Header Section */}
        <LinearGradient

          colors={GRADIENTS.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ paddingTop: 48, paddingBottom: 96 }}
        >
          {/* Greeting and User */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 24,
            }}
          >
            <View>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>
                Welcome back
              </Text>
              <Text
                style={{
                  color: COLORS.textLight,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Tejas 👋
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: COLORS.uiDark,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={COLORS.primary}

              />
            </TouchableOpacity>
          </View>

          {/* Improved Search bar and filter */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.uiDark,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flex: 1,
                marginRight: 12,
                borderWidth: 1,
                borderColor: COLORS.uiDarkBorder,
              }}
            >
              <Ionicons name="search" size={20} color={COLORS.primary} />
              <TextInput
                placeholder="Search for categories..."
                placeholderTextColor={COLORS.textGrey}
                style={{ marginLeft: 8, color: COLORS.textLight, flex: 1 }}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <Ionicons name="close-circle" size={20} color="#777" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="options-outline"
                size={22}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>

          {/* Enhanced AI Magic banner with gradient - only show when not searching */}
          {!isSearching && searchQuery.trim() === "" && (
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                marginHorizontal: 16,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  animateButton();
                  router.push("/ai");
                }}
              >
                <LinearGradient
                  colors={GRADIENTS.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    padding: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.accent,
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 999,
                      alignSelf: "flex-start",
                      marginBottom: 12,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                  >
                    <Text
                      style={{ color: COLORS.textLight, fontWeight: "600" }}
                    >
                      ✨ Try AI Feature →
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: COLORS.textLight,
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    You IMAGINE. AI Designs.
                  </Text>
                  <Text
                    style={{
                      color: COLORS.textLight,
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    TOGETHER, IT'S PERFECT
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", marginRight: -8 }}>
                      {[1, 2, 4].map((i) => (
                        <View
                          key={i}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            backgroundColor: "rgba(255,255,255,0.2)",
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.4)",
                            marginRight: -10,
                          }}
                        />
                      ))}
                    </View>
                    <Text
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        marginLeft: 20,
                        marginTop: 6,
                        fontSize: 14,
                      }}
                    >
                      +1K users tried today
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </LinearGradient>

        {/* Main Content Section */}
        <View
          style={{
            backgroundColor: COLORS.backgroundLight,
            flex: 1,
            marginTop: -64,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 16,
            paddingTop: 24,
          }}
        >
          {/* Featured Templates Section */}
          {!isSearching && (
            <View style={{ marginBottom: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    color: COLORS.textDark,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Featured Templates
                </Text>
                <TouchableOpacity>
                  <Text style={{ color: COLORS.primary, fontSize: 14 }}>
                    See All
                  </Text>
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
                        style={{
                          backgroundColor: COLORS.backgroundLight,
                          borderRadius: 12,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 8,
                          elevation: 3,
                          overflow: "hidden",
                        }}
                        activeOpacity={0.9}
                      >
                        <Image
                          source={template.image}
                          style={{ width: "100%", height: 180 }}
                          resizeMode="cover"
                        />
                        <LinearGradient
                          colors={["transparent", "rgba(0,0,0,0.7)"]}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 16,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: COLORS.primary,
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              borderRadius: 4,
                              alignSelf: "flex-start",
                              marginBottom: 4,
                              opacity: 0.9,
                            }}
                          >
                            <Text
                              style={{
                                color: COLORS.textLight,
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              FEATURED
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: COLORS.textLight,
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {template.name}
                          </Text>
                          <Text
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: 14,
                            }}
                          >
                            {template.category}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Category Title */}
          <View style={{ marginBottom: 12, paddingHorizontal: 4 }}>
            <Text
              style={{
                color: COLORS.textDark,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {isSearching ? "Search Results" : "Categories"}
            </Text>
            {isSearching && (
              <Text style={{ color: "#777", fontSize: 14, marginTop: 4 }}>
                Found {filteredCategories.length} categories matching "
                {searchQuery}"
              </Text>
            )}
          </View>

          {/* Improved Category filters with icons */}
          <View style={{ marginBottom: 24 }}>
            {isSearching ? (
              // Grid view for search results
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginHorizontal: 4,
                  justifyContent: "flex-start",
                }}
              >
                {filteredCategories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const newIndex = categories.findIndex(
                        (c) => c === category
                      );
                      setSelectedCategoryIndex(newIndex);
                      setSearchQuery("");
                      setIsSearching(false);
                    }}
                    style={{ marginBottom: 8, elevation: 2 }}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={GRADIENTS.categoryNormal}
                      style={{
                        borderRadius: 999,
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                      }}
                    >
                      <Ionicons
                        name={categoryIcons[category] || "albums"}
                        size={18}
                        color={COLORS.primary}
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={{
                          color: COLORS.textDark,
                          fontWeight: "500",
                          fontSize: 15,
                        }}
                      >
                        {category}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              // Horizontal ScrollView for normal browsing
              <ScrollView
                ref={categoryScrollRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                }}
                style={{ flexGrow: 0 }}
                nestedScrollEnabled={true}
              >
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedCategoryIndex(index)}
                    style={{
                      marginHorizontal: 6,
                      marginBottom: 6,
                      elevation: index === selectedCategoryIndex ? 4 : 1,
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={
                        index === selectedCategoryIndex
                          ? GRADIENTS.categorySelected
                          : GRADIENTS.categoryNormal
                      }
                      style={{
                        borderRadius: 999,
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                      }}
                    >
                      <Ionicons
                        name={categoryIcons[category] || "albums"}
                        size={18}
                        color={
                          index === selectedCategoryIndex
                            ? COLORS.textLight
                            : COLORS.primary
                        }
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={{
                          color:
                            index === selectedCategoryIndex
                              ? COLORS.textLight
                              : COLORS.textDark,
                          fontWeight:
                            index === selectedCategoryIndex ? "bold" : "500",
                          fontSize: 15,
                        }}
                      >
                        {category}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Templates grid if not in search mode */}
          {!isSearching && (
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  color: COLORS.textDark,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 12,
                  paddingHorizontal: 4,
                }}
              >
                {categories[selectedCategoryIndex]} Templates
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {filteredTemplates.map((template, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ width: "48%", marginBottom: 16 }}
                    activeOpacity={0.9}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.backgroundLight,
                        borderRadius: 12,
                        overflow: "hidden",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                        borderWidth: 1,
                        borderColor: COLORS.cardBorder,
                      }}
                    >
                      <Image
                        source={template.image}
                        style={{ width: "100%", height: 180 }}
                        resizeMode="cover"
                      />
                      <View style={{ padding: 8 }}>
                        <Text
                          style={{
                            color: COLORS.textDark,
                            fontWeight: "500",
                            fontSize: 15,
                          }}
                        >
                          {template.name}
                        </Text>
                        <Text style={{ color: "#777", fontSize: 12 }}>
                          {template.category}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 4,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              name="eye-outline"
                              size={14}
                              color="#999"
                            />
                            <Text
                              style={{
                                color: "#777",
                                fontSize: 12,
                                marginLeft: 4,
                              }}
                            >
                              2.3k
                            </Text>
                          </View>
                          <TouchableOpacity style={{ padding: 4 }}>
                            <Ionicons
                              name="heart-outline"
                              size={16}
                              color={COLORS.accent}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* No templates found message */}
          {!isSearching && filteredTemplates.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                marginTop: 20,
              }}
            >
              <Ionicons name="search" size={50} color={COLORS.textGrey} />
              <Text
                style={{
                  color: COLORS.textDark,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 16,
                }}
              >
                No templates found
              </Text>
              <Text
                style={{
                  color: COLORS.textGrey,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                We couldn't find any templates in the "
                {categories[selectedCategoryIndex]}" category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
