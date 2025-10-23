import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function InvitationScreen() {
  const { imageUrl, category, prompt } = useLocalSearchParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const downloadImage = async () => {
    try {
      setSaving(true);
      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        alert("Sorry, we need media library permissions to save the image!");
        setSaving(false);
        return;
      }

      // Download the image
      const fileUri = `${
        FileSystem.documentDirectory
      }invitation-${Date.now()}.jpg`;
      const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      alert("Invitation saved to gallery!");
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Failed to save invitation");
    } finally {
      setSaving(false);
    }
  };

  const shareImage = async () => {
    try {
      // First download the image locally
      const fileUri = `${
        FileSystem.cacheDirectory
      }temp-invitation-${Date.now()}.jpg`;
      await FileSystem.downloadAsync(imageUrl, fileUri);

      // Then share it
      await Share.share({
        url: fileUri,
        title: `My ${category} Invitation`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share invitation");
    }
  };

  return (
    <View className="flex-1 bg-white pt-12">
      <View className="flex-row items-center justify-between px-6 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#262626" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#262626]">
          Your Invitation
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="flex-1 px-4">
        <View className="bg-white rounded-3xl shadow-md overflow-hidden">
          {loading && (
            <View className="absolute z-10 w-full h-full justify-center items-center bg-black/10">
              <ActivityIndicator size="large" color="#C67C4E" />
            </View>
          )}
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-80 rounded-t-3xl"
            resizeMode="cover"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          <View className="p-4">
            <Text className="text-lg font-bold text-[#262626] mb-2">
              {category} Invitation
            </Text>
            <Text className="text-sm text-gray-500 mb-4">
              Generated based on your inputs
            </Text>
          </View>
        </View>

        <View className="flex-row justify-around my-6">
          <TouchableOpacity
            onPress={downloadImage}
            disabled={saving}
            className="bg-[#C67C4E] px-8 py-3 rounded-xl flex-row items-center"
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="download" size={20} color="#fff" />
                <Text className="text-white font-bold ml-2">Save</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={shareImage}
            className="bg-[#4267B2] px-8 py-3 rounded-xl flex-row items-center"
          >
            <Ionicons name="share-social" size={20} color="#fff" />
            <Text className="text-white font-bold ml-2">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
