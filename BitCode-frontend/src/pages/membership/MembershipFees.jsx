import { Table } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MembershipFees() {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <div className="min-h-screen">
      <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center ">Membership Fees</h1>

          <div className="mt-20 overflow-x-auto shadow-xl rounded-2xl">
            <Table hoverable className="rounded-2xl">
              <Table.Head className="bg-refaa-red">
                <Table.HeadCell className="text-xl text-white bg-refaa-red">Membership Package</Table.HeadCell>
                <Table.HeadCell className="text-xl text-right text-white bg-refaa-red">Fee (LKR)</Table.HeadCell>
                <Table.HeadCell className="text-xl text-right text-white bg-refaa-red "><span className="sr-only">Description</span></Table.HeadCell>
                
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="text-lg bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {'Ordinary Member'}
                  </Table.Cell>
                  <Table.Cell className="text-right">1 000</Table.Cell>
                  <Table.Cell className="text-right">
                    {/* <Link
                      to={currentUser? "" :''}
                      className="font-medium text-right text-refaa-blue hover:drop-shadow dark:text-cyan-500"
                    > */}
                    <Link
                      to={currentUser? "/dashboard?tab=membership":'/sign-in'}
                      className="font-medium text-right text-refaa-blue hover:drop-shadow dark:text-cyan-500"
                    >
                      Get
                    </Link>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="text-lg bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {'Life Member'}
                  </Table.Cell>
                  <Table.Cell className="text-right">10 000</Table.Cell>
                  <Table.Cell className="text-right">
                    <Link
                      to={currentUser? "/dashboard?tab=membership":'/sign-in'}
                      className="font-medium text-right text-refaa-blue hover:drop-shadow dark:text-cyan-500"
                    >
                    {/* <Link
                      to={currentUser? "":''}
                      className="font-medium text-right text-refaa-blue hover:drop-shadow dark:text-cyan-500"
                    > */}
                      Get
                    </Link>
                  </Table.Cell>
                </Table.Row>
                
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
