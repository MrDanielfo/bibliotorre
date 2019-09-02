import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

const PrestamoLibro = ({libro, firestore, history }) => {

    const initialState = {
        busqueda: '',
        resultado: {},
        noResultado: false
    }

    const [searchData, setSearchData ] = useState(initialState)

    const { busqueda, resultado, noResultado } = searchData

    const onChange = (e) => setSearchData({ ...searchData, [e.target.name]: e.target.value });

    let fichaAlumno;
    let btnSolicitar;

    const solicitarPrestamo = () => {
        const suscriptor = resultado;
        
        suscriptor.fecha_solicitud = new Date().toLocaleDateString();

        const libroActualizado = libro

        libroActualizado.prestados.push(suscriptor);

        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libroActualizado)
                .then(() => history.push('/'));
    }

    if(resultado.nombre) {
        fichaAlumno =  <FichaSuscriptor alumno={resultado} />
        btnSolicitar = <button 
                            type="button"
                            className="btn btn-dark btn-block"
                            onClick={solicitarPrestamo}
                        >
                        Solicitar Préstamo
                       </button>
    } else {
        fichaAlumno = null;
        btnSolicitar = null;
    }


    const buscarAlumno = e => {
       e.preventDefault();
       // Hacer consulta
        const collecion = firestore.collection('suscriptores');
        const consulta = collecion.where("codigo", "==", busqueda).get();

        consulta.then(user => {
            if(user.empty) {
                setSearchData({
                    ...searchData,
                    resultado: { },
                    noResultado: true
                })
            } else {
                const datos = user.docs[0];
                setSearchData({
                    ...searchData, 
                    resultado: datos.data(),
                    noResultado: false
                })
                
            }
        })
    };

    if (!libro || libro === undefined) return <Spinner />;

    return (

        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al listado
                </Link>
            </div>
            <div className="col-12">
                <h2>
                    <i className="fas-fa-book-plus"></i> {''}
                    Solicitar Préstamo de: {' '}
                    <strong>
                        { libro.titulo }
                    </strong>
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 my-5">
                        <form
                            onSubmit={buscarAlumno}
                            className="mb-3"
                        >
                            <legend className="color-primary text-center">
                                Busca al suscriptor por Código
                            </legend>
                            <div className="form-group">
                                <input type="text"
                                    name="busqueda"
                                    className="form-control"
                                    value={busqueda}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <input value="Buscar Alumno" type="submit" className="btn btn-warning btn-block"/>
                        </form>

                        {fichaAlumno}
                        {btnSolicitar}
                    </div>
                </div>
            </div>
        </div>

    )
}

PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(({ match }) => [
        {
            collection: 'libros',
            storeAs: 'libro',
            doc: match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(PrestamoLibro); 
