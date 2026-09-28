import { useState } from "react";
import CatwayForm from "../components/CatwayForm";
import { createCatway } from "../assets/scripts/fetchApi";
export default function Catways() {
  const [showForm, setShowForm] = useState(false);
  const [catwayForm, setCatwayForm] = useState;
  return (
    <>
      <h1>Liste des pontons</h1>
      <button>Ajouter un ponton</button>
      {showForm && (
        <CatwayForm
          submitText="Ajouter le ponton"
          inputChange="test"
          submit="test"
          form="test"
        />
      )}
    </>
  );
}
