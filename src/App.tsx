import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import ListingsPage from "./components/ListingsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/listings" element={<ListingsPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
