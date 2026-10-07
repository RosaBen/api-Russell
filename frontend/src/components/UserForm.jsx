export default function UserForm({
  submitText,
  inputChange,
  submit,
  form,
  btnColor,
  errors,
}) {
  return (
    <form className="user-form" onSubmit={submit} id="user-form">
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
        aria-invalid={!!errors.username}
        aria-describedby={errors.username ? "username-error" : undefined}
        required
      />
      {errors.username && <p id="username-error">{errors.username}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={form.email}
        onChange={inputChange}
        placeholder="darwin@gmail.com"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
        required
      />
      {errors.email && <p id="email-error">{errors.email}</p>}
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        value={form.password}
        onChange={inputChange}
        min="6"
        aria-invalid={!!errors.password}
        aria-describedby={errors.password ? "password-error" : undefined}
        required
      />
      {errors.password && <p id="password-error">{errors.password}</p>}
      <button type="submit" className={btnColor}>
        {submitText}
      </button>
    </form>
  );
}
