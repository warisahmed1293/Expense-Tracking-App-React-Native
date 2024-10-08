import React from "react";
import { ScrollView, View, ImageBackground, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import ExpenseInputCard from "../../components/ExpenseScreen/ExpenseInputCard";
import IncomeInputCard from "../../components/ExpenseScreen/IncomeInputCard";
import TopNavbar from "../../components/TopNavbar";
import { DisplayFlex } from "../../components/styledComponents";
import CustomTabBar from '../../components/ExpenseScreen/CustomTabBar';

type ExpenseStackParamList = {
    ExpenseScreen: undefined;
};

type ExpenseProps = {
    navigation: StackNavigationProp<ExpenseStackParamList, "ExpenseScreen">;
};

const Tab = createMaterialTopTabNavigator();

const ExpenseTab = () => {
    return (
        <ScrollView >
            <ExpenseInputCard />
        </ScrollView>
    );
};

const IncomeTab = () => {
    return (
        <ScrollView>
            <IncomeInputCard />
        </ScrollView>
    );
};

const ExpenseScreen: React.FC<ExpenseProps> = ({ navigation }) => {
    return (
        <ScrollView className='bg-white' >
            <DisplayFlex className="bg-white">
                <ImageBackground
                    source={require("../../assets/top_section.png")}
                    resizeMode="cover"
                    className="w-full h-[275px]"
                >
                    <TopNavbar
                        navigation={navigation}
                        title="Add Transaction"
                        leftIconName="ChevronLeftIcon"
                        rightIconName="EllipsisHorizontalIcon"
                        onRightIconPress={() => console.log("Options pressed!")}
                    />
                </ImageBackground>

                <View className="absolute bg-white w-[350px] h-[650] rounded-3xl py-5 top-28" style={styles.shadow}>
                    <Tab.Navigator
                        tabBar={(props) => <CustomTabBar  {...props} />}
                        initialRouteName="Income"
                        screenOptions={{
                            tabBarIndicatorStyle: { backgroundColor: "transparent" },
                        }}
                    >
                        <Tab.Screen name="Income" component={IncomeTab} />
                        <Tab.Screen name="Expense" component={ExpenseTab} />
                    </Tab.Navigator>
                </View>
            </DisplayFlex>
        </ScrollView>
    );
};

export default ExpenseScreen;
const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 13.16,

        elevation: 20,
    },
});
