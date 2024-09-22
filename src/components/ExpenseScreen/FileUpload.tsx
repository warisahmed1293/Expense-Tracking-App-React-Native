import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import DocumentPicker from "react-native-document-picker";
import storage from "@react-native-firebase/storage";
import Icon from "../Icon";
import { StyledText } from "../styledComponents";
import RNFS from "react-native-fs";
import { firebase } from "@react-native-firebase/auth";

interface FileUploadProps {
    setFileName: (fileName: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFileName }) => {
    const [fileName, setFileNameState] = useState<string | null>(null);

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                mode: "open",
            });

            console.log("File picked: ", res);
            const fileUri = res[0].uri;
            const name = res[0].name;
            const user = firebase.auth().currentUser;

            if (!user) {
                console.error("User is not authenticated");
                return;
            }

            const userId = user.uid;
            const localFilePath = `${RNFS.DocumentDirectoryPath}/${name}`;
            await RNFS.copyFile(fileUri, localFilePath);

            const reference = storage().ref(`${userId}/${name}`);
            await reference.putFile(localFilePath);
            console.log("File uploaded to Firebase Storage successfully!");

            setFileNameState(name);
            setFileName(name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User canceled the picker");
            } else {
                console.error("Error: ", err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={handleFilePicker}
            >
                <Icon type="solid" name="PlusCircleIcon" color="grey" />
                <StyledText style={styles.text} color="grey">
                    {fileName || "Add Invoice"}
                </StyledText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    touchable: {
        width: "100%",
        borderColor: "gray",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 10,
        padding: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    text: {
        marginLeft: 8,
    },
});

export default FileUpload;
