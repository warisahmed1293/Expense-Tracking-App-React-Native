import { ImageBackground, ScrollView } from "react-native";
import React from "react";
import { DisplayFlex } from "../components/styledComponents";
import TopNavbar from "../components/TopNavbar";
import { StackNavigationProp } from "@react-navigation/stack";
import ExpenseInputCard from "../components/ExpenseScreen/ExpenseInputCard";

type ExpenseStackParamList = {
    ExpenseScreen: undefined;
};

type ExpenseProps = {
    navigation: StackNavigationProp<ExpenseStackParamList, "ExpenseScreen">;
};

const ExpenseScreen: React.FC<ExpenseProps> = ({ navigation }) => {
    return (
        <ScrollView>
            <DisplayFlex>
                <ImageBackground
                    source={require("../assets/top_section.png")}
                    resizeMode="cover"
                    className="w-full h-[275px]"
                >
                    <TopNavbar
                        navigation={navigation}
                        title="Add Expense"
                        leftIconName="ChevronLeftIcon"
                        rightIconName="EllipsisHorizontalIcon"
                        onRightIconPress={() => console.log("Options pressed!")}
                    />
                </ImageBackground>
                <ExpenseInputCard />
            </DisplayFlex>
        </ScrollView>
    );
};

export default ExpenseScreen;
