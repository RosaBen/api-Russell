export default function CatwayForm({ submitText, inputChange, submit, form }) {
  return (
    <form className="catway-form" onSubmit={submit}>
      <label>
        Numéro du ponton{" "}
        <input
          type="text"
          name="catwaynumber"
          value={form.catwaynumber}
          onChange={inputChange}
          placeholder="01Cat"
          required
        />
      </label>

      <div className="radio-btns">
        <label>
          <input type="radio" name="catwaytype" value="long" />
          Ponton long
        </label>
        <label>
          <input type="radio" name="catwaytype" value="short" />
          Ponton Court
        </label>
      </div>

      <label htmlFor="catwaystate">
        Etat du ponton{" "}
        <textarea
          name="catwaystate"
          id="catwaystate"
          placeholder="bon etat?"
        ></textarea>
      </label>

      <button type="submit">{submitText}</button>
    </form>
  );
}
