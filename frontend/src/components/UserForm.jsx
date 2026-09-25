export default function UserForm({ submitText }) {
  return (
    <form className="user-form">
      <label htmlFor="username">Nom d'utilisateur</label>
      <input
        type="text"
        name="username"
        id="username"
        min="3"
        max="15"
        placeholder="darwin"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="darwin@gmail.com"
        required
      />
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" id="password" min="6" required />
      <button type="submit">{submitText}</button>
    </form>
  );
}
