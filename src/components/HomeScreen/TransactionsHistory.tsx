import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { DisplayFlex, StyledText } from "../styledComponents";
import TransactionHistoryMain from "./TransactionHistoryMain";
import { transactionData } from "../../constant/dataDummy";

const TransactionsHistory = () => {

    return (
        <>
            <ScrollView>
                <DisplayFlex flex={1} direction="row" justifyContent="space-between">
                    <View >
                        <StyledText fontWeight="bold" fontSize="18px" color="black">Transactions History</StyledText>
                    </View>
                    <TouchableOpacity>
                        <StyledText color="grey">See all</StyledText>
                    </TouchableOpacity>
                </DisplayFlex>
                <View className="py-3">
                    {
                        transactionData.map((item) => (
                            <TransactionHistoryMain key={item.id} TransactionHolder={item.title} TransactionTime={item.date} TransactionValue={item.amount} TransactionHolderIcon={item.icon} type={item.type} />
                        ))
                    }
                </View>
            </ScrollView>
        </>
    );
};

export default TransactionsHistory;
