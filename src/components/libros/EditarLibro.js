import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditarLibro = ({libro, firestore, history }) => {

    const initialState = {
        titulo: '',
        isbn: '',
        editorial: '',
        existencia: '',
        prestados: []
    }

    const [bookData, setBookData] = useState(initialState);

    const { titulo, isbn, editorial, existencia } = bookData;

    const onChange = (e) => setBookData({ ...bookData, [e.target.name]: e.target.value })

    useEffect(() => {

        if (libro === undefined) {

        } else {
            setBookData({
                titulo: !libro.titulo ? '' : libro.titulo,
                isbn: !libro.isbn ? '' : libro.isbn,
                editorial: !libro.editorial ? '' : libro.editorial,
                existencia: !libro.existencia ? '' : libro.existencia
            });
        }

    }, [libro]);

    const sendData = e => {
        e.preventDefault();
        const editBook = bookData;
        firestore.update({
            collection: 'libros',
            doc: libro.id
        },editBook)
            .then(() => history.push('/'));
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
                    Nuevo Libro
                </h2>

                <div className="row justify-content-center">
                    <div className="col-md-8 mt-3">
                        <form onSubmit={sendData}>
                            <div className="form-group">
                                <label>Título: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Título del libro"
                                    defaultValue={titulo}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>ISBN: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="isbn"
                                    placeholder="ISBN del Libro"
                                    defaultValue={isbn}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Editorial: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial"
                                    defaultValue={editorial}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Existencia: </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    name="existencia"
                                    placeholder="Ejemplares para préstamo"
                                    defaultValue={existencia}
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
    )
}

EditarLibro.propTypes = {
    libro: PropTypes.object.isRequired
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
)(EditarLibro); 
