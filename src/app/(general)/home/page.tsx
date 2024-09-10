"use client";

import { useEffect, useState } from "react";
import { useCheckAuth } from "@utils/auth";
import { FaUser, FaUsers, FaCalendarAlt, FaSmile, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Spin from "@components/spin";

export default function Home() {
  const workName = useCheckAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    clients: 0,
    coaches: 0,
    meetings: 0,
    satisfaction: 0,
    successRatings: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
  });

  useEffect(() => {
    if (workName === "") return;

    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home_page_stats`, { withCredentials: true });
        setStats({
          clients: response.data.nb_of_clients,
          coaches: response.data.nb_of_coaches,
          meetings: response.data.nb_of_meetings,
          satisfaction: response.data.satisfaction,
          successRatings: {
            fiveStar: response.data.success_ratings.five,
            fourStar: response.data.success_ratings.four,
            threeStar: response.data.success_ratings.three,
            twoStar: response.data.success_ratings.two,
            oneStar: response.data.success_ratings.one,
          }
        })
      } catch (error) {
        console.error("Error fetching home page stats:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [workName]);

  const handleMouseMove = (e: any, red: number, green: number, blue: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(${red}, ${green}, ${blue}, 0.85), rgba(${red}, ${green}, ${blue}, 0.6) 80%)`;
  };

  const handleMouseLeave = (e: any, cardColor: string) => {
    e.currentTarget.style.background = cardColor;
  };

  if (loading) {
    return <Spin />;
  }

  if (workName === "") {
    return null;
  }

  return (
    <div>
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
        
        {/* Number of Clients */}
        <motion.div 
          className="p-8 rounded-lg shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "#3B82F6" }}
          whileHover={{ scale: 1.05 }}
          onMouseMove={(e) => handleMouseMove(e, 59, 130, 246)}
          onMouseLeave={(e) => handleMouseLeave(e, '#3B82F6')}
        >
          <div>
            <FaUser className="text-5xl text-white" />
            <h3 className="text-2xl font-bold mt-4 text-white">Clients</h3>
            <p className="text-4xl mt-2 text-white">{stats.clients}</p>
          </div>
        </motion.div>

        {/* Number of Coaches */}
        <motion.div 
          className="p-8 rounded-lg shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "#22C55E" }}
          whileHover={{ scale: 1.05 }}
          onMouseMove={(e) => handleMouseMove(e, 34, 197, 94)}
          onMouseLeave={(e) => handleMouseLeave(e, '#22C55E')}
        >
          <div>
            <FaUsers className="text-5xl text-white" />
            <h3 className="text-2xl font-bold mt-4 text-white">Coaches</h3>
            <p className="text-4xl mt-2 text-white">{stats.coaches}</p>
          </div>
        </motion.div>

        {/* Number of Meetings */}
        <motion.div 
          className="p-8 rounded-lg shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "#EAB308" }}
          whileHover={{ scale: 1.05 }}
          onMouseMove={(e) => handleMouseMove(e, 234, 179, 8)}
          onMouseLeave={(e) => handleMouseLeave(e, '#EAB308')}
        >
          <div>
            <FaCalendarAlt className="text-5xl text-white" />
            <h3 className="text-2xl font-bold mt-4 text-white">Meetings</h3>
            <p className="text-4xl mt-2 text-white">{stats.meetings}</p>
          </div>
        </motion.div>

        {/* Client Satisfaction */}
        <motion.div 
          className="p-8 rounded-lg shadow-lg flex items-center justify-between"
          style={{ backgroundColor: "#A855F7" }}
          whileHover={{ scale: 1.05 }}
          onMouseMove={(e) => handleMouseMove(e, 168, 85, 247)}
          onMouseLeave={(e) => handleMouseLeave(e, '#A855F7')}
        >
          <div>
            <FaSmile className="text-5xl text-white" />
            <h3 className="text-2xl font-bold mt-4 text-white">Satisfaction</h3>
            <p className="text-4xl mt-2 text-white">{stats.satisfaction.toFixed(2)}/5</p>
          </div>
        </motion.div>

        {/* Success Rating Breakdown */}
        <motion.div 
          className="p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "#6366F1" }}
          whileHover={{ scale: 1.05 }}
          onMouseMove={(e) => handleMouseMove(e, 99, 102, 241)}
          onMouseLeave={(e) => handleMouseLeave(e, '#6366F1')}
        >
          <div>
            <FaStar className="text-5xl text-white" />
            <h3 className="text-2xl font-bold mt-4 text-white">Success Ratings</h3>
            <div className="mt-4 text-white">
              <p className="text-lg">5-Star: {stats.successRatings.fiveStar.toFixed(2)}%</p>
              <p className="text-lg">4-Star: {stats.successRatings.fourStar.toFixed(2)}%</p>
              <p className="text-lg">3-Star: {stats.successRatings.threeStar.toFixed(2)}%</p>
              <p className="text-lg">2-Star: {stats.successRatings.twoStar.toFixed(2)}%</p>
              <p className="text-lg">1-Star: {stats.successRatings.oneStar.toFixed(2)}%</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
