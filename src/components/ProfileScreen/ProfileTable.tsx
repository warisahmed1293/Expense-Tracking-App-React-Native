import { View, Text } from 'react-native';
import React from 'react';
import Icon from '../Icon';
import * as SolidIcons from "react-native-heroicons/solid";
import * as OutlineIcons from "react-native-heroicons/outline";
import COLORS from '../../constant/colors';

type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface ProfileTableProps {
    icon?: IconName | null | string;
    title: string;
}

const ProfileTable: React.FC<ProfileTableProps> = ({ icon, title }) => {
    return (
        <View className='flex-row items-center justify-between self-start p-4 w-[100%]'>
            {icon && <Icon name={icon} size={32} color={COLORS.PRIMARY_GREY} type='solid' />}
            <View className='flex-1 px-5'>
                <Text className='font-bold text-PRIMARY_GREY text-left'>{title}</Text>
            </View>
        </View>
    );
};

export default ProfileTable;
