import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { StyledText } from "../styledComponents";
import COLORS from "../../constant/colors";
import moment from "moment";
import { StackNavigationProp } from '@react-navigation/stack';

interface TransactionHistoryMainProps {
    navigation: StackNavigationProp<any>;
    TransactionHolder: string;
    TransactionTime: string;
    TransactionValue: number;
    TransactionHolderIcon: number;
    type: string;
    TransactionRecipt: string | null;
    id: string;
}

const TransactionHistoryMain: React.FC<TransactionHistoryMainProps> = ({
    navigation,
    TransactionHolder,
    TransactionTime,
    TransactionValue,
    TransactionHolderIcon,
    TransactionRecipt,
    type,
    id,
}) => {

    const getTransactionColor = () => {
        return type === "income" ? COLORS.TRANSACTION_GREEN : COLORS.TRANSACTION_RED;
    };

    const getFormattedDate = (transactionDate: string) => {
        const normalizedDate = moment(
            transactionDate,
            ["ddd MMM DD YYYY", "MM/DD/YYYY", "ddd MMM DD YYYY HH:mm:ss ZZ", "ddd MMM DD YYYY HH:mm:ss"],
            true
        );

        if (!normalizedDate.isValid()) {
            return "Invalid Date";
        }

        const today = moment().startOf("day");
        const yesterday = moment().subtract(1, "days").startOf("day");

        if (normalizedDate.isSame(today, "day")) {
            return "Today";
        } else if (normalizedDate.isSame(yesterday, "day")) {
            return "Yesterday";
        } else {
            return normalizedDate.format("MMM DD, YYYY");
        }
    };

    const formatNumber = (value: number): string => {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const getFormattedTransactionValue = () => {
        const sign = type === "income" ? "+" : "-";
        return `${sign} $${formatNumber(TransactionValue)}`;
    };

    const handlePress = () => {
        navigation.navigate("TransactionDetail", {
            transactionId: id,
            transactionHolder: TransactionHolder,
            transactionTime: TransactionTime,
            transactionValue: TransactionValue,
            transactionType: type,
            TransactionHolderIcon: TransactionHolderIcon,
            TransactionRecipt: TransactionRecipt,
        });
    };


    return (
        <TouchableOpacity className="flex flex-row items-center justify-between py-2" onPress={handlePress}>
            <View className="flex flex-row items-center">
                <View className="w-14 h-14 bg-slate-200 rounded-md items-center justify-center p-2 mr-3">
                    <Image source={TransactionHolderIcon} resizeMode="contain" className="w-full h-full" />
                </View>
                <View>
                    <StyledText color="black" fontWeight="regular" fontSize="20px">
                        {TransactionHolder}
                    </StyledText>
                    <StyledText color="grey" fontWeight="regular" fontSize="16px">
                        {getFormattedDate(TransactionTime)}
                    </StyledText>
                </View>
            </View>
            <View>
                <StyledText color={getTransactionColor()} fontWeight="bold" fontSize="20px">
                    {getFormattedTransactionValue()}
                </StyledText>
            </View>
        </TouchableOpacity>
    );
};

export default TransactionHistoryMain;
