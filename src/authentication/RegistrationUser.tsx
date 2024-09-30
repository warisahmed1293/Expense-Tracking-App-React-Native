import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import InputField from "../components/InputField";
import { StyledText } from "../components/styledComponents";
import Toast from "react-native-toast-message";
import {
  handleRegister,
  pickImageFromGallery,
  captureImageFromCamera,
  handleGoogleSignIn,
  configureGoogleSignIn
} from './registration';
import Icon from '../components/Icon';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);



  const handleRegisterButton = () => {
    setLoading(true);
    handleRegister(name, email, password, profileImageUri, navigation).finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <InputField placeholder="Name" value={name} onChangeText={setName} autoCapitalize="words" />
      <View className="my-3" />

      <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <View className="my-3" />

      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View className="my-3" />

      <TouchableOpacity
        className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
        onPress={handleRegisterButton}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-center text-[20px] text-white font-bold">Register</StyledText>
        )}
      </TouchableOpacity>
      <StyledText className='text-center text-[16px] text-gray-700 mt-5' fontWeight='bold'>
        or
      </StyledText>

      <TouchableOpacity
        className="bg-white py-[16px] w-[70%] rounded-xl self-center justify-around items-center flex-row mt-5"
        onPress={() => handleGoogleSignIn(navigation)}
        style={styles.button}
      >
        <Image source={{ uri: 'https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000' }} className="w-[25px] h-[25px]" />

        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-center text-[18px] text-black font-normal">Sign up with Google</StyledText>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-[#3F51B5] py-[16px]  w-[70%] rounded-xl self-center justify-around items-center flex-row mt-5"
        onPress={() => handleGoogleSignIn(navigation)}
        style={styles.button}
      >
        <Image source={{ uri: 'https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF' }} className="w-[25px] h-[25px]" />

        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-center text-[18px] text-white font-normal">Sign up with Facebook</StyledText>
        )}
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 150,
    backgroundColor: "#fff",
  },
  button: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  touchable: {
    width: "75%",
    borderColor: "gray",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});

export default RegisterScreen;
