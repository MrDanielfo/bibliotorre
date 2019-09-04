import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

const Navbar = ({auth, firebase, history }) => {

    const initialState = {
      usuarioAutenticado : false
    };
    const [authData, setAuthData] = useState(initialState);

    const { usuarioAutenticado } = authData;

    useEffect(() => {
        if (auth.uid) {
          return setAuthData({ usuarioAutenticado: true });
        } else {
            return setAuthData({usuarioAutenticado: false })
        }
    }, [auth]);

    const cerrarSesion = (e) => {
        e.preventDefault();

        firebase.logout();
    }
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">

                <nav className="navbar navbar-light">
                    <span className="navbar-brand mb-0 h1">
                        Administrador de Libros
                    </span>
                </nav>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">

                    { usuarioAutenticado  ? (

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">
                                    Libros
                                </Link>
                            </li>  
                            <li className="nav-item">
                                <Link to='/suscriptores' className="nav-link">
                                    Suscriptores
                                </Link>
                            </li>   
                        </ul>

                    ) : <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/login' className="nav-link">
                                    Iniciar Sesión
                                </Link>
                            </li>  
                        </ul> 
                    }

                    { usuarioAutenticado ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='!#' className="nav-link">
                                    { auth.email }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={cerrarSesion}
                                >
                                Cerrar Sesión
                                </button>
                            </li>  
                          
                        </ul>
                    ) : null }

                </div>

            </nav>
        </Fragment>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar); 
