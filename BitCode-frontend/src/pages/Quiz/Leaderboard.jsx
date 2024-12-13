import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Leaderboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/quiz/leaderboard"); // Adjust the API route as needed
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center ">
            Alumni Quiz Challenge Leaderboard
          </h1>

          <div className="mt-20 overflow-x-auto shadow-xl rounded-2xl">
            <Table hoverable className="rounded-2xl">
              <Table.Head className="bg-refaa-red">
                <Table.HeadCell className="text-xl text-white bg-refaa-red">
                  Rank
                </Table.HeadCell>
                <Table.HeadCell className="text-xl text-left text-white bg-refaa-red">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="text-xl text-left text-white bg-refaa-red">
                  Batch
                </Table.HeadCell>
                <Table.HeadCell className="text-xl text-white bg-refaa-red">
                  Score
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {leaderboard.map((entry) => (
                  <Table.Row
                    key={entry.rank}
                    className="text-lg bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {entry.rank}
                    </Table.Cell>
                    <Table.Cell className="text-left">{entry.name}</Table.Cell>
                    <Table.Cell className="text-left">{entry.batch}</Table.Cell>
                    <Table.Cell>{entry.score}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
