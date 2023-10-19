import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import {ToastAndroid, ActivityIndicator} from 'react-native';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import navigationService from '../navigationService';
import Modal from 'react-native-modal'

const PickupModal = ({isModalVisible ,setIsModalVisible , data , setData}) => {

    const sizesArray = [
        'Block-A',
        'Block-B',
        'Block-C',
        'Block-D',
        'Block-E',
        'Block-F',
        'Block-G',
        'Others'
      ];
  return (
    <Modal
    isVisible={isModalVisible}
    swipeDirection="up"
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onBackdropPress={()=>{
        setIsModalVisible(false)
    }}
    >
        <View style={styles.banner}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: moderateScale(10, 0.3),

              width: windowWidth * 0.95,
              flexWrap: 'wrap',
              // paddingHorizontal: moderateScale(10, 0.6),
            }}></View>
          <CustomText
            style={{fontSize: moderateScale(15, 0.6), color: 'black'}}
            isBold>
            Select PickUp Location
          </CustomText>

          <DropDownSingleSelect
            array={sizesArray}
            item={data}
            setItem={setData}
            placeholder={'Pick up location'}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            // backgroundColor={Color.purple}
            dropdownStyle={{
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
              // backgroundColor : 'red'
            }}
            borderColor={Color.lightGrey}
            elevation
            // backgroundColor={'white'}
          />
          <CustomButton
            isBold
            onPress={() => {
             setIsModalVisible(false)
            }}
            text={
             'Confirm'
          
            }
            textColor={Color.white}
            width={windowWidth * 0.5}
            height={windowHeight * 0.07}
            fontSize={moderateScale(16, 0.6)}
            // marginBottom={moderateScale(10,.3)}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.themeBlue}
            borderRadius={moderateScale(30, 0.3)}
            // isGradient
          />
        </View>
    </Modal>
  )
}

export default PickupModal

const styles = StyleSheet.create({
    size: {
      height: windowWidth * 0.08,
      alignItems: 'center',
      // backgroundColor:'red',
      width: windowWidth * 0.08,
      borderRadius: (windowWidth * 0.1) / 2,
      justifyContent: 'center',
    },
    bottomContainer: {
      position: 'absolute',
      width: windowWidth,
      height: windowHeight * 0.08,
      backgroundColor: '#FFFFFF',
      //  alignItems:'center',
      bottom: 0,
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'row',
      height: windowHeight * 0.35,
      width: windowWidth,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    colorContainer: {
      height: windowWidth * 0.08,
      width: windowWidth * 0.08,
      borderRadius: (windowWidth * 0.1) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: moderateScale(15, 0.3),
    },
    icon: {
      width: windowWidth * 0.06,
      height: windowWidth * 0.06,
      borderRadius: (windowWidth * 0.06) / 2,
      backgroundColor: Color.themeBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    banner: {
      width: windowWidth * 0.95,
      // height: windowHeight * 0.8,
      backgroundColor: 'white',
      alignSelf: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 10,
      marginTop: moderateScale(10, 0.3),
      shadowColor: '#0000000A',
      shadowOffset: {width: 0, height: 2},
      paddingVertical: moderateScale(20, 0.6),
    },
  
    conterContainer: {
      width: windowWidth * 0.27,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: moderateScale(5, 0.6),
      // backgroundColor:'black'
    },
  
    ColorLine: {
      flexDirection: 'row',
      // justifyContent: 'space-evenly',
      // alignItems: 'center',
      // flexWrap:'no-wrap',
      // width: windowWidth * 0.8,
      marginTop: moderateScale(15, 0.3),
      marginBottom: moderateScale(15, 0.3),
    },
  
    ColorLine1: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: windowWidth * 0.7,
      marginTop: moderateScale(15, 0.3),
      marginBottom: moderateScale(15, 0.3),
    },
  
    bottomBanner: {
      width: windowWidth,
      height: windowHeight * 0.13,
      position: 'absolute',
      bottom: moderateScale(0, 0.3),
      backgroundColor: '#fff',
      elevation: 1,
    },
  });