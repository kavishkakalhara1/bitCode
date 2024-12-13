import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, // Import ArcElement
  } from "chart.js";
import { Button } from "flowbite-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
    ArcElement
);

export default function DashCharts() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [batchCounts, setBatchCounts] = useState([]);
  const [specializationCounts, setSpecializationCounts] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);

          // Count users by batch
          const batchCount = Array(25).fill(0);
          //count for specialization
          const specializationCount = {};

          data.users.forEach((user) => {
            const batchNumber = parseInt(user.batch?.split(" ")[0]);
            if (batchNumber >= 1 && batchNumber <= 25) {
              batchCount[batchNumber - 1]++;
            }
            // Specialization count
            const specialization = user.specialization || "Unknown";
            specializationCount[specialization] =
              (specializationCount[specialization] || 0) + 1;
          });
          setBatchCounts(batchCount);
          setSpecializationCounts(specializationCount);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const chartData = {
    labels: Array.from({ length: 25 }, (_, i) => `${i + 1} `),
    datasets: [
      {
        label: "User Count",
        data: batchCounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users per Batch",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Batch", // X-axis label
          font: {
            size: 14, // Font size for the label
          },
          color: "", // Optional color for the label
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "User Count", // Y-axis label
          font: {
            size: 14, // Font size for the label
          },
          color: "", // Optional color for the label
        },
        beginAtZero: true,
      },
    },
  };

  const handleDownloadExcel = () => {
    // Prepare data for Excel
    const excelData = chartData.labels.map((label, index) => ({
      Batch: label,
      Count: batchCounts[index],
    }));

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch User Data");

    // Download the Excel file
    XLSX.writeFile(workbook, "Batch_User_Data.xlsx");
  };

  const pieChartData = {
    labels: Object.keys(specializationCounts),
    datasets: [
      {
        data: Object.values(specializationCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="p-4" style={{ width: "80vw", height: "500px" }}>
        <h2 className="mb-4 text-xl font-bold">Batch User Statistics</h2>
        <Bar data={chartData} options={chartOptions} />
        <Button
          onClick={handleDownloadExcel}
          className="mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Download
        </Button>
      </div>
      {/* Pie Chart */}
      <div className="px-4 pt-20 pb-10 mb-20" style={{ height: "500px", marginTop: "50px" }}>
        <h2 className="mb-4 text-xl font-bold">Specialization Distribution</h2>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
}
