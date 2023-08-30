import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
// import {windowHeight, windowWidth} from '../Assets/Utilities/Utils';
import CustomText from './CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import Color from '../Assets/Utilities/Color';
import numeral from 'numeral';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomButton from './CustomButton';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import SearchbarComponent from './SearchbarComponent';
import { useIsFocused } from '@react-navigation/native';

const CustomTable = ({
  data,
  tableFields,
  customStyle,
  headingStyle,
  dataStyle,
  onPress,
  setData,
}) => {
  const isFocused = useIsFocused()
  console.log("🚀 ~ file: CustomTable.js:32 ~ data:", data)
  const [newData, setNewData] = useState([]);
  console.log("🚀 ~ file: CustomTable.js:33 ~ newData:", newData)
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Buyer');
  const token = useSelector(state => state.authReducer.token);
  


  const actionPreform = async (item, index) => {
    const url = 'auth/user/update';
    const statusToBe = item?.status == 'active' ? 'inactive' : 'active';
    const body = {
      id: item?.id,
      status: statusToBe,
    };
    // console.log("🚀 ~ file: CustomTable.js:32 ~ actionPreform ~ body:", body  ,index)
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response?.data?.success) {
      console.log('response', response?.data);
      setData(prev => [...prev], (data[index].status = statusToBe));
    }
  };


  

  // console.log('OSAMA ==>>>>', data);
  useEffect(() => {
    if(data){
      setNewData(data)
    }
  }, [isFocused , data])
  

  return (
    <>
      <View
        style={{
          // height : windowHeight * 0.1,
          flexDirection: 'row',
          // alignItems : 'center',
          // backgroundColor : 'red',
          marginTop : moderateScale(20,0.3),
          width : windowWidth * 0.95,
         justifyContent : 'space-between',
         alignSelf : 'center',
         alignItems : 'center'

        }}>
        <SearchbarComponent
          setNewData={setNewData}
          placeHolderColor={'#000'}
          placeholderName={'Search User Name'}
          array={data}
          arrayItem={'User'}
          fontSize={13}
          SearchStyle={{width: windowWidth * 0.7,
          
          borderColor : '#033b41'}}
        />

        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.2,
            borderWidth: 1,
            borderColor: '#033b41',
            // alignSelf: 'flex-end',
            justifyContent: 'space-between',
            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
            // marginTop: moderateScale(20, 0.3),
            // marginRight: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              width: windowWidth * 0.1,
              textAlign: 'center',
              paddingVertical: moderateScale(10, 0.6),
              fontSize: moderateScale(10, 0.6),
              // borderRadius: moderateScale(10, 0.6),
              color: selectedTab == 'Buyer' ? 'white' : '#033b41',
              backgroundColor:
                selectedTab == 'Buyer' ? '#033b41' : 'transparent',
            }}
            onPress={() => {
              setSelectedTab('Buyer');
            }}>
            Buyer
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.1,
              // borderRadius: moderateScale(10, 0.6),
              paddingVertical: moderateScale(10, 0.6),
              fontSize: moderateScale(10, 0.6),
              textAlign: 'center',
              color: selectedTab == 'Seller' ? 'white' : '#033b41',
              backgroundColor:
                selectedTab == 'Seller' ? '#033b41' : 'transparent',
            }}
            onPress={() => {
              setSelectedTab('Seller');
            }}>
            Seller
          </CustomText>
        </View>
      </View>
      <View style={[styles.container, customStyle && customStyle]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          contentContainerStyle={{
            // paddingBottom: moderateScale(20, 0.3),
          }}
          data={ newData.filter(data =>
            selectedTab == 'Buyer'
              ? data?.role.toLowerCase() == 'vendor'
              : data?.role.toLowerCase() == 'customer',
          )}
          renderItem={(item, index1) => {
            // console.log("🚀 ~ file: CustomTable.js:101 ~ index1:", item , index1)
            const data1 = {
              name: item?.item?.name,
              email: item?.item?.email,
              // role: item?.item?.role,
              status: item?.item?.status,
            };
            return (
              <TouchableOpacity
                key={index1}
                activeOpacity={0.9}
                onPress={onPress && onPress}
                style={styles.row}>
                {Object.keys(data1).map((x, index) => {
                  return x == 'status' ? (
                    <View style={{
                      width : windowWidth * 0.3 ,
                      // alignItems : 'flex-end',
                      // backgroundColor : 'green'
                    }}> 
                      
                    <CustomButton
                      isBold
                      text={data1[x] == 'active' ? 'Deactivate' : 'Activate'}
                      textColor={Color.white}
                      // width={windowWidth * 0.2}
                      marginTop={moderateScale(10, 0.3)}
                      marginBottom={moderateScale(10, 0.3)}
                      height={windowHeight * 0.04}
                      bgColor={data1[x] == 'active' ? Color.red : 'green'}
                      fontSize={moderateScale(9, 0.6)}
                      borderRadius={moderateScale(5, 0.3)}
                      marginRight={moderateScale(5, 0.3)}
                      onPress={() => {
                        console.log(item?.id);
                        actionPreform(item?.item, item?.index);
                      }}
                      disabled={loading}
                      alignSelf ={'flex-end'}
                    />
                      </View>
                  ) : (
                    <CustomText
                      numberOfLines={2}
                      style={[styles.text, dataStyle && dataStyle]}>
                      {typeof data[x] == 'number'
                        ? numeral(data1[x]).format('$0,0a')
                        : data1[x]}
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
                      isBold>
                      {x}
                    </CustomText>
                  );
                })}
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
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
                <CustomText
                  style={{
                    fontSize: moderateScale(16, 0.3),
                    color: Color.black,

                    // backgroundColor : 'yellow'
                  }}>
                  No users yet
                </CustomText>
              </View>
            );
          }}
        />
      </View>
    
    </>
  );
};

export default CustomTable;

const styles = StyleSheet.create({
  container: {
    // marginTop: moderateScale(5, 0.3),
    overflow: 'hidden',
    backgroundColor: 'white',
    // borderRadius: moderateScale(5, 0.3),
    width: windowWidth * 0.9,
    alignSelf: 'center',
    // height: windowHeight * 0.6,
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
    // backgroundColor : 'red'
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
