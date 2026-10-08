export default function CatwayForm({ submitText, inputChange, submit, form }) {
  return (
    <form className="catway-form" onSubmit={submit} id="catway-form" noValidate>
      <label>
        Numéro du ponton
        <input
          type="number"
          name="catwayNumber"
          value={form.catwayNumber}
          onChange={inputChange}
          placeholder="125"
          min="1"
          required
        />
      </label>
      <fieldset className="radio-btns">
        <legend>Longueur du ponton</legend>
        <label>
          <input
            type="radio"
            name="catwayType"
            value="long"
            checked={form.catwayType === "long"}
            onChange={inputChange}
            required
          />
          Ponton long
        </label>
        <label>
          <input
            type="radio"
            name="catwayType"
            value="short"
            checked={form.catwayType === "short"}
            onChange={inputChange}
          />
          Ponton court
        </label>
      </fieldset>
      <label>
        Etat du ponton
        <textarea
          name="catwayState"
          placeholder="description de l'état du ponton"
          value={form.catwayState}
          onChange={inputChange}
        ></textarea>
      </label>
      <button type="submit">{submitText}</button>
    </form>
  );
}
