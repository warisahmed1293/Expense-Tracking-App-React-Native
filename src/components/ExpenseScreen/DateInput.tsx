import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputField from "../InputField";

interface DateInputProps {
    value: Date | null;
    onChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(value);

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (event: any, date: Date | undefined) => {
        hideDatePicker();
        if (date) {
            setSelectedDate(date);
            onChange(date);

        }
    };

    return (
        <View>
            <InputField
                classname="h-10 w-72"
                placeholder="Select date"
                value={selectedDate?.toDateString()}
                showButton={true}
                buttonType="icon"
                buttonIconName="CalendarIcon"
                onButtonPress={showDatePicker}
                onChangeText={() => { }}
            />
            {isDatePickerVisible && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleConfirm}
                />
            )}
        </View>
    );
};

export default DateInput;
