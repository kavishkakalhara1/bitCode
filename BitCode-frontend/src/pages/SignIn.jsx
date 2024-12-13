import {
  Alert,
  Label,
  Spinner,
  TextInput,
  Button,
  Modal,
} from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import Logo from "../assets/logo.png";
import { HiFire, HiOutlineExclamationCircle } from "react-icons/hi";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emailOrUsername || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1 xl:mr-40">
          <Link to="/" className="text-4xl font-bold dark:text-white ">
            <img
              src={Logo}
              alt="logo"
              className="p-5 xl:w-1000 xl:h-1000 sm:p-0"
            />
          </Link>
          <p className="mt-5 text-sm">
            Join Us to Reconnect, Collaborate, and Celebrate the Legacy of
            Engineering.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email or username" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="emailOrUsername"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="bg-red-900 hover:bg-red-950 ring-0 focus:ring-transparent"
              type="submit"
              // disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-red-900">
              Sign Up
            </Link>
            .
          </div>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Forget Password?</span>
            <Link
              onClick={() => setShowModal(true)}
              className="text-blue-900 hover:font-semibold"
            >
              Reset Password
            </Link>
            .
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Please Enter Your Email Address
            </h3>
            <TextInput
              type="email"
              placeholder=""
              className="mb-4"
              id="resetemail"
            />
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              We will send you a link to reset your password</p>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={"handleFinish"}>
                Send Reset Link
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
