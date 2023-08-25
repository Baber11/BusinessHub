import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  categories: [],
  categoryProperties: [],
  financeBreakDown: [],
  cart:[],
  bookings:[],
  notification: false,
  order : [],
  sellerProducts:[],
  sellerService :[],
  selectedRole: '',
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCategoryProperties(state, action) {
      state.categoryProperties = action?.payload;
      // console.log("reduxxxx", state.categoryProperties);
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setServiceCategories(state, action) {
      state.categories = action?.payload;
    },
    setFinanceBreakDown(state, action) {
      state.financeBreakDown = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },

    AddToCart(state, action) {
      const itemId = action.payload.id;

      state.cart.push(action.payload);
    },

    RemoveToCart(state, action) {
      const itemId = action.payload.id;
      state.cart = state.cart.filter((item, index) => item.id !== itemId);
    },

    EmptyCart(State, action) {
      State.cart = [];
    },

    Order(State, action) {
      State.order.push(action.payload)
    },

    increamentQuantity(state, action) {
      const itemId = action.payload.id;
      const itemAddCart = state.cart.find(item => item.id === itemId);

      if (itemAddCart) {
        itemAddCart.qty++;
      }
    },
    decrementQuantity(state, action) {
      const itemId = action.payload.id;
      const itemAddCart = state.cart.find(item => item.id === itemId);

      if (itemAddCart) {
        if (itemAddCart.qty >= 1) {
          itemAddCart.qty--;
        } else if (itemAddCart == 1) {
          state.cart = state.cart.filter(
            (item, index) => item.id !== action.payload.id,
          );
        }
      }
    },
    setColor(state, action) {
      console.log(action.payload);
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.selectedColor = action.payload.colors;
      }
    },
    setSize(state, action) {
      console.log(action.payload);
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.selectedSize = action.payload.size;
      }
    },
    setCotton(state, action) {
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.cotton += action.payload.val;
      }
    },
    setLiked(state, action) {
      const itemId = action.payload.id;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.like = action.payload.liked;
      }
    },
    setServiceBooking(state, action){
      console.log("🚀 ~ file: common.js:116 ~ setServiceBooking ~ action:", action.payload)
      
      state.bookings.push(action.payload)

    },

    setAddProducts(state, action){
      console.log("🚀 ~ file: common.js:123 ~ setAddProducts ~ action:", action.payload)

      const item = state.sellerProducts.find(item=> item?.userId == action.payload.userId)
      if(item){
        item.products.push(action.payload.item)
      }else{
        state.sellerProducts.push({userId:action.payload.userId,products:[action.payload.item] })
      }
      

    },
    setServices(state, action){
      console.log("🚀 ~ file: common.js:116 ~ setServiceBooking ~ action:", action.payload)
      
      state.sellerService.push(action.payload)

    },

    
  },
});

export const {
  setUserData,
  setUserLogOut,
  setServiceCategories,
  setCategoryProperties,
  setFinanceBreakDown,
  setNotification,
  setSelectedRole,
  AddToCart, 
  RemoveToCart, 
  setLiked,
  setCotton, 
  setSize, 
  setColor,
  decrementQuantity, 
  increamentQuantity, 
  EmptyCart,
  setServiceBooking,
  setAddProducts,
  setServices,
  Order
} = CommonSlice.actions;

export default CommonSlice.reducer;
