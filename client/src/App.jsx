import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import { useAuthContext } from './hooks/useAuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Addition from "./pages/Addition";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/Profile";
import AddExchangeItem from "./pages/AddExchangeItem";
import AddRentItem from "./pages/AddRentItem";
import AddSellItem from "./pages/AddSellItem";
import EditProfile from "./pages/EditProfile";
import MyOrders from "./pages/MyOrders";
import PendingRequests from "./pages/PendingRequests";
import Pendingrequest from "./pages/Pendingrequest"
import RequestsExchange from "./pages/RequestsExchange";
import MyexchangeRentproducts from "./pages/MyExchangeRentproducts";
import Myproducts from "./pages/Myproducts"

import { BrowserRouter as Router, Routes, Route, Redirect, Navigate } from "react-router-dom";



const App = () => {


   const { user } = useAuthContext()
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>

        <Route path="/products/:category" element={<ProductList/>}>
        </Route>

        <Route path="/ProductList" element={<Home/>}>
        </Route>

        <Route path="/product/:id" element={<Product/>}>          
        </Route>

        <Route path="/cart" element={<Cart/>}>
        </Route>

        <Route path="/Profile" element={<Profile/>}>
        </Route>

        <Route path="/AddExchangeItem" element={<AddExchangeItem/>}>
        </Route>

        <Route path="/AddRentItem" element={<AddRentItem/>}>
        </Route>

        <Route path="/AddSellItem" element={<AddSellItem/>}>
        </Route>

        <Route path="/EditProfile" element={<EditProfile/>}>
        </Route>

        <Route path="/MyOrders" element={<MyOrders/>}>
        </Route>

        <Route path="/PendingRequests" element={<PendingRequests/>}>
        </Route>

        <Route path="/RequestsExchange" element={ <RequestsExchange/> }>
        </Route>

        <Route path="/RequestsExchanges" element={ <RequestsExchange/> }>
        </Route>

        <Route path="/pendingrequest" element={ <Pendingrequest/> }>
        </Route>

        <Route path="/Myrentexchange" element={<MyexchangeRentproducts/>}>
        </Route>

        <Route path="/myproducts" element={ <Myproducts/> }>
        </Route>

        <Route 
              path="/login" 
              // element={<Login /> } 
              element={!user ? <Login /> : <Navigate to="/" />} 
            > 
        </Route>

        <Route 
              path="/signup"
              // element={<Signup /> } 
              element={!user ? <Signup /> : <Navigate to="/" />} 
         > 
         </Route>
        
        <Route path="/addition" element={ <Addition/> }></Route>

        <Route path="/messege"
          element={  <Messenger />}>
        </Route>
        

        {/* <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route> */}

      </Routes>
    </Router>
  );
};

export default App;
