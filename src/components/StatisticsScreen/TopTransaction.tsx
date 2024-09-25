import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { StyledText } from "../styledComponents";

interface Transaction {
    id: string;
    amount: string;
    transactionHolder: string;
    date: string;
    type: "expense" | "income";
}

interface AggregatedTransaction {
    transactionHolder: string;
    totalAmount: number;
}

interface TopTransactionProps {
    transactionType: "income" | "expense";
    sortOrder: "asc" | "desc";
    color: string;
}

type TransactionHolderType =
    | "Upwork"
    | "Paypal"
    | "Youtube"
    | "Spotify"
    | "Netflix"
    | "Starbucks"
    | "Electricity"
    | "Fiverr"
    | "Rent"
    | "Waris"
    | "Shahin"
    | "Ahmed"
    | "Hossam"
    | "Ali";

const iconMapping: Record<TransactionHolderType, any> = {
    Upwork: require("../../assets/icons/upwork.png"),
    Paypal: require("../../assets/icons/paypal.png"),
    Youtube: require("../../assets/icons/YT.png"),
    Spotify: require("../../assets/icons/spotify.png"),
    Netflix: require("../../assets/icons/netflix.png"),
    Starbucks: require("../../assets/icons/starbucks.png"),
    Electricity: require("../../assets/icons/electricity.png"),
    Fiverr: require("../../assets/icons/fiverr.png"),
    Rent: require("../../assets/icons/houserent.png"),
    Waris: require("../../assets/icons/profileImage.png"),
    Shahin: require("../../assets/icons/profileImage2.png"),
    Ahmed: require("../../assets/icons/profileImage3.png"),
    Hossam: require("../../assets/icons/profileImage4.png"),
    Ali: require("../../assets/icons/profileImage5.png"),
};

const TopTransaction: React.FC<TopTransactionProps> = ({ transactionType, sortOrder, color }) => {
    const [transactions, setTransactions] = useState<AggregatedTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const currentUser = auth().currentUser;

        if (currentUser) {
            setUserId(currentUser.uid);
        } else {
            console.log("No user is logged in.");
            setLoading(false);
            return;
        }

        const userDocRef = firestore().collection("transactions").doc(currentUser.uid);

        const unsubscribe = userDocRef.onSnapshot(
            (doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data && data.transaction) {
                        const filteredTransactions = data.transaction
                            .filter((t: Transaction) => t.type === transactionType)
                            .map((t: Transaction) => ({
                                transactionHolder: t.transactionHolder,
                                amount: parseFloat(t.amount) || 0,
                            }));

                        const aggregated: Record<string, number> = filteredTransactions.reduce(
                            (acc: Record<string, number>, curr: { transactionHolder: string; amount: number }) => {
                                acc[curr.transactionHolder] = (acc[curr.transactionHolder] || 0) + curr.amount;
                                return acc;
                            }, {}
                        );

                        const sortedTransactions: AggregatedTransaction[] = Object.entries(aggregated)
                            .map(([transactionHolder, totalAmount]) => ({
                                transactionHolder,
                                totalAmount,
                            }))
                            .sort((a, b) => (sortOrder === "asc" ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount));

                        setTransactions(sortedTransactions);
                    }
                } else {
                    console.log("No transactions found.");
                    setTransactions([]);
                }
                setLoading(false);
            },
            (error) => {
                console.log("Error fetching transactions:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [transactionType, sortOrder, userId]);

    const renderTopTransactions = () => {
        return transactions.slice(0, 3).map((transaction, index) => (
            <TouchableOpacity key={index} className="flex-row items-center justify-between self-center pb-5 w-[100%]">
                <View className="flex-row items-center">
                    <Image
                        source={iconMapping[transaction.transactionHolder as TransactionHolderType]}
                        resizeMode="contain"
                        className="w-8 h-8"
                    />
                    <StyledText className="p-2" fontSize='18px' color="black" fontWeight="bold">
                        {transaction.transactionHolder}
                    </StyledText>
                </View>
                <StyledText color={color} fontSize='18px' fontWeight='bold'>
                    {transactionType === "income" ? "+" : "-"}$ {transaction.totalAmount.toFixed(2)}
                </StyledText>
            </TouchableOpacity>
        ));
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (transactions.length === 0) {
        return <Text>No transactions found.</Text>;
    }

    return (
        <View className="p-4">
            {renderTopTransactions()}
        </View>
    );
};

export default TopTransaction;

