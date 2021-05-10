import axios from 'axios';

const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

export const fetchData = (url, language = 'pt-br') =>
  new Promise((resolve, reject) => {
    const languageReducer = element => {
      const languageMap = {
        'pt-br': 'pt_br',
        'en-us': 'en_us',
      };

      const sufix = `_${languageMap[language]}`;
      Object.keys(element).forEach(key => {
        // Select keys that needs to change
        const newKey = key.replace(sufix, '');
        if (key.includes(sufix)) {
          if (element[key] === '') {
            element[newKey] = element[`${newKey}_pt_br`];
          } else {
            element[newKey] = element[key];
          }
          delete element[key];
        }
      });

      // delete keys of other language
      Object.keys(languageMap).forEach(key => {
        if (key !== language) {
          Object.keys(element).forEach(elementKey => {
            if (elementKey.includes(languageMap[key])) {
              delete element[elementKey];
            }
          });
        }
      });

      return element;
    };

    apiRequest(url)
      .then(result => {
        resolve(result.data);
        if (result.data) {
          if (Array.isArray(result.data)) {
            resolve(
              result.data.reduce(
                (acc, current) => [...acc, languageReducer(current)],
                []
              )
            );
          } else {
            resolve(languageReducer(result.data));
          }
        }
      })
      .catch(e => reject(e));
  });
