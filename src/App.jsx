import "./App.css";
import LoginComponent from "./page/auth/LoginComponent.jsx";
import CreateUserComponent from "./page/users/CreateUserComponent";
import EditUserComponent from "./page/users/EditUserComponent";
import ListUserComponent from "./page/users/ListUserComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout.jsx";
import RegisterComponent from "./page/auth/RegisterComponent.jsx";
import IndexAdminComponent from "./page/home/IndexAdminComponent.jsx";
import ListProductComponent from "./page/product/ListProductComponent.jsx";
import SearchBoxComponent from "./component/SearchBoxComponent.jsx";
import CreateProductComponent from "./page/product/CreateProductComponent.jsx";
import EditProductComponent from "./page/product/EditProductComponent.jsx";
import ListCategoriesComponent from "./page/categories/ListCategoriesComponent.jsx";
import CreatCategoryComponent from "./page/categories/CreatCategoryComponent.jsx";
import EditCategoryComponent from "./page/categories/EditCategoryComponent.jsx";
import HomeComponent from "./web/HomeComponent.jsx";
import HeaderComponent from "./web/layout/HeaderComponent.jsx";
import LayoutWebComponent from "./web/layout/LayoutWebComponent.jsx";
import ProductDetailComponent from "./web/ProductDetailComponent.jsx";
import ProductPageComponent from "./web/ProductPageComponent.jsx";
import CartComponent from "./web/CartComponent.jsx";
import OrderComponent from "./web/OrderComponent.jsx";
import CheckOutComponent from "./web/CheckOutComponent.jsx";
import LoginComponentWeb from "./page/auth/LoginComponentWeb.jsx";
import AccountComponent from "./web/AccountComponent.jsx";
import DashboardComponent from "./page/DashboardComponent.jsx";
import ListOrderComponent from "./page/order/ListOrderComponent.jsx";
import DetailOrderComponent from "./page/order/DetailOrderComponent.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* // http://lpcalhost:3000 */}
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/Register" element={<RegisterComponent />}></Route>
          <Route path="/loginWeb" element={<LoginComponentWeb />}></Route>

          {/* <Route path='/index' element={<IndexAdminComponent/>}></Route> */}
          <Route path="/users/Create" element={<CreateUserComponent />}></Route>
          <Route path="/users/Edit/:id" element={<EditUserComponent />} />

          <Route path="/product/Create" element={<CreateProductComponent />} />
          <Route path="/products/Edit/:id" element={<EditProductComponent />} />

          <Route
            path="/categorys/Create"
            element={<CreatCategoryComponent />}
          />
          <Route
            path="/categorys/Edit/:id"
            element={<EditCategoryComponent />}
          />

          <Route path="/heard" element={<HeaderComponent />} />

          {/* trang quản trị */}
          <Route element={<Layout />}>
            <Route path="/listorder" element={<ListOrderComponent />} />
            <Route path="/dashboard" element={<DashboardComponent />}></Route>
            <Route path="/users" element={<ListUserComponent />}></Route>
            <Route path="/products" element={<ListProductComponent />} />
            <Route path="/categorys" element={<ListCategoriesComponent />} />
            <Route path="/index" element={<IndexAdminComponent />} />
            <Route path="/box" element={<SearchBoxComponent />} />
            <Route
              path="/detailOrder/:orderId"
              element={<DetailOrderComponent />}
            />
          </Route>

          {/* trang web */}
          <Route element={<LayoutWebComponent />}>
            <Route path="/home" element={<HomeComponent />} />
            <Route
              path="/productDetail/:id"
              element={<ProductDetailComponent />}
            />
            <Route path="/productPage" element={<ProductPageComponent />} />
            <Route path="/cart" element={<CartComponent />} />
            <Route path="/order" element={<OrderComponent />} />
            <Route path="/checkout" element={<CheckOutComponent />} />
            <Route path="/profile" element={<AccountComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
