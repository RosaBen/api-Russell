export default function CatwayCard({ catway }) {
  return (
    <article className="catway-card">
      <p>{`Ponton ${catway.catwayNumber}`}</p>
      <p>
        Longueur: <span>{` ${catway.catwayType}`}</span>
      </p>
      <p>{catway.catwayState}</p>
    </article>
  );
}
