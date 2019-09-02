import React from 'react'
import PropTypes from 'prop-types'

const FichaSuscriptor = ({ alumno }) => {
    return (
        <div className="card my-5">
            <h3 className="card-header bg-primary text-white">Datos del solicitante</h3>

            <div className="card-body">
                <p className="font-weight-bold">
                    Nombre: {''}
                    <span className="font-weight-normal">{alumno.nombre}</span>
                </p>
                <p className="font-weight-bold">
                    Apellido: {''}
                    <span className="font-weight-normal">{alumno.apellido}</span>
                </p>
                <p className="font-weight-bold">
                    Matrícula: {''}
                    <span className="font-weight-normal">{alumno.codigo}</span>
                </p>
                <p className="font-weight-bold">
                    Carrera: {''}
                    <span className="font-weight-normal">{alumno.carrera}</span>
                </p>
            </div>

        </div>
    )
}

FichaSuscriptor.propTypes = {
    alumno: PropTypes.object.isRequired
}

export default FichaSuscriptor
