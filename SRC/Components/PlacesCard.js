import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import CustomText from './CustomText'
import CustomImage from './CustomImage'
import { moderateScale } from 'react-native-size-matters'

const PlacesCard = ({item}) => {
  console.log("🚀 ~ file: PlacesCard.js:10 ~ PlacesCard ~ item:", item)
  return (
    <View
    style={styles.container}>
    <View style={styles.listImg}>
      <CustomImage
        source={item?.image}
        style={{width: '100%', height: '100%'}}
      />
    </View>
    <View style={{width:windowWidth*0.45}}>
      <CustomText
        style={{fontSize: moderateScale(12, 0.6), color: Color.black}}
        numberOfLines={1}
        isBold>
       {item?.name}
      </CustomText>
      <CustomText
        style={{fontSize: moderateScale(10, 0.6), color: Color.black}}
        numberOfLines={1}
        isBold>
        {item?.distance}
      </CustomText>
    </View>
    <CustomText
     onPress={item?.onPress}
      style={styles.viewLocation}>
      View Location
    </CustomText>
  </View>
  )
}

export default PlacesCard

const styles = StyleSheet.create({
    container:{
        width: windowWidth * 0.95,
        height: windowHeight * 0.11,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: moderateScale(20, 0.6),
        marginBottom:moderateScale(10,.3)
      },
      listImg: {
        height: windowHeight * 0.15,
        width: windowWidth * 0.19,
        marginLeft: moderateScale(5, 0.3),
        borderRadius: moderateScale(10, 0.6),
        paddingVertical: moderateScale(20, 0.6),
      },
      viewLocation:{
        fontSize: moderateScale(8, 0.6),
        color: Color.black,
        borderColor: Color.themeColor,
        borderWidth: 1,
        padding: moderateScale(5, 0.6),
        borderRadius: moderateScale(20, 0.6),
        textAlign:'center',
        marginRight:moderateScale(10,.3)
      }
})