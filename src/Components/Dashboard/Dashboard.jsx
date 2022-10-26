import React, { useEffect, useState } from "react";
import "./styles/dashboard.css";
import SingleCard from "./reuseable/SingleCard";

import MileChart from "./charts/MileChart";
import CarStatsChart from "./charts/CarStatsChart";
import RecommendCarCard from "./UI/RecommendCarCard";

import recommendCarsData from "./assets/dummy-data/recommendCars";
import { DotLoader } from "react-spinners";

const carObj = {
  title: "Total de vehículos",
  totalNumber: 32,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Ventas del mes",
  totalNumber: 12,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Total de clientes",
  totalNumber: "30",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Total de empleados",
  totalNumber: 20,
  icon: "ri-timer-flash-line",
};


const Dashboard = () => {
  // estados del dashboard
  const [loading, setLoading] = useState(true);

  // funcion para obtener los datos de los graficos
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // renderizamos el dashboard
  return (
    loading ? <div style={{height: "100vh", width:"100%", display: "flex", justifyContent: "center", alignItems: "center"}}><DotLoader color="#1D1D1D" /></div>
   : 
   <div className="layout">
   <div
     className="dashboard"
     style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "flex-start",
     }}
   >
     <div className="dashboard__wrapper">
       <div className="dashboard__cards">
         <SingleCard item={carObj} />
         <SingleCard item={tripObj} />
         <SingleCard item={clientObj} />
         <SingleCard item={distanceObj} />
       </div>

       <div className="statics">
         <div className="stats">
           <h3 className="stats__title">Ventas Mensuales</h3>
           <MileChart />
         </div>

         <div className="stats">
           <h3 className="stats__title">Flujo Mensual</h3>
           <CarStatsChart />
         </div>
       </div>

       <div className="recommend__cars-wrapper">
         {recommendCarsData.map((item) => (
           <RecommendCarCard item={item} key={item.id} />
         ))}
       </div>
     </div>
   </div>
 </div>
  );
};

export default Dashboard;