import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import Icon from "./Icon"; // Replace with your icon implementation
import COLORS from "../constant/colors";

interface DropdownItem {
    id: number;
    title: string;
    icon?: any;
    image?: any;
}

interface CustomDropdownProps {
    items: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    selectedItem: DropdownItem | null;
    placeholder: string;
}

const GlobalDropdown: React.FC<CustomDropdownProps> = ({ items, onSelect, selectedItem, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelectItem = (item: DropdownItem) => {
        onSelect(item);
        setIsVisible(false);
    };

    const renderIconOrImage = (item: DropdownItem) => {
        if (item.image) {
            return <Image source={item.image} className="w-8 h-8" resizeMode="contain" />;
        } else if (item.icon) {
            return <Icon name={item.icon} size={32} color="#000" />;
        }
        return null;
    };

    return (
        <View>
            <TouchableOpacity
                className="border-[1px] border-PRIMARY_GREY rounded-lg w-36 h-12 p-1 justify-center flex-row items-center"
                onPress={() => setIsVisible(true)}
            >
                {selectedItem ? (
                    <View className="flex-1 flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            {renderIconOrImage(selectedItem)}
                            <Text className="ml-2 text-base text-black">{selectedItem.title}</Text>
                        </View>
                        <Icon type="solid" name="ChevronDownIcon" color={COLORS.PRIMARY_GREY} size={20} />
                    </View>
                ) : (
                    <View className="flex-1 flex-row justify-between items-center">
                        <Text className="text-base text-gray-500">{placeholder}</Text>
                        <Icon type="solid" name="ChevronDownIcon" color="#29756F" size={20} />
                    </View>
                )}
            </TouchableOpacity>

            <Modal visible={isVisible} transparent={true} animationType="none">
                <TouchableOpacity className="flex-1" onPress={() => setIsVisible(false)} />
                <View className="bg-white border-[0.1px] rounded-xl bottom-auto top-48 left-[230] mb-5 absolute w-36 items-center justify-center ">
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="flex-row items-center justify-center py-3 border-b-[1px] border-gray-100 px-8"
                                onPress={() => handleSelectItem(item)}
                            >
                                {renderIconOrImage(item)}
                                <Text className="text-black text-base ">{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default GlobalDropdown;
