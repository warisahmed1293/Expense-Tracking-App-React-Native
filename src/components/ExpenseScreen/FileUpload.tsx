import React from "react";
import { View, TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";
import Icon from "../Icon";
import { StyledText } from "../styledComponents";

interface FileUploadProps {
    setFileName: (fileName: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFileName }) => {
    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log("File picked: ", res);
            setFileName(res[0].name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User canceled the picker");
            } else {
                console.error("Error: ", err);
            }
        }
    };

    return (
        <View className="w-72">
            <TouchableOpacity
                className="border border-gray-300 border-dotted rounded-lg p-4 flex-row justify-center items-center bg-gray-50"
                onPress={handleFilePicker}
            >
                <Icon type="solid" name="PlusCircleIcon" color="grey" />
                <StyledText className="ml-2" color="grey">
                    Add Invoice
                </StyledText>
            </TouchableOpacity>
        </View>
    );
};

export default FileUpload;
