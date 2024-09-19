import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../Icon";
import { Container, DisplayFlex, StyledText } from "../styledComponents";
import COLORS from "../../constant/colors";

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
        <Container borderRadius="24px" padding="10px" flex={1} flexDirection="column" bgColor={COLORS.DARK_GREEN}>
            <View className="flex flex-row justify-between py-5 px-3">
                <View className="">
                    <StyledText color="white" fontSize="24px" fontWeight="bold">Total Balance</StyledText>
                    <StyledText color="white" fontSize="30px" fontWeight="bold">$ {formatNumber(totalBalance)}</StyledText>
                </View>
                <TouchableOpacity className="">
                    <Icon name="EllipsisHorizontalIcon" color="white" type="solid" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between px-3 py-3">
                <View className="flex items-start">
                    <View className="flex flex-row my-2">
                        <View style={styles.backgroudColor} className="w-6 h-6 rounded-full flex items-center mr-2 justify-center">
                            <Icon name="ArrowDownIcon" color="white" type="solid" size={14} />
                        </View>
                        <StyledText color="white">Income</StyledText>
                    </View>
                    <StyledText color="white" fontWeight="bold" fontSize="20px">$ {formatNumber(income)}</StyledText>
                </View>
                <View className="flex items-end">
                    <View className="flex flex-row my-2">
                        <View style={styles.backgroudColor} className="w-6 h-6 rounded-full flex items-center mx-2 justify-center">
                            <Icon name="ArrowUpIcon" color="white" type="solid" size={14} />
                        </View>
                        <StyledText color="white">Expenses</StyledText>
                    </View>
                    <StyledText color="white" fontWeight="bold" fontSize="20px">$ {formatNumber(expense)}</StyledText>
                </View>
            </View>
        </Container>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({
    backgroudColor: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
});
