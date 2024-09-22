import { View } from "react-native";
import React, { useState } from "react";
import InputField from "../InputField";

const AmountInputCard = () => {
    const [amount, setAmount] = useState("");
    const clearInput = () => {
        setAmount("");
    };

    return (
        <>
            <View className="h-16 w-72">

                <InputField
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    showButton={true}
                    buttonText="Clear"
                    buttonType="text"
                    onButtonPress={clearInput}
                    classname="h-10"
                />
            </View>
        </>

    );
};

export default AmountInputCard;
