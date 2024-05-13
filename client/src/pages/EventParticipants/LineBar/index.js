import React, { useState, useEffect, memo } from 'react';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { convertData } from "./utils";
import { BAR_OPTIONS } from "./constants";
import { https } from "../../../api/https";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const LineChart = memo(({ eventId }) => {
  const [registration, setRegistration] = useState([]);

  useEffect(() => {
    registrationsToday();
  }, []);
  
  const registrationsToday = () => {
    axios.get(`${https}/getRegistrations/${eventId}`)
      .then(res => setRegistration(res.data))
      .catch(err => console.log(err))
  };

  return (
    <Bar options={BAR_OPTIONS} data={convertData(registration)} />
  );
});

export default LineChart;




