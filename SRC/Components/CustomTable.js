import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
// import {windowHeight, windowWidth} from '../Assets/Utilities/Utils';
import CustomText from './CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import Color from '../Assets/Utilities/Color';
import numeral from 'numeral';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const CustomTable = ({
  data,
  tableFields,
  customStyle,
  headingStyle,
  dataStyle,
  onPress,
  setData ,
}) => {
  const token = useSelector(state=>state.authReducer.token)

  const actionPreform = async(item , index )=>{
    const url = 'auth/user/update'
    const statusToBe = item?.status == 'active' ? 'inactive' : 'active'
    const body ={ 
      id : item?.id,
      status : statusToBe
    }
  // console.log("🚀 ~ file: CustomTable.js:32 ~ actionPreform ~ body:", body  ,index)
    const response = await Post(url , body , apiHeader(token))
    if(response?.data?.success){
      console.log('response' , response?.data)
      setData((prev)=>[...prev],(data[index].status = statusToBe))
    }

  }

  
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
        renderItem={(item, index1) => {
          // console.log("🚀 ~ file: CustomTable.js:101 ~ index1:", item , index1)
            const data1 = {name:item?.item?.name, Contact:item?.item?.phone, role: item?.item?.role, status: item?.item?.status}
          return (
            <TouchableOpacity
            key={index1}
              activeOpacity={0.9}
              onPress={onPress && onPress}
              style={styles.row}
            >
              {Object.keys(data1).map((x, index) => {
                return(

                x == 'status' ?
                
                <CustomButton
                isBold
                text={data1[x] == 'active' ? 'Deactiveate' : 'Activate'}
                textColor={Color.white}
                width={windowWidth * 0.18}
                marginTop={moderateScale(10,.3)}
                marginBottom={moderateScale(10,.3)}
                height={windowHeight * 0.04}
                bgColor={data1[x] == 'active' ? Color.red : 'green'}
                fontSize={moderateScale(9,.6)}
                borderRadius={moderateScale(5, 0.3)}
                marginRight={moderateScale(5, 0.3)}
                onPress={()=>{
                  console.log(item?.id)
                  actionPreform(item?.item ,item?.index )
                }}

              />
                
                :
              

                  <CustomText
                    numberOfLines={2}
                    style={[styles.text, dataStyle && dataStyle]}
                  >
                    {typeof data[x] == 'number'
                      ? numeral(data1[x]).format('$0,0a')
                      : data1[x]  }
                  </CustomText>
                )
              }
              )}
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
    marginTop: moderateScale(20, 0.3),
    backgroundColor: 'rgba(3, 59, 65,0.3)',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(10, 0.3),
  },
  text: {
    // fontWeight : 'bold',
    color: '#000',
    // textAlign: 'flex-start',
    textAlign: 'center',
  },
  header: {
    height: windowHeight * 0.1,
    backgroundColor: '#033b41',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(5, 0.3),
  },
});
