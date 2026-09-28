export default function CatwayCard({ catway }) {
  return (
    <article className="catway-card">
      <p>{`Ponton ${catway.catway.catwayNumber}`}</p>
      <p>
        Longueur: <span>{` ${catway.catway.catwayType}`}</span>
      </p>
      <p>{catway.catway.catwayState}</p>
    </article>
  );
}
