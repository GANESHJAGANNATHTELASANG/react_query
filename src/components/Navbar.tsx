import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">React Query App</h1>

        <div className="flex gap-6">
          <Link to="/" className="text-white hover:text-blue-400">
            Home
          </Link>

          <Link to="/users" className="text-white hover:text-blue-400">
            Users
          </Link>

          <Link to="/products" className="text-white hover:text-blue-400">
            Products
          </Link>

          <Link to="/about" className="text-white hover:text-blue-400">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
