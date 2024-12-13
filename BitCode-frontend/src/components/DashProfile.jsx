import {
  Alert,
  Button,
  Label,
  Modal,
  ModalBody,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import MemberID from "./MemberID";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [residingInSriLanka, setResidingInSriLanka] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
  
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profileImage: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/sign-up");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
        navigate("/sign-in"); // Redirect to home page
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full max-w-lg p-3 mx-auto mb-20">
      {currentUser.isAdmin || (
          <Link to={"/create-post"}>
            <Button
              type="button"
              className="w-full bg-refaa-blue hover:bg-red-800 hover:shadow-xl"
            >
              Create a Post
            </Button>
          </Link>
        )}
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-10 border-b-4 shadow-xl rounded-xl border-refaa-red"
      >
        

        <div className="flex justify-between mt-5 text-red-500">
          <Button
            type="button"
            className="bg-refaa-blue hover:bg-refaa-red hover:shadow-xl ring-0 focus:ring-transparent"
            onClick={() => setShowModal(true)}
          >
            Delete Account
          </Button>
          <Button
            type="button"
            onClick={handleSignout}
            className=" bg-refaa-blue hover:bg-red-800 hover:shadow-xl"
          >
            Sign out
          </Button>
        </div>
        <hr className="mb-5" />
        

       
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="fullname">Full Name:</Label>
          <TextInput
            type="text"
            placeholder="Your Full Name"
            className=""
            id="fullname"
            defaultValue={currentUser.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="username">Username:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.username}
            placeholder="Your Username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="university">University:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.university}
            placeholder="Your University"
            id="university"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="universityregistrationnumber">University Registration Number:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.universityregistrationnumber}
            placeholder="Your University"
            id="university"
            onChange={handleChange}
          />
        </div>
      
        
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="password">Password:</Label>
          <TextInput
            type="password"
            defaultValue={currentUser.password}
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
        </div>

        

        <Button
          type="submit"
          className="mt-10 bg-refaa-red hover:bg-red-800 hover:shadow-xl"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        
      </form>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
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
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className=" bg-refaa-red hover:bg-red-800 hover:shadow-xl"
                onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
