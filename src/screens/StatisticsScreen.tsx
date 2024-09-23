import React, { useState } from "react";
import { StyledText } from "../components/styledComponents";
import Icon from "../components/Icon";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import DataChartIncome from "../components/StatisticsScreen/DataChartIncome";
import DataChartExpense from "../components/StatisticsScreen/DataChartExpense";
import GlobalDropdown from "../components/GlobalDropDown";
import TopTransaction from "../components/StatisticsScreen/TopTransaction";
import AnimatedTopButton from "../components/StatisticsScreen/AnimtedTopButtons";

type OnboardingProps = {
    navigation: NavigationProp<any>;
};

const dropdownItems = [
    { id: 1, title: "Expense", icon: "" },
    { id: 2, title: "Income", icon: "" },
];

const StatisticsScreen: React.FC<OnboardingProps> = ({ navigation }) => {
    const [chartType, setChartType] = useState<"income" | "expense">("expense");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [color, setColor] = useState<string>("black");

    const handleSelect = (item: { id: number; title: string }) => {
        const isExpense = item.title.toLowerCase() === "expense";
        setChartType(isExpense ? "expense" : "income");
        setColor(isExpense ? "red" : "green");
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };

    return (
        <>
            <View className="px-3 pt-12 pb-4 bg-white flex-row justify-between items-center">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Icon name="ChevronLeftIcon" type="solid" color="black" size={30} />
                </TouchableOpacity>
                <StyledText color="black" fontWeight="bold">Statistics</StyledText>
                <TouchableOpacity>
                    <Icon name="ArrowDownTrayIcon" type="solid" color="black" size={24} />
                </TouchableOpacity>
            </View>
            <View className="pt-4 pb-5 bg-white">
                <AnimatedTopButton />
            </View>
            <View className="bg-white justify-end items-end">
                <View className="px-5">
                    <GlobalDropdown
                        onSelect={handleSelect}
                        selectedItem={chartType === "expense" ? dropdownItems[0] : dropdownItems[1]}
                        items={dropdownItems}
                        placeholder="Select Category"
                    />
                </View>
                <ScrollView horizontal className="pt-6 pb-4">
                    {chartType === "expense" ? <DataChartExpense /> : <DataChartIncome />}
                </ScrollView>
            </View>
            <View className="bg-white pb-24">
                <View className="flex flex-row justify-between px-3 py-3">
                    <StyledText fontWeight="bold" fontSize="18px" color="black">Top Spending</StyledText>
                    <TouchableOpacity onPress={toggleSortOrder}>
                        <Icon name="ArrowsUpDownIcon" color="black" type="solid" size={24} />
                    </TouchableOpacity>
                </View>
                <TopTransaction transactionType={chartType} sortOrder={sortOrder} color={color} />
            </View>
        </>
    );
};

export default StatisticsScreen;
