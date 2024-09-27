import React from "react";
import { ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import { DisplayFlex, StyledText } from "../../components/styledComponents";
import { useHomeScreenLogic } from ".";
import Icon from "../../components/Icon";
import BalanceCard from "../../components/HomeScreen/BalanceCard";
import TransactionsHistory from "../../components/HomeScreen/TransactionsHistory";
import SendAgainTransictions from "../../components/HomeScreen/SendAgainTransictions";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { userName, income, expense, totalBalance, greeting } = useHomeScreenLogic();

    const [hasNotification] = React.useState<boolean>(true);
    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
            <DisplayFlex flex={1} direction="column" justifyContent="space-between">
                <ImageBackground
                    source={require("../../assets/top_section.png")}
                    resizeMode="cover"
                    className="w-full h-[275px]"
                >
                    <DisplayFlex
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className="bottom-28"
                    >
                        <View className="top-14 ml-5">
                            <StyledText fontSize="18px" color="white">
                                {greeting},
                            </StyledText>
                            <StyledText fontSize="26px" fontWeight="bold" color="white">
                                {userName || "User"}
                            </StyledText>
                        </View>

                        <TouchableOpacity
                            className="relative bg-[#ffffff3a] w-10 h-10 items-center justify-center rounded-xl top-14 mr-5 p-7"
                        >
                            <Icon name="BellIcon" color="white" size={34} type="outline" />
                            {hasNotification && (
                                <View className="absolute top-3 right-3 w-3 h-3 bg-[#FFAB7B] rounded-full" />
                            )}
                        </TouchableOpacity>
                    </DisplayFlex>
                </ImageBackground>
                <View className="absolute bottom-[-70] w-[100%] px-5">
                    <BalanceCard totalBalance={totalBalance} income={income} expense={expense} />
                </View>
            </DisplayFlex>
            <View className="px-5 top-24">
                <TransactionsHistory navigation={navigation} />
            </View>
            <View className="px-5 top-24 pb-28">
                <SendAgainTransictions />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
