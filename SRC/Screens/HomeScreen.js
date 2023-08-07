import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import SearchContainer from '../Components/SearchContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, Icon, ScrollView} from 'native-base';
import PlacesCard from '../Components/PlacesCard';
import WelcomeCard from '../Components/WelcomeCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const places = ['Shopping', 'Restaurant'];
  const cardData = [
    {
      heading: 'Welcome',
      title: 'Lorem Ipsum Dolor',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
      color: ['#4B9CD3', '#4682B4', '#4F97A3'],
      image: require('../Assets/Images/Location.png'),
    },
    {
      heading: 'Lorem Ipsum',
      title: 'Lorem Ipsum Dolor',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
      color: ['#ED9121', '#f8de7e', '#f4c430'],
      image: require('../Assets/Images/Location.png'),
    },
  ];

  const locations = [
    {
      image: require('../Assets/Images/Bg1.png'),
      name: `Mcdonald's`,
      distance: '1.5 miles',
      onPress: () => {},
    },
    {
      image: require('../Assets/Images/Bg2.png'),
      name: `Mcdonald's`,
      distance: '1.5 miles',
      onPress: () => {},
    },
    {
      image: require('../Assets/Images/Bg3.png'),
      name: 'Bar',
      distance: '1.5 miles',
      onPress: () => {},
    },
    {
      image: require('../Assets/Images/Bg4.png'),
      name: 'Cinema',
      distance: '1.5 miles',
      onPress: () => {},
    },
    {
      image: require('../Assets/Images/Bg5.png'),
      name: 'Mall',
      distance: '1.5 miles',
      onPress: () => {},
    },
    {
      image: require('../Assets/Images/Bg6.png'),
      name: `Mcdonald's`,
      distance: '1.5 miles',
      onPress: () => {},
    },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'#f8de7e'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
          //   justifyContent:'center'
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={Color.themeBgColor}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={styles.placesContainer}>
            {places.map(item => {
              return <CustomText style={styles.text}>{item}</CustomText>;
            })}
          </View>
          <View
            style={styles.search}>
            <SearchContainer
              width={windowWidth * 0.82}
              input
              inputStyle={{
                height: windowHeight * 0.05,
              }}
              style={{
                height: windowHeight * 0.06,
                //   marginTop: moderateScale(13, 0.3),
                marginRight: moderateScale(5, 0.3),
                borderRadius: moderateScale(25, 0.3),
                alignSelf: 'center',
              }}
              data={searchData}
              placeHolder={'Enter your Location'}
              setData={setSearchData}
              rightIcon
            />
            <View style={styles.menuIcon}>
              <Icon as={Ionicons} name={'menu'} color={Color.black} size={6} onPress={()=>{
                navigation.toggleDrawer()
              }} />
            </View>
          </View>

          <View
            style={{flexDirection: 'row', marginTop: moderateScale(10, 0.3)}}>
            <FlatList
              data={cardData}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: moderateScale(10, 0.3),
                height: windowHeight * 0.25,
              }}
              renderItem={({item, index}) => {
                return (
                 <WelcomeCard item={item}/>
                );
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <CustomText
              style={{fontSize: moderateScale(15, 0.6), color: Color.black}}
              onPress={() => {}}
              isBold>
              Places
            </CustomText>
            <CustomText
              onPress={() => {}}
              style={{fontSize: moderateScale(10, 0.6), color: Color.black}}>
              View All
            </CustomText>
          </View>

          <FlatList
            data={locations}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              //   alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
              marginBottom: moderateScale(20, 0.3),
              //   backgroundColor:'black',
              //   height: windowHeight * 0.25,
            }}
            renderItem={({item, index}) => {
              return <PlacesCard item={item} />;
            }}
          />
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },
  text: {
    borderRadius: moderateScale(20, 0.6),
    padding: moderateScale(10, 0.6),
    margin: moderateScale(2, 0.3),
    backgroundColor: Color.white,
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
    width: windowWidth * 0.25,
    textAlign: 'center',
  },
  menuIcon: {
    backgroundColor: Color.themeColor,
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: (windowWidth * 0.11) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
 

 

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
    marginTop: moderateScale(10, 0.3),
    width: windowWidth,
  },
  
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
  search:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  placesContainer:{
    flexDirection: 'row',
    marginTop: moderateScale(10, 0.3),
    justifyContent: 'flex-start',
    marginLeft: moderateScale(10, 0.3),
  }
});

export default HomeScreen;
