import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./Components/layouts/Layout.js";
import Home from "./Components/pages/Home.js";
import AllVehicles from './Components/pages/AllVehicles.js';
import PageNotFound from "./Components/pages/404.js";
import SignIn from "./Components/pages/SignIn.js";
import ContactUs from "./Components/pages/ContactUs.js";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allvehicles' element={<AllVehicles />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout >
    </BrowserRouter>
  );
}

export default App;
