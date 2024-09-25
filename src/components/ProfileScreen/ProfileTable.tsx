import { View, Text } from 'react-native'
import React from 'react'
import { StyledText } from '../styledComponents'
import Icon from '../Icon'

interface ProfileTableProps {
    icon: string
    title: string
}
const ProfileTable: React.FC<ProfileTableProps> = ({ icon = "EyeSlashIcon", title, }) => {
    return (
        <View className='flex-row items-center self-start justify-around w-40'>
            <Icon name={icon} size={32} color="#000" />
            <StyledText color='black' fontWeight='bold' fontSize='18px'>{title}</StyledText>
        </View>
    )
}

export default ProfileTable