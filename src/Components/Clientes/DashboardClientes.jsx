import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableClientes from "./DatatableClientes";
import NavbarClientes from "./NavbarClientes";
import { FiltrosBar } from "./FiltrosBar";

// este componente es el que se encarga de renderizar el dashboard de clientes
const DashboardClientes = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    dni: "",
    provincia: "",
    localidad: "",
    cliente: "",
  });

  // renderizamos el navbar y la datatable
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        top: "0",
        marginLeft: "80px",
      }}
    >
      <NavbarClientes setBusqueda={setBusqueda} />
      <FiltrosBar setFiltros={setFiltros} />
      <br />
      <DataTableClientes
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
        filtros={filtros}
      />
    </Box>
  );
};

export default DashboardClientes;
