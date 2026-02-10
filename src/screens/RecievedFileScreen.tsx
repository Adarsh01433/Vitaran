import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import RNFS from 'react-native-fs';
import Icon from '../components/global/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { sendStyles } from '../styles/sendStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../components/global/CustomText';
import { Colors } from '../utils/Constants';
import { connectionStyles } from '../styles/connectionStyles';
import { formatFileSize } from '../utils/libraryHelpers';
import ReactNativeBlogUtil from 'react-native-blob-util';
import { goBack } from '../utils/NavigationUtil';

const RecievedFileScreen:FC = () => {

  const [recievedFiles, setRecievedFiles] = useState<any[]>([]);
  const [isLoading, setIsloading ] = useState<boolean>(true);

  const getFilesFromDirectory = async()=> {
    setIsloading(true)
    const platformPath = Platform.OS === 'android'
    ? `${RNFS.DocumentDirectoryPath}/`
    : `${RNFS.DocumentDirectoryPath}/`;

    try {
      const exist = await RNFS.exists(platformPath);
      if(!exist){
        setRecievedFiles([]);
        setIsloading(false);
        return
      }

      const files = await RNFS.readDir(platformPath);
     
      // Files ko format karna (important part)
      const formattedFiles = files.map(file=> ({
        id : file.name,
        name : file.name,
        size : file.size,
        uri : file.path,
        mineType : file.name.split('.').pop() || 'unknown'
      }));
     // Ab files state me save ho gayi
      setRecievedFiles(formattedFiles)
      
    } catch (error) {
     console.log('Error fetching files:', error);
     setRecievedFiles([]);
    }finally{
      setIsloading(false)
    }
  };

  useEffect(()=> {
   getFilesFromDirectory();
  },[])

  const renderThumbnail = (mimeType : string)=> {
    switch(mimeType){
      case 'mp3':
        return <Icon name='musical-notes' size={16} color='blue'  iconFamily='Ionicons'/>
        case 'mp4':
          return <Icon name='videocam' size={16} color='green' iconFamily='Ionicons'/>
          case 'jpg' :
            return <Icon name='image' size={16} color='orange' iconFamily='Ionicons'/>
            case 'pdf' :
              return <Icon name='image' size={16} color='red' iconFamily='Ionicons'/>
              default : 
              return <Icon name='folder' size={16} color='gray' iconFamily='Ionicons'/>
    }
  };

  const renderItem = ({item}: any)=> (

    <View style = {connectionStyles.fileItem}>
      <View style = {connectionStyles.fileInfoContainer}>
       {renderThumbnail(item?.mimeType)}
       <View style = {connectionStyles.fileDetails}>
        <CustomText numberOfLines={1} fontFamily='Okra-Bold' fontSize={10}>
          {item.name}
        </CustomText>
        <CustomText numberOfLines={1} fontFamily='Okra-Medium' fontSize={8}>
          {item.mimeType} + {formatFileSize(item.size)}
        </CustomText>
       </View>
      </View>

      <TouchableOpacity onPress={()=> {
        // find path
        const normalizedPath = 
        Platform.OS === 'ios' ? `file://${item?.uri}` : item?.uri;
          
        // open for ios
        if(Platform.OS === 'ios'){
          ReactNativeBlogUtil.ios.openDocument(normalizedPath)
          .then(()=> console.log("File Open sucessfully")).catch
          (err=> console.error("Error opening file:", err));
         } else {
          // for android 
          ReactNativeBlogUtil.android
          .actionViewIntent(normalizedPath, '*/*')
          .then(()=> console.log('File opened sucessfully'))
          .catch(err => console.log("Error opening files:", err)
          )
         }

      }}
       style = {connectionStyles.openButton}>
        <CustomText numberOfLines={1} color='#fff' fontFamily='Okra-Bold'
        fontSize={9}>
          Open
        </CustomText>
      </TouchableOpacity>
    </View>
  )


  return (
    <LinearGradient 
    colors={["#FFFFFF", "#CDDAEE" ,"#8DBAFF"]}
     style = {sendStyles.container}
     start={{x : 0, y: 1}}
     end={{x : 0 , y : 0}}>
      <SafeAreaView/>

      <View style = {sendStyles.mainContainer}>
       <CustomText fontFamily='Okra-Bold'
         fontSize={15}
         color='#fff'
         style={{textAlign : "center", margin : 10}}>
        All Recieved Files
       </CustomText>
      
      { 
        isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary}/>
        ) : recievedFiles.length > 0 ?  (
          <View style = {{flex : 1}}> 
            <FlatList  data={recievedFiles}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle = {connectionStyles.fileList}/>
          </View>
        ) : (
          <View style = {connectionStyles.noDataContainer}> 
            <CustomText numberOfLines={1}
              fontFamily='Okra-Medium' 
              fontSize={11}>
                No Files recieved yet.
            </CustomText>
          </View>
        )
      }

      <TouchableOpacity onPress={goBack} style = {sendStyles.backButton}>
        <Icon name='arrow-back'
         iconFamily='Ionicons'
         size={16}
         color='#000'/>
      </TouchableOpacity>

      </View>

    </LinearGradient>
  )
}

export default RecievedFileScreen

const styles = StyleSheet.create({})









// flow

// [Screen Open]
//       ↓
// [useEffect]
//       ↓
// [getFilesFromDirectory]
//       ↓
// [Check Folder]
//    ↓        ↓
//  No        Yes
//  ↓          ↓
// Empty    Read Files
//          ↓
//      Format Data
//          ↓
//      Save to State
//          ↓
//      Loading False
