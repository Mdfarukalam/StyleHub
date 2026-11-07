
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-16">

      <div className="container-fluid px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Style<span className="text-pink-500">Hub</span>
            </h2>

            <p className="text-gray-400 mt-4">
              Discover the latest styles and fashion for everyone.
            </p>
          </div>


          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              SHOP
            </h3>

        <ul className="space-y-2 text-gray-400">
  <li>
    <Link to="/men" className="hover:text-pink-500 transition">
      Men
    </Link>
  </li>

  <li>
    <Link to="/women" className="hover:text-pink-500 transition">
      Women
    </Link>
  </li>

  <li>
    <Link to="/kids" className="hover:text-pink-500 transition">
      Kids
    </Link>
  </li>
</ul>
          </div>


          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              CUSTOMER SERVICE
            </h3>

        <ul className="space-y-2 text-gray-400">
  <li>
    <Link to="/contact" className="hover:text-pink-500 transition">
      Contact Us
    </Link>
  </li>

  {/* <li>
    <Link to="/shipping" className="hover:text-pink-500 transition">
      Shipping
    </Link>
  </li>

  <li>
    <Link to="/returns" className="hover:text-pink-500 transition">
      Returns
    </Link>
  </li>

  <li>
    <Link to="/faq" className="hover:text-pink-500 transition">
      FAQs
    </Link>
  </li> */}
</ul>
          </div>


          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              FOLLOW US
            </h3>

            <div className="flex gap-4 text-gray-400">
              <span>Instagram</span>
              <span>Facebook</span>
            </div>
          </div>

        </div>


        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            © 2026 StyleHub. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;