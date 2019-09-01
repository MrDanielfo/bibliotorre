import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

const NuevoLibro = ({firestore, history}) => {

    const initialState = {
        titulo: '',
        isbn: '',
        editorial: '',
        existencia: '',
        prestados: []
    }

    const [bookData, setBookData] = useState(initialState);

    const { titulo, isbn, editorial , existencia } = bookData;

    const onChange = (e) => setBookData({ ...bookData, [e.target.name] : e.target.value })

    const sendData = (e) => {
        e.preventDefault();

        // Extraer valores del state 
        const nuevoBook = bookData;

        // guardarlo en base de datos
        firestore.add({ collection: 'libros' }, nuevoBook)
                .then(() => history.push('/'))
    }



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
                                    value={titulo}
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
                                    value={isbn}
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
                                    value={editorial}
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
                                    value={existencia}
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

NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoLibro);
