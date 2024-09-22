import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { DisplayFlex, StyledText } from "../styledComponents";
import TransactionHistoryMain from "./TransactionHistoryMain";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

// Define the possible keys for iconMapping
type TransactionHolderType = "Upwork" | "Paypal" | "Youtube" | "Spotify" | "Netflix" | "Starbucks" | "Electricity";

interface Transaction {
    id: string;
    expenseType: TransactionHolderType;
    date: string;
    amount: number;
    type: string;
}

const iconMapping: Record<TransactionHolderType, any> = {
    Upwork: require("../../assets/icons/upwork.png"),
    Paypal: require("../../assets/icons/paypal.png"),
    Youtube: require("../../assets/icons/YT.png"),
    Spotify: require("../../assets/icons/spotify.png"),
    Netflix: require("../../assets/icons/netflix.png"),
    Starbucks: require("../../assets/icons/starbucks.png"),
    Electricity: require("../../assets/icons/electricity.png"),
};

const TransactionsHistory = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            const user = auth().currentUser;

            if (!user) {
                console.log("User not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const userDocRef = firestore().collection("expenses").doc(user.uid);
                const doc = await userDocRef.get();

                if (doc.exists) {
                    const data = doc.data();
                    if (data && data.expenses) {
                        setTransactions(data.expenses);
                    }
                }
            } catch (error) {
                console.log("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const displayedTransactions = showAll ? transactions : transactions.slice(0, 4);

    return (
        <ScrollView>
            <DisplayFlex flex={1} direction="row" justifyContent="space-between">
                <View>
                    <StyledText fontWeight="bold" fontSize="18px" color="black">Transactions History</StyledText>
                </View>
                {transactions.length > 4 && (
                    <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                        <StyledText color="grey">{showAll ? "See less" : "See all"}</StyledText>
                    </TouchableOpacity>
                )}
            </DisplayFlex>

            <View className="py-3">
                {displayedTransactions.length > 0 ? (
                    displayedTransactions.map((item) => (
                        <TransactionHistoryMain
                            key={item.id}
                            TransactionHolder={item.expenseType}
                            TransactionTime={item.date}
                            TransactionValue={item.amount}
                            TransactionHolderIcon={iconMapping[item.expenseType]}
                            type={item.type}
                        />
                    ))
                ) : (
                    <StyledText color="grey">No transactions found.</StyledText>
                )}
            </View>
        </ScrollView>
    );
};

export default TransactionsHistory;
