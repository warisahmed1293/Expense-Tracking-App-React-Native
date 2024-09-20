import { Image, View } from "react-native";
import React from "react";
import { StyledText } from "../styledComponents";
import COLORS from "../../constant/colors";
import moment from "moment";

interface TransactionHistoryMainProps {
    TransactionHolder: string;
    TransactionTime: string;
    TransactionValue: number;
    TransactionHolderIcon: number;
    type: string;
}

const TransactionHistoryMain: React.FC<TransactionHistoryMainProps> = ({
    TransactionHolder,
    TransactionTime,
    TransactionValue,
    TransactionHolderIcon,
    type,
}) => {

    const getTransactionColor = () => {
        return type === "income" ? COLORS.TRANSACTION_GREEN : COLORS.TRANSACTION_RED;
    };

    const getFormattedDate = (transactionDate: string) => {
        const today = moment().startOf("day");
        const yesterday = moment().subtract(1, "days").startOf("day");
        const transactionMoment = moment(transactionDate, "DD-MM-YYYY");

        if (transactionMoment.isSame(today, "day")) {
            return "Today";
        } else if (transactionMoment.isSame(yesterday, "day")) {
            return "Yesterday";
        } else {
            return transactionMoment.format("MMM DD, YYYY");
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

    return (
        <View className="flex flex-row items-center justify-between py-2">
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
        </View>
    );
};

export default TransactionHistoryMain;
