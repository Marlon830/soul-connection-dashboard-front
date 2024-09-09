"use client";

import Spin from "@/components/spin";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCheckAuth } from "@/utils/auth";

interface Tip {
  id: number;
  title: string;
  tip: string;
}

const TipsPage = () => {
  const workName = useCheckAuth();
  const [tipsList, setTipsList] = useState<Array<Tip>>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (workName === "") return;
    const getTips = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tips`, {
          withCredentials: true,
        });
        setTipsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTips();
  }, [workName]);

  if (workName === "") {
    return <Spin />;
  }

  const handleCollapseChange = (collapsed: any) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
      {tipsList.length > 0 && tipsList.map((tip) => (
        <motion.div
          key={tip.id}
          className="bg-white p-8 rounded-lg shadow-lg text-black"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-bold">{tip.title}</h3>
          <p className="mt-4">{tip.tip}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TipsPage;
