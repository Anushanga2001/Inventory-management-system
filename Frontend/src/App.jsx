import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';

// Layout component
import Owner from './Owner';
import Stockmanager from './Stockmanager';
import Salesrep from './Salesrep';
// Navigation bars


// 1st navigation bar pages
import Addusers from './pages/Owner/Addusers';
import Companyorders from './pages/Companyorders';
import Reports from './pages/Owner/Reports';
import Register from './pages/Owner/Register';

// 2nd navigation bar pages
import Additems from './pages/Stockmanager/Additems';
import Addnewitems from './pages/Stockmanager/Addnewitems';
import Placecompanyorders from './pages/Placecompanyorders';
import Notification from './pages/Stockmanager/Notification';

// 3rd navigation bar pages
import Placeshoporders from './pages/Salesrep/Placeshoporders';
import Map from './pages/Salesrep/Map';

// common pages
import Edit from './pages/Edit';
import Changeselect from './pages/Changeselect';
import Changepassword from './pages/Changepassword';
import Updateprofile from './pages/Updateprofile';
import DynamicShoporders from './pages/DynamicShoporders';
import Dynamiccompanyorders from './pages/Dynamiccompanyorders';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Availability from './pages/Availability';
import Shoporders from './pages/Shoporders';
import Shoporders1 from './pages/Shoporders1';
import Shoporders2 from './pages/Shoporders2';
import Companyorders2 from './pages/Companyorders2';
import OrderDetails from './pages/orderDetails';
import Editc from './pages/Editc';

function App() {

  return (
    <BrowserRouter>
      <div>
      <ToastContainer />
        <Routes>

          <Route path="/" element={<Signin />} />
          <Route path="/Edit" element={<Edit />} />
          <Route path="/Updateprofile" element={<Updateprofile />} />
          <Route path="/Changepassword" element={<Changepassword />} />
          <Route path="/Changeselect" element={<Changeselect />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/owner" element={<Owner />}>
            <Route path="Addusers" element={<Addusers />} />
            <Route path="Availability" element={<Availability />} />
            <Route path="Shoporders" element={<Shoporders2 />} />
            <Route path=":orderNo" element={<DynamicShoporders />} /> 
            <Route path="add/:orderno" element={<Dynamiccompanyorders />} />
            <Route path="Placecompanyorders" element={<Placecompanyorders />} />
            <Route path="Companyorders" element={<Companyorders />} />
            <Route path="Reports" element={<Reports />} />
            <Route path="Register" element={<Register />} />
            <Route path="ed/:userID" element={<Editc />} />
          </Route>

          <Route path="/stockmanager" element={<Stockmanager />}>
            <Route path="Addquantity" element={<Additems />} />
            <Route path="Addnewitems" element={<Addnewitems/>} />
            <Route path="Placecompanyorders" element={<Placecompanyorders />} />
            <Route path="order-details/:orderNumber" component={<OrderDetails/>} />
            <Route path="Availability" element={<Availability />} />
            <Route path="Shoporders" element={<Shoporders1 />} />
            <Route path=":orderNo" element={<DynamicShoporders />} /> 
            <Route path="add/:orderno" element={<Dynamiccompanyorders />} />
            <Route path="Companyorders2" element={<Companyorders2 />} />
            <Route path="Notification" element={<Notification />} />
          </Route>

          <Route path="/salesrep" element={<Salesrep />}>
            <Route path="Placeshoporders" element={<Placeshoporders />} />
            <Route path="Shoporders" element={<Shoporders />} />
            <Route path=":orderNo" element={<DynamicShoporders />} /> 
            <Route path="Map" element={<Map />} />
          </Route>

         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
