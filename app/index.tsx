import { Link } from "expo-router";
import { Text, View } from "react-native";
import "./global.css";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      style={{ padding: 20 }}
    >
      <Link href="/(tabs)/home">
        <Text className="text-red-500 text-2xl font-bold ">Onboarding </Text>
      </Link>
    </View>
  );
}
