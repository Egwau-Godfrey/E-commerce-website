import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import Cart from "./pages/cart";
import UserSignIn from "./pages/UserSignin";
import TraderSignIn from "./pages/TraderSignin";
import TraderHome from "./pages/Traderhome";
import NoPage from "./pages/NoPage";
import AddProducts from "./components/addProducts";
import ProductViewPage from "./components/productview";
import TraderSignUp from "./pages/TraderSignup";
import TraderData from "./components/traderData";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/TraderSignin" element={<TraderSignIn />} />
        <Route path="/TraderSignUp" element={<TraderSignUp />} />
        <Route path="/trader-home" element={<TraderHome />} />
        <Route path="/trader-data" element={<TraderData />} />
        <Route path="/UserSignin" element={<UserSignIn />} />
        <Route path="/add-product" element={<AddProducts />} />
        {/* <Route path="/productview" element={<ProductViewPage />} /> */}
        <Route path="/productview/:productID" element={<ProductViewPage />} /> {/** Added :productID */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;