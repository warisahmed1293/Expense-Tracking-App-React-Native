import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

interface Transaction {
    date: string;
    type: string;
    amount: number;
}

interface TransactionData {
    transaction: Transaction[];
}

const DataChartExpense: React.FC = () => {
    const [expenseData, setExpenseData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const user = auth().currentUser;

        if (!user) {
            console.log("User not authenticated.");
            setLoading(false);
            return;
        }

        const unsubscribe = firestore()
            .collection("transactions")
            .doc(user.uid)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data() as TransactionData;
                    if (data && data.transaction) {
                        let transactions = data.transaction;
                        transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                        const expenses = transactions.filter(transaction => transaction.type === "expense");
                        const amounts = expenses.map(transaction => transaction.amount);
                        const transactionLabels = expenses.map(transaction => transaction.date);

                        setExpenseData(amounts);
                        setLabels(transactionLabels);
                    }
                } else {
                    console.log("No transactions found.");
                    setExpenseData([]);
                    setLabels([]);
                }
                setLoading(false);
            }, (error) => {
                console.log("Error fetching transactions:", error);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <LineChart
                onDataPointClick={(data) => console.log(data)}
                withDots={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                withShadow={true}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                data={{
                    labels: labels.length > 0 ? labels : ["No Data"],
                    datasets: [
                        {
                            data: expenseData.length > 0 ? expenseData : [0],
                        },
                    ],
                }}
                width={1000}
                height={250}
                yAxisLabel="$"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#f00",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(67, 136, 131, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
                    propsForDots: {
                        r: "6",
                        strokeWidth: "10",
                        strokeOpacity: "0.1",
                        stroke: "black",
                    },
                }}
                bezier={true}
            />
        </View>
    );
};

export default DataChartExpense;
