const UserForm = (props) => {
  const { title, username, setUsername, password, setPassword, handleSubmit } =
    props;
  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mb-3" type="submit">
          {title}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
