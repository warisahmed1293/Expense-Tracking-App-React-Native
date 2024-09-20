import React from "react";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "../authentication/LoginUser";

const SigninScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <>
            <LoginScreen navigation={navigation} />
        </>
    );
};

export default SigninScreen;
