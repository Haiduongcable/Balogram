import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "./core/theme";

const { width } = Dimensions.get("window");
const defaultAvatar = require("../images/avatar/4.jpg");

export default function ItemComment({ item }) {
  const avatarSource = item.user?.avatar ? { uri: item.user.avatar } : defaultAvatar;
  
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={avatarSource} style={styles.avatar} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.bubble}>
          <Text style={styles.username}>{item.user?.username || 'Anonymous'}</Text>
          <Text style={styles.comment}>{item.content}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatarContainer: {
    marginRight: 12,
    paddingTop: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
  },
  contentContainer: {
    flex: 1,
  },
  bubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.primary || '#007AFF',
    marginBottom: 2,
  },
  comment: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
});
