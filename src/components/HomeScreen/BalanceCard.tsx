import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Text";
import Icon from "../Icon";

const BalanceCard = () => {
    return (
        <View className="bg-DARK_GREEN w-[335px] h-[225px] flex-1 flex-row justify-between items-start rounded-3xl ">
            <View className="flex flex-col justify-between py-5 px-2">
                <View className="flex items-center">
                    <Text className="text-white text-2xl">Total Balance</Text>
                    <Text className="text-white text-4xl font-bold">$ 2,548.00</Text>
                </View>
                <View className="flex items-center">
                    <View className="flex items-center">
                        <Icon name="ArrowDownIcon" className="text-white w-6 h-6" type="solid" />
                        <Text className="text-white text-base ml-2">Income</Text>
                    </View>
                    <Text className="text-white text-3xl font-bold">$ 1,840.00</Text>
                </View>
            </View>
            <View className="flex flex-col justify-between py-5 px-4">
                <View className="flex items-center">
                    <Icon name="EllipsisHorizontalIcon" className="text-white w-8 h-8" type="solid" />
                </View>
                <View className="flex items-center">
                    <View className="flex items-center">
                        <Icon name="ArrowUpIcon" className="text-white w-6 h-6" type="solid" />
                        <Text className="text-white text-base ml-2">Expenses</Text>
                    </View>
                    <Text className="text-white text-2xl font-bold">$ 284.00</Text>
                </View>
            </View>
        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({});