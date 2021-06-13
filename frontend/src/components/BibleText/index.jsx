import { fetchData } from 'services/getters';

import React, { useState, useEffect, useContext } from 'react';
import AppContext from 'services/AppContext';

export default ({ slug }) => {
  const [text, setText] = useState('');
  const { language } = useContext(AppContext);

  useEffect(() => {
    fetchData(`/posts/${slug}`, language).then(data => setText(data));
  }, [language, slug]);

  return (
    text && (
      <p>
        {text.title} {text.content}
      </p>
    )
  );
};
