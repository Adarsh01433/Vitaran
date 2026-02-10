import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { FC, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { sendStyles } from '../styles/sendStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/global/Icon';
import CustomText from '../components/global/CustomText';
import BreakerText from '../components/ui/BreakerText';
import { Colors } from '../utils/Constants';
import ORGenrateModal from '../components/modals/QRGenerateModal';
import DeviceInfo from 'react-native-device-info';
import LottieView from 'lottie-react-native';
import { goBack } from '../utils/NavigationUtil';
import QRGenerateModal from '../components/modals/QRGenerateModal';


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
        <BreakerText text='or'/>
      
      <TouchableOpacity
      style = {sendStyles.qrButton}
      onPress={()=> setIsScannerVisible(true)} 
      >

        <Icon name='qrcode'
         iconFamily='MaterialCommunityIcons'
         color= {Colors.primary}
         size={16}/>

         <CustomText fontFamily='Okra-Bold' color={Colors.primary}>
          Show QR
         </CustomText>
      </TouchableOpacity>

       </View>
     
     <View style = {sendStyles.animationContainer}>
      <View style = {sendStyles.lottieContainer}>
      <LottieView  style = {sendStyles.lottie}
       source={require("../assets/animations/scan2.json")}
        autoPlay 
        loop = {true}
        hardwareAccelerationAndroid/>
      </View>

      <Image source={require('../assets/images/sword.jpg')}
      style = {sendStyles.profileImage}/>
     </View>

     <TouchableOpacity style = {sendStyles.backButton} onPress={goBack}>
      <Icon name='arrow-back' iconFamily='Ionicons' size={16} color='#000'/>
     </TouchableOpacity>
     
    </View>
    { isScannerVisible && (
      <QRGenerateModal visible = {isScannerVisible}
        onClose={()=> setIsScannerVisible(false)}/>
    )}
   </LinearGradient>
  )
}

export default RecieveScreen

const styles = StyleSheet.create({})