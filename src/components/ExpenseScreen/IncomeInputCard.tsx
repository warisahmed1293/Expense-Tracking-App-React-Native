import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ExpenseDropdown from "./ExpenseDropdown";
import { DropDownIncomeIcons } from "../../constant/dataDummy";
import { DisplayFlex, StyledText } from "../styledComponents";
import InputField from "../InputField";
import FileUpload from "./FileUpload";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import DateInput from "./DateInput";
import storage from "@react-native-firebase/storage";
import RNFS from "react-native-fs";

interface DropdownItem {
    id: number;
    title: string;
    icon: any;
}

const IncomeInputCard: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
    const [amount, setAmount] = useState("");
    const [fileName, setFileName] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const handleSelectItem = (item: DropdownItem) => {
        setSelectedItem(item);
        console.log("Selected Item:", item);
    };

    const clearInput = () => {
        setAmount("");
        setSelectedDate(null);
        setFileName("");
    };

    const handleSubmit = async () => {
        const user = auth().currentUser;

        if (!user) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "User not authenticated.",
            });
            return;
        }
        if (!amount || !selectedItem || !selectedDate) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter all required fields",
            });
            return;
        }

        const IncomeData = {
            id: Date.now().toString(),
            transactionHolder: selectedItem?.title,
            amount,
            fileName,
            date: selectedDate.toDateString(),
            type: "income",
        };

        try {
            if (fileName) {
                const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
                const reference = storage().ref(`${user.uid}/${fileName}`);
                await reference.putFile(localFilePath);
                console.log("File uploaded to Firebase Storage successfully!");
            }

            const userDocRef = firestore().collection("transactions").doc(user.uid);
            await userDocRef.set(
                {
                    transaction: firestore.FieldValue.arrayUnion(IncomeData),
                },
                { merge: true }
            );
            console.log(IncomeData);

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Income added successfully!",
            });

            clearInput();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: (error as Error).message,
            });
        }
    };

    return (
        <>

            <DisplayFlex justifyContent="space-between" alignItems="center" direction="column" className="pt-3 bg-white">
                <View className="my-3 w-72 h-[85px] justify-between">
                    <StyledText color="black">Name</StyledText>
                    <ExpenseDropdown
                        items={DropDownIncomeIcons}
                        onSelect={handleSelectItem}
                        selectedItem={selectedItem}
                        placeholder="Select an Income"
                    />
                </View>
                <View className="my-3 w-72 h-[85px] justify-between">
                    <StyledText color="black">Amount</StyledText>
                    <InputField
                        classname="h-10 w-72"
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                        showButton={true}
                        buttonText="Clear"
                        buttonType="text"
                        onButtonPress={clearInput}
                    />
                </View>
                <View className="my-3 w-72 h-[85px] justify-between">
                    <StyledText color="black">Date</StyledText>
                    <DateInput value={selectedDate} onChange={setSelectedDate} />
                </View>
                <View className="my-3 w-72 h-[85px] justify-between">
                    <StyledText color="black">Invoice</StyledText>
                    <FileUpload setFileName={setFileName} />
                </View>
                <View className="my-3 w-72 h-[85px] justify-between">
                    <TouchableOpacity
                        className="bg-TEXT_GREEN py-[16px] w-[75%] rounded-full self-center mt-5"
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <StyledText className="text-center text-[20px] text-white font-bold">
                            Add Income
                        </StyledText>
                    </TouchableOpacity>
                </View>
                <Toast />
            </DisplayFlex>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    button: {
        shadowColor: "black",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
    },
});

export default IncomeInputCard;
