import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

interface MessagesProps {
    errorMessage?: string;
    successMessage?: string;
}

const Messages: React.FC<MessagesProps> = ({ errorMessage, successMessage }) => {
    useEffect(() => {
        if (errorMessage) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: errorMessage,
                position: "top",
            });
        }

        if (successMessage) {
            Toast.show({
                type: "success",
                text1: "Success",
                text2: successMessage,
                position: "top",
            });
        }
    }, [errorMessage, successMessage]);

    return null;
};

export default Messages;
