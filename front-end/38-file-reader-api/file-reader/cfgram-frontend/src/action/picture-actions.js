import superagent from 'superagent';
import * as routes from '../routes';

export const createAction = picture => ({
  type: 'CLIENT_PICTURE_CREATE',
  payload: picture,
});

export const createActionRequest = (picture) => (dispatch) => {
  // vinicio - here, we could get it from the cookie as well
  let token = localStorage.getItem('token');

  return superagent.post(`${__API_URL__}${routes.PICTURES_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('description',picture.description)
    .attach('photo',picture.photo)
    .then( response => {
      return dispatch(createAction(response.body)); // Vinicio - 'closing' the chain
    });
};
