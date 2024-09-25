import { Image, ImageBackground, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React from "react";
import { DisplayFlex, StyledText } from "../../components/styledComponents";
import Icon from "../../components/Icon";
import { NavigationProp } from "@react-navigation/native";
import COLORS from "../../constant/colors";
import { useProfileScreenLogic } from '.';
import auth from "@react-native-firebase/auth";
import ProfileTable from '../../components/ProfileScreen/ProfileTable';

type ProfileScreenProps = {
    navigation: NavigationProp<any>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const { userName, handlerName, profileImage, loading } = useProfileScreenLogic();
    const [hasNotification] = React.useState<boolean>(true);

    const handleLogout = async () => {
        await auth().signOut();
        navigation.navigate("Onboarding");
    };

    return (
        <>
            <View>
                <View>
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
                    <View className="absolute top-48 justify-center items-center self-center">
                        <View className="w-[130px] h-[130px] bg-white rounded-full justify-center items-center">
                            {loading ? (
                                <ActivityIndicator size="large" color={COLORS.PRIMARY_BLACK} />
                            ) : (
                                <Image source={{ uri: profileImage }} className="w-[100px] h-[100px] rounded-full" />
                            )}
                        </View>
                        {loading ? (
                            <ActivityIndicator size="large" color={COLORS.PRIMARY_BLACK} />
                        ) : (
                            <View>
                                <StyledText color={COLORS.PRIMARY_BLACK} fontSize="24px" fontWeight="bold" className="text-center">
                                    {userName || "User"}
                                </StyledText>
                                <StyledText color={COLORS.TEXT_GREEN} fontSize="16px" fontWeight="bold" className="text-center">
                                    {handlerName || "@iamuser"}
                                </StyledText>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View >
                <TouchableOpacity>
                    <ProfileTable icon="ShareIcon" title="Profile" />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default ProfileScreen;
