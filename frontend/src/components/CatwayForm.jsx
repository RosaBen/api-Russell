export default function CatwayForm({ submitText, inputChange, submit, form }) {
  return (
    <form className="catway-form" onSubmit={submit}>
      <label>
        Numéro du ponton{" "}
        <input
          type="number"
          name="catwayNumber"
          value={form.catwayNumber}
          onChange={inputChange}
          placeholder="125"
          required
        />
      </label>

      <div className="radio-btns">
        <label>
          <input
            type="radio"
            name="catwayType"
            value="long"
            checked={form.catwayType === "long"}
            onChange={inputChange}
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
          Ponton Court
        </label>
      </div>

      <label htmlFor="catwaystate">
        Etat du ponton
        <textarea
          name="catwayState"
          id="catwaystate"
          placeholder="bon etat?"
          value={form.catwayState}
          onChange={inputChange}
        ></textarea>
      </label>

      <button type="submit">{submitText}</button>
    </form>
  );
}
