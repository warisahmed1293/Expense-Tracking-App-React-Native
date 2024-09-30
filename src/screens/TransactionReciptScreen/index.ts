import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const downloadReceipt = async (
  TransactionRecipt: string | null,
  transactionId: string,
) => {
  if (!TransactionRecipt) {
    Alert.alert('Error', 'No receipt available for this transaction.');
    return;
  }

  try {
    const user = firebase.auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    const receiptPath = `${user.uid}/${TransactionRecipt}`;
    const receiptRef = storage().ref(receiptPath);
    const url = await receiptRef.getDownloadURL();

    const fileName = `receipt-${transactionId}.pdf`;
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: localFilePath,
    }).promise;

    result.statusCode === 200
      ? Alert.alert('Success', 'Receipt downloaded successfully!')
      : Alert.alert('Error', 'Failed to download the receipt.');
  } catch (error) {
    console.error('Error downloading receipt:', error);
    Alert.alert('Error', 'An error occurred while downloading the receipt.');
  }
};

export const capitalizeTransactionType = (transactionType: string) => {
  return transactionType.charAt(0).toUpperCase() + transactionType.slice(1);
};

export const formatNumber = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
