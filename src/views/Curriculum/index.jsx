import Skill from 'components/Skill';
import { Link } from 'react-router-dom';
import SkillList, { Section } from './styles';
import React, { useContext } from 'react';
import AppContext from 'services/AppContext';
import OnVisible from 'react-on-visible';

export default () => {
  const { setActiveSection } = useContext(AppContext);

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
          <h2>Resumo</h2>
          <section id="curriculo_resumo">
            <div className="texto">
              <p>
                Primeiramente discípulo de Jesus, graduando em medicina na
                Universidade Federal da Bahia. Atualmente cursando o 9º
                semestre. Trabalho com criação de sites e sistemas web com
                planejamento de expansão para aplicativos móveis e aplicações
                com <em>Deep learning</em> para integração.
              </p>
              <p>
                Trabalhando atualmente em paralelo nessas duas áreas. Abaixo
                você verá a listagem de algumas de minhas habilidades e nível de
                aprofundamento nelas, sinta-se livre para clicar e explorar,
                ainda vem mais por aí.
              </p>
            </div>
          </section>
          <h2>Experiência</h2>
          <h2>Habilidades</h2>
          <h3>Design Gráfico</h3>
          <SkillList>
            <Skill
              className="blender"
              percent={72}
              img={'blender.png'}
              tags={['blender', '3d', 'animacao', 'modelagem']}
              resume="Modelador e animador de modelos 3D, integração com a WEB"
              skills={[
                ['Modelagem', 90],
                ['Texturização', 50],
                ['Animação', 45],
              ]}
              xp={'2 anos'}
              courses={[['auto de data', '']]}
            >
              Blender
            </Skill>
            <Skill
              className="gimp"
              percent={75}
              img={'gimp.png'}
              skills={[['Edição de fotos', 60]]}
            >
              Gimp 2.8
            </Skill>
            <Skill
              className="corel_draw"
              percent={23}
              img={'coreldraw.jpg'}
              skills={[['Edição de fotos', 60]]}
            >
              Corel Draw
            </Skill>
            <Skill
              className="inkscape"
              percent={45}
              img={'inkscape.jpg'}
              skills={[['Edição de fotos', 60]]}
            >
              Inkscape
            </Skill>
            <Skill
              className="photoscan"
              percent={60}
              img={'photoscan.jpg'}
              skills={[['Edição de fotos', 60]]}
            >
              Photoscan Ankisoft&reg;
            </Skill>
          </SkillList>
          <h3>Desenvolvedor</h3>
          <ul id="skill_list">
            <Skill
              className="php"
              percent={75}
              img={'php.jpg'}
              tags={['php', 'php7', 'programacao', 'backend']}
              resume="CRUD, Slim framework, Imagemagick, ... desde 2010"
              skills={[
                ['Modelagem', 90],
                ['Texturização', 50],
                ['Animação', 45],
              ]}
              xp={'2 anos'}
              courses={[['auto de data', '']]}
            >
              PHP
            </Skill>
            <Skill
              className="python"
              percent={42}
              img={'python.jpg'}
              resume="CRUD, Flask framework, em busca do machine learning"
              skills={[
                ['Flask', 80],
                ['Machine learning', 0],
                ['Blender', 0],
              ]}
            >
              Python
            </Skill>
            <Skill
              className="javascript"
              percent={75}
              img={'javascript.png'}
              resume="JQuery desde 2010, estudando ReactJS com alvo em React Native. Uso de Open Gl para integração 3D com framework"
              skills={[
                ['JQuery', 80],
                ['ReactJS', 30],
                ['ReactNative', 0],
                ['Blend4Web', 70],
              ]}
            >
              Javascript
            </Skill>
            <Skill
              className="css3"
              percent={98}
              img={'css3.jpg'}
              resume="Sass"
              skills={[['Sass', 95]]}
            >
              CSS3
            </Skill>
            <Skill
              className="html5"
              percent={90}
              img={'html5.jpg'}
              resume="Realmente o HTML5"
              skills={[]}
            >
              HTML5
            </Skill>
            <Skill
              className="mysql"
              percent={90}
              img={'mysql.jpg'}
              resume="SQL, PhpMyAdmin"
              skills={[]}
            >
              MySQL
            </Skill>
            <Skill
              className="postgresql"
              percent={30}
              img={'postgresql.jpg'}
              skills={[]}
            >
              PostgreSQL
            </Skill>
            <Skill
              className="git"
              resume="Apto para trabalhar em equipes de desenvolvimento"
              percent={60}
              img={'git.jpg'}
              skills={[]}
            >
              Git
            </Skill>
          </ul>
          <h3>Idiomas</h3>
          <ul id="skill_list">
            <Skill
              className="portugues"
              percent={90}
              img={'portugues.jpg'}
              skills={[
                ['Língua nativa', 98, 'portugues'],
                ['Fala fluente', 98, 'portugues'],
                ['Ouve bem', 98, 'portugues'],
                ['Escreve bem', 98, 'portugues'],
              ]}
            >
              Português
            </Skill>
            <Skill
              className="ingles"
              percent={80}
              img={'ingles.jpg'}
              skills={[
                ['Fala fluente', 78, 'ingles'],
                ['Ouve bem', 90, 'ingles'],
                ['Escreve bem', 85, 'ingles'],
              ]}
              xp={'13 anos'}
              courses={[
                ['CCAA Júnior', ''],
                [
                  'Núcleo de Extensão em Linguagens?',
                  '/titulo/nupel',
                  '2 anos',
                ],
              ]}
            >
              Inglês
            </Skill>
            <Skill
              className="libras"
              percent={15}
              img={'libras.jpg'}
              skills={[
                ['Gesticulo pouco', 10, 'libras'],
                ['Interpreto pouco', 15, 'libras'],
                ['Escrevo nada', 0, 'libras'],
              ]}
            >
              Língua Brasileira de Sinais (LIBRAS)
            </Skill>
          </ul>
          <p className="soon">Experiência, clientes e títulos em breve.</p>
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
