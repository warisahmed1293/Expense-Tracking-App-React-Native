/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react";
import { View, Animated, TouchableOpacity, Text } from "react-native";

const AnimatedTopButton: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;

    const buttons = ["Day", "Week", "Month", "Year"];

    const handlePress = (index: number) => {
        setActiveIndex(index);
        Animated.spring(translateX, {
            toValue: index * 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View className="relative flex-row justify-center items-center">
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: 80,
                    height: "100%",
                    backgroundColor: "#438883",
                    transform: [{ translateX }],
                    borderRadius: 15,
                }}
            />
            {buttons.map((buttonLabel, index) => (
                <TouchableOpacity
                    key={buttonLabel}
                    onPress={() => handlePress(index)}
                    className="rounded-lg justify-center items-center py-2 px-4 mx-3"
                >
                    <Text
                        className={`text-lg ${activeIndex === index ? "text-white" : "text-gray-600"
                            }`}
                    >
                        {buttonLabel}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default AnimatedTopButton;
