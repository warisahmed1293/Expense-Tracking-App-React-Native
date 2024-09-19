import { StyleSheet, View } from "react-native";
import React from "react";
import Icon from "../Icon";
import { StyledText } from "../styledComponents";

interface BalanceCardProps {
    totalBalance: number;
    income: number;
    expense: number;
}

const formatNumber = (value: number) => {
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const BalanceCard = ({ totalBalance, income, expense }: BalanceCardProps) => {
    return (
        <View className="bg-DARK_GREEN w-[335px] h-[225px] flex-1 flex-row justify-between items-start rounded-3xl">
            <View className="flex flex-col justify-between py-5 px-2">
                <View className="">
                    <StyledText color="white" fontSize="24px" fontWeight="bold">Total Balance</StyledText>
                    <StyledText color="white" fontSize="30px" fontWeight="bold">{formatNumber(totalBalance)}</StyledText>
                </View>
                <View className="">
                    <View className="">
                        <View style={styles.backgroudColor} className="w-8 h-8 rounded-full flex items-center justify-center">
                            <Icon name="ArrowDownIcon" color="white" type="solid" size={18} />
                        </View>
                        <StyledText color="white">Income</StyledText>
                    </View>
                    <StyledText color="white" fontWeight="bold" fontSize="20px">{formatNumber(income)}</StyledText>
                </View>
            </View>
            <View className="flex flex-col justify-between py-5 px-4">
                <View className="flex items-center">
                    <Icon name="EllipsisHorizontalIcon" color="white" type="solid" />
                </View>
                <View className="flex items-center">
                    <View className="flex items-center">
                        <View style={styles.backgroudColor} className="w-8 h-8 rounded-full flex items-center justify-center">
                            <Icon name="ArrowUpIcon" color="white" type="solid" size={18} />
                        </View>
                        <StyledText color="white">Expenses</StyledText>
                    </View>
                    <StyledText color="white" fontWeight="bold" fontSize="20px">{formatNumber(expense)}</StyledText>
                </View>
            </View>
        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({
    backgroudColor: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
});
