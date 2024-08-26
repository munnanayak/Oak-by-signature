// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PreHeader from "./components/PreHeader";
import Home from "./pages/Home";
import About from "./pages/About";
import Restaurant from "./pages/Restaurant";
import Gallery from "./pages/Gallery";
import RoomDetails from "./pages/RoomDetails";
import Rooms from './components/Rooms';
import HomeHeader from "./components/HomeHeader";
import Contact from "./components/Contact";
import CustomerDetails from "./components/CustomerDetails";
import CustomerReviews from "./components/CustomerReviews";
import PaymentSuccess from "./components/PaymentSuccess";
import RoomProvider from "./context/RoomContext";
import { RoomSelectionProvider } from "./context/RoomSelectionContext";

const App = () => {
  return (
    <RoomProvider>
      <RoomSelectionProvider>
        <Router>
          <ConditionalHeaders />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homeheader" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/customerdetails" element={<CustomerDetails />} />
            <Route path="/homereview" element={<CustomerReviews />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          </Routes>
          <ConditionalFooter />
        </Router>
      </RoomSelectionProvider>
    </RoomProvider>
  );
};

const ConditionalHeaders = () => {
  const location = useLocation();
  const isHomePath = location.pathname === "/" || location.pathname === "/homeheader";
  const isCustomerDetailsPath = location.pathname === "/customerdetails";

  if (isCustomerDetailsPath) return null;

  return (
    <>
      <PreHeader />
      {isHomePath ? <HomeHeader /> : <Header />}
    </>
  );
};

const ConditionalFooter = () => {
  const location = useLocation();
  const isCustomerDetailsPath = location.pathname === "/customerdetails";

  if (isCustomerDetailsPath) return null;

  return <Footer />;
};

export default App;
