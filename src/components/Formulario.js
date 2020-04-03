import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
  // State listado criptomonedas
  const [listaCriptomonedas, setListaCriptomonedas] = useState([]);
  // State para validar errores
  const [error, setError] = useState(false);

  const MONEDA = [
    { codigo: "COP", nombre: "Peso Colombiano" },
    { codigo: "USD", nombre: "Dolar Estadounidense" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
  ];
  // usar hook useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tú moneda", "", MONEDA);
  // usar hook useCriptomoneda
  const [criptomoneda, SelectCriptomoneda] = useCriptomoneda(
    "Elige tú criptomoneda",
    "",
    listaCriptomonedas
  );

  //Ejecutar llamado a la api
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setListaCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    if ((moneda === "") | (criptomoneda === "")) {
      setError(true);
      return;
    }

    setError(false);

    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje={"Todos los campos son obligatorios"} /> : null}
      <SelectMonedas />
      <SelectCriptomoneda />
      <Boton type="submit" value="calcular" />
    </form>
  );
};

export default Formulario;
