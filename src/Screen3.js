import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

const Screen3 = ({ navigation }) => {
  return (
    <WebView source={{ uri: "https://reactnative.dev/" }} style={{ flex: 1 }} />
  );
};

export default Screen3;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000025",
  },
  text: {
    color: "#000",
    fontWeight: "700",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#0275d8",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
  },
});
