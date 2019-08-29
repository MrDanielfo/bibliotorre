import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditarSuscriptor = ({ suscriptor, firestore, history }) => {

  const initialState = {
    nombre: '',
    apellido: '',
    carrera: '',
    codigo: ''
  };
  
  const [userData, setUserData] = useState(initialState);

  const { nombre, apellido, carrera, codigo } = userData;

  const onChange = e => setUserData({ ...userData, [e.target.name]: e.target.value });

   useEffect(() => {

    if(suscriptor === undefined) {

    } else {
        setUserData({
          nombre: !suscriptor.nombre ? '' : suscriptor.nombre,
          apellido: !suscriptor.apellido ? '' : suscriptor.apellido,
          carrera: !suscriptor.carrera ? '' : suscriptor.carrera,
          codigo: !suscriptor.codigo ? '' : suscriptor.codigo
        });
    }

   }, [suscriptor]);

  const sendData = e => {
    e.preventDefault();
    const editSus = userData;
    firestore.update({ 
        collection: 'suscriptores',
        doc: suscriptor.id
    }, 
    editSus)
      .then(() => history.push('/suscriptores'));
  };

  if (!suscriptor || suscriptor === undefined) return <Spinner />;
  
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/suscriptores" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> {''}
          Volver al listado
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas-fa-user-plus"></i> {''}
          Editar Suscriptor
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8 mt-3">
            <form onSubmit={sendData}>
              <div className="form-group">
                <label>Nombre: </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre del Suscriptor"
                  defaultValue={nombre}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido: </label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  placeholder="Apellido del Suscriptor"
                  defaultValue={apellido}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Carrera: </label>
                <input
                  type="text"
                  className="form-control"
                  name="carrera"
                  placeholder="Carrera del Suscriptor"
                  defaultValue={carrera}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Matrícula: </label>
                <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  placeholder="Matrícula del Suscriptor"
                  defaultValue={codigo}
                  onChange={e => onChange(e)}
                  required
                />
              </div>

              <input type="submit" className="btn btn-primary my-1" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};


EditarSuscriptor.propTypes = {
    suscriptor: PropTypes.object.isRequired,
}

export default compose(
  firestoreConnect(({ match }) => [
    {
      collection: 'suscriptores',
      storeAs: 'suscriptor',
      doc: match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor); 

