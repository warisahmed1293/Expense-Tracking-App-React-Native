import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import InputField from "../components/InputField";
import { StyledText } from "../components/styledComponents";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
      });
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      let profileImageUrl = null;
      if (profileImageUri) {
        const reference = storage().ref(`profile_pictures/${user.uid}`);
        await reference.putFile(profileImageUri);
        profileImageUrl = await reference.getDownloadURL();
      }

      await firestore().collection("users").doc(user.uid).set({
        name,
        email,
        profileImageUrl,
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
    } finally {
      setLoading(false);
    }
  };


  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('Image Picker Error: ', response.errorMessage);
      } else {
        setProfileImageUri(response.assets?.[0].uri || null);
      }
    });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '327304051789-3mbatsbqrg62ev3fcp0efgoh9c84misb.apps.googleusercontent.com',
    });
  }, []);
  const captureImageFromCamera = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.error('Camera Error: ', response.errorMessage);
      } else {
        setProfileImageUri(response.assets?.[0].uri || null);
      }
    });
  };
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const userCredential = await auth().signInWithCredential(
        auth.GoogleAuthProvider.credential(userInfo.idToken)
      );

      const user = userCredential.user;
      const profileImageUrl = userInfo.user.photo;

      await firestore().collection("users").doc(user.uid).set({
        name: userInfo.user.name,
        email: userInfo.user.email,
        profileImageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User registered successfully with Google!",
      });

      setTimeout(() => {
        navigation.navigate("Home");
      }, 1300);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (error as Error).message,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <InputField placeholder="Name" value={name} onChangeText={setName} autoCapitalize="words" />
      <View className="my-3" />

      <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <View className="my-3" />

      <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View className="my-3" />

      <TouchableOpacity style={styles.uploadButton} onPress={pickImageFromGallery}>
        <StyledText className="text-center text-[16px] text-gray-700">Pick Image from Gallery</StyledText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={captureImageFromCamera}>
        <StyledText className="text-center text-[16px] text-gray-700">Capture Image from Camera</StyledText>
      </TouchableOpacity>

      {profileImageUri && (
        <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
      )}

      <TouchableOpacity
        className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
        onPress={handleRegister}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-center text-[20px] text-white font-bold">Register</StyledText>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
        onPress={handleGoogleSignIn}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-center text-[20px] text-white font-bold">Sign up with Google</StyledText>
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
    justifyContent: "center",
  },
  button: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  uploadButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default RegisterScreen;
