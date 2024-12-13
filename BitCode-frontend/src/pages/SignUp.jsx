import { Alert, Button, Select, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import Logo from "../assets/logo.png";
import InputMask from "react-input-mask";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [residingInSriLanka, setResidingInSriLanka] = useState(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState("Alumni");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Use the id of the select tag to determine which state variable to update

    const { id, value } = event.target;
    if (id === "residinginsrilanka") {
      setResidingInSriLanka(value);
    }
  };
  const handleChangeMode = (e) => {
    setMode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.specialization ||
      !formData.nicnumber ||
      !formData.internationalmobilenumber
    ) {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const { confirmpassword, ...payload } = formData;
      
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setErrorMessage("An Error Occurred. Please Try Again.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  const handleSubmitGuest = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword ||
      !formData.firstname ||
      !formData.lastname 
    ) {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage("An error occurred. Please try again.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.fullname
    ) {
      setErrorMessage("Please fill out all fields.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage("An error occurred. Please try again.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row ">
        {/* left */}
        <div className="flex-1 xl:mr-40">
          <Link to="/" className="text-4xl font-bold dark:text-white">
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
          <h1 className="mb-2 text-lg font-semibold">Select Sign Up Mode</h1>
          <Select
            id="mode"
            onChange={handleChangeMode}
            defaultValue="Select Mode"
            style={{
              color: "rgba(0, 0, 0, 0.8)",
              overflow: "auto",
              marginBottom: 50,
            }}
          >
            <option disabled value={""}>
              Select Mode
            </option>
            <option value="Alumni">Alumni</option>
            <option value="Faculty Undergraduate">Faculty Undergraduate</option>
            <option value="Guest">Guest</option>
          </Select>

          {mode === "Alumni" && (
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
              <div>
                <h1 className="text-3xl font-semibold">Sign Up as an Alumni</h1>
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your First Name"
                  id="firstname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your Last Name"
                  id="lastname"
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <TextInput
                  type="text"
                  placeholder="Your Full Name"
                  id="fullname"
                  onChange={handleChange}
                />
              </div> */}
              {/* <div>
              <TextInput
                type="text"
                placeholder="Popular Name at the Faculty"
                id="popularname"
                onChange={handleChange}
              />
            </div> */}
              <div>
                <Select
                  id="batch"
                  onChange={handleChange}
                  defaultValue="Your Batch"
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
              {/* <div>
                <TextInput
                  id="passedoutyear"
                  type="text"
                  placeholder="Graduated Year"
                  pattern="(200[4-9]|201[0-9]|202[0-5])"
                  onChange={handleChange}
                />
              </div> */}
              <div>
                <Select
                  id="specialization"
                  onChange={handleChange}
                  defaultValue="Specialization"
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
              <div>
                <TextInput
                  type="text"
                  placeholder="NIC Number"
                  id="nicnumber"
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <TextInput
                  type="text"
                  placeholder="University Registration Number"
                  id="universityregistrationnumber"
                  onChange={handleChange}
                />
              </div> */}
              <div>
                <TextInput
                  type="text"
                  placeholder="International Mobile Number"
                  id="internationalmobilenumber"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpassword"
                  onChange={handleChange}
                />
              </div>
              {/* {formData.confirmpassword && (
                <>
                  <div>
                    <Select
                      id="residinginsrilanka"
                      defaultValue="Are you residing in Sri Lanka?"
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
                  {residingInSriLanka === "yes" && (
                    <>
                      <div>
                        <TextInput
                          type="text"
                          placeholder="City"
                          id="city"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          placeholder="District"
                          id="district"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          placeholder="Address"
                          id="address"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          placeholder="Fixed Telephone Number"
                          id="fixedtelephonenumber"
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}

                  {residingInSriLanka === "no" && (
                    <>
                      <div>
                        <TextInput
                          type="text"
                          placeholder="Country"
                          id="country"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <TextInput
                          type="text"
                          placeholder="Residence Address"
                          id="residenceAddress"
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <TextInput
                      type="text"
                      placeholder="Present Occupation/ Designation"
                      id="occupation"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Select
                      id="isaboverelatedengineering"
                      onChange={handleChange}
                      defaultValue="Is above related to Engineering?"
                      style={{ color: "rgba(0, 0, 0, 0.8)" }}
                    >
                      <option
                        disabled
                        value={"Is above related to Engineering?"}
                      >
                        Is above related to Engineering?
                      </option>
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Name of Workplace"
                      id="workplacename"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Workplace Address"
                      id="workplaceaddress"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Professionally Qualifications"
                      id="professionalqualifications"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Any other Qualifications"
                      id="otherqualifications"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Postgraduate Achievements"
                      id="postgraduateachievements"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Select
                      id="areyouacoporatemember"
                      onChange={handleChange}
                      defaultValue="Are you a Coporate Member (Chartered Engineer)?"
                      style={{ color: "rgba(0, 0, 0, 0.8)" }}
                    >
                      <option
                        disabled
                        value={
                          "Are you a Coporate Member (Chartered Engineer)?"
                        }
                      >
                        Are you a Coporate Member (Chartered Engineer)?
                      </option>
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Other Coporate Memberships"
                      id="othercoporatememberships"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Select
                      id="internationalprofessionalengineer"
                      onChange={handleChange}
                      defaultValue="Are you an International Professional Engineer (Int.PE) of IESL?"
                      style={{ color: "rgba(0, 0, 0, 0.8)" }}
                    >
                      <option
                        disabled
                        value={
                          "Are you an International Professional Engineer (Int.PE) of IESL?"
                        }
                      >
                        Are you an International Professional Engineer (Int.PE)
                        of IESL?
                      </option>
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Suggestions to REFAA for faculty development, REFAA cohesiveness improvement or any other improvements"
                      id="suggestions"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )} */}

              <Button
                className="bg-red-900 hover:bg-red-950 ring-0 focus:ring-transparent"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          )}

          {mode === "Faculty Undergraduate" && (
            <form
              className="flex flex-col gap-4 "
              onSubmit={handleSubmitStudent}
            >
              <div>
                <h1 className="text-3xl font-semibold">
                  Sign Up as a Faculty Undergraduate
                </h1>
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your First Name"
                  id="firstname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your Last Name"
                  id="lastname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your Full Name"
                  id="fullname"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Select
                  id="batch"
                  onChange={handleChange}
                  defaultValue="Your Batch"
                  style={{ color: "rgba(0, 0, 0, 0.8)", overflow: "auto" }}
                >
                  <option disabled value={"Your Batch"}>
                    Your Batch
                  </option>
                  <option value="21st Batch">21st Batch</option>
                  <option value="22nd Batch">22nd Batch</option>
                  <option value="23rd Batch">23rd Batch</option>
                  <option value="24th Batch">24th Batch</option>
                  <option value="25th Batch">25th Batch</option>
                  <option value="26th Batch" disabled>
                    26th Batch
                  </option>
                </Select>
              </div>

              <div>
                <Select
                  id="specialization"
                  onChange={handleChange}
                  defaultValue="Specialization"
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
                  <option value={"Computer Engineering"}>
                    Computer Engineering
                  </option>
                  <option value={"Marine Engineering and Naval Architecture"}>
                    Marine Engineering and Naval Architecture
                  </option>
                  <option value={"No Specialization"}>No Specialization</option>
                </Select>
              </div>

              <div>
                <InputMask
                  mask="EG/2099/9999"
                  value={formData.universityregistrationnumber}
                  onChange={handleChange}
                  maskPlaceholder={"_"}
                >
                  {(inputProps) => (
                    <TextInput
                      {...inputProps}
                      type="text"
                      placeholder="University Registration Number"
                      id="universityregistrationnumber"
                    />
                  )}
                </InputMask>
              </div>
              <div>
                <TextInput
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpassword"
                  onChange={handleChange}
                />
              </div>

              <Button
                className="bg-red-900 hover:bg-red-950 ring-0 focus:ring-transparent"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          )}

          {mode === "Guest" && (
            <form className="flex flex-col gap-4 " onSubmit={handleSubmitGuest}>
              <div>
                <h1 className="text-3xl font-semibold">Sign Up as a Guest</h1>
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your First Name"
                  id="firstname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your Last Name"
                  id="lastname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="text"
                  placeholder="Your Full Name"
                  id="fullname"
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextInput
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpassword"
                  onChange={handleChange}
                />
              </div>

              <Button
                className="bg-red-900 hover:bg-red-950 ring-0 focus:ring-transparent"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          )}

          <div className="flex gap-2 mt-5 mb-20 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
