import { useLocation, Link } from "react-router-dom";
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
  const isCatwaysPage = location.pathname === "/catways";

  return (
    <article className="catway-card">
      {!showForm && (
        <div className="catway-infos">
          <p>{`Ponton ${catway.catwayNumber}`}</p>
          <p>
            Longueur: <span>{` ${catway.catwayType}`}</span>
          </p>
          <p>{catway.catwayState}</p>
        </div>
      )}

      <div className="btns">
        {isCatwaysPage && (
          <Link
            to="/catway"
            className="blue"
            // target="_blank" rel="noopener noreferrer"
            onClick={() =>
              sessionStorage.setItem("selectedCatway", catway.catwayNumber)
            }
          >
            Plus d'infos
          </Link>
        )}
        {!showForm && !isCatwaysPage && (
          <div className="edit-del-btns">
            <button
              className="edit-btn orange"
              onClick={() => {
                setEditForm({
                  catwayNumber: catway.catwayNumber,
                  catwayType: catway.catwayType,
                  catwayState: catway.catwayState,
                });
                setShowForm(true);
              }}
            >
              Modifier
            </button>
            <button className="delete-btn red" onClick={handleDelete}>
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
