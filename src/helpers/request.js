/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
export const buildQueryString = filter => {
  const qs = [];
  Object.keys(filter).forEach(key => {
    if (!['', null, undefined].includes(filter[key])) {
      if (!Array.isArray(filter[key])) qs.push(`${key}=${filter[key]}`);
      else if (filter[key] !== []) {
        filter[key].forEach(item => qs.push(`${key}=${item}`));
      }
    }
  });
  return `?${qs.join('&')}`;
};
