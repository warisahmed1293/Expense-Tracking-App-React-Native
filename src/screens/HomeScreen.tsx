import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";
import BalanceCard from "../components/HomeScreen/BalanceCard";
import { DisplayFlex, StyledText } from "../components/styledComponents";
import TransactionsHistory from "../components/HomeScreen/TransactionsHistory";
import SendAgainTransictions from "../components/HomeScreen/SendAgainTransictions";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";


const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour <= 11) {
        return "Good Morning";
    } else if (currentHour >= 11 && currentHour <= 15) {
        return "Good Afternoon";
    } else if (currentHour >= 15 && currentHour <= 19) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
};

const HomeScreen: React.FC<{ route: any }> = ({ }) => {
    const [userName, setUserName] = useState<string>("");
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth().currentUser;
            if (user) {
                const userDoc = await firestore().collection("users").doc(user.uid).get();
                if (userDoc.exists) {
                    setUserName(userDoc.data()?.name);
                }
            }
        };

        fetchUserData();
    }, []);

    const [hasNotification] = useState<boolean>(true);
    const greeting: string = getGreeting();

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
                <DisplayFlex flex={1} direction="column" justifyContent="space-between" >
                    <ImageBackground
                        source={require("../assets/top_section.png")}
                        resizeMode="cover"
                        className="w-full h-[275px]"
                    >
                        <DisplayFlex
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="bottom-32"
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
                    <View className="absolute bottom-[-60] w-[100%] px-5 ">
                        <BalanceCard totalBalance={2548} income={1840} expense={284} />
                    </View>
                </DisplayFlex>
                <View className="px-5 top-24">
                    <TransactionsHistory />
                </View>
                <View className="px-5 top-24 pb-28">
                    <SendAgainTransictions />
                </View>
            </ScrollView>
        </>
    );
};

export default HomeScreen;
