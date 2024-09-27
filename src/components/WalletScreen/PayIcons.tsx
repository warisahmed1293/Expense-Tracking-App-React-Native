import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../Icon'
import COLORS from '../../constant/colors'
import { StyledText } from '../styledComponents'

const PayIcons = () => {
    return (
        <View className='flex flex-row justify-center gap-4'>
            <TouchableOpacity className='gap-1'>
                <View className='w-14 h-14 items-center justify-center border-2 border-[#408782] rounded-full'>
                    <Icon name="PlusIcon" type="outline" size={30} color={COLORS.DARK_GREEN} />
                </View>
                <StyledText color='#222222 ' textAlign='center' >
                    Add
                </StyledText>
            </TouchableOpacity>
            <TouchableOpacity className='gap-1'>

                <View className='w-14 h-14 items-center justify-center border-2 border-[#408782] rounded-full'>

                    <Icon name="QrCodeIcon" type="solid" size={30} color={COLORS.DARK_GREEN} />
                </View>
                <StyledText color='#222222 ' textAlign='center' >
                    Pay
                </StyledText>
            </TouchableOpacity>
            <TouchableOpacity className='gap-1'>
                <View className='w-14 h-14 items-center justify-center border-2 border-[#408782] rounded-full'>

                    <Icon name="PaperAirplaneIcon" type="solid" size={30} color={COLORS.DARK_GREEN} />
                </View>
                <StyledText color='#222222 ' textAlign='center' >
                    Send
                </StyledText>
            </TouchableOpacity>

        </View>
    )
}

export default PayIcons