import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DisplayFlex, StyledText } from "../../components/styledComponents";
import Icon from "../../components/Icon";
import { NavigationProp } from "@react-navigation/native";
import COLORS from "../../constant/colors";
import { useProfileScreenLogic } from '.';


type ProfileScreenPropos = {
    navigation: NavigationProp<any>;
};

const ProfileScreen: React.FC<ProfileScreenPropos> = ({ navigation }) => {
    const { userName, handlerName } = useProfileScreenLogic();

    const [hasNotification] = useState<boolean>(true);

    return (
        <View>
            <DisplayFlex flex={1} direction="column" justifyContent="space-between">
                <ImageBackground
                    source={require("../../assets/top_section.png")}
                    resizeMode="cover"
                    className="w-full h-[275px]"
                >
                    <View className="px-3 pt-12 pb-4 flex-row justify-between items-center">
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Icon name="ChevronLeftIcon" type="solid" color={COLORS.SECONDARY_WHITE} size={30} />
                        </TouchableOpacity>
                        <StyledText color={COLORS.SECONDARY_WHITE} fontWeight="bold">Profile</StyledText>
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
                <View className="absolute top-48 justify-center items-center">
                    <View className="w-[130px] h-[130px] bg-white rounded-full justify-center items-center">
                        <Image source={require("../../assets/icons/profileImage.png")} className="w-[100px] h-[100px] rounded-full" />
                    </View>
                    <View>
                        <StyledText color={COLORS.PRIMARY_BLACK} fontSize="24px" fontWeight="bold" className="text-center">{userName || "User"}</StyledText>
                        <StyledText color={COLORS.TEXT_GREEN} fontSize="16px" fontWeight="bold" className="text-center">{handlerName || "@iamuser"}</StyledText>
                    </View>
                </View>
            </DisplayFlex>
        </View>
    );
};

export default ProfileScreen;
