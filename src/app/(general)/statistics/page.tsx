"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useCheckAuth } from "@/utils/auth";
import Spin from "@/components/spin";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface CoachStatistic {
  id: number;
  name: string;
  surname: string;
  clients: number;
  avgRating: number;
  encounters: number;
  events: number;
}

const StatisticsPage = () => {
  const router = useRouter();
  const workName = useCheckAuth();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<CoachStatistic[]>([]);

  const [clientsSortOption, setClientsSortOption] = useState("alphabetic");
  const [ratingSortOption, setRatingSortOption] = useState("alphabetic");
  const [encountersSortOption, setEncountersSortOption] = useState("alphabetic");
  const [eventsSortOption, setEventsSortOption] = useState("alphabetic");

  useEffect(() => {
    if (workName === "") return;
    if (workName === "Coach") {
      router.push("/");
    }
  }, [workName]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/statistics`,
          { withCredentials: true }
        );
        setStatistics(response.data.coaches);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching statistics", error);
      }
    };

    fetchStatistics();
  }, []);

  if (workName === "") {
    return <Spin />;
  }

  if (workName === "Coach") {
    return null;
  }

  if (loading) {
    return <Spin />;
  }

  // Function to sort data based on sorting option
  const getSortedData = (
    data: CoachStatistic[],
    dataKey: keyof CoachStatistic,
    sortOption: string
  ) => {
    const sortedData = [...data];
    if (sortOption === "alphabetic") {
      sortedData.sort((a, b) => {
        const nameA = `${a.name} ${a.surname}`.toLowerCase();
        const nameB = `${b.name} ${b.surname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (sortOption === "alphabeticDesc") {
      sortedData.sort((a, b) => {
        const nameA = `${a.name} ${a.surname}`.toLowerCase();
        const nameB = `${b.name} ${b.surname}`.toLowerCase();
        return nameB.localeCompare(nameA);
      });
    } else if (sortOption === "dataAsc") {
      sortedData.sort((a, b) => (a[dataKey] as number) - (b[dataKey] as number));
    } else if (sortOption === "dataDesc") {
      sortedData.sort((a, b) => (b[dataKey] as number) - (a[dataKey] as number));
    }
    return sortedData;
  };

  // Prepare data for each chart based on sorting option
  const prepareChartData = (
    dataKey: keyof CoachStatistic,
    sortOption: string,
    label: string,
    backgroundColor: string
  ) => {
    const sortedData = getSortedData(statistics, dataKey, sortOption);
    return {
      labels: sortedData.map((coach) => `${coach.name} ${coach.surname}`),
      datasets: [
        {
          label,
          data: sortedData.map((coach) => coach[dataKey] as number),
          backgroundColor,
        },
      ],
      maintainAspectRatio: false,
      responsive: true,
    };
  };

  // Chart data for each graph
  const clientsData = prepareChartData(
    "clients",
    clientsSortOption,
    "Number of Clients",
    "rgba(75, 192, 192, 0.6)"
  );

  const ratingData = prepareChartData(
    "avgRating",
    ratingSortOption,
    "Average Rating",
    "rgba(153, 102, 255, 0.6)"
  );

  const encountersData = prepareChartData(
    "encounters",
    encountersSortOption,
    "Number of Encounters",
    "rgba(255, 159, 64, 0.6)"
  );

  const eventsData = prepareChartData(
    "events",
    eventsSortOption,
    "Number of Events",
    "rgba(54, 162, 235, 0.6)"
  );

  return (
    <div>
      <div className="my-4 lg:my-8">
        <h2 className="text-xl lg:text-2xl font-bold text-center mb-4">
          Number of Clients per Coach
        </h2>
        <div className="flex justify-end mb-2">
          <label className="mr-2 text-black">Sort by:</label>
          <select
            value={clientsSortOption}
            onChange={(e) => setClientsSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="alphabetic">Alphabetic order</option>
            <option value="alphabeticDesc">Descending alphabetic order</option>
            <option value="dataAsc">Data Ascending order</option>
            <option value="dataDesc">Data Descending order</option>
          </select>
        </div>
        <Bar data={clientsData} />
      </div>

      <div className="my-4 lg:my-8">
        <h2 className="text-xl lg:text-2xl font-bold text-center mb-4">
          Average Rating per Coach
        </h2>
        <div className="flex justify-end mb-2">
          <label className="mr-2 text-black">Sort by:</label>
          <select
            value={ratingSortOption}
            onChange={(e) => setRatingSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="alphabetic">Alphabetic order</option>
            <option value="alphabeticDesc">Descending alphabetic order</option>
            <option value="dataAsc">Data Ascending order</option>
            <option value="dataDesc">Data Descending order</option>
          </select>
        </div>
        <Bar data={ratingData} />
      </div>

      {/* Number of Encounters per Coach */}
      <div className="my-4 lg:my-8">
        <h2 className="text-xl lg:text-2xl font-bold text-center mb-4">
          Number of Encounters per Coach
        </h2>
        <div className="flex justify-end mb-2">
          <label className="mr-2 text-black">Sort by:</label>
          <select
            value={encountersSortOption}
            onChange={(e) => setEncountersSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="alphabetic">Alphabetic order</option>
            <option value="alphabeticDesc">Descending alphabetic order</option>
            <option value="dataAsc">Data Ascending order</option>
            <option value="dataDesc">Data Descending order</option>
          </select>
        </div>
        <Bar data={encountersData} />
      </div>

      {/* Number of Events per Coach */}
      <div className="my-4 lg:my-8">
        <h2 className="text-xl lg:text-2xl font-bold text-center mb-4">
          Number of Events per Coach
        </h2>
        <div className="flex justify-end mb-2">
          <label className="mr-2 text-black">Sort by:</label>
          <select
            value={eventsSortOption}
            onChange={(e) => setEventsSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="alphabetic">Alphabetic order</option>
            <option value="alphabeticDesc">Descending alphabetic order</option>
            <option value="dataAsc">Data Ascending order</option>
            <option value="dataDesc">Data Descending order</option>
          </select>
        </div>
        <Bar data={eventsData} />
      </div>
    </div>
  );
};

export default StatisticsPage;
