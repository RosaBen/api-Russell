import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  getCatway,
  EditCatway,
  deleteCatway,
} from "../assets/scripts/fetchCatways";
import CatwayCard from "../components/CatwayCard";

export default function Catway({ handleChange }) {
  const [catway, setCatway] = useState(null);
  const [loadingCatway, setloadingCatway] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: "Bon état",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [catwayNumber, setCatwayNumber] = useState(
    () =>
      location.state?.catwayNumber ||
      sessionStorage.getItem("selectedCatway") ||
      "",
  );

  async function fetchCatway() {
    if (!catwayNumber) {
      setCatway(null);
      setloadingCatway(false);
      return;
    }

    setloadingCatway(true);
    try {
      const catwayData = await getCatway(catwayNumber);
      setCatway(catwayData);
      sessionStorage.setItem("selectedCatway", catwayData.catwayNumber);
    } catch (error) {
      console.error(error.message);
      setCatway(null);
    } finally {
      setloadingCatway(false);
    }
  }

  const handleEditCatway = async (e) => {
    e.preventDefault();
    try {
      const currentCatwayNumber = catwayNumber;
      await EditCatway(currentCatwayNumber, editForm);
      const nextNumber = editForm.catwayNumber || currentCatwayNumber;
      if (nextNumber !== currentCatwayNumber) {
        sessionStorage.setItem("selectedCatway", nextNumber);
        setCatwayNumber(nextNumber);
      } else {
        const newData = await getCatway(currentCatwayNumber);
        setCatway(newData);
        console.log("catway edited");
      }
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteCatway(catwayNumber);
      sessionStorage.removeItem("selectedCatway");
      navigate("/catways");
      console.log("catway deleted");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCatway();
  }, [catwayNumber]);

  if (loadingCatway) {
    return <p>Chargement ...</p>;
  }
  return (
    <main>
      <Link
        to="/catways"
        // target="_blank" rel="noopener noreferrer"
        onClick={() => sessionStorage.removeItem("selectedCatway")}
      >
        Retour à la liste de pontons
      </Link>
      <CatwayCard
        catway={catway}
        handleChange={handleChange}
        showForm={showForm}
        setShowForm={setShowForm}
        handleEdit={handleEditCatway}
        editForm={editForm}
        setEditForm={setEditForm}
        handleDelete={handleDelete}
      />
    </main>
  );
}
