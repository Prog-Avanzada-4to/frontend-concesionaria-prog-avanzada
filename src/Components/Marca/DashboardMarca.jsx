import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTableMarca";
import NavbarMarca from "./NavbarMarca";

const DashboardMarca = () => {
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
<<<<<<< HEAD
        backgroundColor: "lightgray",
      }}
    >
      <NavbarMarca />
=======
        top: "0",
        marginLeft: "80px",
      }}
    >
      <NavbarMarca setBusqueda={setBusqueda} />
>>>>>>> 96fae35e10dc06bfb47b34fba4fb09e0be09bf27
      <br />
      <DataTable
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default DashboardMarca;
