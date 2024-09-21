import React from "react";
import { View, TouchableOpacity } from "react-native";
import { DisplayFlex, StyledText } from "./styledComponents";
import Icon from "./Icon";
import { StackNavigationProp } from "@react-navigation/stack";

import * as SolidIcons from "react-native-heroicons/solid";
import * as OutlineIcons from "react-native-heroicons/outline";

type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface TopNavbarProps {
    navigation: StackNavigationProp<any>;
    title: string;
    leftIconName: IconName;
    rightIconName?: IconName;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
    navigation,
    title,
    leftIconName,
    rightIconName,
    onLeftIconPress,
    onRightIconPress,
}) => {
    const handleLeftIconPress = () => {
        if (onLeftIconPress) {
            onLeftIconPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <DisplayFlex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="bottom-20 px-3"
        >
            <View>
                <TouchableOpacity onPress={handleLeftIconPress}>
                    <Icon name={leftIconName} type="solid" color="white" size={30} />
                </TouchableOpacity>
            </View>
            <View>
                <StyledText fontWeight="bold" color="white">
                    {title}
                </StyledText>
            </View>
            {rightIconName && (
                <TouchableOpacity onPress={onRightIconPress}>
                    <Icon name={rightIconName} color="white" size={30} type="outline" />
                </TouchableOpacity>
            )}
        </DisplayFlex>
    );
};

export default TopNavbar;
