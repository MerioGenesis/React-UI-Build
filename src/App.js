import Layout from "./Components/Layout/Layout.js";
import Home from "./Components/pages/Home.js";
import PageNotFound from "./Components/pages/404.js";
import SignIn from "./Components/pages/SignIn.js";
import ContactUs from "./Components/pages/ContactUs.js";

import './App.css';

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
