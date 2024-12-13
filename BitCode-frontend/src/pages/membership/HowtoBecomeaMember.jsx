import React from "react";
import { Link } from "react-router-dom";

export const metadata = {
  title: {
    absolute: "How to become a Member",
  },
};

export default function HowtoBecomeaMember() {
  return (
    <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center ">
          How to Become a Member
        </h1>

        <div className="flex justify-center mx-auto mt-10 ">
          <ol className="p-5 space-y-8 overflow-hidden border-b-4 shadow-xl md:p-20 rounded-3xl border-refaa-red">
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-refaa-red after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5 ">
              
              <Link
                to="/sign-up"
                className="flex items-start w-full font-medium "
              >
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white border-2 border-transparent rounded-full bg-refaa-red aspect-square lg:w-10 lg:h-10">
                  1
                </span>
                <div className="block transition-all duration-200 ease-in-out hover:p-5 hover:shadow-xl hover:rounded-3xl">
                  <h4 class="text-base  text-refaa-red mb-2">
                    Create an Account
                  </h4>
                  <p className="max-w-xs mb-4 text-sm text-gray-600">
                    To Create an account with several steps to collect user
                    information, verify identity, and set up account
                    preferences.
                    <br />
                  </p>
                  <ul className="flex flex-row flex-wrap w-full max-w-xl mb-4 gap-x-2 gap-y-1">
                    <li className="text-sm font-medium text-gray-900">
                      Go to Sign in &gt;
                    </li>
                    <li className="text-sm font-medium text-gray-900">
                      Create New Account &gt;
                    </li>
                    <li className="text-sm font-medium text-gray-900">
                      Register Yourself
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-refaa-red after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
              {/* <Link to="" className="flex items-start w-full font-medium "> */}
              <Link to="/sign-in" className="flex items-start w-full font-medium ">
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white border-2 border-transparent rounded-full aspect-square bg-refaa-red lg:w-10 lg:h-10">
                  2
                </span>
                <div className="block transition-all duration-200 ease-in-out hover:p-5 hover:shadow-xl hover:rounded-3xl">
                  <h4 className="mb-2 text-base text-refaa-red">Sign In</h4>
                  <p className="max-w-xs mb-4 text-sm text-gray-600">
                    Sign in to your account to access the dashboard and other
                    <br />
                  </p>
                </div>
              </Link>
            </li>
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-refaa-red after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
              {/* <Link
                to=""
                className="flex items-start w-full font-medium "
              > */}
              <Link
                to="/dashboard?tab=profile"
                className="flex items-start w-full font-medium "
              >
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white border-2 border-transparent rounded-full aspect-square bg-refaa-red lg:w-10 lg:h-10">
                  3
                </span>
                <div className="block transition-all duration-200 ease-in-out hover:p-5 hover:shadow-xl hover:rounded-3xl">
                  <h4 className="mb-2 text-base text-refaa-red">
                    Profile Dashboard
                  </h4>
                  <p className="max-w-xs mb-4 text-sm text-gray-600">
                    Access your profile dashboard to view your account details,
                    <br />
                  </p>
                  <ul className="flex flex-row flex-wrap w-full max-w-xl mb-4 gap-x-2 gap-y-1">
                    <li className="text-sm font-medium text-gray-900">
                      Click Profile Avatar &gt;
                    </li>
                    <li className="text-sm font-medium text-gray-900">Profile</li>
                  </ul>
                </div>
              </Link>
            </li>
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-refaa-red after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
              {/* <Link
                to=""
                className="flex items-start w-full font-medium "
              > */}
              <Link
                to="/dashboard?tab=membership"
                className="flex items-start w-full font-medium "
              >
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white border-2 border-transparent rounded-full aspect-square bg-refaa-red lg:w-10 lg:h-10">
                  4
                </span>
                <div className="block transition-all duration-200 ease-in-out hover:p-5 hover:shadow-xl hover:rounded-3xl">
                  <h4 className="mb-2 text-base text-refaa-red">Payments</h4>
                  <p className="max-w-xs mb-4 text-sm text-gray-600">
                    Make payments for membership fees and other services
                    <br />
                  </p>
                  <ul className="flex flex-wrap w-full max-w-xl mb-4 gap-x-2 gap-y-1">
                    <li className="text-sm font-medium text-gray-900">
                      Click Payments Tab &gt;
                    </li>
                    <li className="text-sm font-medium text-gray-900">
                      Select Your Preferred Package
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-refaa-red after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
              <div className="flex items-start w-full font-medium ">
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white border-2 border-transparent rounded-full aspect-square bg-refaa-red lg:w-10 lg:h-10">
                  5
                </span>
                <div className="block transition-all duration-200 ease-in-out hover:p-5 hover:shadow-xl hover:rounded-3xl">
                  <h4 className="mb-2 text-base text-refaa-red">
                    Complete Payment
                  </h4>
                  <p className="max-w-xs mb-4 text-sm text-gray-600">
                    Complete your online payment through Payhere IPG.
                    <br />
                  </p>
                  <ul className="flex flex-wrap w-full max-w-xl mb-4 gap-x-2 gap-y-1">
                    <li className="text-sm font-medium text-gray-900">
                      Click Proceed to Pay &gt;
                    </li>
                    <li className="text-sm font-medium text-gray-900">
                      Add your card details through portal
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-refaa-red after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
              <div className="flex items-start w-full font-medium ">
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white border-2 border-transparent rounded-full aspect-square bg-refaa-red lg:w-10 lg:h-10">
                  6
                </span>
                <div className="block transition-all duration-200 ease-in-out hover:p-5 hover:shadow-xl hover:rounded-3xl">
                  <h4 className="mb-2 text-base text-refaa-red">
                    Membership Confirmation
                  </h4>
                  <p className="max-w-xs mb-4 text-sm text-gray-600">
                    After successfull payment, you will see membership badge on
                    your profile dashboard.
                    <br />
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>

        {/* <Accordion collapseAll className="mt-10 bg-white">
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold ">
              Ordinary Members
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                To become an ordinary member of the Ruhuna Engineering Faculty
                Alumni Association (REFAA), graduates from the Faculty of
                Engineering, University of Ruhuna, need to pay the annual
                subscription fee as determined by the executive committee.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold">
              Life Members
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                To become a life member, one must begin as an ordinary member
                and then pay the life membership fee. This upgrade grants
                lifetime membership benefits without the need for annual
                renewal.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold">
              Honorary Members
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                Honorary membership is reserved for individuals who have
                rendered distinguished service to the faculty. These members are
                nominated by the executive committee and elected by the
                association, recognizing their exceptional contributions.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="mt-4 text-lg font-semibold">
              Reinstatement of Membership
            </Accordion.Title>
            <Accordion.Content>
              <p className="mt-4 text-base text-justify">
                If an ordinary member fails to pay the annual subscription fee
                for three consecutive years, their membership will cease.
                However, membership can be reinstated upon payment of the
                outstanding amount, allowing the member to regain their full
                rights and privileges.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion> */}
      </div>
    </div>
  );
}
