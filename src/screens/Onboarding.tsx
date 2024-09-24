import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bgScreen, menImage } from "../constant/images";
import { NavigationProp } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from "react-native-reanimated";
import { StyledText } from '../components/styledComponents';

type OnboardingProps = {
    navigation: NavigationProp<any>;
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
    const translateY = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        translateY.value = withRepeat(
            withSequence(
                withTiming(-15, { duration: 1000 }),
                withTiming(15, { duration: 1000 })
            ),
            -1,
            true
        );
    }, []);

    return (
        <View className="flex-1 bg-white">
            <ImageBackground source={bgScreen} resizeMode="contain" className="flex-1 justify-center items-center">
                <Animated.View style={animatedStyle}>
                    <Image source={menImage} resizeMode="contain" className="w-72" />
                </Animated.View>
            </ImageBackground>
            <View>
                <Text className="text-TEXT_GREEN text-[36px] self-center text-center font-black px-14 my-4">Spend Smarter Save More</Text>
            </View>
            <TouchableOpacity
                className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
                onPress={() => navigation.navigate("Signup")}
                style={styles.button}
            >
                <StyledText className="text-center" color='white' fontWeight="bold" fontSize="24px">
                    Sign up
                </StyledText>
            </TouchableOpacity>
            <Text className="text-PRIMARY_GREY self-center my-8">
                Already have an account? <Text onPress={() => navigation.navigate("Signin")} className="text-TEXT_GREEN font-bold">Log In</Text>
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
