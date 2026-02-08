import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { screenHeight } from '../../utils/Constants'
import { navigate } from '../../utils/NavigationUtil'

const SendRecieveButton:FC = () => {
  return (
    <View style = {styles.container}>
      <TouchableOpacity style = {styles.button}
      onPress={()=> navigate("SendScreen")}>
        <Image style = {styles.img} source={require('../../assets/icons/send.jpg')}/>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button} onPress={()=> navigate("RecieveScreen")}>
        <Image style = {styles.img} source={require('../../assets/icons/receive.jpg')}/>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container : {
  marginTop : screenHeight * 0.04,
  flexDirection : "row",
  justifyContent : "space-evenly"
  },
  img : {
   width : '100%',
   height : "100%",
   resizeMode : "cover"
  },
  button : {
    width : 140,
    height : 100,
    borderRadius : 10,
  }
})


export default SendRecieveButton