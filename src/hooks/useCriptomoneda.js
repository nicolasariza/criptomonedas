import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {
  // State del custom hook
  const [state, setState] = useState(stateInicial);

  const SelectCriptomoneda = () => {
    return (
      <Fragment>
        <Label>{label}</Label>
        <Select onChange={(e) => setState(e.target.value)} value={state}>
          <option value="">-- Seleccione --</option>
          {opciones.map((opcion) => (
            <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
              {opcion.CoinInfo.FullName}
            </option>
          ))}
        </Select>
      </Fragment>
    );
  };

  //Se retorna State, interfaz y funcion que modifica el state
  return [state, SelectCriptomoneda, setState];
};

export default useCriptomoneda;
