import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import InputField from "../components/InputField";
import { StyledText } from "../components/styledComponents";
import Toast from "react-native-toast-message";

const SignInScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

    const handleSignIn = async () => {
        if (email.trim() === "" || password.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter both email and password",
            });
            return;
        }
        setIsSigningIn(true);
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const userName = user.displayName || "User";

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "User signed in successfully!",
            });
            setTimeout(() => {
                navigation.navigate("Navigation", { screen: "Home", params: { userName } });
            }, 1300);
            console.log(user, userName);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Invalid email or password",
            });
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <View style={styles.container}>
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
            <TouchableOpacity
                className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
                onPress={handleSignIn}
                style={styles.button}
                disabled={isSigningIn}
            >
                {isSigningIn ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <StyledText className="text-center text-[20px] text-white font-bold">
                        Sign In
                    </StyledText>
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
});

export default SignInScreen;
