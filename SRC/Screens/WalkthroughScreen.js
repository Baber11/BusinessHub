import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import {useSelector, useDispatch} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {setWalkThrough} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const WalkThroughScreen = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      logo: require('../Assets/Images/walkthrough1.jpg'),
      title: 'What is business hub ?',
      text: `Business hub is an opportunity for small business holders, this platform will help them sell their business online in minutes. It will help sellers promote their products and services.\n\n Sellers can easily showcase their products and services & buyers will be able to make convenient purchases through the application. Business Hub aims to make your small business large, because we believe a big business starts small \n\n In summary, Business Hub is an innovative e-commerce application that brings sellers and buyers together, offering a wide range of products for purchase and rent. Its unique rental feature sets it apart from traditional e-commerce platforms. `,
    },
    {
      key: '2',
      logo: require('../Assets/Images/walkthrough2.jpg'),
      title: ' why choose us ?',
      text: `Wide Product Range: Business Hub brings together a diverse range of products from various sellers,  \n\n Trust and Safety: Business Hub prioritizes the safety and trust of its users.   \n\n Seller Opportunities: Sellers benefit from joining Business Hub as it provides them with a ready-made marketplace to showcase their products.  \n\n Customer Support: Your platform offers excellent customer support to assist users with any issues or queries they may have. `,
    },
    {
      key: '3',
      logo: require('../Assets/Images/walkthrough3.jpg'),
      title: 'Opportunity to rent your favourite stuff',
      text: `The opportunity to rent favorite items presents several benefits and advantages for users, making it an appealing feature of Business Hub. Here are some reasons why users would find this option attractive: \n\n Cost-Effectiveness: Renting favorite items allows users to enjoy them without the high upfront costs of purchasing. Whether it's electronic gadgets, sports equipment, or luxury items, renting offers a more affordable short-term solution.\n\n Space and Clutter Reduction: Owning too many items can lead to clutter and storage issues.`   },
  ];
  //   const slides = [
  //     {
  //       key: '1',
  //       title: 'Buy or Sell Residential',
  //       text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
  //       logo: require('../Assets/Images/walkthrough1.png'),
  //     },
  //     {
  //       key: '2',
  //       title: 'Buy or Sell Residential',
  //       text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
  //       logo: require('../Assets/Images/walkthrough2.png'),
  //     },
  //   ];

  const RenderSlider = ({item}) => {
    return (
      <View style={styles.SliderContainer}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={['white', 'white']}
          style={{
            width: windowWidth,
            alignItems: 'center',
            //   justifyContent: 'center',
            height: windowHeight,
          }}>
          <Image
            source={item.logo}
            resizeMode={'contain'}
            style={{height: windowHeight * 0.5}}
          />
          <View
            style={{
              width: windowWidth * 0.9,
              height: windowHeight * 0.38,
              borderRadius: moderateScale(20, 0.6),
              paddingVertical: moderateScale(26, 0.6),
              backgroundColor: Color.themeColor2,
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(20, 0.6),
                width: windowWidth * 0.8,
                textAlign: 'center',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(10, 0.6),
                width: windowWidth * 0.8,
                textAlign: 'center',
                paddingVertical: moderateScale(5, 0.6),
              }}
              numberOfLines={15}>
              {item?.text}
            </CustomText>
           
          </View>
          {/* <View
            style={{
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={4} style={styles.subText}>
              {item.text}
            </Text>
          </View> */}
        </LinearGradient>
      </View>
    );
  };

  const RenderNextBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnRight]}>Next</CustomText>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  const RenderBackBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        {/* <CustomImage
          source={backgroundImage}
          resizeMode="contain"
          style={styles.bgImage}
        /> */}
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          showSkipButton={true}
          showPrevButton={true}
          activeDotStyle={{backgroundColor: Color.themeColor2}}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.themeColor2,
          }}
          renderDoneButton={RenderDoneBtn}
          renderNextButton={RenderNextBtn}
          renderSkipButton={RenderSkipBtn}
          renderPrevButton={RenderBackBtn}
        />
      </View>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    // flex: 1,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.themeColor2,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.themeColor2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    paddingVertical: moderateScale(15, 0.3),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.themeColor2,
    paddingLeft: moderateScale(20, 0.3),
  },
  btnRight: {
    color: Color.themeColor2,
    paddingRight: moderateScale(20, 0.3),
  },
});

export default WalkThroughScreen;
const BoldText = ({ children }) => {
    return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
  };
