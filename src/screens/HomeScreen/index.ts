import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  amount: string;
  date: string;
  fileName: string | null;
  id: string;
  transactionHolder: string;
  type: 'income' | 'expense';
}

export const getGreeting = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour <= 11) {
    return 'Good Morning';
  } else if (currentHour >= 11 && currentHour <= 15) {
    return 'Good Afternoon';
  } else if (currentHour >= 15 && currentHour <= 19) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

export const useHomeScreenLogic = () => {
  const [userName, setUserName] = useState<string>('');
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          setUserName(userDoc.data()?.name);
        }
      }
    };

    const unsubscribeFromTransactions = () => {
      const user = auth().currentUser;

      if (!user) {
        console.log('User not authenticated.');
        setLoading(true);
        return;
      }

      const userDocRef = firestore().collection('transactions').doc(user.uid);
      return userDocRef.onSnapshot(
        async doc => {
          if (doc.exists) {
            const data = doc.data();
            let totalIncome = 0;
            let totalExpense = 0;

            if (data && data.transaction) {
              data.transaction.forEach((transaction: Transaction) => {
                const amount = parseFloat(transaction.amount);
                if (transaction.type === 'income') {
                  totalIncome += amount;
                } else if (transaction.type === 'expense') {
                  totalExpense += amount;
                }
              });
            }

            setIncome(totalIncome);
            setExpense(totalExpense);

            const totalBalance = totalIncome - totalExpense;

            // Store the total balance in AsyncStorage
            await AsyncStorage.setItem('totalBalance', totalBalance.toString());
          } else {
            console.log('No transactions found');
          }
          setLoading(false);
        },
        error => {
          console.log('Error fetching transactions:', error);
          setLoading(false);
        },
      );
    };

    fetchUserData();
    const unsubscribe = unsubscribeFromTransactions();
    return () => (unsubscribe ? unsubscribe() : undefined);
  }, []);

  const totalBalance = income - expense;

  const greeting = getGreeting();

  return {
    userName,
    income,
    expense,
    totalBalance,
    loading,
    greeting,
  };
};
