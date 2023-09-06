import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
import {useSelector} from 'react-redux';
import Product from '../Components/Product';
import CustomStatusBar from '../Components/CustomStatusBar';

const MyAccounts = () => {
  const sellerProducts = useSelector(
    state => state.commonReducer.sellerProducts,
  );
const [myOrder, setMyOrder] = useState([])
  const userData = useSelector(state => state.commonReducer.userData);
  const orderData = useSelector(state => state.commonReducer.order);
  console.log(
    '🚀 ~ file: MyAccounts.js:23 ~ MyAccounts ~ orderData:',
    orderData[0]?.order,
  );
 
  useEffect(() => {
    orderData.map(item =>
      item.order.map(
        order =>
          order?.sellerId == userData?.id &&
          setMyOrder(prev => [
            ...prev,
            {orderId: item.orderId, Image: item?.Image, ...order},
          ]),
      ),
    );

  }, [orderData])
  
  
  console.log('DATA', sellerProducts);
  return (
    <>
      <CustomStatusBar
        backgroundColor={['#CBE4E8', '#D2E4E4']}
        barStyle={'dark-content'}
      />

      <Header headerColor={['#CBE4E8', '#D2E4E4']} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
          backgroundColor: '#CBE4E8',
          minHeight: windowHeight * 0.9,
        }}>
        <View
          style={{
            width: windowWidth * 0.7,
            height: windowHeight * 0.15,
            // backgroundColor:'black',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(5, 0.6),
          }}>
          <View style={styles.profileSection}>
            <CustomImage
              source={
                userData?.photo
                  ? userData?.photo
                  : require('../Assets/Images/1.jpg')
              }
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
            />
          </View>

          <View style={{marginLeft: moderateScale(10, 0.3)}}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
              }}>
              {userData?.name}
            </CustomText>

            <CustomText
              numberOfLines={2}
              style={{
                fontSize: moderateScale(10, 0.6),
                color: Color.black,
              }}>
              {userData?.email}
            </CustomText>
          </View>
        </View>

        <View
          style={{borderBottomWidth: 1, borderColor: Color.mediumGray}}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: windowWidth,
            height: windowHeight * 0.09,
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
              }}>
              Total Products
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
              }}>
              {
                sellerProducts.filter(item => item.sellerId == userData.id)
                  .length
              }
            </CustomText>
          </View>

          <View style={{alignItems: 'center'}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
              }}>
              Total Orders
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
              }}>
              {/* {
                orderData.filter(item =>
                  item?.order?.filter(order => order.sellerId == userData?.id),
                ).length
              } */}
             {myOrder?.length}
            </CustomText>
          </View>
        </View>

        <View
          style={{borderBottomWidth: 1, borderColor: Color.mediumGray}}></View>

        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={ sellerProducts.filter(item => item.sellerId == userData.id)}
          style={{
            width: windowWidth,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            // paddingBottom: moderateScale(100, 0.3),
            paddingTop: moderateScale(20, 0.3),
          }}
          renderItem={({item, index}) => {
            return <Product item={item} seller={true} />;
          }}
          ListEmptyComponent={() => {
            return (
              <>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.4,
                    marginTop: moderateScale(30, 0.3),
                    alignSelf: 'center',
                    // backgroundColor:'red'
                  }}>
                  <CustomImage
                    source={require('../Assets/Images/4.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <CustomText
                  isBold
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: moderateScale(15, 0.6),
                    marginTop: moderateScale(-50, 0.3),
                  }}>
                  ERROR 404 DATA NOT FOUND
                </CustomText>
              </>
            );
          }}
        />
      </ScrollView>
    </>
  );
};

export default MyAccounts;

const styles = StyleSheet.create({
  profileSection: {
    height: windowHeight * 0.09,
    width: windowHeight * 0.09,
    backgroundColor: '#fff',
    borderRadius: (windowHeight * 0.09) / 2,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
