import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';

const Login = ({ firebase }) => {

    const initialState = {
      email: '',
      password: '' 
    };

    const [userData, setUserData] = useState(initialState);

    const { email, password } = userData;

    const onChange = e => setUserData({ ...userData, [e.target.name]: e.target.value });

    const sendData = e => {
      e.preventDefault();

      firebase.login({
        email,
        password
      })
      .then(resultado => console.log('Iniciaste sesión'))
      .catch(err => console.log('Hubo un error'))

    };


    return (
      <Fragment>
        <h2 className="text-center mt-4">
            <i className="fas fa-lock"></i> {''}
            Login
        </h2>
        <div className="row justify-content-center my-2">
          <div className="col-md-6 mt-4">
            <form onSubmit={sendData}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>

              <button type="submit" className="btn btn-success my-3">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);
