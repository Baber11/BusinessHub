import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import Signup from './Screens/Signup';
import ChangePassword from './Screens/ChangePassword';
// import HomeScreen from './Screens/HomeScreen';
import LogoScreen from './Screens/LogoScreen';
import GetStarted from './Screens/GetStarted';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Color from './Assets/Utilities/Color';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import HomeScreen from './Screens/HomeScreen';
import Drawer from './Drawer/Drawer';
import AdminDashboard from './Screens/AdminDashboard';
import CustomerDashboard from './Screens/CustomerDashboard';
import ProductDetails from './Screens/ProductDetails';
import CartScreen from './Screens/CartScreen';
import Orders from './Screens/Orders';
import OrderDetails from './Screens/OrderDetails';
import SellerProduct from './Screens/SellerProducts';
import AddProduct from './Screens/AddProduct';
import AddServices from './Screens/AddServices';
import ServiceDetails from './Screens/ServiceDetails';
import Bookings from './Screens/Bookings';
import Myorders from './Screens/Myorders';
import OrderDetailScreen from './Screens/OrderDetailScreen';


const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  console.log('🚀 ~ file: appNavigation.js:31 ~ AppNavigator ~ role:', role);

  console.log(
    '🚀 ~ file: appNavigation.js:27 ~ AppNavigator ~ walkThrough:',
    walkThrough,
  );

  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: appNavigation.js:33 ~ AppNavigator ~ token:', token);

  // console.log('token>>>>', token);
  // console.log('isVerified', isGoalCreated);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const HomeScreen =
      role == 'admin'
        ? 'MyDrawer'
        : role == 'customer'
        ? 'HomeScreenOther'
        : 'HomeScreenOther';
    const firstScreen =
      token != null
        ? 'MyDrawer'
        : !walkThrough && token != null
        ? 'WalkThroughScreen'
        : 'GetStarted';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          {/* <RootNav.Screen name="SellerProduct" component={SellerProduct} /> */}
          <RootNav.Screen name="AddProduct" component={AddProduct} />
          {/* <RootNav.Screen name="HomeScreen" component={HomeScreen} /> */}
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="ProductDetails" component={ProductDetails} />
          <RootNav.Screen name="AddServices" component={AddServices} />
          <RootNav.Screen name="ServiceDetails" component={ServiceDetails} />
          <RootNav.Screen name="OrderDetails" component={OrderDetails} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="CartScreen" component={CartScreen} />
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
          <RootNav.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
        
          {/* <RootNav.Screen name="HomeScreenOther" component={HomeScreenOther} /> */}
          {/* <RootNav.Screen name="CustomerDashboard" component={CustomerDashboard} /> */}
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const role = useSelector(state => state.authReducer.role);
  const firstScreen =
    role == 'admin'
      ? 'HomeScreen'
      : role == 'vendor'
      ? 'Orders'
      : 'CustomerDashboard';

  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={firstScreen}
      screenOptions={{
        headerShown: false,
      }}>
        <DrawerNavigation.Screen
        name="CustomerDashboard"
        component={CustomerDashboard}
      />
      <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />

      <DrawerNavigation.Screen name="Orders" component={Orders} />
      {/* <DrawerNavigation.Screen name="Bookings" component={Bookings} /> */}

      <DrawerNavigation.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
        <DrawerNavigation.Screen
        name="Myorders"
        component={Myorders}
       
      />
      

      <DrawerNavigation.Screen
        name="AdminDashboard"
        component={AdminDashboard}
      />
      <DrawerNavigation.Screen name="SellerProduct" component={SellerProduct} />

      
      
       
    </DrawerNavigation.Navigator>
  );
};
export default AppNavigator;
