import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";

const Screen1 = ({ navigation }) => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBooks(currentPage).then((data) => setUsers(data));
  }, []);

  const fetchBooks = async (page) => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const newData = await fetchBooks(nextPage);
    setCurrentPage(nextPage);
    setIsLoading(false);
    setUsers((prevData) => [...prevData, ...newData]);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          backgroundColor: "white",
          marginBottom: 15,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View style={{ height: 100, width: 100 }}>
          <Image
            source={{ uri: item.avatar }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <View style={{ marginLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 18 }}>{item.first_name}</Text>
          <Text style={{ fontSize: 14 }}>{item.last_name}</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "mailto:support@example.com?subject=SendMail&body=Description"
              )
            }
          >
            <Text style={{ fontSize: 14 }}>{item.email}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ marginTop: 15, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f1f1f" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={users}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 10 }}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
