export default function BookingForm({
  catwaysList,
  submitText,
  inputChange,
  submit,
  form,
}) {
  const catways = catwaysList.map((catway) => (
    <option key={catway} value={Number(catway)}>
      Ponton {catway}
    </option>
  ));
  return (
    <form className="booking-form" onSubmit={submit}>
      <label htmlFor="catway-number">Numéro du Catway</label>
      <select
        name="catway-number"
        id="catway-number"
        value={form.catwayNumber}
        onChange={inputChange}
      >
        <option value="">-- Choisir un ponton --</option>
        {catways}
      </select>
      <fieldset>
        <legend>Infos Client</legend>
        <label htmlFor="client-name">Nom du client</label>
        <input
          type="text"
          placeholder="Jean Moulin"
          id="client-name"
          name="client-name"
        />
        <label htmlFor="boat-name">Nom du bateau</label>
        <input
          type="text"
          placeholder="Casper"
          id="boat-name"
          name="boat-name"
        />
      </fieldset>
      <fieldset>
        <legend>Dates de séjour</legend>
        <label htmlFor="start-date">Date d'entrée</label>
        <input type="date" name="start-date" id="start-date" />
        <label htmlFor="end-date">Date départ</label>
        <input type="date" name="end-date" id="end-date" />
      </fieldset>
      <button type="submit">{submitText}</button>
    </form>
  );
}
