import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ExpenseDropdown from "./ExpenseDropdown";
import { DropDownIcons } from "../../constant/dataDummy";
import { DisplayFlex, StyledText } from "../styledComponents";
import InputField from "../InputField";
import FileUpload from "./FileUpload";
import Toast from "react-native-toast-message";

interface DropdownItem {
    id: number;
    title: string;
    icon: any;
}

const ExpenseInputCard: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
    const [amount, setAmount] = useState("");
    const [fileName, setFileName] = useState<string | null>(null); // State to store selected file name

    const handleSelectItem = (item: DropdownItem) => {
        setSelectedItem(item);
        console.log("Selected Item:", item);
    };

    const clearInput = () => {
        setAmount("");
    };

    const handleSubmit = () => {
        const formData = {
            expense: selectedItem,
            amount,
            fileName,
        };
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Expense added successfully!",
        });
        console.log("Form Data: ", formData);
    };

    return (
        <>
            <Toast />
            <DisplayFlex justifyContent="space-between" alignItems="center" direction="column" className="pt-6">
                <View className="my-3 w-72 h-[85px] justify-between">
                    <StyledText color="black">Name</StyledText>
                    <ExpenseDropdown
                        items={DropDownIcons}
                        onSelect={handleSelectItem}
                        selectedItem={selectedItem}
                        placeholder="Select an expense"
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
                            Add Expense
                        </StyledText>
                    </TouchableOpacity>

                </View>

            </DisplayFlex>
        </>
    );
};

export default ExpenseInputCard;
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