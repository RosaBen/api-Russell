import { useState } from "react";
import CatwayForm from "../components/CatwayForm";
import { createCatway } from "../assets/scripts/fetchApi";
export default function Catways({ handleChange }) {
  const [showForm, setShowForm] = useState(false);
  const [catwayForm, setCatwayForm] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: "",
  });

  const handleCreateCatway = async (e) => {
    e.preventDefault();
    try {
      console.log("1", catwayForm);
      await createCatway(catwayForm);
      console.log("2", catwayForm);
      console.log("catway created");
      setCatwayForm({
        catwayNumber: "",
        catwayType: "",
        catwayState: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1>Liste des pontons</h1>
      <button onClick={() => setShowForm(true)}>Ajouter un ponton</button>
      {showForm && (
        <div className="catway-form-modal">
          <CatwayForm
            submitText="Ajouter le ponton"
            inputChange={handleChange(setCatwayForm)}
            submit={handleCreateCatway}
            form={catwayForm}
          />
          <button onClick={() => setShowForm(false)}>X</button>
        </div>
      )}
    </>
  );
}
