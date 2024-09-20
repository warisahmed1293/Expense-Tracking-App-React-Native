import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { bgScreen, menImage } from "../constant/images";
import { NavigationProp } from "@react-navigation/native";

type OnboardingProps = {
    navigation: NavigationProp<any>;
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
    return (
        <View className="flex-1 bg-white">
            <ImageBackground source={bgScreen} resizeMode="contain" className="flex-1 justify-center items-center">
                <Image source={menImage} resizeMode="contain" className="w-72" />
            </ImageBackground>
            <View >
                <Text className="text-TEXT_GREEN text-[36px] self-center text-center font-black px-14 my-4">Spend Smarter Save More</Text>
            </View>
            <TouchableOpacity className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5" onPress={() => navigation.navigate("Navigation")} style={styles.button}>
                <Text className="text-center text-[20px] text-white font-bold">Get Started</Text>
            </TouchableOpacity>

            <Text className="text-PRIMARY_GREY self-center my-8">
                Already have account? <Text onPress={() => navigation.navigate("Auth")} className="text-TEXT_GREEN font-bold">Log In</Text>
            </Text>

        </View>
    );
};
const styles = StyleSheet.create({
    button: {
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
    },
});

export default Onboarding;

