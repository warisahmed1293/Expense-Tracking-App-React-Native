import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import React from 'react';
import { DisplayFlex, StyledText } from '../../components/styledComponents';
import TopNavbar from '../../components/TopNavbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import COLORS from '../../constant/colors';

type TransactionReciptScreenParams = {
    transactionId: string;
    transactionHolder: string;
    transactionTime: string;
    transactionValue: number;
    transactionType: string;
    TransactionHolderIcon: any; // Assuming this is an image source
};

type TransactionReciptScreenRouteProps = {
    route: RouteProp<{ params: TransactionReciptScreenParams }, 'params'>;
    navigation: StackNavigationProp<any>;
};

const TransactionReciptScreen: React.FC<TransactionReciptScreenRouteProps> = ({ route, navigation }) => {
    const { transactionId, transactionHolder, transactionTime, transactionValue, transactionType, TransactionHolderIcon } = route.params;

    const colorChange = () => {
        if (transactionType === "income") {
            return { backgroundColor: 'rgba(76, 175, 80, 0.1)' };
        } else {
            return { backgroundColor: 'rgba(255, 0, 0, 0.1)' };
        }
    };

    const fontColorChange = () => {
        if (transactionType === "income") {
            return (COLORS.TRANSACTION_GREEN);
        } else {
            return (COLORS.TRANSACTION_RED);
        }
    };

    const capitalizeTransactionType = () => {
        return transactionType.charAt(0).toUpperCase() + transactionType.slice(1);
    };

    return (
        <>
            <ScrollView className='bg-white'>
                <DisplayFlex className="bg-white">
                    <ImageBackground
                        source={require("../../assets/top_section.png")}
                        resizeMode="cover"
                        className="w-full h-[275px]"
                    >
                        <TopNavbar
                            navigation={navigation}
                            title="Transaction Details"
                            leftIconName="ChevronLeftIcon"
                            rightIconName="EllipsisHorizontalIcon"
                            onRightIconPress={() => console.log("Options pressed!")}
                        />
                    </ImageBackground>
                </DisplayFlex>
                <DisplayFlex className='bg-white absolute top-36 self-center rounded-3xl w-[350px]'>
                    <View className='flex-row items-center mt-6 p-4 rounded-full w-24 h-24 bg-[#FAFAFA] justify-center'>
                        <Image source={TransactionHolderIcon} className="w-20 h-20 p-4" resizeMode="contain" />
                    </View>
                    <View>
                        <View className={`w-24 h-8 items-center justify-center self-center rounded-full`} style={colorChange()}>
                            <StyledText color={fontColorChange()} fontSize="18px" fontWeight="bold" className='text-center'>
                                {capitalizeTransactionType()}
                            </StyledText>
                        </View>
                    </View>
                    <View className='p-4'>
                        <Text className='text-black text-2xl font-bold'>{transactionHolder}</Text>
                        <Text className='text-black text-lg mb-1'>Transaction ID: <Text className='font-semibold'>{transactionId}</Text></Text>
                        <Text className='text-black text-lg mb-1'>Time: <Text className='font-semibold'>{transactionTime}</Text></Text>
                        <Text className='text-black text-lg mb-1'>Value: <Text className='font-semibold'>${transactionValue}</Text></Text>
                        <Text className='text-black text-lg mb-1'>Type: <Text className='font-semibold'>{transactionType}</Text></Text>
                    </View>
                </DisplayFlex>
            </ScrollView>
        </>
    );
};

export default TransactionReciptScreen;
