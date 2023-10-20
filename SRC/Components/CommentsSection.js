import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import moment from 'moment';

const CommentsSection = ({item}) => {
  // console.log("🚀 ~ file: CommentsSection.js:10 ~ CommentsSection ~ item:", item)
  return (
    <View
      style={{
        flexDirection: 'row',
        width: windowWidth * 0.9,

        marginTop: moderateScale(10, 0.3),
        // backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: moderateScale(20, 0.6),
        // marginLeft: moderateScale(15, 0.3),
      }}>
      <View style={styles.Profile}>
        <CustomImage
          resizeMode={'cover'}
          source={{uri: item?.user?.photo}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={{marginLeft: moderateScale(10, 0.3)}}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(12, 0.6),
            color: '#201E1D',
            width: windowWidth * 0.4,
          }}>
          {item?.user?.name}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(10, 0.6),
            color: '#201E1D',
            //   backgroundColor:'red',
            width: windowWidth * 0.78,
          }}>
          {item?.description}
        </CustomText>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 10,
          top: 2,
          // backgroundColor: 'red',
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(10, 0.6),
            color: 'gray',
            //   backgroundColor:'red',
            // width: windowWidth * 0.78,
          }}>
         {moment(item?.created_at).fromNow()}
     
        </CustomText>
      </View>
    </View>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
});
