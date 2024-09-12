import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Text";
import Icon from "../Icon";

const BalanceCard = () => {
    return (
        <View className="bg-DARK_GREEN w-[335px] h-[225px] flex-1 flex-row justify-between items-start rounded-3xl ">
            <View className="flex-1 my-5 justify-between px-2">
                <View className="flex">
                    <Text color="white" fontSize="22px">
                        Total Balance
                    </Text>
                    <Text color="white" fontSize="32px" fontWeight="700">
                        $ 2,548.00
                    </Text>
                </View>
                <View className="flex">
                    <View className="flex flex-row items-center">
                        <Icon name="ArrowDownIcon" size={24} type="solid" color="white" />
                        <Text color="white" fontSize="18px" className="ml-2">
                            Income
                        </Text>
                    </View>
                    <Text color="white" fontSize="26px" fontWeight="700">
                        $ 1,840.00
                    </Text>
                </View>
            </View>
            <View className="flex my-5 justify-between px-4">
                <View className="flex">
                    <Icon name="EllipsisHorizontalIcon" size={34} type="solid" color="white" />
                </View>
                <View className="flex">
                    <View className="flex flex-row items-center">
                        <Icon name="ArrowUpIcon" size={24} type="solid" color="white" />
                        <Text color="white" fontSize="18px" className="ml-2">
                            Expenses
                        </Text>
                    </View>
                    <Text color="white" fontSize="28px" fontWeight="700">
                        $ 284.00
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({});