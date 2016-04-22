import { normalize, arrayOf } from 'normalizr';
import { brand as brandSchema } from './schemas';
import { getJSON } from './crud';
import _ from 'lodash';

export const get = async function(id = '', params) {
  return await getJSON(`https://iq.api/api/brand/${id}`, params);
};

export const create = async function(data) {
  const body = new FormData();
  _.each(data, (value, key) => body.append(key, value));

  try {
    let response = await fetch('https://iq.api/api/brand', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      },
      body: body,
    });

    return normalize(await response.json(), brandSchema);
  } catch(err) {
    throw err;
  }
};