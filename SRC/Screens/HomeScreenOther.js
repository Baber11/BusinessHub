import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomText from '../Components/CustomText'
import { setUserLogoutAuth } from '../Store/slices/auth'
import { setUserLogOut } from '../Store/slices/common'
import { useDispatch } from 'react-redux'

const HomeScreenOther = () => {
    const dispatch = useDispatch()
  return (
    <View style={{
        width : windowWidth,
        height : windowHeight ,
        alignItems : 'center',
        justifyContent : 'center',
    }}>
      <CustomText>Work in progress</CustomText>
      <CustomText 
        onPress ={ () => {
            dispatch(setUserLogoutAuth())
            dispatch(setUserLogOut())
            }}
      >press here for Log out</CustomText>
    </View>
  )
}

export default HomeScreenOther

const styles = StyleSheet.create({})