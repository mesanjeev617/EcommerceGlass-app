import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
//import Product from './components/Product';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import ChatBox from './components/ChatBox';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import SupportScreen from './screens/SupportScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';


function App() {
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    const userSignin = useSelector((state)=>state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
      };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          
          <div>
            <Link className="brand" to="/">
              grocery
            </Link>
          </div>
          <div>
            <SearchBox />
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </header>
        
            <main>

            <Routes>
            <Route path="/cart" element={<CartScreen/>}></Route>
            <Route path="/cart/:id" element={<CartScreen/>}></Route>
            <Route path="/product/:id" element={<ProductScreen/>} exact></Route>
            <Route path="/product/:id/edit" element={<ProductEditScreen/>} exact></Route>
            <Route path="/signin" element={<SigninScreen/>}></Route>
            <Route path="/register" element={<RegisterScreen/>}></Route>
            <Route path="/signin/shipping" element={<ShippingAddressScreen/>}></Route>
            <Route path="/signin/payment" element={<PaymentMethodScreen/>}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
            <Route path="/order/:id" element={<OrderScreen/>}></Route>
            <Route path="/search/name" element={<SearchScreen/>} exact></Route>
            <Route path="/search/name/:name" element={<SearchScreen/>} exact></Route>
            <Route path='/profile' element={<PrivateRoute><ProfileScreen/></PrivateRoute>}></Route>
            <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
            <Route path="/" element={<HomeScreen/>} exact></Route>
            <Route path='/productlist' element={<AdminRoute><ProductListScreen/></AdminRoute>}></Route>
            <Route path='/orderlist' element={<AdminRoute><OrderListScreen/></AdminRoute>}></Route>
            <Route path='/support' element={<AdminRoute><SupportScreen/></AdminRoute>}></Route>
            <Route path='/userList' element={<AdminRoute><UserListScreen/></AdminRoute>}></Route>
            <Route path='/user/:id/edit' element={<AdminRoute><UserEditScreen/></AdminRoute>}></Route>

            

            </Routes>
            </main>
            <footer className="row center">
              {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}/>}
                Sanjeev Welcomes You.
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
