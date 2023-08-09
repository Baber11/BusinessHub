import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
// import {windowHeight, windowWidth} from '../Assets/Utilities/Utils';
import CustomText from './CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import Color from '../Assets/Utilities/Color';
import numeral from 'numeral';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';

const CustomTable = ({
  data,
  tableFields,
  customStyle,
  headingStyle,
  dataStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          //   backgroundColor: 'red',
        }}
        data={data}
        renderItem={({item, index}) => {
            const data = {name:item?.name, Contact:item?.phone, Status: item?.role, Address: item?.address}
          return (
            <TouchableOpacity
            key={index}
              activeOpacity={0.9}
              onPress={onPress && onPress}
              style={styles.row}
            >
              {Object.keys(data).map((x, index) => {
                return (
                  <CustomText
                    numberOfLines={2}
                    style={[styles.text, dataStyle && dataStyle]}
                  >
                    {typeof data[x] == 'number'
                      ? numeral(data[x]).format('$0,0a')
                      : data[x]}
                  </CustomText>
                );
              })}
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              {tableFields.map((x, index) => {
                return (
                  <CustomText
                    numberOfLines={2}
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                        fontSize: moderateScale(15, 0.3),
                        fontWeight: '600',
                      },
                      headingStyle && headingStyle,
                    ]}
                    isBold
                  >
                    {x}
                  </CustomText>
                );
              })}
            </View>
          );
        }}
        ListEmptyComponent={()=>{
          return(

            <View style={{
              width : windowWidth ,
              height : windowHeight * 0.4 ,
              justifyContent : 'center',
              alignItems : 'center',
              // backgroundColor : 'green'
            }}>
               {/* <CustomImage
              resizeMode={'contain'}
              source={require('../Assets/Images/notfound.png')}
              style={{
                width: windowWidth * 0.5,
                height: windowHeight * 0.2,
                // backgroundColor : 'red',
                alignSelf: 'center',
              }}
              /> */}
              <CustomText style={{
                fontSize : moderateScale(16,0.3),
                color : Color.black
                
                // backgroundColor : 'yellow'
            }}>No users yet</CustomText>
          </View>
            )
        }}

      />
    </View>
  );
};

export default CustomTable;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20, 0.3),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: moderateScale(20, 0.3),
    width: windowWidth * 0.9,
    alignSelf: 'center',
    height: windowHeight * 0.6,
    // paddingVertical: moderateScale(10, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  row: {
    height: windowHeight * 0.05,
    marginBottom: moderateScale(20, 0.3),
    backgroundColor: 'rgba(247, 156, 0,0.2)',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(10, 0.3),
  },
  text: {
    color: '#8D8D8D',
    // textAlign: 'flex-start',
    textAlign: 'center',
  },
  header: {
    height: windowHeight * 0.1,
    backgroundColor: Color.yellow,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(5, 0.3),
  },
});
