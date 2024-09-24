import React from "react";
import RegisterScreen from "../authentication/RegistrationUser";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from 'react-native';

const SignupScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <RegisterScreen navigation={navigation} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default SignupScreen;
