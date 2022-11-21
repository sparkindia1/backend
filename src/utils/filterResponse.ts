const fieldsNotToSend = ['password', 'isDeleted'];

function filter<T>(obj: T) {
  const res: Partial<T> = {};
  for (const key in obj) {
    if (!fieldsNotToSend.includes(key)) {
      res[key] = obj[key];
    }
  }
  return res;
}

function filterResponse<T>(response: T | T[]) {
  if (Array.isArray(response)) {
    const res: Array<Partial<T>> = response.map((item) => filter<T>(item));
    return res;
  } else {
    return filter<T>(response);
  }
}

export default filterResponse;
