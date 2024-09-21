import React, { useState } from "react";
import { View } from "react-native";
import ExpenseDropdown from "./ExpenseDropdown";
import { DropDownIcons } from "../../constant/dataDummy";

interface DropdownItem {
    id: number;
    title: string;
    icon: any;
}

const ExpenseInputCard: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

    const handleSelectItem = (item: DropdownItem) => {
        setSelectedItem(item);
        console.log("Selected Item:", item);
    };

    return (
        <View className="flex-1 justify-center px-6">
            <ExpenseDropdown
                items={DropDownIcons}
                onSelect={handleSelectItem}
                selectedItem={selectedItem}
                placeholder="Select an expense"
            />
        </View>
    );
};

export default ExpenseInputCard;
