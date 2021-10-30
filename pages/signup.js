import { useState, useReducer, useContext } from 'react';
import Message from '../components/Message';
import AuthContext from '../stores/authContext';
import * as styles from '../styles/Signup.module.css';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      displayname: '',
      email: '',
      password: '',
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Signup = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const message = 'A Confirmation Email Has Been Sent';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    auth
      .signup(formData.email, formData.password)
      .then((response) => {
        console.log('Confirmation email sent', response);
        setEmailSent(true);
      })
      .catch((error) => (
        <Message
          message={`An error has occurred: ${error}`}
          level="danger"
        />
      ));
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
      {emailSent && <Message message={message} level="success" />}
      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>

        <label htmlFor="displayname" disabled={submitting}>
          Name
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.displayname || ''}
          disabled={submitting}
          name="displayname"
          id="displayname"
        />
        <label htmlFor="email" disabled={submitting}>
          Email
        </label>
        <input
          type="text"
          onChange={handleChange}
          value={formData.email || ''}
          disabled={submitting}
          name="email"
          id="email"
        />
        <label htmlFor="password" disabled={submitting}>
          Password
        </label>
        <input
          type="password"
          onChange={handleChange}
          value={formData.password || ''}
          disabled={submitting}
          name="password"
          id="password"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
