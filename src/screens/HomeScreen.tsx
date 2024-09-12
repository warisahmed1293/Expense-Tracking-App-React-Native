import React, { useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import DisplayFlex from "../components/DisplayFlex";
import Container from "../components/Container";
import Text from "../components/Text";
import Icon from "../components/Icon";
import BalanceCard from "../components/HomeScreen/BalanceCard";

const HomeScreen = () => {
    const [hasNotification, setHasNotification] = useState(true);

    return (
        <>
            <ScrollView>
                <DisplayFlex>
                    <ImageBackground source={require("../assets/top_section.png")} resizeMode="cover" className="w-full h-[275px]">
                        <DisplayFlex direction="row" align="center" justify="space-between">
                            <View className="top-14 ml-5">
                                <Text fontSize="18px" color="white">
                                    Good Morning,
                                </Text>
                                <Text fontSize="26px" fontWeight="bold" color="white">
                                    Enjelin Morgeana
                                </Text>
                            </View>

                            <View className="relative bg-[#ffffff3a] w-10 h-10 items-center justify-center rounded-xl top-14 mr-5 p-7">
                                <Icon name="BellIcon" color="white" size={34} type="outline" />
                                {hasNotification && <View className="absolute top-3 right-3 w-3 h-3 bg-[#FFAB7B] rounded-full" />}
                            </View>
                        </DisplayFlex>
                    </ImageBackground>
                </DisplayFlex>
                <BalanceCard />
            </ScrollView>
        </>
    );
};

export default HomeScreen;
