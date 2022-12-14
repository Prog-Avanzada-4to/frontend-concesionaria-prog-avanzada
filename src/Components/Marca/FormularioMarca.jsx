import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllPaises, saveMarca, updateMarca } from "../../Services";

const FormularioMarca = ({ onClose, isEdit, marca, isEmbedded, fetchAllDataFormVehiculo}) => {
  // estados para el formulario
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [paises, setPaises] = useState([]);

  // funcion para obtener los paises
  const getPaises = async () => {
    const paises = await getAllPaises();
    setPaises(paises);
    setLoadingModal(false);
  };

  // funcion para obtener los paises cuando se renderiza el componente
  useEffect(() => {
    getPaises();
  }, []);

  // funcion para guardar la marca, este metodo llama a la api y cierren el componente
  const guardarMarca = async (valores) => {
    await saveMarca(valores).then((response) => {
      onClose();
      if(!isEmbedded){
        window.location.reload();
      }else{
        fetchAllDataFormVehiculo();
      }

    });
  };

  // funcion para actualizar la marca, este metodo llama a la api y cierren el componente
  const actualizarMarca = async (valores) => {
    await updateMarca({
      id: marca.id,
      nombre: valores.marca,
      pais: valores.pais,
    }).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  // function para obtener el id del pais del formulario
  const getPais = (nombre) => {
    const pais = paises.find((pais) => pais.nombre === nombre);
    if (pais) {
      return pais.id;
    } else {
      return paises[0].id;
    }
  };

  // funcion para validar el formulario
  const validateValues = (valores) => {
    let errores = {};
    // Validacion marca
    if (!valores.marca) {
      errores.marca = "Por favor ingresa una marca";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.marca)) {
      errores.marca = "La marca solo puede contener letras y espacios";
    }
    return errores;
  };

  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    if (!isEdit) {
      guardarMarca(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarMarca(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    }
  };

  // renderizamos el componente
  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nueva Marca</h2> : <h2>Editar Marca</h2>}
          <Formik
            initialValues={{
              marca: marca?.nombre ? marca.nombre : "",
              pais: getPais(marca?.pais),
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors }) => (
              <Form className="formulario">
                <div>
                  <label htmlFor="marca">Marca</label>
                  <Field
                    type="text"
                    id="marca"
                    name="marca"
                    placeholder="Nombre de la marca"
                  />
                  <ErrorMessage
                    name="marca"
                    component={() => (
                      <div className="error">{errors.marca}</div>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="pais">País</label>
                  <Field as="select" name="pais" id="pais">
                    {paises.map((pais) => {
                      return (
                        <option key={pais.id} value={pais.id}>
                          {pais.nombre}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                <button type="submit">
                  {!saving ? <span>Enviar</span> : <BeatLoader color="white" />}
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default FormularioMarca;
