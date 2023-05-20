import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return "Please enter valid email address";
    if (!re.test(email)) return "Please enter valid email address";

    return "";
  };

  const passwordValidator = (password) => {
    if (!password || password.length <= 0) return "Please enter valid password";

    return "";
  };

  const onProceed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    } else if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      navigation.replace("Home");

      // await AsyncStorage.setItem('user', mobileNo?.value);
    }
  };
  return (
    <View style={{ marginTop: 30, flex: 1 }}>
      <TextInput
        placeholder="Enter Email"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 5,
          paddingLeft: 10,
        }}
      />

      {email.error ? (
        <Text style={{ marginTop: 10, paddingLeft: 10, color: "red" }}>
          {email.error}
        </Text>
      ) : null}
      <TextInput
        placeholder="Enter Password"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 5,
          paddingLeft: 10,
        }}
      />

      {password.error ? (
        <Text style={{ marginTop: 10, paddingLeft: 10, color: "red" }}>
          {password.error}
        </Text>
      ) : null}
      <TouchableOpacity
        style={{
          backgroundColor: "#0275d8",
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 5,
        }}
        onPress={() => onProceed()}
        activeOpacity={0.7}
      >
        <Text
          style={{
            color: "#fff",
            alignSelf: "center",
            paddingVertical: 10,
          }}
        >
          {" "}
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
