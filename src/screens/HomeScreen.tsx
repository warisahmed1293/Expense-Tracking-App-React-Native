import React, { useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";
import BalanceCard from "../components/HomeScreen/BalanceCard";
import { DisplayFlex, StyledText } from "../components/styledComponents";

const HomeScreen = () => {
    const [hasNotification, setHasNotification] = useState(true);

    return (
        <>
            <ScrollView>
                <DisplayFlex>
                    <ImageBackground source={require("../assets/top_section.png")} resizeMode="cover" className="w-full h-[275px]">
                        <View className="top-14 ml-5">
                            <StyledText fontSize="18px" color="white">
                                Good Morning,
                            </StyledText>
                            <StyledText fontSize="26px" fontWeight="bold" color="white">
                                Enjelin Morgeana
                            </StyledText>
                        </View>

                        <TouchableOpacity className="relative bg-[#ffffff3a] w-10 h-10 items-center justify-center rounded-xl top-14 mr-5 p-7">
                            <Icon name="BellIcon" color="white" size={34} type="outline" />
                            {hasNotification && <View className="absolute top-3 right-3 w-3 h-3 bg-[#FFAB7B] rounded-full" />}
                        </TouchableOpacity>
                    </ImageBackground>
                </DisplayFlex>
                <BalanceCard totalBalance={2548.00} income={2548.00} expense={2548.55} />
            </ScrollView>
        </>
    );
};

export default HomeScreen;
