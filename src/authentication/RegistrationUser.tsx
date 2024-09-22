import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import InputField from "../components/InputField";
import { StyledText } from "../components/styledComponents";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      const user = userCredential.user;
      await firestore().collection("users").doc(user.uid).set({
        name: name,
        email: email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User registered successfully!",
      });

      setTimeout(() => {
        navigation.navigate("Signin", { displayName: name });
      }, 1300);

    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (error as Error).message,
      });
      console.log(error);

    }
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <View className="my-3" />

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View className="my-3" />

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="my-3" />

      <TouchableOpacity
        className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
        onPress={handleRegister}
        style={styles.button}
      >
        <StyledText className="text-center text-[20px] text-white font-bold">
          Register
        </StyledText>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  button: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
});

export default RegisterScreen;
