import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";

interface InputFieldProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps["keyboardType"];
    autoCapitalize?: TextInputProps["autoCapitalize"];
}

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType,
    autoCapitalize,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={isFocused ? styles.containerFocused : styles.container}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={isFocused ? "#438883" : "#999"}
            />
            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                    <Icon
                        name={isPasswordVisible ? "EyeSlashIcon" : "EyeIcon"}
                        size={24}
                        color="#438883"
                        type="solid"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#ccc", // Default grey border
        borderRadius: 8,
        marginBottom: 12,
        padding: 8,
    },
    containerFocused: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#438883", // Focused green border
        borderRadius: 8,
        marginBottom: 12,
        padding: 8,
    },
    input: {
        flex: 1,
        color: "#438883",
    },
    iconContainer: {
        marginLeft: 8,
    },
});

export default InputField;
