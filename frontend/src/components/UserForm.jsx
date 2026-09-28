export default function UserForm({ submitText, inputChange, submit, form }) {
  return (
    <form className="user-form" onSubmit={submit}>
      <label htmlFor="username">Nom d'utilisateur</label>
      <input
        type="text"
        name="username"
        id="username"
        min="3"
        max="15"
        value={form.username}
        onChange={inputChange}
        placeholder="darwin"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={form.email}
        onChange={inputChange}
        placeholder="darwin@gmail.com"
        required
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        value={form.password}
        onChange={inputChange}
        min="6"
        required
      />
      <button type="submit">{submitText}</button>
    </form>
  );
}
