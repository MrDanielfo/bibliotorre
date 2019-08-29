import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const MostrarSuscriptor = ({ suscriptor }) => {

    if (!suscriptor || suscriptor === undefined) return <Spinner />;

    return (
      <div className="row">
        <div className="col-md-6 my-3">
          <Link to="/suscriptores" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver a Suscriptores
          </Link>
        </div>
        <div className="col-md-6 my-3">
          <Link
            to={`/suscriptores/editar/${suscriptor.id}`}
            className="btn btn-warning"
          >
            <i className="fas fa-pencil-alt"></i> Editar Suscriptor
          </Link>
        </div>

        <div className="col-12 mt-3">
          <h2 className="mb-4">
            {suscriptor.nombre} {suscriptor.apellido}
          </h2>

          <p>
            <span className="font-weight-bold">Carrera: </span> {''}
            {suscriptor.carrera}
          </p>

          <p>
            <span className="font-weight-bold">Matrícula: </span> {''}
            {suscriptor.codigo}
          </p>
        </div>
      </div>
    );
}

MostrarSuscriptor.propTypes = {
    suscriptor: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(({match}) => [ 
        { 
            collection: 'suscriptores',
            storeAs: 'suscriptor',
            doc: match.params.id
        }
    ]),
  connect(({ firestore: { ordered } }) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(MostrarSuscriptor); 
