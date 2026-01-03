import PortfolioSection from './styles';
import { CertificateList, ExperienceList, SkillList } from '../Curriculum/styles';

import CertificateItem from '../Curriculum/components/CertificateItem';
import ExperienceItem from '../Curriculum/components/ExperienceItem';
import Skill from 'components/Skill';
import TextLang from 'components/TextLang';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import OnVisible from 'react-on-visible';
import AppContext from 'services/AppContext';
import { fetchData } from 'services/getters';

const ITEMS_PER_PAGE = 15;

const groupSkills = data => {
  if (!Array.isArray(data)) return [];
  const reducedSkills = data
    .filter(skill => skill.parent === null)
    .reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
  data.forEach(skill => {
    if (skill.parent && reducedSkills[skill.parent]) {
      if (!reducedSkills[skill.parent].children) {
        reducedSkills[skill.parent].children = [];
      }
      reducedSkills[skill.parent].children.push(skill);
    }
  });
  return Object.values(reducedSkills);
};

export default () => {
  const { language, setActiveSection } = useContext(AppContext);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeItem, setActiveItem] = useState(null);
  const [resume, setResume] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    setIsLoadingPortfolio(true);
    fetchData('/portfolio', language).then(data => {
      const ordered = Array.isArray(data)
        ? [...data].sort((a, b) => {
            const orderA =
              typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
            const orderB =
              typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
            return orderA - orderB;
          })
        : [];
      setPortfolioItems(ordered);
      setIsLoadingPortfolio(false);
      setCurrentPage(1);
    });
  }, [language]);

  useEffect(() => {
    fetchData('/posts/curriculum-resume', language).then(data => {
      setResume(data);
    });
    fetchData('/curriculum/experience', language).then(data => {
      setExperiences(Array.isArray(data) ? data : []);
    });
    fetchData('/curriculum/skill', language).then(data => {
      setSkills(groupSkills(data));
    });
    fetchData('/curriculum/certificate', language).then(data => {
      setCertificates(Array.isArray(data) ? data : []);
    });
  }, [language]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = filterQuery.trim().replace(/^#/, '').toLowerCase();
    if (!normalizedQuery) return portfolioItems;
    return portfolioItems.filter(item => {
      const name = (item.name || '').toLowerCase();
      const tags = Array.isArray(item.tags)
        ? item.tags.join(' ').toLowerCase()
        : '';
      return name.includes(normalizedQuery) || tags.includes(normalizedQuery);
    });
  }, [filterQuery, portfolioItems]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  );
  const currentPageSafe = Math.min(currentPage, totalPages);
  const paginatedItems = filteredItems.slice(
    (currentPageSafe - 1) * ITEMS_PER_PAGE,
    currentPageSafe * ITEMS_PER_PAGE
  );
  const showEmptyState = !isLoadingPortfolio && filteredItems.length === 0;
  const showPagination = filteredItems.length > ITEMS_PER_PAGE;

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const handleFilterChange = event => {
    setFilterQuery(event.target.value);
    setCurrentPage(1);
  };

  const changePage = nextPage => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setCurrentPage(nextPage);
  };

  const filterPlaceholder =
    language === 'pt-br'
      ? 'Filtrar por nome ou tag'
      : 'Filter by name or tag';
  const summaryLabel =
    language === 'pt-br' ? 'Sumario do portfolio' : 'Portfolio summary';
  const activeItemTags =
    activeItem && Array.isArray(activeItem.tags) ? activeItem.tags : [];

  const getRepoLinks = item => {
    const links = Array.isArray(item.repo_links)
      ? item.repo_links
      : item.repo_link
      ? [item.repo_link]
      : [];
    return [...new Set(links)].filter(link => link && link !== item.link);
  };

  const renderRepoIcon = link => {
    if (link && link.includes('gitlab')) {
      return (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M 8.382813 1.972656 L 4.078125 13.453125 L 3.835938 14.105469 L 1.796875 19.542969 L 16 29.875 L 30.203125 19.542969 L 28.164063 14.105469 L 23.613281 1.972656 L 19.882813 13.453125 L 12.117188 13.453125 Z M 8.25 8.027344 L 10.015625 13.453125 L 6.214844 13.453125 Z M 23.75 8.027344 L 25.785156 13.453125 L 21.984375 13.453125 Z M 5.464844 15.453125 L 10.664063 15.453125 L 14.09375 26.015625 L 4.203125 18.820313 Z M 12.765625 15.453125 L 19.234375 15.453125 L 16 25.402344 Z M 21.335938 15.453125 L 26.53125 15.453125 L 27.796875 18.820313 L 17.902344 26.015625 Z" />
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z" />
      </svg>
    );
  };

  return (
    <OnVisible
      bounce={true}
      percent={20}
      onChange={visible => {
        if (visible) {
          setTimeout(() => {
            setActiveSection('portfolio');
          }, 100);
        } else {
          setActiveSection('curriculum');
        }
      }}
    >
      <PortfolioSection id="portfolio">
        <div className="container">
          <section id="portfolio-projetos">
            <h2>
              <TextLang ptBR="Portfolio" enUS="Portfolio" />
            </h2>
            <div className="portfolio_filter">
              <label htmlFor="portfolio-filter">
                <TextLang
                  ptBR="Filtrar por nome ou tag"
                  enUS="Filter by name or tag"
                />
              </label>
              <input
                id="portfolio-filter"
                type="search"
                value={filterQuery}
                placeholder={filterPlaceholder}
                onChange={handleFilterChange}
              />
            </div>
            {isLoadingPortfolio && (
              <p>
                <TextLang ptBR="Carregando..." enUS="Loading..." />
              </p>
            )}
            {showEmptyState && (
              <p>
                <TextLang
                  ptBR="Nenhum projeto encontrado."
                  enUS="No projects found."
                />
              </p>
            )}
            {paginatedItems.length > 0 && (
              <ul className="portfolio_works_list">
                {paginatedItems.map((item, index) => {
                  const itemName =
                    item.name || item.name_pt_br || item.name_en_us || '';
                  const itemKey = item.id || `${itemName}-${index}`;
                  return (
                    <li key={itemKey} className="portfolio_works_item">
                      <button
                        type="button"
                        className="portfolio_item_button"
                        onClick={() => setActiveItem(item)}
                      >
                        <h3>{itemName}</h3>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {activeItem && (
              <div
                className="portfolio_modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="portfolio-modal-title"
                onClick={() => setActiveItem(null)}
              >
                <div
                  className="portfolio_modal_content"
                  onClick={event => event.stopPropagation()}
                >
                  <button
                    type="button"
                    className="portfolio_modal_close"
                    onClick={() => setActiveItem(null)}
                    aria-label={
                      language === 'pt-br' ? 'Fechar' : 'Close'
                    }
                  >
                    x
                  </button>
                  <h3 id="portfolio-modal-title">
                    {activeItem.name ||
                      activeItem.name_pt_br ||
                      activeItem.name_en_us}
                  </h3>
                  {activeItem.description && <p>{activeItem.description}</p>}
                  {activeItemTags.length > 0 && (
                    <ul className="portfolio_works_tags">
                      {activeItemTags.map((tag, tagIndex) => (
                        <li key={`active-tag-${tagIndex}`}>#{tag}</li>
                      ))}
                    </ul>
                  )}
                  <div className="portfolio_modal_links">
                    {activeItem.link && (
                      <a
                        href={activeItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="portfolio_modal_icon">
                          <svg
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.5 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm4.894 4a5.527 5.527 0 0 0-3.053-2.676c.444.84.765 1.74.953 2.676h2.1zm.582 2.995A5.11 5.11 0 0 0 14 7.5a5.464 5.464 0 0 0-.213-1.5h-2.342c.032.331.055.664.055 1a10.114 10.114 0 0 1-.206 2h2.493c.095-.329.158-.665.19-1.005zm-3.535 0l.006-.051A9.04 9.04 0 0 0 10.5 7a8.994 8.994 0 0 0-.076-1H6.576A8.82 8.82 0 0 0 6.5 7a8.98 8.98 0 0 0 .233 2h3.534c.077-.332.135-.667.174-1.005zM10.249 5a8.974 8.974 0 0 0-1.255-2.97C8.83 2.016 8.666 2 8.5 2a3.62 3.62 0 0 0-.312.015l-.182.015L8 2.04A8.97 8.97 0 0 0 6.751 5h3.498zM5.706 5a9.959 9.959 0 0 1 .966-2.681A5.527 5.527 0 0 0 3.606 5h2.1zM3.213 6A5.48 5.48 0 0 0 3 7.5 5.48 5.48 0 0 0 3.213 9h2.493A10.016 10.016 0 0 1 5.5 7c0-.336.023-.669.055-1H3.213zm2.754 4h-2.36a5.515 5.515 0 0 0 3.819 2.893A10.023 10.023 0 0 1 5.967 10zM8.5 12.644A8.942 8.942 0 0 0 9.978 10H7.022A8.943 8.943 0 0 0 8.5 12.644zM11.033 10a10.024 10.024 0 0 1-1.459 2.893A5.517 5.517 0 0 0 13.393 10h-2.36z"
                            />
                          </svg>
                        </span>
                        <TextLang ptBR="Link" enUS="Link" />
                      </a>
                    )}
                    {getRepoLinks(activeItem).map((repoLink, repoIndex) => (
                      <a
                        key={`${repoLink}-${repoIndex}`}
                        href={repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="portfolio_modal_icon">
                          {renderRepoIcon(repoLink)}
                        </span>
                        <TextLang ptBR="Repositorio" enUS="Repository" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {showPagination && (
              <div className="portfolio_pagination">
                <button
                  type="button"
                  onClick={() => changePage(currentPageSafe - 1)}
                  disabled={currentPageSafe === 1}
                >
                  <TextLang ptBR="Anterior" enUS="Previous" />
                </button>
                <span>
                  <TextLang
                    ptBR={`Pagina ${currentPageSafe} de ${totalPages}`}
                    enUS={`Page ${currentPageSafe} of ${totalPages}`}
                  />
                </span>
                <button
                  type="button"
                  onClick={() => changePage(currentPageSafe + 1)}
                  disabled={currentPageSafe === totalPages}
                >
                  <TextLang ptBR="Proxima" enUS="Next" />
                </button>
              </div>
            )}
          </section>
        </div>
      </PortfolioSection>
    </OnVisible>
  );
};
