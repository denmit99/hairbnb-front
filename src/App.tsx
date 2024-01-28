import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import ListingsPage from "./components/pages/ListingsPage";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./api/PrivateRoute";
import ListingsCreatePage from "./components/pages/ListingsCreatePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/listings"
          element={
            <PrivateRoute role="host">
              <ListingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/create"
          element={
            <PrivateRoute role="host">
              <ListingsCreatePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
