import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { DisplayFlex, StyledText } from '../../components/styledComponents';
import TopNavbar from '../../components/TopNavbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import COLORS from '../../constant/colors';
import Icon from '../../components/Icon';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import { firebase } from '@react-native-firebase/auth';

type TransactionReciptScreenParams = {
    transactionId: string;
    transactionHolder: string;
    transactionTime: string;
    transactionValue: number;
    transactionType: string;
    TransactionHolderIcon: any;
    TransactionRecipt: string | null;
};

type RootStackParamList = {
    TransactionDetail: TransactionReciptScreenParams;
};

type TransactionReciptScreenRouteProps = {
    route: RouteProp<RootStackParamList, 'TransactionDetail'>;
    navigation: StackNavigationProp<RootStackParamList, 'TransactionDetail'>;
};


const TransactionReciptScreen: React.FC<TransactionReciptScreenRouteProps> = ({ route, navigation }) => {
    const { transactionId, transactionHolder, transactionTime, transactionValue, transactionType, TransactionHolderIcon, TransactionRecipt } = route.params;
    const [downloading, setDownloading] = useState(false);
    console.log(TransactionRecipt);

    const downloadReceipt = async () => {
        if (!TransactionRecipt) {
            Alert.alert("Error", "No receipt available for this transaction.");
            return;
        }
        try {
            const user = firebase.auth().currentUser;
            if (!user) {
                Alert.alert("Error", "User not authenticated.");
                return;
            }

            const receiptPath = `${user.uid}/${TransactionRecipt}`;
            const receiptRef = storage().ref(receiptPath);
            const url = await receiptRef.getDownloadURL();

            const fileName = `receipt-${transactionId}.pdf`;
            const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
            const result = await RNFS.downloadFile({ fromUrl: url, toFile: localFilePath }).promise;
            setDownloading(true);

            if (result.statusCode === 200) {
                Alert.alert("Success", "Receipt downloaded successfully!");
            } else {
                Alert.alert("Error", "Failed to download the receipt.");
            }
        } catch (error) {
            console.error("Error downloading receipt:", error);
            Alert.alert("Error", "An error occurred while downloading the receipt.");
        } finally {
            setDownloading(false);
        }
    };

    const colorChange = () => {
        if (transactionType === "income") {
            return { backgroundColor: 'rgba(76, 175, 80, 0.1)' };
        } else {
            return { backgroundColor: 'rgba(255, 0, 0, 0.1)' };
        }
    };
    const transactionAmountName = () => {
        if (transactionType === "income") {
            return "Earnings";
        } else {
            return "Spending";
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

    const formatNumber = (value: number) => {
        return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                <View className='bg-white absolute top-36 self-center rounded-3xl px-5 w-[350px]'>
                    <View className='flex-row items-center self-center mt-6 p-4 rounded-full w-24 h-24 bg-[#FAFAFA] justify-center'>
                        <Image source={TransactionHolderIcon} className="w-16 h-16 p-4" resizeMode="contain" />
                    </View>
                    <View>
                        <View className={`w-24 h-8 mt-3 items-center justify-center self-center rounded-full`} style={colorChange()}>
                            <StyledText color={fontColorChange()} fontSize="18px" fontWeight="semibold" className='text-center'>
                                {capitalizeTransactionType()}
                            </StyledText>
                        </View>
                        <View className={`mt-3 items-center justify-center self-center`}>
                            <StyledText fontSize='32px' fontWeight='bold' color={COLORS.PRIMARY_BLACK}>$ {formatNumber(transactionValue)}</StyledText>
                        </View>
                    </View>
                    <View className='mt-10 flex-row items-center justify-between'>
                        <View>
                            <StyledText color='black' fontSize="20px" fontWeight="bold">
                                Transaction Details
                            </StyledText>
                        </View>
                        <TouchableOpacity>
                            <Icon name='ChevronDownIcon' size={24} color={COLORS.PRIMARY_GREY} type='solid' />
                        </TouchableOpacity>
                    </View>
                    <View className='pt-8'>
                        <View className='justify-between items-center flex-row mb-6'>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_GREY}>Status:</StyledText>
                            <StyledText color={fontColorChange()} fontSize='18px' fontWeight='bold'>{capitalizeTransactionType()}</StyledText>
                        </View>
                        <View className='justify-between items-center flex-row mb-6'>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_GREY}>From:</StyledText>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_BLACK}>{transactionHolder}</StyledText>
                        </View>
                        <View className='justify-between items-center flex-row '>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_GREY}>Date:</StyledText>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_BLACK}>{transactionTime}</StyledText>
                        </View>
                        <View className='w-72 h-[1px] bg-[#DDDDDD] justify-between items-center flex-row self-center my-8' />
                        <View className='justify-between items-center flex-row'>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_GREY}>{transactionAmountName()}</StyledText>
                            <StyledText fontSize='18px' fontWeight='bold' color={COLORS.PRIMARY_BLACK}>$ {formatNumber(transactionValue)}</StyledText>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="bg-transparent py-[16px] w-[100%] border border-[#DDDDDD] rounded-full self-center mt-10"
                        onPress={downloadReceipt}
                        disabled={downloading}
                    >
                        <StyledText className="text-center" color={COLORS.DARK_GREEN} fontWeight="bold" fontSize="20px">
                            {downloading ? 'Downloading...' : 'Download Receipt'}
                        </StyledText>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </>
    );
};
export default TransactionReciptScreen;
