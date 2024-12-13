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
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
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
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-10 border-b-4 shadow-xl rounded-xl border-refaa-red"
      >
        <div className="flex gap-4">
          <span>Member ID: </span>
          <span>
            {currentUser.trend2}
          </span>
        </div>

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
        <div><Label htmlFor="firstname">Upload Your Profile Picture:</Label></div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          //hidden
          className="rounded-xl"
          
        />
        <div
          className="relative self-center w-32 h-32 mb-10 overflow-hidden rounded-full shadow-md cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(150, 20, 30, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profileImage}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        

        {/* <TextInput
          type="text"
          id="firstname"
          placeholder="First Name"
          defaultValue={currentUser.firstname}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="lastname"
          placeholder="Last Name"
          defaultValue={currentUser.lastname}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="popularname"
          placeholder="Popular Name"
          defaultValue={currentUser.popularname}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="internationalmobilenumber"
          placeholder="International Mobile Number"
          defaultValue={currentUser.internationalmobilenumber}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="batch"
          placeholder="Batch"
          defaultValue={currentUser.batch}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="passedoutyear"
          placeholder="Passed out year"
          defaultValue={currentUser.passedoutyear}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="specialization"
          placeholder="Specialization"
          defaultValue={currentUser.specialization}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="universityregistrationnumber"
          placeholder="University Registration Number"
          defaultValue={currentUser.universityregistrationnumber}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="residinginsrilanka"
          placeholder="Are You Residing in Sri Lanka"
          defaultValue={currentUser.residinginsrilanka?"Yes":"No"}
          onChange={handleChange}
        />
        
        <TextInput
          type="text"
          id="occupation"
          placeholder="Occupation"
          defaultValue={currentUser.occupation}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        /> */}

        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="firstname">First Name:</Label>
          <TextInput
            type="text"
            placeholder="Your First Name"
            className=""
            id="firstname"
            defaultValue={currentUser.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="lastname">Last Name:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.lastname}
            placeholder="Your Last Name"
            id="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="fullname">Full Name:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.fullname}
            placeholder="Your Full Name"
            id="fullname"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="popularname">Popular Name:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.popularname}
            placeholder="Popular Name at the Faculty"
            id="popularname"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="batch">Batch:</Label>
          <Select
            id="batch"
            onChange={handleChange}
            defaultValue={currentUser.batch}
            style={{ color: "rgba(0, 0, 0, 0.8)", overflow: "auto" }}
          >
            <option disabled value={"Your Batch"}>
              Your Batch
            </option>
            <option value="1st Batch">1st Batch</option>
            <option value="2nd Batch">2nd Batch</option>
            <option value="3rd Batch">3rd Batch</option>
            <option value="4th Batch">4th Batch</option>
            <option value="5th Batch">5th Batch</option>
            <option value="6th Batch">6th Batch</option>
            <option value="7th Batch">7th Batch</option>
            <option value="8th Batch">8th Batch</option>
            <option value="9th Batch">9th Batch</option>
            <option value="10th Batch">10th Batch</option>
            <option value="11th Batch">11th Batch</option>
            <option value="12th Batch">12th Batch</option>
            <option value="13th Batch">13th Batch</option>
            <option value="14th Batch">14th Batch</option>
            <option value="15th Batch">15th Batch</option>
            <option value="16th Batch">16th Batch</option>
            <option value="17th Batch">17th Batch</option>
            <option value="18th Batch">18th Batch</option>
            <option value="19th Batch">19th Batch</option>
            <option value="20th Batch">20th Batch</option>
            <option disabled>21st Batch</option>
            <option disabled>22nd Batch</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="passedoutyear">Graduated Year:</Label>
          <TextInput
            id="passedoutyear"
            defaultValue={currentUser.passedoutyear}
            type="text"
            placeholder="Passed out Year"
            pattern="(200[4-9]|201[0-9]|202[0-5])"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="specialization">Specialization:</Label>
          <Select
            id="specialization"
            onChange={handleChange}
            defaultValue={currentUser.specialization}
            style={{ color: "rgba(0, 0, 0, 0.8)" }}
          >
            <option disabled value={"Specialization"}>
              Specialization
            </option>
            <option value={"Civil and Environmental Engineering"}>
              Civil and Environmental Engineering
            </option>
            <option value={"Electrical and Information Engineering"}>
              Electrical and Information Engineering
            </option>
            <option value={"Mechanical and Manufacturing Engineering"}>
              Mechanical and Manufacturing Engineering
            </option>
            <option value={"Computer Engineering"} disabled>
              Computer Engineering
            </option>
            <option
              value={"Marine Engineering and Naval Architecture"}
              disabled
            >
              Marine Engineering and Naval Architecture
            </option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="universityregistrationnumber">
            University Reg. No:
          </Label>
          <TextInput
            type="text"
            defaultValue={currentUser.universityregistrationnumber}
            placeholder="University Registration Number"
            id="universityregistrationnumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="internationaltelephonenumber">Contact No:</Label>
          <TextInput
            type="text"
            defaultValue={currentUser.internationalmobilenumber}
            placeholder="International Mobile Number"
            id="internationalmobilenumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="email">Email:</Label>
          <TextInput
            type="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            id="email"
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

        <>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="residinginsrilanka">
              Are you residing in Sri Lanka:
            </Label>
            <Select
              id="residinginsrilanka"
              defaultValue={currentUser.residinginsrilanka ? "yes" : "no"}
              onChange={handleChange}
              style={{ color: "rgba(0, 0, 0, 0.8)" }}
            >
              <option disabled value={"Are you residing in Sri Lanka?"}>
                Are you residing in Sri Lanka?
              </option>
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </Select>
          </div>

          <>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="city">City:</Label>
              <TextInput
                type="text"
                placeholder="City"
                defaultValue={currentUser.city}
                id="city"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="district">District:</Label>
              <TextInput
                type="text"
                placeholder="District"
                defaultValue={currentUser.district}
                id="district"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="address">Address:</Label>
              <TextInput
                type="text"
                placeholder="Address"
                defaultValue={currentUser.address}
                id="address"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="fixedtelephonenumber">
                Fixed Telephone Number:
              </Label>
              <TextInput
                type="text"
                placeholder="Fixed Telephone Number"
                defaultValue={currentUser.fixedtelephonenumber}
                id="fixedtelephonenumber"
                onChange={handleChange}
              />
            </div>
          </>

          <>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="country">Country:</Label>
              <TextInput
                type="text"
                placeholder="Country"
                defaultValue={currentUser.country}
                id="country"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="residenceaddress">Residence Address:</Label>
              <TextInput
                type="text"
                placeholder="Residence Address"
                defaultValue={currentUser.residenceAddress}
                id="residenceAddress"
                onChange={handleChange}
              />
            </div>
          </>

          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="occupation">Occupation/ Designation:</Label>
            <TextInput
              type="text"
              placeholder="Present Occupation/ Designation"
              defaultValue={currentUser.occupation}
              id="occupation"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="workplacename">Workplace Name:</Label>
            <TextInput
              type="text"
              placeholder="Name of Workplace"
              defaultValue={currentUser.workplacename}
              id="workplacename"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="workplaceaddress">Workplace Address:</Label>
            <TextInput
              type="text"
              placeholder="Workplace Address"
              id="workplaceaddress"
              defaultValue={currentUser.workplaceaddress}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="professionalqualifications">
              Professional Qualifications:
            </Label>
            <TextInput
              type="text"
              placeholder="Professionally Qualifications"
              id="professionalqualifications"
              defaultValue={currentUser.professionalqualifications}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="otherqualifications">Other Qualifications:</Label>
            <TextInput
              type="text"
              placeholder="Any other Qualifications"
              defaultValue={currentUser.otherqualifications}
              id="otherqualifications"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="postgraduateachievements">
              Postgraduate Achievements:
            </Label>
            <TextInput
              type="text"
              placeholder="Postgraduate Achievements"
              defaultValue={currentUser.postgraduateachievements}
              id="postgraduateachievements"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="areyouaoporatemember">
              Are you a Coporate Member:
            </Label>
            <Select
              id="areyouacoporatemember"
              onChange={handleChange}
              defaultValue={currentUser.occupation ? "yes" : "no"}
              style={{ color: "rgba(0, 0, 0, 0.8)" }}
            >
              <option
                disabled
                value={"Are you a Coporate Member (Chartered Engineer)?"}
              >
                Are you a Coporate Member (Chartered Engineer)?
              </option>
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="othercoporatememberships">
              Other Coporate Memberships:
            </Label>
            <TextInput
              type="text"
              placeholder="Other Coporate Memberships"
              defaultValue={currentUser.othercoporatememberships}
              id="othercoporatememberships"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="internationalprofessionalengineer">
              Are you an International Professional Engineer (Int.PE) of IESL:
            </Label>
            <Select
              id="internationalprofessionalengineer"
              onChange={handleChange}
              defaultValue={
                currentUser.internationalprofessionalengineer ? "yes" : "no"
              }
              style={{ color: "rgba(0, 0, 0, 0.8)" }}
            >
              <option
                disabled
                value={
                  "Are you an International Professional Engineer (Int.PE) of IESL?"
                }
              >
                Are you an International Professional Engineer (Int.PE) of IESL?
              </option>
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </Select>
          </div>
        </>

        <Button
          type="submit"
          className="mt-10 bg-refaa-red hover:bg-red-800 hover:shadow-xl"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {/* {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              className="w-full bg-refaa-blue hover:bg-red-800 hover:shadow-xl"
            >
              Create a Post
            </Button>
          </Link>
        )} */}
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
