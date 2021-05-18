import Section, { SkillList, ExperienceList } from './styles';

import { fetchData } from 'services/getters';

import ExperienceItem from './components/ExperienceItem';

import Skill from 'components/Skill';
import TextLang from 'components/TextLang';
import React, { useContext, useEffect, useState } from 'react';
import OnVisible from 'react-on-visible';
import { Link } from 'react-router-dom';
import AppContext from 'services/AppContext';

export default () => {
  const { setActiveSection, language } = useContext(AppContext);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchData('/posts/curriculum-resume', language).then(data =>
      setResume(data)
    );
    fetchData('/curriculum/skill', language).then(data => {
      let reducedSkills = data
        .filter(skill => skill.parent === null)
        .reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
      data.forEach(skill => {
        if (skill.parent) {
          if (!reducedSkills[skill.parent].children)
            reducedSkills[skill.parent].children = [];
          reducedSkills[skill.parent].children.push(skill);
        }
      });
      setSkills(Object.values(reducedSkills));
    });
    fetchData('/curriculum/experience', language).then(data =>
      setExperiences(data)
    );
  }, [language]);

  useEffect(() => {
    console.log(skills);
    console.log(experiences);
  }, [skills, experiences]);

  return (
    <OnVisible
      bounce={true}
      onChange={visible => {
        console.log('Me visibility', visible);
        if (visible) {
          setTimeout(() => {
            setActiveSection('curriculum');
          }, 100);
        } else {
          setActiveSection('me');
        }
      }}
    >
      <Section id="curriculum">
        <div className="container">
          <h1>
            <Link to="/curriculo">
              Currículo <i className="fas fa-external-link-alt"></i>
            </Link>
            <button>
              <i className="fas fa-print"></i>
            </button>
          </h1>
          <section>
            <h2>
              <TextLang ptBR="Resumo" enUS="Resume" />
            </h2>
            <p>{resume?.content}</p>
          </section>
          <section>
            <h2>
              <TextLang ptBR="Experiências" enUS="Experiences" />
            </h2>
            <ExperienceList>
              {experiences.map(experience => (
                <ExperienceItem
                  key={experience.id}
                  title={experience.title}
                  organization={experience.organization}
                  local={experience.place}
                  description={experience.description}
                  keyAchievement={experience.key_achievement}
                  since={experience.since}
                  until={experience.until}
                />
              ))}
            </ExperienceList>
          </section>
          <h2>Habilidades</h2>
          {/* Adicionar categorias */}
          <SkillList>
            {skills.map(skill => (
              <Skill
                key={skill.id}
                level={skill.level}
                imgUrl={`${process.env.REACT_APP_DJANGO_URL}${skill.icon}`}
                description={skill.description}
                skills={
                  skill.children
                    ? [
                        ...skill.children.reduce(
                          (acc, { name, icon, level }) => [
                            ...acc,
                            { name, icon, level },
                          ],
                          []
                        ),
                      ]
                    : []
                }
              >
                {skill.name}
              </Skill>
            ))}
          </SkillList>
          {/* <p className="soon">Experiência, clientes e títulos em breve.</p> */}
          {/* <h3>Hobbies</h3> */}
          {/* Teclado Violão Arquearia (filiado à...) */}
          {/* Fazer grid like insta com minhas fotos fazendo, */}
          {/* <h2>Experiência</h2> */}
          {/* LEMBRAR DE PROFESSOR Próximo passo: criar um layout legal com filtro por nível de relevância ou data */}
          {/* <h3>Clientes</h3> */}
          {/* Colocar logos flat em grid, onmouse over color */}
          {/* <h2>Conquistas e títulos</h2> */}
          {/* Colocar aqui uma lista com (icone) (data) Título - clicável para abrir modal do comprovante se tiver, colocar medalhas tbm*/}
        </div>
      </Section>
    </OnVisible>
  );
};
