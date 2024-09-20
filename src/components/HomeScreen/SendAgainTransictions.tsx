import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { DisplayFlex, StyledText } from "../styledComponents";
import { DummyImages } from "../../constant/dataDummy";

const SendAgainTransictions = () => {
    return (
        <>
            <DisplayFlex flex={1} direction="row" justifyContent="space-between">
                <View >
                    <StyledText fontWeight="bold" fontSize="18px" color="black">Send Again</StyledText>
                </View>
                <TouchableOpacity>
                    <StyledText color="grey">See all</StyledText>
                </TouchableOpacity>
            </DisplayFlex>
            <View className="px-0 py-3 flex flex-row justify-between">
                {
                    DummyImages.map((item) => (
                        <View key={item.id}>
                            <Image
                                source={item?.image}
                                resizeMode="cover"
                                className="w-14 h-14 rounded-full"
                            />
                        </View>
                    ))
                }
            </View>

        </>
    );
};
export default SendAgainTransictions;
