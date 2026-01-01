import Section, { ContentWrap, ImageWrap, Text } from './styles';

import { fetchData } from 'services/getters';

import BibleText from 'components/BibleText';
import React, { useContext, useEffect, useState } from 'react';
import OnVisible from 'react-on-visible';
import { Parallax } from 'react-scroll-parallax';
import AppContext from 'services/AppContext';

export default () => {
  const { setActiveSection, language } = useContext(AppContext);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchData('/posts/about-me', language).then(data => setContent(data));
  }, [language]);

  return (
    <OnVisible
      bounce={true}
      onChange={visible => {
        console.log('Me visibility', visible);
        if (visible) {
          setTimeout(() => {
            setActiveSection('me');
          }, 100);
        } else {
          setActiveSection(null);
        }
      }}
    >
      <Section id="me">
        <ContentWrap>
          <Parallax
            x={['50px', '0px']}
            styleOuter={{
              position: 'absolute',
              zIndex: '2',
            }}
          >
            <ImageWrap>
              <img src="/img/new_profile_photo.jpg" alt="Profile" />
            </ImageWrap>
          </Parallax>
          <Parallax
            x={['-50px', '0px']}
            styleOuter={{
              position: 'absolute',
              zIndex: '1',
            }}
          >
            <Text>
              <h2>{content?.title}</h2>
              <p>{content?.content}</p>
            </Text>
          </Parallax>
        </ContentWrap>
        <BibleText slug="daniel-2-21" />
      </Section>
    </OnVisible>
  );
};
