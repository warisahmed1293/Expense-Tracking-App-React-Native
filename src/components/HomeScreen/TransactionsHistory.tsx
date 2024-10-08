import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { DisplayFlex, StyledText } from "../styledComponents";
import TransactionHistoryMain from "./TransactionHistoryMain";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { StackNavigationProp } from '@react-navigation/stack';

type TransactionHolderType = "Upwork" | "Paypal" | "Youtube" | "Spotify" | "Netflix" | "Starbucks" | "Electricity" | "Fiverr" | "Rent" | "Waris" | "Shahin" | "Ahmed" | "Hossam" | "Ali";

interface Transaction {
    id: string;
    transactionHolder: TransactionHolderType;
    date: string;
    amount: number;
    type: string;
    fileName: string | null;
    filePath: string | null;

}

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

const TransactionsHistory: React.FC<{ navigation: StackNavigationProp<any> }> = ({ navigation }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const user = auth().currentUser;

        if (!user) {
            console.log("User not authenticated.");
            setLoading(false);
            return;
        }

        const userDocRef = firestore().collection("transactions").doc(user.uid);

        const unsubscribe = userDocRef.onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                if (data && data.transaction) {
                    const sortedTransactions = data.transaction.sort((a: Transaction, b: Transaction) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    setTransactions(sortedTransactions);
                }
            } else {
                console.log("No transactions found.");
                setTransactions([]);
            }
            setLoading(false);
        }, (error) => {
            console.log("Error fetching transactions:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const displayedTransactions = showAll ? transactions : transactions.slice(0, 4);
    transactions.map((item) => console.log(item.fileName));


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
                            navigation={navigation}
                            TransactionHolder={item.transactionHolder}
                            TransactionTime={item.date}
                            TransactionValue={item.amount}
                            TransactionHolderIcon={iconMapping[item.transactionHolder]}
                            type={item.type}
                            id={item.id}
                            TransactionRecipt={item.fileName}
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
