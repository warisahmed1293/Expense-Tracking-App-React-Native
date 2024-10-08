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
                className="border-[#CCC] border-2 rounded-lg w-72 px-5 h-14 justify-between py-3"
                onPress={() => setIsVisible(true)}
            >
                {selectedItem ? (
                    <View className="flex-1 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Image source={selectedItem.icon} className="w-8 h-8" resizeMode="contain" />
                            <Text className="ml-2 text-base text-black">{selectedItem.title}</Text>
                        </View>
                        <View className="flex">
                            <Icon type="solid" name="ChevronDownIcon" color="#29756F" size={20} />
                        </View>
                    </View>
                ) : (
                    <View className="flex-1 flex-row items-center justify-between">
                        <View>
                            <Text className="text-base text-gray-500">{placeholder}</Text>
                        </View>
                        <View>
                            <Icon type="solid" name="ChevronDownIcon" color="#29756F" size={20} />
                        </View>

                    </View>
                )}
            </TouchableOpacity>
            <Modal visible={isVisible} transparent={true} animationType="slide">
                <TouchableOpacity className="flex-1" onPress={() => setIsVisible(false)} />
                <View className="bg-white m-2 rounded-xl bottom-16 p-4">
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        numColumns={4} // Setting 4 items per row
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="flex-1 items-center py-4 px-2"
                                onPress={() => handleSelectItem(item)}
                                style={{ flexBasis: "25%" }} // Ensures each item takes 25% of the width (4 columns)
                            >
                                <Image source={item.icon} className="w-8 h-8" resizeMode="contain" />
                                <Text className="mt-2 text-black text-base text-center text-[14px]">{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default ExpenseDropdown;
