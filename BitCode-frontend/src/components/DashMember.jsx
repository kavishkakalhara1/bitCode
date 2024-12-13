import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
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
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import PaymentModal from "../PaymentModal/PaymentModal";
import { PDFDocument, rgb } from "pdf-lib";

export default function DashMember() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [payments, setPayments] = useState([]);
  const [oldMember, setOldMember] = useState(false);

  //payments table
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`/api/payment/user/${currentUser._id}`);
        // const res = await fetch(`/api/payment/user/667d36601e5a27f29e2c4f60`);
        const data = await res.json();
        if (res.ok) {
          setPayments(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayments();
  }, [currentUser._id]);

  const handleChangeOldMember = (e) => {
    if (e.target.value === "yes") {
      setOldMember(true);
      setPaymentAmount('5000');
    } else {
      setOldMember(false);
    }
  };

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "donation-amount") {
      setDonationAmount(e.target.value);
    }
    else if (e.target.id === "oldAmount") {
        
      setPaymentAmount(e.target.value);
    }

    if (e.target.id === "package-status") {
      if (e.target.value === "Life") {
        setPaymentAmount("10000");
      } else if (e.target.value === "Ordinary") {
        setPaymentAmount("1000");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
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
        navigate("/");
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDF = async (paymentId) => {
    const payment = payments.find((payment) => payment.paymentId === paymentId);

    if (!payment) {
      console.error(`Payment with ID ${paymentId} not found.`);
      return;
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([450, 500]);

    // Draw background rectangle
    page.drawRectangle({
      x: 0,
      y: page.getHeight() - 70,
      width: page.getWidth(),
      height: 70,
      color: rgb(1, 1, 1),
    });

    // Add text
    page.drawText("MEMBERSHIP PAYMENT RECEIPT", {
      x: 40,
      y: 460,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText("RUHUNA ENGINEERING FACULTY ALUMNI ASSOCIATION", {
      x: 40,
      y: 440,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Draw background rectangle
    page.drawRectangle({
      x: 0,
      y: page.getHeight() - 90,
      width: page.getWidth(),
      height: 2,
      color: rgb(0, 0, 0),
    });

    // Draw table
    const tableY = 360;
    const rowHeight = 20;
    const colX = 50;
    const colXValue = 200;

    page.drawText("Payment ID", { x: colX, y: tableY, size: 15 });
    page.drawText(`: ${payment.paymentId}`, {
      x: colXValue,
      y: tableY,
      size: 15,
    });

    page.drawText("Name", {
      x: colX,
      y: tableY - rowHeight,
      size: 15,
    });
    page.drawText(`: ${currentUser.firstname} ${currentUser.lastname}`, {
      x: colXValue,
      y: tableY - rowHeight,
      size: 15,
    });

    page.drawText("Amount", { x: colX, y: tableY - 2 * rowHeight, size: 15 });
    page.drawText(`: ${payment.amount} LKR`, {
      x: colXValue,
      y: tableY - 2 * rowHeight,
      size: 15,
    });

    page.drawText("Description", {
      x: colX,
      y: tableY - 3 * rowHeight,
      size: 15,
    });
    page.drawText(
      payment.amount === 1000
        ? ": Ordinary Membership Payment"
        : ": Life Membership Payment",
      { x: colXValue, y: tableY - 3 * rowHeight, size: 15 }
    );

    page.drawText("Status:", { x: colX, y: tableY - 4 * rowHeight, size: 15 });
    page.drawText(payment.status === "2" ? ": Successful" : ": Unsuccessful", {
      x: colXValue,
      y: tableY - 4 * rowHeight,
      size: 15,
    });

    page.drawText("Valid From", {
      x: colX,
      y: tableY - 5 * rowHeight,
      size: 15,
    });
    page.drawText(`: ${new Date(payment.createdAt).toLocaleDateString()}`, {
      x: colXValue,
      y: tableY - 5 * rowHeight,
      size: 15,
    });

    page.drawText("Valid Till", {
      x: colX,
      y: tableY - 6 * rowHeight,
      size: 15,
    });
    page.drawText(
      `: ${
        payment.amount === 1000
          ? new Date(
              new Date(payment.createdAt).setFullYear(
                new Date(payment.createdAt).getFullYear() + 1
              )
            ).toLocaleDateString()
          : "Lifetime"
      }`,
      { x: colXValue, y: tableY - 6 * rowHeight, size: 15 }
    );

    page.drawText("Paid on", {
      x: colX,
      y: tableY - 7 * rowHeight,
      size: 15,
    });
    page.drawText(`: ${new Date(payment.createdAt).toLocaleDateString()}`, {
      x: colXValue,
      y: tableY - 7 * rowHeight,
      size: 15,
    });

    // Get current date
    const currentDate = new Date();
    // Format the date as "Month Day, Year" (e.g., "April 5, 2023")
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    page.drawText(`Generated on: ${formattedDate}`, {
      x: 50,
      y: 160,
      size: 10,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Generated by: refaa.lk`, {
      x: 50,
      y: 140,
      size: 10,
      color: rgb(0, 0, 0),
    });

    page.drawRectangle({
      x: 0,
      y: page.getHeight() - 7,
      width: page.getWidth(),
      height: 70,
      color: rgb(0.55, 0, 0),
    });

    page.drawRectangle({
      x: 0,
      y: page.getHeight() - 520,
      width: page.getWidth(),
      height: 3,
      color: rgb(0.55, 0, 0),
    });

    page.drawText(`Contact: info@refaa.lk`, {
      x: 50,
      y: 20,
      size: 12,
      color: rgb(0, 0, 0),
    });

    page.drawRectangle({
      x: 0,
      y: page.getHeight() - 570,
      width: page.getWidth(),
      height: 70,
      color: rgb(0.55, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${payment.paymentId}-REFAA Membership.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid mx-auto">
      <div className="items-center justify-center w-full max-w-4xl gap-10 p-1 mx-auto mb-20 md:flex">
        <div className="p-10 mt-20 border-t-4 border-b-4 shadow-xl md:pt-20 border-refaa-red rounded-2xl">
          <h1 className="mb-10 text-2xl font-semibold text-center md:text-3xl">
            Upgrade Your Membership Package
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-20">
              <Label htmlFor="package-status" className="text-gray-500 ">
                Do You have Previous Alumni Life Memberships:
              </Label>
              <Select
                id="package-status"
                onChange={handleChangeOldMember}
                defaultValue="Previous Alumni Memberships"
                style={{ color: "rgba(0, 0, 0, 0.8)" }}
              >
                <option disabled value={"Package"}>
                  Previous Alumni Memberships
                </option>
                <option value={"no"}>No</option>
                <option value={"yes"}>Yes</option>
                
              </Select>
            </div>
            {oldMember ? (
              <>
                <div className="flex gap-20 mt-10">
                  <Label htmlFor="package-status" className="text-gray-500 ">
                    Your Previous Alumni Membership Package:
                  </Label>
                  <Select
                    id="package-status"
                    onChange={handleChange}
                    defaultValue="Package"
                    style={{ color: "rgba(0, 0, 0, 0.8)" }}
                  >
                    {/* <option disabled value={"Package"}>
                      Package
                    </option> */}
                    <option value={"OEIE"}>Old Alumni Member of EIE</option>
                    {/* <option value={"OMME"} disabled>Old Alumni Member of MME</option>
                    <option value={"OCEE"} disabled>Old Alumni Member of CEE</option> */}
                  </Select>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="oldAmount" className="text-gray-500">Fee to Upgrade to Get Membership from REFAA:</Label>
                  <TextInput
                    type="text"
                    defaultValue={5000}
                    placeholder="Amount"
                    id="oldAmount"
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </>
            ) : (
              <div className="flex gap-20 mt-10">
                <Label htmlFor="package-status" className="text-gray-500 ">
                  Membership Package:
                </Label>
                <Select
                  id="package-status"
                  onChange={handleChange}
                  defaultValue="Package"
                  style={{ color: "rgba(0, 0, 0, 0.8)" }}
                >
                  <option disabled value={"Package"}>
                    Package
                  </option>
                  <option value={"Life"}>Life Member</option>
                  <option value={"Ordinary"}>Ordinary Member</option>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <Label htmlFor="remember" className="flex">
                I agree to &nbsp;
                <Tooltip content="Read Terms & Conditions" placement="bottom">
                  <Link
                    className="hover:text-refaa-red hover:underline"
                    to="/about/constitution"
                  >
                    Terms and Conditions.{" "}
                  </Link>
                </Tooltip>
              </Label>
            </div>

            {agreeTerms && (
              <PaymentModal
                // Use a unique value for the orderId
                orderId={currentUser._id}
                payment_name="Upgrade Membership"
                amount={paymentAmount}
                items={formData["package-status"] + " Membership"}
                firstname={currentUser.firstname}
                lastname={currentUser.lastname}
                email={currentUser.email}
                phone={currentUser.internationalmobilenumber}
                city={currentUser.city}
                country={currentUser.country}
              />
            )}
          </form>
        </div>

        {/* Donate payments */}
        {/* <div className="items-center justify-center p-10 mt-20 border-t-4 border-b-4 shadow-xl md:pt-20 md:px-10 md:pb-40 border-refaa-red rounded-2xl">
          <h1 className="mb-10 text-2xl font-semibold text-center md:text-3xl">
            Donate REFAA and Change Lives{" "}
          </h1>{" "}
          <div className="p-4 border-2 rounded-xl border-refaa-red ">
            <p className="flex text-sm md:text-base">
              Bank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{" "}
              <span className="">Bank of Ceylon (BOC)</span>
            </p>
            <p className="flex text-sm md:text-base">
              Account No&nbsp;&nbsp;:&nbsp; <span className="">92764990</span>
            </p>
            <p className="flex text-sm md:text-base">
              Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
              <span className="">Ruhuna Eng. Faculty Alumni Assoc</span>
            </p>
          </div>
        </div> */}
      </div>

      <div className="z-0 p-0 mt-10 mb-20 overflow-x-scroll shadow-2xl rounded-2xl">
        <Table className="">
          <Table.Head className=" bg-refaa-red">
            <Table.HeadCell className="text-white text-md bg-refaa-red">
              Payment ID
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white text-md bg-refaa-red">
              Payment Amount (LKR)
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white text-md bg-refaa-red">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white text-md bg-refaa-red">
              Payment Status
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white text-md bg-refaa-red">
              Valid From
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white text-md bg-refaa-red">
              Valid Till
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white text-md bg-refaa-red ">
              <span className="sr-only">Download</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {payments.map((payment) => (
              <Table.Row
                key={payment._id}
                className="bg-white text-md dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100"
              >
                <Table.Cell className=" whitespace-nowrap dark:text-white">
                  {payment.paymentId}
                </Table.Cell>
                <Table.Cell className="font-semibold text-center text-gray-700 ">
                  {payment.amount}
                </Table.Cell>
                <Table.Cell className="font-semibold text-center text-gray-700">
                  {payment.amount === 1000
                    ? "Ordinary Membership Payment"
                    : "Life Membership Payment"}
                </Table.Cell>
                <Table.Cell
                  className="text-center"
                  style={{ color: payment.status === "2" ? "green" : "red" }}
                >
                  {payment.status === "2" ? "Successful" : "Unsuccessful"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {payment.amount === 1000
                    ? new Date(
                        new Date(payment.createdAt).setFullYear(
                          new Date(payment.createdAt).getFullYear() + 1
                        )
                      ).toLocaleDateString()
                    : "Lifetime"}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {
                    <Button
                      className="text-white bg-refaa-red hover:bg-red-800 hover:shadow-xl ring-0 focus:ring-transparent"
                      onClick={() => generatePDF(payment.paymentId)}
                    >
                      Download
                    </Button>
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
