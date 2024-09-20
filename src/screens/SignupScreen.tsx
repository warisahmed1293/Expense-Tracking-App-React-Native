import React from "react";
import RegisterScreen from "../authentication/RegistrationUser";
import { useNavigation } from "@react-navigation/native";

const SignupScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <>
            <RegisterScreen navigation={navigation} />
        </>
    );
};

export default SignupScreen;
