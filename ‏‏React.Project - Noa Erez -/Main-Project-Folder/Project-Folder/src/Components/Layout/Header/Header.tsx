import { Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../../store/userSlice";
import { TRootState } from "../../../store/store";


const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Navbar fluid className="bg-pink-800">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          BizzyApp
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link  
        to={"/"}  
        className="cursor-pointer border-none bg-transparent py-0 text-white hover:text-pink-300">
          Home
        </Link>
        
        <Link
          to="/LogIn"
          className="cursor-pointer border-none bg-transparent py-0 text-white hover:text-pink-300"
        >
          Log In
        </Link>

        <Link
          to="/Register"
          className="cursor-pointer border-none bg-transparent py-0 text-white hover:text-pink-300"
        >
          Register
        </Link>

        <button
          onClick={() => dispatch(userActions.logout())}
          className="cursor-pointer border-none bg-transparent py-0 text-white hover:text-pink-300"
        >
          Sign Out
        </button>

        {user !== null && (
          <Link
            to={"/profile"}
            className="cursor-pointer border-none bg-transparent py-0 text-white hover:text-pink-300"
          >
            Profile
          </Link>
        )}

        {user && user.isBusiness && (
          <Link
            to={"/create-card"}
            className="cursor-pointer border-none bg-transparent py-0 text-white hover:text-pink-300"
          >
            Create Card
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
