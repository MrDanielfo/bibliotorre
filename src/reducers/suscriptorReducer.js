import { BUSCAR_USUARIO } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {

    const { type, usuario } = action;

    switch (type) {
      case BUSCAR_USUARIO:
        return {
            ...state,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            codigo: usuario.codigo,
            carrera: usuario.carrera
        };

      default:
        return state;
    }
}
