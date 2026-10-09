export default function Dashboard({ handleChange, currentUser }) {
  const today = new Date();
  return (
    <main className="dashboard-page">
      <h1>Tableau de Bord</h1>
      <p>
        Welcome <span>{currentUser.username}</span>
      </p>
      <div className="dashboard-infos">
        <p>{currentUser.email}</p>
        <p>
          {today.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </main>
  );
}
