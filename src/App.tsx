import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Products from "./pages/Products";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/users" element={<Users />} />

          <Route path="/users/:id" element={<UserDetails />} />

          <Route path="/products" element={<Products />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
