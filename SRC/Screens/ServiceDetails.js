import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import {FlatList, Icon, ScrollView} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {
  AddToCart,
  decrementQuantity,
  increamentQuantity,
  setColor,
  setCotton,
  setServiceBooking,
  setSize,
} from '../Store/slices/common';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import CommentsSection from '../Components/CommentsSection';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';

const ServiceDetails = props => {
 
  const item = props?.route?.params?.item;
  console.log('🚀 ~ file: ServiceDetails.js:43 ~ ServiceDetails ~ item:', item);
  const seller = props?.route?.params?.seller;
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ file: ServiceDetails.js:48 ~ ServiceDetails ~ token:", token)
 
  const navigation = useNavigation();
  const user = useSelector(state => state.commonReducer.userData);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState(
    item?.comments ? item?.comments : [],
  );
  const [images, setImages] = useState(
    item?.service_image ? item?.service_image : item?.images,
  );
 
  const [yourComment, setYourComment] = useState('');
  const [bookingModal, setBookingModal] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState('');

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  const addComment = () => {
    if (token != null) {
      const body = {
        userName: user?.name,
        image: user?.image,
        text: yourComment,
        time: moment().format(' hh:mm:ss a'),
      };
      setComments(prev => [
        ...prev,
        {
          userName: user?.name,
          image: user?.image,
          text: yourComment,
          time: moment().format(' hh:mm:ss a'),
        },
      ]);
      setYourComment('');
    } else {
      Confirm();
    }
  };

  const BookNow = async () => {
    const url = 'auth/services/book';
    const body = {service_id: item?.id, date: date, charges: item?.charges};
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data?.success) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Your Booking request is on pending, the seller will accept/reject it soon. Please check your orders to see its status.', ToastAndroid.LONG)
        : Alert.alert('Your Booking request is on pending, the seller will accept/reject it soon. Please check your orders to see its status.');
      navigation.goBack();
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'#FDFDFD'} barStyle={'dark-content'} />
      <Header showBack={true} headerColor={['#fff', '#fff']} cart={!seller} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60, 0.3),
        }}>
        <View style={styles.banner}>
          <View style={styles.container}>
            {index > 0 && images?.length > 1 && (
              <>
                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.32,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    left: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={{
                      uri: images[index - 1]?.photo,
                    }}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index - 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: -5,
                    backgroundColor: Color.themeBlue,
                  }}>
                  <Icon name={'left'} as={AntDesign} color={'white'} />
                </TouchableOpacity>
              </>
            )}

            <View
              style={{
                width: windowWidth * 0.6,
                height: windowHeight * 0.34,
                overflow: 'hidden',
                alignSelf: 'center',
                backgroundColor: 'black',
              }}>
              <CustomImage
                source={{
                  uri:
                    images?.length == 1
                      ? images[index - 1]?.photo
                      : images[index]?.photo,
                }}
                style={{
                  height: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index < images?.length - 1 && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIndex(index + 1);
                  }}
                  style={{
                    height: moderateScale(25, 0.6),
                    width: moderateScale(25, 0.6),
                    borderRadius: moderateScale(25, 0.6) / 2,
                    alignItems: 'center',
                    zIndex: 1,
                    justifyContent: 'center',
                    right: -5,
                    backgroundColor: Color.themeBlue,
                  }}>
                  <Icon name={'right'} as={AntDesign} color={'white'} />
                </TouchableOpacity>

                <View
                  style={{
                    width: windowWidth * 0.6,
                    height: windowHeight * 0.32,
                    alignItems: 'center',
                    overflow: 'hidden',
                    alignSelf: 'center',
                    right: -170,
                    position: 'absolute',
                    backgroundColor: 'black',
                  }}>
                  <CustomImage
                    source={{
                      uri: images[index + 1]?.photo,
                    }}
                    style={{
                      height: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(10, 0.6),
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              numberOfLines={1}
              style={{
                color: '#252E2B',
                fontSize: moderateScale(18, 0.6),
                width: windowWidth * 0.4,
                textAlign: 'left',
              }}>
              {item?.shop_name ? item?.shop_name : item?.service?.shop_name}
            </CustomText>

            <CustomText
              style={{
                color: '#818181',
                width: windowWidth * 0.38,
                fontSize: moderateScale(14, 0.6),
                textAlign: 'left',
              }}
              numberOfLines={1}>
              {item?.category ? item?.category : item?.service?.category}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: moderateScale(5, 0.6),
              alignItems: 'center',
            }}>
            <CustomText
              isBold
              style={{
                color: Color.themeBlue,
                fontSize: 24,
                width: windowWidth * 0.31,
              }}>
              {item?.charges}.00 PKR
            </CustomText>
          </View>
        </View>
        <View
          style={{
            width: windowWidth * 0.95,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.3),
            borderRadius: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Description
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            {item?.description ? item?.description : item?.service?.description}
          </CustomText>
        </View>
        {!seller &&  <View
          style={{
            width: windowWidth * 0.95,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: moderateScale(10, 0.3),
            borderRadius: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(14, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
           About Seller 
          </CustomText>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Name : 
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              {item?.seller_info[0]?.name}
            </CustomText>
          </CustomText>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Phone : 
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              {item?.seller_info[0]?.phone}
            </CustomText>
            
          </CustomText>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            Email : 
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
               {item?.seller_info[0]?.email}
            </CustomText>
         
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              color: '#201E1D',
              width: windowWidth * 0.9,
              marginLeft: moderateScale(10, 0.3),
            }}>
            {item?.seller_info ? item?.se : item?.service?.description}
          </CustomText>
        </View>}

        {!seller && (
          <View style={styles.container2}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              Book a date
            </CustomText>
            <Calendar
              style={{
                width: windowWidth * 0.8,
                marginBottom: moderateScale(40, 0.3),
              }}
              minDate={moment().format()}
              onDayPress={day => {
               
                setDate(day?.dateString);
              }}
              theme={{
                textSectionTitleColor: Color.themeBlue,
                selectedDayBackgroundColor: Color.themeBlue,
                selectedDayTextColor: Color.white,
                todayTextColor: Color.themeBlue,
                dayTextColor: Color.black,
                dayTextColor: Color.black,
                textDisabledColor: '#d9e1e8',
                arrowColor: Color.themeBlue,
                monthTextColor: Color.veryLightGray,
                indicatorColor: Color.themeBlue,
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: moderateScale(12, 0.3),
                textMonthFontSize: moderateScale(16, 0.3),
                textDayHeaderFontSize: moderateScale(14, 0.3),
              }}
              markedDates={{
                ...{
                  [date]: {
                    selected: true,
                    color: Color.themeBlue,
                    textColor: '#000000',
                    marked: true,
                  },
                },
              }}
            />
          </View>
        )}
        {item?.user_info &&  <View
            style={{
              width: windowWidth * 0.95,
              borderRadius: moderateScale(10, 0.6),
              paddingHorizontal: moderateScale(15, 0.6),
              paddingVertical: moderateScale(10, 0.6),
              backgroundColor: 'white',
              marginTop: moderateScale(10, 0.3),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: 'black',
                textAlign: 'left',
                width: windowWidth * 0.9,
              }}
              isBold>
              Buyer details
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }} isBold>
              Name : {item?.user_info?.name}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }} isBold>
              Email : {item?.user_info?.email}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }} isBold>
              Contact : {item?.user_info?.phone}
            </CustomText>
           {item?.pickup_point && <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'black',
                textAlign: 'left',
                marginTop: moderateScale(5, 0.3),
                width: windowWidth * 0.9,
              }} isBold>
              Address : {item?.pickup_point}
            </CustomText>}
          </View>}

        {seller && item?.date && (
          <View style={styles.container2}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(14, 0.6),
                marginTop: moderateScale(10, 0.3),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              Booking Date
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(14, 0.6),
                color: '#201E1D',
                width: windowWidth * 0.9,
                marginLeft: moderateScale(10, 0.3),
              }}>
              {item?.date}
            </CustomText>
          </View>
        )}


         
        

      </ScrollView>

      {!seller && (
        <View style={styles.bottomContainer}>
          <CustomButton
            isBold
            onPress={() => {
              if (token == null) {
                Confirm();
              } else {
                if (date == '') {
                  return Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Please select a date',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('Please select a date');
                } else {
                  BookNow();
                }
              }
            }}
            text={'Book Now'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            fontSize={moderateScale(16, 0.6)}
            bgColor={Color.themeBlue}
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
      )}
    </>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container2: {
    width: windowWidth * 0.95,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: moderateScale(5, 0.3),
    borderRadius: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    alignItems: 'center',
  },
  size: {
    height: windowWidth * 0.08,
    alignItems: 'center',
    width: windowWidth * 0.08,
    borderRadius: (windowWidth * 0.1) / 2,
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.08,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: 'white',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: moderateScale(10, 0.3),
    shadowColor: '#0000000A',
    shadowOffset: {width: 0, height: 2},
  },

  conterContainer: {
    width: windowWidth * 0.27,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: moderateScale(5, 0.6),
  },

  ColorLine: {
    flexDirection: 'row',
  
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
