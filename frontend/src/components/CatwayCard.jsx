import { useLocation, useNavigate } from "react-router-dom";
import CatwayForm from "./CatwayForm";

export default function CatwayCard({
  catway,
  handleChange,
  showForm,
  setShowForm,
  handleEdit,
  editForm,
  setEditForm,
  handleDelete,
}) {
  if (!catway) return null;
  const location = useLocation();
  const navigate = useNavigate();
  const isCatwaysPage = location.pathname === "/catways";

  const handleViewCatway = () => {
    sessionStorage.setItem("selectedCatway", catway.catwayNumber);
    navigate("/catway", {
      state: {
        catwayNumber: catway.catwayNumber,
      },
    });
  };

  return (
    <article className="catway-card">
      <p>{`Ponton ${catway.catwayNumber}`}</p>
      <p>
        Longueur: <span>{` ${catway.catwayType}`}</span>
      </p>
      <p>{catway.catwayState}</p>

      <div className="btns">
        {isCatwaysPage && (
          <button onClick={handleViewCatway}>Voir le catway</button>
        )}
        {!isCatwaysPage && (
          <div className="edit-del-btns">
            <button className="edit-btn" onClick={() => setShowForm(true)}>
              Modifier
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        )}
      </div>
      {showForm && (
        <CatwayForm
          submitText="Modifier"
          inputChange={handleChange(setEditForm)}
          submit={handleEdit}
          form={editForm}
        />
      )}
    </article>
  );
}
