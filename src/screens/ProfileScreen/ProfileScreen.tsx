import { Image, ImageBackground, TouchableOpacity, View, ActivityIndicator, ScrollView, StyleSheet, Modal, Share } from "react-native";
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
    const { userName, handlerName, profileImage, loading, tableData } = useProfileScreenLogic();
    const [hasNotification] = React.useState<boolean>(true);
    const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);
    const [isSharing, setIsSharing] = React.useState<boolean>(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        setTimeout(async () => {
            await auth().signOut();
            setIsLoggingOut(false);
            navigation.navigate("Onboarding");
        }, 2000);
    };

    const onShare = async () => {
        setIsSharing(true);
        try {
            const result = await Share.share({
                message: 'Check out this amazing app: https://creativeartistz.co',
                title: 'Download our app',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.error('Error sharing', error);
        } finally {
            setIsSharing(false);
        }
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

            <ScrollView className="mt-28 px-4" showsVerticalScrollIndicator={false}>
                <View className="pt-2">
                    {tableData.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                                if (item.title === "Logout") {
                                    handleLogout();
                                } else if (item.title === "Invite Freinds") {
                                    onShare();
                                }
                            }}
                        >
                            <ProfileTable icon={item.icon} title={item.title} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {isLoggingOut && (
                <Modal visible={isLoggingOut} transparent={true} animationType="fade">
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={COLORS.SECONDARY_WHITE} />
                    </View>
                </Modal>
            )}

            {isSharing && ( // Show loader when sharing
                <Modal visible={isSharing} transparent={true} animationType="fade">
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={COLORS.SECONDARY_WHITE} />
                    </View>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
});

export default ProfileScreen;
