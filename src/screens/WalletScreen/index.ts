import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
interface WalletFunctionsReturn {
  totalBalance: number | null;
}

export const walletFunctions = (): WalletFunctionsReturn => {
  const [totalBalance, setTotalBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const balanceString = await AsyncStorage.getItem('totalBalance');
        if (balanceString !== null) {
          setTotalBalance(parseFloat(balanceString));
        }
      } catch (error) {
        console.log('Error fetching total balance:', error);
      }
    };

    fetchTotalBalance();
  }, []);

  return {
    totalBalance,
  };
};
