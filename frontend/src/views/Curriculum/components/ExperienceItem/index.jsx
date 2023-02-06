import Wrap from './styles';

import TextLang from 'components/TextLang';
import React, { useContext, useState } from 'react';
import AppContext from 'services/AppContext';

export default ({
  title,
  organization,
  local,
  description,
  keyAchievement,
  since,
  until,
}) => {
  const { language } = useContext(AppContext);
  const months = {
    'pt-br': {
      1: 'Janeiro',
      2: 'Fevereiro',
      3: 'Março',
      4: 'Abril',
      5: 'Maio',
      6: 'Junho',
      7: 'Julho',
      8: 'Agosto',
      9: 'Setembro',
      10: 'Outubro',
      11: 'Novembro',
      12: 'Dezembro',
    },
    'en-us': {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    },
  };

  const [showBullets, setShowBullets] = useState(false);

  const formatDate = stringDate => {
    const dateTimestamp = Date.parse(`${stringDate}T12:00:00`);
    const date = new Date(dateTimestamp);
    if (stringDate) {
      return (
        <>
          {months[language][date.getMonth() + 1]} <TextLang ptBR="de" enUS="" />{' '}
          {date.getFullYear()}
        </>
      );
    } else {
      return null;
    }
  };

  const bullets = description => {
    const topics = description.split('-');
    topics.shift();
    return (
      <ul>
        {topics.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    );
  };

  return (
    <Wrap onClick={() => setShowBullets(!showBullets)}>
      <h4>
        {title} <TextLang ptBR="-" enUS="at" /> {organization}
      </h4>
      <h5>
        {formatDate(since)} -{' '}
        {formatDate(until) || <TextLang ptBR="Hoje" enUS="Today" />}, {local}
      </h5>
      {showBullets && bullets(description)}
      <span>
        <strong>
          <i className="fas fa-level-up-alt"></i>
          <TextLang ptBR="Principal conquista:" enUS="Key achievement:" />
        </strong>
        &nbsp;
        {keyAchievement}
      </span>
    </Wrap>
  );
};