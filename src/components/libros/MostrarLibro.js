import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const MostrarLibro = ({ libro, firestore }) => {

    if (!libro || libro === undefined) return <Spinner />;

    let btnPrestamo;

    if (libro.existencia - libro.prestados.length > 0) {

        btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`}
                        className="btn btn-dark my-3"
                      >
                        Solicitar Préstamo
                      </Link>
    } else {
        btnPrestamo = null;
    }

    const devolverLibro = (codigo) => {
        const libroActualizado = {...libro};
        const prestados = libroActualizado.prestados.filter(alumno => alumno.codigo !== codigo);
        libroActualizado.prestados = prestados;

        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libroActualizado);

    }

    return (

        <div className="row">
            <div className="col-md-6 my-3">
                <Link to="/" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> Volver a lista de Libros
                </Link>
            </div>
            <div className="col-md-6 my-3">
                <Link
                    to={`/libros/editar/${libro.id}`}
                    className="btn btn-warning"
                >
                    <i className="fas fa-pencil-book"></i> Editar Libro
                </Link>
            </div>

            <div className="col-12 mt-3">
                <h2 className="mb-4">
                    {libro.titulo} 
                </h2>

                <p>
                    <span className="font-weight-bold">Editorial: </span> {''}
                    {libro.editorial}
                </p>

                <p>
                    <span className="font-weight-bold">ISBN: </span> {''}
                    {libro.isbn}
                </p>

                <p>
                    <span className="font-weight-bold">Ejemplares: </span> {''}
                    {libro.existencia}
                </p>
                <p>
                    <span className="font-weight-bold">Disponibles para préstamo: </span> {''}
                    {libro.existencia - libro.prestados.length}
                </p>

                {btnPrestamo}

                <h3 className="mb-4">Personas que han tomado un ejemplar del libro</h3>

                {libro.prestados.map((alumno, index) => (
                    <div key={index} className="card my-2">
                        <h4 className="card-header">
                            {alumno.nombre} {alumno.apellido}
                        </h4>
                        <div className="card-body">
                            <p>
                                <span className="font-weight-bold">Código: </span> {''}
                                {alumno.codigo}
                            </p>

                            <p>
                                <span className="font-weight-bold">Carrera: </span> {''}
                                {alumno.carrera}
                            </p>

                            <p>
                                <span className="font-weight-bold">Fecha de inicio de préstamo: </span> {''}
                                {alumno.fecha_solicitud}
                            </p>
                            <div className="card-footer">
                                <button
                                    type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={() => devolverLibro(alumno.codigo)}
                                >
                                    Realizar devolución
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>

        </div>

    )
}

MostrarLibro.propTypes = {
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
)(MostrarLibro); 
