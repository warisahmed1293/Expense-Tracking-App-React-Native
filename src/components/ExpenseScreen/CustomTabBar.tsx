import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import COLORS from '../../constant/colors';

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 2 - 20;

const CustomTabBar: React.FC<MaterialTopTabBarProps> = ({ state, descriptors, navigation }) => {
    const translateX = useSharedValue(0);

    React.useEffect(() => {
        translateX.value = withTiming(state.index * TAB_WIDTH, { duration: 300 });
    }, [state.index]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={styles.tabContainer}>
            <View style={styles.tabs}>
                <Animated.View style={[styles.activeIndicator, animatedStyle]} />
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={styles.tabButton}
                        >
                            {typeof label === 'function' ? (
                                label({ focused: isFocused, color: isFocused ? '#fff' : '#999', children: '' })
                            ) : (
                                <Text style={[styles.tabLabel, isFocused && styles.activeLabel]}>{label}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        height: 50,
        margin: 5,
        position: "relative",
    },
    tabs: {
        flexDirection: "row",
        backgroundColor: "#f1f1f1",
        height: 50,
        borderRadius: 30,
        overflow: "hidden",
    },
    activeIndicator: {
        position: "absolute",
        width: TAB_WIDTH,
        height: "100%",
        backgroundColor: COLORS.DARK_GREEN,
        borderRadius: 30,
    },
    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#999",
    },
    activeLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default CustomTabBar;
