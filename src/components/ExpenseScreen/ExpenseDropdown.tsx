import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import Icon from "../Icon";

interface DropdownItem {
    id: number;
    title: string;
    icon: any;
}

interface CustomDropdownProps {
    items: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    selectedItem: DropdownItem | null;
    placeholder: string;
}

const ExpenseDropdown: React.FC<CustomDropdownProps> = ({ items, onSelect, selectedItem, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelectItem = (item: DropdownItem) => {
        onSelect(item);
        setIsVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                className="border border-gray-300 rounded-lg w-64 px-5 h-12 justify-between py-3"
                onPress={() => setIsVisible(true)}
            >
                {selectedItem ? (
                    <View className="flex-1 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Image source={selectedItem.icon} className="w-6 h-6" />
                            <Text className="ml-2 text-base text-black">{selectedItem.title}</Text>
                        </View>
                        <View className="flex">
                            <Icon type="solid" name="ChevronDownIcon" color="#29756F" size={20} />
                        </View>
                    </View>
                ) : (
                    <Text className="text-base text-gray-500">{placeholder}</Text>
                )}
            </TouchableOpacity>
            <Modal visible={isVisible} transparent={true} animationType="slide">
                <TouchableOpacity className="flex-1" onPress={() => setIsVisible(false)} />
                <View className="bg-white m-5 rounded-xl bottom-16 p-4">
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="flex-row items-center py-3 px-4 border-b border-gray-200"
                                onPress={() => handleSelectItem(item)}
                            >
                                <Image source={item.icon} className="w-6 h-6" />
                                <Text className="ml-3 text-black text-base">{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default ExpenseDropdown;
