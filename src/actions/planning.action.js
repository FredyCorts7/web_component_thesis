import Swal from 'sweetalert2';
import { types } from '../fixtures/types';
import { fetchWithoutToken } from '../helpers/request.helper';

export const startComponentCreate = (data, reset) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken(`component`, data, 'POST');
      const component = await res.json();

      if (component.status) {
        Swal.fire({
          title: 'Error',
          text: component.message,
          icon: 'error',
        });
      } else {
        dispatch(componentCreated(component));
        reset();
        Swal.fire('Correctamente', 'Componente registrado', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const componentCreated = (component) => ({
  type: types.planningComponentCreated,
  payload: component,
});

export const startComponentsRead = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken(`component`);
      const components = await res.json();

      if (components.status) {
        Swal.fire({
          title: 'Error',
          text: components.message,
          icon: 'error',
        });
      } else {
        dispatch(componentsReaded(components));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const componentsReaded = (components) => ({
  type: types.planningComponentsReaded,
  payload: components,
});

export const menuDetailAdded = (detail) => ({
  type: types.planningMenuDetailAdded,
  payload: detail,
});

export const menuDetailDeleted = (componentId) => ({
  type: types.planningMenuDetailDeleted,
  payload: componentId,
});

export const startMenuCreate = (data, reset) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken(`menu`, data, 'POST');
      const menu = await res.json();

      if (menu.errors) {
        Swal.fire({
          title: 'Error',
          text: 'La fecha seleccionada ya cuenta con un menú registrado',
          icon: 'error',
        });
      } else {
        reset();
        dispatch(menuDetailsReseted());
        Swal.fire('Correctamente', 'Menu registrado', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const menuDetailsReseted = () => ({
  type: types.planningMenuDetailsReseted,
});
