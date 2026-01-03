import posts from '../data/posts.json';
import curriculum from '../data/curriculum.json';
import portfolio from '../data/portfolio.json';
import { withPortfolioSlugs } from '../utils/portfolio';

export const fetchData = (url, language = 'pt-br') =>
  new Promise((resolve, reject) => {
    const languageReducer = element => {
      const languageMap = {
        'pt-br': 'pt_br',
        'en-us': 'en_us',
      };

      const sufix = `_${languageMap[language]}`;
      const cloned = { ...element };

      Object.keys(cloned).forEach(key => {
        const newKey = key.replace(sufix, '');
        if (key.includes(sufix)) {
          if (cloned[key] === '') {
            cloned[newKey] = cloned[`${newKey}_pt_br`];
          } else {
            cloned[newKey] = cloned[key];
          }
          delete cloned[key];
        }
      });

      Object.keys(languageMap).forEach(key => {
        if (key !== language) {
          Object.keys(cloned).forEach(elementKey => {
            if (elementKey.includes(languageMap[key])) {
              delete cloned[elementKey];
            }
          });
        }
      });

      Object.keys(cloned).forEach(key => {
        if (Array.isArray(cloned[key])) {
          cloned[key] = cloned[key].map(item =>
            typeof item === 'object' && item !== null ? languageReducer(item) : item
          );
        } else if (cloned[key] && typeof cloned[key] === 'object') {
          cloned[key] = languageReducer(cloned[key]);
        }
      });

      return cloned;
    };

    try {
      let data = null;

      if (url.startsWith('/posts/')) {
        const slug = url.replace('/posts/', '').trim();
        data = posts.find(post => post.slug === slug) || null;
      } else if (url === '/curriculum/experience') {
        data = curriculum.experiences;
      } else if (url === '/curriculum/skill') {
        data = curriculum.skills;
      } else if (url === '/curriculum/course') {
        data = curriculum.courses;
      } else if (url === '/curriculum/certificate') {
        data = curriculum.certificates;
      } else if (url === '/portfolio') {
        data = withPortfolioSlugs(portfolio);
      }

      if (data === null || data === undefined) {
        resolve(data);
        return;
      }

      if (Array.isArray(data)) {
        resolve(data.map(item => languageReducer(item)));
      } else {
        resolve(languageReducer(data));
      }
    } catch (error) {
      reject(error);
    }
  });
