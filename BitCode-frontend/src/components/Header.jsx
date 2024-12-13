import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png"


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        // console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in'); // Redirect to sign-in page
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  return (
    <Navbar className="relative flex h-20 mx-auto 2xl:w-10/12 md:rounded-b-3xl md:sticky md:top-0 bg-opacity-80 z-1000 md:drop-shadow-xl" style={{zIndex: 1000}}>
      <Link
        to="/"
        className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white"
      >
        <img src={Logo} className="w-20 h-auto" />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        {/* <Button
          className="hidden w-12 h-10 sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button> */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profileImage} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm text-gray-400">{currentUser.trend2}</span>
              <span className="block text-sm">{currentUser.firstname} {currentUser.lastname}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link to={"/dashboard?tab=membership"}>
              <Dropdown.Item>Upgrade Membership</Dropdown.Item>
            </Link>
            <Link to={"/dashboard?tab=settings"}>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className=" bg-refaa-red glow-button hover:bg-red-800 ring-0 focus:ring-transparent" >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      
      <Navbar.Collapse className="ring-0 focus:ring-transparent ">
        <Navbar active={path === "/"? true:false} as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          <Link to="/">Home</Link>
        </Navbar>
        <Navbar active={path === "/"? true:false} as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          <Link to="/marketplace">Marketplace</Link>
        </Navbar>
        <Navbar active={path === "/"? true:false} as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          <Link to="/search">Articles</Link>
        </Navbar>
        
        {/* <Navbar as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          <Dropdown
            className="hover:text-red-950"
            arrowIcon={true}
            inline
            label="Categories"
          >
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/search?searchTerm=&sort=desc&category=Event">All Item</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/search?searchTerm=&sort=desc&category=News">Item type 1</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/search?searchTerm=&sort=desc&category=Obituaries">Item type 2</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown>
        </Navbar> */}
        <Navbar  as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          <Dropdown
            className="hover:text-red-950"
            arrowIcon={true}
            inline
            label="Seller"
          >
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/membership/how-to-become-a-member">How to Become a Seller</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/membership/entry-requirements">Seller Requirements</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/membership/membership-fees">Seller annual Fees</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown>
        </Navbar>
        <Navbar  as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          <Dropdown
            className="hover:text-red-950"
            arrowIcon={true}
            inline
            label="Branches"
          >
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/commitees/executive-committee">Colombo</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="" >Matara</Link>
            </Dropdown.Item>
            <Dropdown.Item className="hover:text-red-950 hover:font-semibold">
              <Link to="/commitees/technical-team">Galle</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown>
        </Navbar> 
        {/* <Navbar active={path === "/search"? true:false} as={"div"} className=" hover:bg-refaa-blue md:hover:bg-transparent hover:text-gray-200 md:hover:text-gray-700 bg-non">
          
          <Link to={currentUser? "/dashboard?tab=membership":'/sign-in'} disabled>Seller Membership</Link>
        </Navbar> */}
      </Navbar.Collapse>
    </Navbar>
  );
}