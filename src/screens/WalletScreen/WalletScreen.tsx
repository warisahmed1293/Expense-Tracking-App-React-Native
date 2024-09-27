import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TopNavigation from '../../components/WalletScreen/TopNavigation';
import { DisplayFlex, StyledText } from '../../components/styledComponents';
import PayIcons from '../../components/WalletScreen/PayIcons';
import { walletFunctions } from '.';

const WalletScreen: React.FC = () => {
    const { totalBalance } = walletFunctions();

    const formatNumber = (value: number) => {
        return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <View>
            <DisplayFlex flex={1} direction="column" justifyContent="space-between" className="bg-white">
                <TopNavigation />
            </DisplayFlex>
            <View className='bg-white absolute top-36 self-center rounded-3xl px-5 w-[350px]'>
                <StyledText className='text-center text-PRIMARY_GREY text-[16px]'>
                    Total Balance
                </StyledText>
                <StyledText className='text-center text-black font-bold text-[30px] tracking-[-1px]'>
                    $ {totalBalance !== null ? formatNumber(totalBalance) : 'Loading...'}
                </StyledText>
                <View>
                    <PayIcons />
                </View>
            </View>
        </View>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({});
