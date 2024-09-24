/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatisticsScreen from "../screens/StatisticsScreen";
import WalletScreen from "../screens/WalletScreen";
import { ICONS } from "../constant/icons";
import Onboarding from "../screens/Onboarding";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../authentication/LoginUser";
import RegisterScreen from "../authentication/RegistrationUser";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ExpenseScreen from '../screens/ExpenseScreen/ExpenseScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomPlusButton: React.FC<{ onPress: (event: GestureResponderEvent) => void }> = ({ onPress }) => (
    <TouchableOpacity style={styles.plusButton} onPress={onPress}>
        <View>
            <Icon type="solid" name="PlusCircleIcon" color="#29756F" size={60} />
        </View>
    </TouchableOpacity>
);


const Navigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    const IconComponent = focused ? ICONS[route.name].solid : ICONS[route.name].outline;
                    return <IconComponent size={size} color={color} />;
                },
                tabBarActiveTintColor: "#29756F",
                tabBarInactiveTintColor: "gray",
                tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="ExpenseScreen" component={ExpenseScreen} options={{
                tabBarButton: (props) => <CustomPlusButton {...props} onPress={props.onPress || (() => { })} />,
            }} />

            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Navigation" component={Navigation} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Signin" component={SignInScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;


const styles = StyleSheet.create({
    plusButton: {
        top: -20,
        justifyContent: "center",
        alignItems: "center",
    },
});
