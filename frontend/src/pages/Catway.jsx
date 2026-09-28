import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCatway } from "../assets/scripts/fetchApi";
import CatwayCard from "../components/CatwayCard";

export default function Catway({ handleChange }) {
  const [catway, setCatway] = useState(null);
  const [loadingCatway, setloadingCatway] = useState(true);
  const location = useLocation();
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

  useEffect(() => {
    fetchCatway();
  }, [catwayNumber]);

  if (loadingCatway) {
    return <p>Chargement ...</p>;
  }
  return (
    <main>
      <h1>Information sur le ponton</h1>
      <CatwayCard catway={catway} handleChange={handleChange} />
    </main>
  );
}
