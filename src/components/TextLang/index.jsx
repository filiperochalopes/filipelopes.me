import React, { useContext } from 'react';
import AppContext from 'services/AppContext';

export default ({ ptBR, enUS }) => {
  const { language } = useContext(AppContext);
  if (language === 'pt-br') {
    return <>{ptBR}</>;
  } else {
    return <>{enUS}</>;
  }
};
