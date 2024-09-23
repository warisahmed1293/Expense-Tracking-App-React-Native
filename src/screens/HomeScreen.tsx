import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";
import BalanceCard from "../components/HomeScreen/BalanceCard";
import { DisplayFlex, StyledText } from "../components/styledComponents";
import TransactionsHistory from "../components/HomeScreen/TransactionsHistory";
import SendAgainTransictions from "../components/HomeScreen/SendAgainTransictions";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

interface Transaction {
    amount: string;
    date: string;
    fileName: string | null;
    id: string;
    transactionHolder: string;
    type: "income" | "expense";
}

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

const HomeScreen: React.FC<{ route: any }> = () => {
    const [userName, setUserName] = useState<string>("");
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

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

        const unsubscribeFromTransactions = () => {
            const user = auth().currentUser;

            if (!user) {
                console.log("User not authenticated.");
                setLoading(true);
                return;
            }

            const userDocRef = firestore().collection("transactions").doc(user.uid);
            return userDocRef.onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    let totalIncome = 0;
                    let totalExpense = 0;

                    if (data && data.transaction) {
                        data.transaction.forEach((transaction: Transaction) => {
                            const amount = parseFloat(transaction.amount);
                            if (transaction.type === "income") {
                                totalIncome += amount;
                            } else if (transaction.type === "expense") {
                                totalExpense += amount;
                            }
                        });
                    }

                    setIncome(totalIncome);
                    setExpense(totalExpense);
                } else {
                    console.log("No transactions found");
                }
                setLoading(false);
            }, (error) => {
                console.log("Error fetching transactions:", error);
                setLoading(false);
            });
        };

        fetchUserData();
        const unsubscribe = unsubscribeFromTransactions();
        return () => unsubscribe ? unsubscribe() : undefined;

    }, []);

    const [hasNotification] = useState<boolean>(true);
    const greeting: string = getGreeting();
    const totalBalance = income - expense;

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
                <DisplayFlex flex={1} direction="column" justifyContent="space-between">
                    <ImageBackground
                        source={require("../assets/top_section.png")}
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
                    <View className="absolute bottom-[-60] w-[100%] px-5 ">
                        <BalanceCard totalBalance={totalBalance} income={income} expense={expense} />
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
