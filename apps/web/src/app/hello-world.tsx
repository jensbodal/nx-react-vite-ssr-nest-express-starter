import React, { useState, useEffect } from "react";
import axios from "axios";

type Data = {
  message: string;
};

const API_URL = "/api";

export const HelloWorld: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Data>(API_URL);
      setData(response.data);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
};
