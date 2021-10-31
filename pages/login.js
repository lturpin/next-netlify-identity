import { useReducer, useState, useContext } from 'react';
import AuthContext from '../stores/authContext';
import Message from '../components/Message';
import * as styles from '../styles/Signup.module.css';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      email: '',
      password: '',
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Login = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    auth
      .login(formData.email, formData.password, true)
      .then((response) => (
        <>
          <Message
            message="Succcessfully Logged in"
            level="success"
          />
          {console.log('Success', response)}
        </>
      ))
      .catch((error) => (
        <>
          <Message
            message={`Failed: (${JSON.stringify(error)})`}
            level="danger"
          />
          {console.log(`Failed: ${JSON.stringify(error)}`)}
        </>
      ));

    console.log(formData);
    setFormData({
      reset: true,
    });
  };

  const handleChange = (e) => {
    setFormData({
      name: e.target.name,
      value: e.target.value,
    });
  };
  return (
    <div className={styles.signup}>
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <label htmlFor="email" disabled={submitting}>
          Email:
        </label>
        <input
          type="text"
          onChange={handleChange}
          disabled={submitting}
          name="email"
          value={formData.email || ''}
          id="email"
        />
        <label htmlFor="password" disabled={submitting}>
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          disabled={submitting}
          value={formData.password || ''}
          onChange={handleChange}
        />
        <div>
          <button type="submit" disabled={submitting}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
