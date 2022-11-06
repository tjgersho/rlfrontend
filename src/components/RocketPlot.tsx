import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 
const RocketPlot = (props: any) => {

  const {data}= props || [];
  const {title}= props || "Chart";
  const {isPos}= props || false;
  const {isVel}= props || false;
  const {isAccl}= props || false;

  
  
  
  const labels = data.map((d:any)=>new Date(d.created*1000).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
  let x = [];
  let y = [];
  let z = [];
  if(isPos){
     x = data.map((d:any)=>d.X);
     y = data.map((d:any)=>d.Y);
     z = data.map((d:any)=>d.Z);
  }
  if(isVel){
    x = data.map((d:any)=>d.Vx);
    y = data.map((d:any)=>d.Vy);
    z = data.map((d:any)=>d.Vz);
 }
 if(isAccl){
  x = data.map((d:any)=>d.Ax);
  y = data.map((d:any)=>d.Ay);
  z = data.map((d:any)=>d.Az);
}



  
  
  let structuredData = {
    labels,
    datasets: [
      {
        label: 'X',
        data: x,
        borderColor: 'rgb(0, 102, 255)',
        backgroundColor: 'rgba(0, 102, 255, 0.5)',
      },
      {
        label: 'Y',
        data:  y,
        borderColor: 'rgb(51, 204, 51)',
        backgroundColor: 'rgba(51, 204, 51, 0.5)',
      },
      {
        label: 'Z',
        data:  z,
        borderColor: 'rgb(255, 153, 51)',
        backgroundColor: 'rgba(255, 153, 51, 0.5)',
      },
    ],
  };;

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line options={options} data={structuredData} />;
};

export default RocketPlot;
