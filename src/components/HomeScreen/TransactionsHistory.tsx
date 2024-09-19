import { TouchableOpacity, View } from "react-native";
import React from "react";
import { DisplayFlex, StyledText } from "../styledComponents";

const TransactionsHistory = () => {
    return (
        <DisplayFlex direction="row" justifyContent="space-between">
            <View >
                <StyledText fontWeight="bold" fontSize="18px" color="black">Transactions History</StyledText>
            </View>
            <TouchableOpacity>
                <StyledText color="grey">See all</StyledText>
            </TouchableOpacity>
        </DisplayFlex>
    );
};

export default TransactionsHistory;
