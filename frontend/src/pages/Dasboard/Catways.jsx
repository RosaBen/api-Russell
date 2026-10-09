import { useEffect, useState } from "react";
import CatwayForm from "../../components/dashboard/CatwayForm";
import CatwayCard from "../../components/dashboard/CatwayCard";
import { createCatway } from "../../assets/scripts/fetchCatways";

export default function Catways({
  handleChange,
  catways,
  setCatways,
  loadingCatways,
  fetchCatways,
  isConnected,
}) {
  const [showForm, setShowForm] = useState(false);
  const [catwayForm, setCatwayForm] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: "Bon état",
  });

  const handleCreateCatway = async (e) => {
    e.preventDefault();
    try {
      const newCatway = await createCatway(catwayForm);
      console.log("catway created");
      setCatways((prev) => [newCatway, ...prev]);
      fetchCatways();
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

  useEffect(() => {
    fetchCatways();
  }, []);

  const catwaysList = catways.map((catway) => (
    <CatwayCard catway={catway} key={catway.id || catway._id} />
  ));

  if (loadingCatways) {
    return <p>Chargement ...</p>;
  }
  return (
    isConnected && (
      <main className="catways-page">
        <h1>Liste des pontons</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="create-catway-btn"
            aria-expanded={showForm}
            aria-label="Ajouter un ponton"
            aria-controls="catway-form"
          >
            Ajouter un ponton
          </button>
        )}
        {showForm && (
          <div className="catway-form-modal">
            <CatwayForm
              submitText="Ajouter le ponton"
              inputChange={handleChange(setCatwayForm)}
              submit={handleCreateCatway}
              form={catwayForm}
            />
            <button
              onClick={() => setShowForm(false)}
              aria-label="Fermer le formulaire"
            >
              X
            </button>
          </div>
        )}

        {!showForm && <div className="catways-list">{catwaysList}</div>}
      </main>
    )
  );
}
