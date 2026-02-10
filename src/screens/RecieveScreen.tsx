import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { sendStyles } from '../styles/sendStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/global/Icon';
import CustomText from '../components/global/CustomText';

const RecieveScreen:FC = () => {

  const [qrValue , setQRValue] = useState('');
  const [isScannerVisible, setIsScannerVisible] = useState(false)


    return (
   <LinearGradient 
   colors={['#ffffff', '#4DA0DE', '#3387C5']}
     style = {sendStyles.container}
     start={{x : 0 , y : 1}}
     end={{ x : 0 , y : 0}}>
      <SafeAreaView/>
    <View style = {sendStyles.mainContainer}>
       <View style = {sendStyles.infoContainer}>
     <Icon name='blur-on'
      iconFamily='MaterialIcons'
      color='#fff'
      size={40}/>

      <CustomText 
      fontFamily='Okra-Bold'
      color='#fff'
      fontSize={16}
       style={{marginTop : 20}}>
        Recieving from nearby devices
      </CustomText>

      <CustomText fontFamily='Okra-Medium'
      color='#fff'
       fontSize={12}
       style={{textAlign : "center"}}>
        Ensure your device is connected to the sender's hotspot network
      </CustomText>
       </View>
    </View>
   </LinearGradient>
  )
}

export default RecieveScreen

const styles = StyleSheet.create({})