const validatepicture = picture => {
  if(!picture)
    throw new Error('Invalid Picture');

  let {_id,url,description,owner} = picture;

  if(!_id || !url || !description || !owner)
    throw new Error('Invalid Picture');
};

export default(state = [],{type,payload}) => {
  switch(type){
    case 'CLIENT_PICTURE_CREATE':
      validatepicture(payload);
      return [payload,...state];
    case 'TOKEN_DELETE':
      return [];
    default:
        return state;
  }
}