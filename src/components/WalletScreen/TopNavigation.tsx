import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../Icon'
import { StyledText } from '../styledComponents'
import COLORS from '../../constant/colors'

const TopNavigation = (navigation) => {
    const [hasNotification] = React.useState<boolean>(true)
    return (
        <ImageBackground
            source={require("../../assets/top_section.png")}
            resizeMode="cover"
            className="w-full h-[275px]"
        >
            <View className="px-3 pt-12 pb-4 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Icon name="ChevronLeftIcon" type="solid" color={COLORS.SECONDARY_WHITE} size={30} />
                </TouchableOpacity>
                <StyledText color={COLORS.SECONDARY_WHITE} fontWeight="bold">Wallet</StyledText>
                <TouchableOpacity
                    className="relative bg-[#ffffff3a] w-10 h-10 items-center justify-center rounded-xl"
                >
                    <Icon name="BellIcon" color={COLORS.SECONDARY_WHITE} size={28} type="outline" />
                    {hasNotification && (
                        <View className="absolute top-2 right-2 w-2 h-2 bg-[#FFAB7B] rounded-full" />
                    )}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default TopNavigation