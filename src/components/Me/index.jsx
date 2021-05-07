import Section, { ContentWrap, ImageWrap, Text } from './styles';
import { Parallax } from 'react-scroll-parallax';
import OnVisible from 'react-on-visible';
import React, { useContext } from 'react';
import AppContext from 'services/AppContext';

export default () => {
  const { setActiveSection } = useContext(AppContext);

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
              <h2>Filipe Lopes</h2>
              <p></p>
            </Text>
          </Parallax>
        </ContentWrap>
      </Section>
    </OnVisible>
  );
};
