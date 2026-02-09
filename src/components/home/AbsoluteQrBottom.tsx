import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from '../global/Icon';
import { navigate } from '../../utils/NavigationUtil';
import { bottomTabStyles } from '../../styles/bottomTabStyle';
import QRScannerModal from '../modals/QRScannerModal';

const AbsoluteQrBottom = () => {
    const [isVisible, setIsVisible] = useState(false);
  return (
   <>
   <View style = {bottomTabStyles.container}>
    <TouchableOpacity onPress={()=>navigate("RecieveFileScreen")}>
        <Icon name='apps-sharp' 
        iconFamily='Ionicons'
        color='#333'
        size={24}/>
    </TouchableOpacity>

    <TouchableOpacity style = {bottomTabStyles.qrCode}
     onPress={()=> setIsVisible(true)}>
        <Icon name='qrcode-scan' iconFamily='MaterialCommunityIcons'
        color='#fff'
        size={26}/>
    </TouchableOpacity>

    <TouchableOpacity>
        <Icon name='beer-sharp'
        iconFamily='Ionicons'
        color='#333'
        size={24}/>
    </TouchableOpacity>
   </View>

   {isVisible && (
    <QRScannerModal visible= {isVisible} onClose={()=> setIsVisible(false)}/>
   )}
   </>
  )
}

export default AbsoluteQrBottom