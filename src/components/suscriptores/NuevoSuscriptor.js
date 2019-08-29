import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

const NuevoSuscriptor = ({ firestore, history }) => {

    const initialState = {
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''
    }

    const [userData, setUserData ] = useState(initialState);

    const { nombre, apellido, carrera, codigo } = userData;

    const onChange = (e) => setUserData({...userData, [e.target.name] : e.target.value })

    const sendData = (e) => {
        e.preventDefault();

        // Extraer valores del state 
        const nuevoSus = userData;
        
        // guardarlo en base de datos
        firestore.add({ collection: 'suscriptores' }, nuevoSus)
                 .then(() => history.push('/suscriptores') )
    }

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
            Nuevo Suscriptor
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
                    value={nombre}
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
                    value={apellido}
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
                    value={carrera}
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
                    value={codigo}
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
}

NuevoSuscriptor.propTypes = {
    firestory: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoSuscriptor);
