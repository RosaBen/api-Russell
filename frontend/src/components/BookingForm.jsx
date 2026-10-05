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
      <select
        name="catwayNumber"
        value={form.catwayNumber}
        onChange={inputChange}
      >
        <option value="" disabled>
          -- Sélectionner un ponton --
        </option>
        {catways}
      </select>
      <fieldset>
        <legend>Infos Client</legend>
        <label>
          Nom du client
          <input
            type="text"
            placeholder="Jean Moulin"
            name="clientName"
            value={form.clientName}
            onChange={inputChange}
          />
        </label>

        <label>
          Nom du bateau
          <input
            type="text"
            placeholder="Casper"
            name="boatName"
            value={form.boatName}
            onChange={inputChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Dates de séjour</legend>
        <label>
          Date d'entrée
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={inputChange}
          />
        </label>

        <label>
          Date départ{" "}
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={inputChange}
          />
        </label>
      </fieldset>
      <button type="submit">{submitText}</button>
    </form>
  );
}
