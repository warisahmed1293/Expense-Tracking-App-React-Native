import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Area, CartesianChart, useChartPressState } from "victory-native";
import { Circle } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

interface Transaction {
    date: string;
    type: string;
    amount: string;
}

interface TransactionData {
    transaction: Transaction[];
}

type ToolTipProps = {
    x: SharedValue<number>;
    y: SharedValue<number>;
};

const ToolTip: React.FC<ToolTipProps> = ({ x, y }) => {
    return <Circle cx={x.value} cy={y.value} r={8} color="black" />;
};

const MyChart: React.FC = () => {
    const [expenseData, setExpenseData] = useState<{ day: number; amount: number }[]>([]);
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
            .onSnapshot(
                (doc) => {
                    if (doc.exists) {
                        const data = doc.data() as TransactionData;
                        if (data && data.transaction) {
                            let transactions = data.transaction;
                            transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                            const expenses = transactions.filter((transaction) => transaction.type === "expense");
                            const expensePoints = expenses.map((transaction, index) => ({
                                day: index,
                                amount: parseFloat(transaction.amount),
                            }));

                            console.log("Expense points:", expensePoints);
                            setExpenseData(expensePoints);
                        }
                    } else {
                        console.log("No transactions found.");
                        setExpenseData([]);
                    }
                    setLoading(false);
                },
                (error) => {
                    console.log("Error fetching transactions:", error);
                    setLoading(false);
                }
            );

        return () => unsubscribe();
    }, []);

    const { state } = useChartPressState({ x: 0, y: { amount: 0 } });

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (expenseData.length === 0) {
        return <View><Text>No expense data available</Text></View>;
    }

    return (
        <View style={{ height: 300 }}>
            <CartesianChart data={expenseData} xKey="day" yKeys={["amount"]} chartPressState={state}>
                {({ points, chartBounds }) => {
                    console.log("Chart points:", points, chartBounds);

                    if (!points || !points.y || !Array.isArray(points.y)) {
                        console.log("No points available for chart rendering", points);
                        return null;
                    }

                    return (
                        <Area
                            points={points.y}
                            y0={chartBounds.bottom}
                            color="red"
                            curveType='natural'
                            connectMissingData={true}
                            animate={{ type: "timing", duration: 300 }}
                        />
                    );
                }}
            </CartesianChart>

        </View>
    );
};

export default MyChart;
