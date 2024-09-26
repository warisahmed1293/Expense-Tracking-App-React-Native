import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
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

const DataChartIncome: React.FC = () => {
    const [incomeData, setIncomeData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);

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
                    console.log("Fetched data:", data);

                    if (data && data.transaction) {
                        let transactions = data.transaction;
                        transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                        const expenses = transactions.filter(transaction => transaction.type === "income");
                        const amounts = expenses.map(transaction => Number(transaction.amount)); // Convert to number
                        const transactionLabels = expenses.map(transaction => transaction.date);

                        console.log("Filtered expenses:", expenses);
                        console.log("Amounts:", amounts);
                        console.log("Labels:", transactionLabels);

                        setIncomeData(amounts);
                        setLabels(transactionLabels);
                    } else {
                        console.log("No transactions found.");
                        setIncomeData([]);
                        setLabels([]);
                    }
                } else {
                    console.log("No transactions found.");
                    setIncomeData([]);
                    setLabels([]);
                }
                setLoading(false);
            }, (error) => {
                console.log("Error fetching transactions:", error);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);


    const handleDataPointClick = (data: { index: number }) => {
        setSelectedPointIndex(data.index);
    };

    if (loading) {
        return (
            <View className='items-center justify-center self-center'>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <View>
            <LineChart
                onDataPointClick={handleDataPointClick}
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
                            data: incomeData.length > 0 ? incomeData : [0],
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
                    color: (opacity = 0.3) => `rgba(67, 136, 131, ${opacity})`,
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
            {selectedPointIndex !== null && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>${incomeData[selectedPointIndex]}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        bottom: 60, // Adjust as necessary
        left: '50%',
        transform: [{ translateX: -50 }],
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 5,
        elevation: 3,
    },
    tooltipText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DataChartIncome;
