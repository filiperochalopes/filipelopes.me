BEGIN TRANSACTION;
CREATE TABLE "auth_group" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(150) NOT NULL UNIQUE);
CREATE TABLE "auth_group_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "auth_permission" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "codename" varchar(100) NOT NULL, "name" varchar(255) NOT NULL);
INSERT INTO "auth_permission" VALUES(1,1,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" VALUES(2,1,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" VALUES(3,1,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" VALUES(4,1,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" VALUES(5,2,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES(6,2,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES(7,2,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES(8,2,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES(9,3,'add_group','Can add group');
INSERT INTO "auth_permission" VALUES(10,3,'change_group','Can change group');
INSERT INTO "auth_permission" VALUES(11,3,'delete_group','Can delete group');
INSERT INTO "auth_permission" VALUES(12,3,'view_group','Can view group');
INSERT INTO "auth_permission" VALUES(13,4,'add_user','Can add user');
INSERT INTO "auth_permission" VALUES(14,4,'change_user','Can change user');
INSERT INTO "auth_permission" VALUES(15,4,'delete_user','Can delete user');
INSERT INTO "auth_permission" VALUES(16,4,'view_user','Can view user');
INSERT INTO "auth_permission" VALUES(17,5,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" VALUES(18,5,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" VALUES(19,5,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" VALUES(20,5,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" VALUES(21,6,'add_session','Can add session');
INSERT INTO "auth_permission" VALUES(22,6,'change_session','Can change session');
INSERT INTO "auth_permission" VALUES(23,6,'delete_session','Can delete session');
INSERT INTO "auth_permission" VALUES(24,6,'view_session','Can view session');
INSERT INTO "auth_permission" VALUES(25,7,'add_tag','Can add tag');
INSERT INTO "auth_permission" VALUES(26,7,'change_tag','Can change tag');
INSERT INTO "auth_permission" VALUES(27,7,'delete_tag','Can delete tag');
INSERT INTO "auth_permission" VALUES(28,7,'view_tag','Can view tag');
INSERT INTO "auth_permission" VALUES(29,8,'add_course','Can add course');
INSERT INTO "auth_permission" VALUES(30,8,'change_course','Can change course');
INSERT INTO "auth_permission" VALUES(31,8,'delete_course','Can delete course');
INSERT INTO "auth_permission" VALUES(32,8,'view_course','Can view course');
INSERT INTO "auth_permission" VALUES(33,9,'add_experience','Can add experience');
INSERT INTO "auth_permission" VALUES(34,9,'change_experience','Can change experience');
INSERT INTO "auth_permission" VALUES(35,9,'delete_experience','Can delete experience');
INSERT INTO "auth_permission" VALUES(36,9,'view_experience','Can view experience');
INSERT INTO "auth_permission" VALUES(37,10,'add_skill','Can add skill');
INSERT INTO "auth_permission" VALUES(38,10,'change_skill','Can change skill');
INSERT INTO "auth_permission" VALUES(39,10,'delete_skill','Can delete skill');
INSERT INTO "auth_permission" VALUES(40,10,'view_skill','Can view skill');
INSERT INTO "auth_permission" VALUES(41,11,'add_item','Can add item');
INSERT INTO "auth_permission" VALUES(42,11,'change_item','Can change item');
INSERT INTO "auth_permission" VALUES(43,11,'delete_item','Can delete item');
INSERT INTO "auth_permission" VALUES(44,11,'view_item','Can view item');
INSERT INTO "auth_permission" VALUES(45,12,'add_post','Can add post');
INSERT INTO "auth_permission" VALUES(46,12,'change_post','Can change post');
INSERT INTO "auth_permission" VALUES(47,12,'delete_post','Can delete post');
INSERT INTO "auth_permission" VALUES(48,12,'view_post','Can view post');
INSERT INTO "auth_permission" VALUES(49,13,'add_category','Can add category');
INSERT INTO "auth_permission" VALUES(50,13,'change_category','Can change category');
INSERT INTO "auth_permission" VALUES(51,13,'delete_category','Can delete category');
INSERT INTO "auth_permission" VALUES(52,13,'view_category','Can view category');
CREATE TABLE "auth_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "password" varchar(128) NOT NULL, "last_login" datetime NULL, "is_superuser" bool NOT NULL, "username" varchar(150) NOT NULL UNIQUE, "last_name" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" bool NOT NULL, "is_active" bool NOT NULL, "date_joined" datetime NOT NULL, "first_name" varchar(150) NOT NULL);
INSERT INTO "auth_user" VALUES(1,'pbkdf2_sha256$216000$jSZzA7dqQreQ$BIKZyvt8n394GJ3pCj52x8Y7xmJlcO6loslTO/RA+8k=','2021-05-31 23:38:44.295794',1,'root','','contato@filipelopes.me',1,1,'2021-04-02 13:11:21.944018','');
CREATE TABLE "auth_user_groups" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "auth_user_user_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "core_tag" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" text NOT NULL UNIQUE, "description_pt_br" text NOT NULL, "description_en_us" text NOT NULL, "color_hex" text NOT NULL, "parent_id" integer NULL REFERENCES "core_tag" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "curriculum_category" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name_pt_br" varchar(100) NOT NULL, "name_en_us" varchar(100) NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
INSERT INTO "curriculum_category" VALUES(1,'Designer gráfico','Graphic Designer','2021-05-08 16:10:06.618167','2021-05-08 16:10:06.618211');
INSERT INTO "curriculum_category" VALUES(2,'Desenvolvedor Web/Mobile','Web/Mobile Developer','2021-05-08 16:11:13.320445','2021-05-08 16:11:13.320492');
INSERT INTO "curriculum_category" VALUES(3,'Idiomas','Languages','2021-05-08 16:11:26.345162','2021-05-08 16:11:26.345216');
INSERT INTO "curriculum_category" VALUES(4,'Pessoal','Personal','2021-06-01 12:46:23.158350','2021-06-01 13:36:23.561451');
CREATE TABLE "curriculum_course" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(250) NOT NULL, "description_pt_br" text NOT NULL, "description_en_us" text NOT NULL, "since" date NOT NULL, "until" date NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
INSERT INTO "curriculum_course" VALUES(1,'Graduando em Medicina na Universidade Federal da Bahi - Faculdade de Medicina da Bahia','Formação em médico generalista para rimeira Universidade de Medicina do país','','2015-03-01','2021-05-25','2021-05-25 11:52:43.040364','2021-05-25 11:52:43.040618');
INSERT INTO "curriculum_course" VALUES(2,'Segundo Grau Completo - Colégio Militar de Salvador','- Ensino de qualidade com disciplina
- Certificado de aluno disciplinado
- Campeão nas competições internas de atletismo e basquete
- Ala/armador em basquete','','2008-03-01','2014-07-01','2021-05-25 11:55:01.488311','2021-05-25 11:55:01.488349');
CREATE TABLE "curriculum_experience" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title_pt_br" varchar(250) NOT NULL, "title_en_us" varchar(250) NOT NULL, "organization" varchar(250) NOT NULL, "place" varchar(250) NOT NULL, "description_pt_br" text NOT NULL, "description_en_us" text NOT NULL, "key_achievement_pt_br" varchar(250) NOT NULL, "key_achievement_en_us" varchar(250) NOT NULL, "since" date NOT NULL, "until" date NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
INSERT INTO "curriculum_experience" VALUES(3,'Desenvolvedor frontend ReactJS, colaborador em equipe SCRUM','ReactJS frontend developers in a SCRUM team','International Conservation','Salvador - BA (INEMA)','- Trabalhei com a metodologia Ágil, gerenciando atividades remotamente
- Lançamos a nova versão do GEOBAHIA (http://mapa.geobahia.ba.gov.br)
- Melhorei o uso de técnicas na empresa com introdução de novos conceitos de programação','- Worked with agile SCRUM team managing activities remotely
- Lauched new GEOBAHIA version (http://mapa.geobahia.ba.gov.br)
- Improved programing techniques with GraphQL','Novos conhecimentos ao trabalhar com manipulação de mapas e ferramentas de análise','Work with map manipulation and map data analysis','2019-09-01','2021-02-28','2021-05-07 23:29:48.157230','2021-06-01 12:42:15.561002');
INSERT INTO "curriculum_experience" VALUES(4,'CEO, CTO, Web Developer, SCRUM Master, Gerenciador de Projetos,DevOps','CEO, CTO, Web Developer, SCRUM Master,  Project Manager, DevOps','ORANGO I/O TECNOLOGIA','Salvador - BA','- Me envolvi na contratação, avaliação e capacitação de profissionais para trabalhar nos projetos da empresa, criando uma platarfoma para gerência de recursos de colaboradores
- Trabalhei com diversas linguagens de programação, estrutura de projetos e framework
- Me aprofundei em estrutura Linux com implementação de várias estruturas de dados
- Trabalhos com estrtura de banco de dados noSQL e subscriptions','- I got involved in hiring, evaluating and professionals training to work on the company''s projects, creating a platform for managing employee resources
- Worked with several programming languages, project structure and framework
- I delved into Linux structure with implementation of various data structures
- Works with noSQL database structure and subscriptions','Trabalhar com gestão de equipe/projetos e infraestrutura de projetos em VPS Linux','Work with team / project management and project infrastructure on Linux VPS','2020-05-06','2021-06-01','2021-05-24 11:37:27.694982','2021-06-01 12:42:07.306698');
INSERT INTO "curriculum_experience" VALUES(5,'Diretor de projeto e desenvolvedor ReactJS','Project Manager and ReactJS Developer','ALT F4 Informática (Rio de Janeiro)','Salvador - BA','- Diálogo com equipe externa de backend
- Diálogo com equipe externa requisitos
- Desenvolvimento de um sistema de gerenciamento de sessões para votação de matérias online
- Durante o desenvolvimento gerenciei uma equipe com um designer e um desenvolvedor júnior atuando juntamente com eles no desenvolvimento. O projeto foi solicitado pela ALT F4 para suprir as necessidades da câmara de vereadores de Mangaratiba - Costa Verde - Rio de Janeiro.','- Dialogue with external backend team
- Dialogue with external requirements team
- Development of a session management system for voting on online political subjects
- During development I managed a team with a junior designer and a junior developer working together with them in the development. The project was requested by ALT F4 to meet the needs of the City Council of Mangaratiba - Costa Verde - Rio de Janeiro.','Coordenar e desenvolver criação de sistema','Manage a team and help develop','2020-07-01','2020-03-01','2021-05-24 18:55:10.047884','2021-06-01 12:38:54.572895');
INSERT INTO "curriculum_experience" VALUES(6,'Desenvolvedor Fullstack Wordpress API + SlimFramework + ReactJS','Fullstack developer Wordpress API + SlimFramework + ReactJS','Montreal Tecnologia, alocado no INEMA','Salvador - BA','- Desenvolvimento de toda a intranet do Instituto do Meio Ambiente e Recursos Hídricos da Bahia 
- backend em WORDPRESS para fornecimento de API própria e frontend em ReactJS
- Criação de API do painel de monitoramento de tempo com SlimFramework','- Development of the entire intranet of the Institute for the Environment and Water Resources of Bahia
- Backend written in WORDPRESS to supply its own API and ReactJS frontend
- Creation of weather monitoring API with SlimFramework with government data','Desenvolver sozinho uma intranet sofisticada com gerenciamento de conteúdo','Develop a sophisticated intranet with content management on your own','2019-02-01','2019-08-01','2021-05-24 19:02:22.637138','2021-06-01 12:33:36.646269');
INSERT INTO "curriculum_experience" VALUES(7,'Desenvolvedor PHP Fullstack','PHP Fullstack developer','ITMPR','Salvador - BA','- Reformulação do site oficial da empresa com uma estrutura simples e rápida a pedido do cliente para mostrar os produtos da empresa sem serviço de banco de dados, porém de forma eficiente.
- Desenvolvimento de site de baixo custo e alto desempenho 88 pontos no PageSpeed Isights
- Criação de um sistema de gerenciamento e cadastro de orçamentos e respectivos dependentes (usuários, clientes, produtos…) em PHP, JQuery e Ajax.
- Desenvolvimento de aplicação monólito de baixo custo e alto desempenho
- Consulta a banco de dados com ORM Elloquent','- Reformulation of the company''s official website with a simple and quick code structure to show the company''s products without a database service, but in an efficient way.
- Low-cost, high-performance website development with 88 points on PageSpeed ​​Isights
- Creation of a quotes management and registration system and their dependents (users, customers, products…) in PHP, JQuery and Ajax.
- Development of low cost, high performance monolith application
- Database query with ORM Elloquent','Aplicação PDV com suporte duradouro e manutenção contínua','POS application with long-term support','2017-11-01','2021-06-01','2021-05-24 19:12:57.989608','2021-06-01 12:14:16.214580');
INSERT INTO "curriculum_experience" VALUES(8,'Desenvolvedor PHP Fullstack','PHP Fullstack developer','Qualité Ortodontia','Salvador - BA','- Trabalhando com criação de gráficos e PDF para relatórios
- Criação de um sistema de controle de guias para clínica de ortodontia utilizando PHP, MySQL, JQuery e Ajax.','- Creation of graphs and creation of PDF file report
- Creation of a document control system for orthodontics clinic using PHP, MySQL, JQuery and Ajax.','Criação de aplicação monólito','Monolithic application development','2019-10-01','2020-02-01','2021-05-24 19:19:29.336931','2021-06-01 11:46:59.907467');
INSERT INTO "curriculum_experience" VALUES(9,'Desenvolvedor com stack WORDPRESS + ReactJS','ReactJS and WORDPRESS stack developer','Instituto de Ciência e Saúde - UFBA','Salvador - BA','- Criação do Atlas digital de histologia da Universidade Federal da Bahia para consulta de alunos e auxílio ao ensino utilizando WORDPRESS API e ReactJS
- Container Wordpress API com Docker
- Criação de tema e plugin wordpress
- Novo sistema de upload para o wordpress no plugin criado','- Criação do Atlas digital de histologia da Universidade Federal da Bahia para consulta de alunos e auxílio ao ensino utilizando WORDPRESS API e ReactJS
- WORDPRESS Container API with Docker
- WORDPRESS theme and plugin development
- new WORDPRESS self upload system','Trabalhando para instituição de ensino federal para o curso de medicina','Working for a federal medicine teaching institution','2018-07-01','2021-05-24','2021-05-24 19:21:15.418339','2021-06-01 11:43:14.870843');
INSERT INTO "curriculum_experience" VALUES(10,'Desenvolvedor WORDPRESS','WORDPRESS developer','Hangar Comunicação','Salvador - BA','','','Criação de site com template próprio e plugin WORDPRESS.','WORDPRESS template and plugin development','2018-10-01','2018-11-01','2021-05-24 19:22:22.089843','2021-06-01 11:32:55.297007');
INSERT INTO "curriculum_experience" VALUES(11,'Desenvolvedor web e modelador 3D','3D moddelling and Frontend Developer','Marinha do Brasil','Salvador - BA','- Criação do sistema de hasteamento de bandeira digital para campeonato mundial de artes marciais (38th WMC Judo - 38o. Campeonato Mundial Militar de Judô - Rio de Janeiro) utilizando Blender3D, Blend4Web e OpenGL para Web.
- Modelagem e animação de modelo 3D','- Creation of a digital flag hoisting system for the world martial arts championship (38th WMC Judo - 38th. World Military Judo Championship - Rio de Janeiro) using Blender3D, Blend4Web and OpenGL for Web.
- Creation of 3D enviroment and animation','Desenvolvimento de sistema complexo 3D com visibilidade televisionada mundialmente','Development of a complex 3D system with televised visibility worldwide','2018-10-01','2018-11-01','2021-05-24 19:24:11.390979','2021-05-31 23:55:07.054352');
INSERT INTO "curriculum_experience" VALUES(12,'CTO, Desenvolvedor Backend, Revisor de Código, DevOps','CTO, Backend Developer, Code Reviewer','CLICKLAV','Salvador/Lauro de Freitas - BA','- Revisão de código React Native
- Desenvolvimento e remodelamento de backend 
- Criação de estrutura de modelagem e versionamento de banco de dados com prisma.io
- Realizar deploy de app nativo e instalação nas plataformas digitais
- Gerenciar projeto de construção de todo ecossistema CLICKLAV','- React Native code review and development
- Backend development with subscriptions and graphqQL using sequelize and graphql-yoga
- Database migrations with prisma.io
- Mobile app deploy on digital store
- Manage all CLICKLAV ecosystem','Trabalhar com aplicação mobile e gerenciar um projeto de ponta a ponta com equipes variadas, utilizando SCRUM e fazer deploy de Aplicativo em plataformas digitais','Work with mobile app and deploy it on Apple/Google store','2020-01-16','2021-05-31','2021-05-25 11:48:27.718225','2021-05-31 23:44:27.331338');
CREATE TABLE "curriculum_skill" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "description_pt_br" text NOT NULL, "description_en_us" text NOT NULL, "level" integer NOT NULL, "name_pt_br" varchar(100) NOT NULL, "name_en_us" varchar(100) NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "icon" varchar(100) NOT NULL, "category_id" integer NULL REFERENCES "curriculum_category" ("id") DEFERRABLE INITIALLY DEFERRED, "parent_id" integer NULL REFERENCES "curriculum_skill" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "curriculum_skill" VALUES(3,'Modelador, animador de modelos 3D. Integração com a WEB','Modeling and 3D animation with web integration',65,'Blender','','2021-05-07 23:38:48.185209','2021-05-08 16:14:44.052518','skills/blender.png',1,NULL);
INSERT INTO "curriculum_skill" VALUES(4,'Manipulação de imagens','Image manipulation',75,'Gimp','','2021-05-07 23:39:30.434058','2021-05-08 16:14:38.031131','skills/gimp.png',1,NULL);
INSERT INTO "curriculum_skill" VALUES(5,'Criação de imagens em vetor','Vector images creation',25,'Corel Draw','','2021-05-07 23:40:06.593123','2021-05-08 16:14:32.941013','skills/coreldraw.jpg',1,NULL);
INSERT INTO "curriculum_skill" VALUES(6,'Criação de imagens de vetor','Vector image creation',45,'Inkscape','','2021-05-07 23:40:46.017521','2021-05-08 16:14:21.359466','skills/inkscape.jpg',1,NULL);
INSERT INTO "curriculum_skill" VALUES(7,'Fotogrametria gerando modelos 3d de boa qualidade','Photogrammetry generating good quality 3d models',60,'Photoscan Ankisoft&reg;','','2021-05-07 23:43:22.587562','2021-05-08 16:14:28.037717','skills/photoscan.jpg',1,NULL);
INSERT INTO "curriculum_skill" VALUES(8,'Criação de CRUD e Rest API, utilização de ORM, manipulação de imagens com Imagemagick. Desde 2010.','CRUD creation and Rest API. ORM utilization. Image manipulation with Imagemagick. Since 2010',75,'PHP','','2021-05-07 23:45:49.336737','2021-05-08 16:14:15.853241','skills/php.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(9,'Rest API, GraphQL, ORM, estudando ML.','Rest API, GraphQL, ORM, studying ML.',80,'Python','','2021-05-07 23:47:24.846719','2021-05-08 16:14:10.907312','skills/python_DiB9AYf.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(10,'','',45,'Django','','2021-05-07 23:47:50.163270','2021-05-08 16:14:06.407592','skills/python_khui5jH.jpg',2,9);
INSERT INTO "curriculum_skill" VALUES(11,'','',70,'Flask','','2021-05-07 23:48:18.844199','2021-05-08 16:14:00.995437','skills/python_OPCCPNT.jpg',2,9);
INSERT INTO "curriculum_skill" VALUES(12,'','',60,'FastAPI','','2021-05-07 23:48:49.133714','2021-05-08 16:13:55.245865','skills/python_vjcJZAE.jpg',2,9);
INSERT INTO "curriculum_skill" VALUES(13,'','',80,'SQLAlchemy','','2021-05-07 23:49:32.947087','2021-05-08 16:13:49.954900','skills/python_ytNqgGI.jpg',2,9);
INSERT INTO "curriculum_skill" VALUES(14,'','',2,'TensorFlow','','2021-05-07 23:49:59.779673','2021-05-08 16:13:44.188989','skills/python_zy1INdG.jpg',2,9);
INSERT INTO "curriculum_skill" VALUES(15,'Fullstack. Desde 2010 desenvolvendo frontend com JQuery. Mais recentemente 3+ anos com ReactJS','Fullstack. ReactJS lover. JQuery developer since 2010.',80,'Javascript','','2021-05-07 23:52:53.263059','2021-05-08 16:13:38.884555','skills/javascript.png',2,NULL);
INSERT INTO "curriculum_skill" VALUES(16,'','',80,'ReactJS','','2021-05-07 23:53:15.573271','2021-05-08 16:13:31.259187','skills/ReactJS.jpg',2,15);
INSERT INTO "curriculum_skill" VALUES(17,'','',45,'React Native','','2021-05-07 23:53:41.954569','2021-05-08 16:13:25.983584','skills/ReactNative.jpg',2,15);
INSERT INTO "curriculum_skill" VALUES(18,'','',95,'JQuery','','2021-05-07 23:53:59.966097','2021-05-08 16:13:21.459256','skills/JQuery.jpg',2,15);
INSERT INTO "curriculum_skill" VALUES(19,'','',70,'Blend4Web','','2021-05-07 23:54:17.189885','2021-05-08 16:13:16.265357','skills/Blend4Web.jpg',2,15);
INSERT INTO "curriculum_skill" VALUES(20,'','',68,'Node.js','','2021-05-07 23:54:39.772564','2021-05-08 16:13:11.889981','',2,15);
INSERT INTO "curriculum_skill" VALUES(21,'','',86,'Prisma','','2021-05-07 23:55:11.263614','2021-05-08 16:13:07.110857','',2,15);
INSERT INTO "curriculum_skill" VALUES(22,'','',78,'Graphql-yoga','','2021-05-07 23:55:37.059737','2021-05-08 16:13:02.559122','',2,15);
INSERT INTO "curriculum_skill" VALUES(23,'','',99,'CSS','','2021-05-07 23:56:06.766345','2021-05-08 16:12:56.563810','skills/css3.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(24,'','',99,'Sass','','2021-05-07 23:56:30.590883','2021-05-08 16:12:51.136547','skills/Sass_NcQ6C7b.jpg',2,23);
INSERT INTO "curriculum_skill" VALUES(25,'','',99,'HTML','','2021-05-07 23:57:01.500354','2021-05-08 16:12:45.189271','skills/html5.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(26,'','',88,'MySQL','','2021-05-07 23:57:53.087987','2021-05-08 16:12:39.689023','skills/mysql.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(27,'','',82,'PostgreSQL','','2021-05-07 23:58:34.904118','2021-05-08 16:12:33.712856','skills/postgresql.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(28,'','',88,'SQLite','','2021-05-07 23:58:53.946973','2021-05-08 16:12:28.129502','',2,NULL);
INSERT INTO "curriculum_skill" VALUES(29,'','',70,'Docker','','2021-05-07 23:59:05.430155','2021-05-08 16:12:22.647728','',2,NULL);
INSERT INTO "curriculum_skill" VALUES(30,'Apto para trabalhar em equipes de desenvolvimento, gerenciar atividades e projetos com integração contínua.','Able to work in development teams, manage activities and projects with continuous integration.',96,'Git','','2021-05-08 14:39:09.315056','2021-05-08 16:12:16.667613','skills/git.jpg',2,NULL);
INSERT INTO "curriculum_skill" VALUES(31,'Língua nativa','Native language',98,'Português','Portuguese','2021-05-08 14:40:59.608193','2021-05-08 16:12:11.226268','',3,NULL);
INSERT INTO "curriculum_skill" VALUES(32,'','',82,'Inglês','English','2021-05-08 15:04:42.122458','2021-05-08 16:12:06.084853','skills/ingles.jpg',3,NULL);
INSERT INTO "curriculum_skill" VALUES(33,'Curso Básico de LIBRAS na Universidade Federal da Bahia. LÍNGUA BRASILEIRA DE SINAIS NIVEL I CH 68h','LIBRAS Level 1 Course at Federal University. 68 h.s.',15,'Língua Brasileira de Sinais (LIBRAS)','Brazilian Sign Language (LIBRAS)','2021-05-08 15:12:09.233967','2021-05-08 16:12:01.099635','skills/libras.jpg',3,NULL);
INSERT INTO "curriculum_skill" VALUES(34,'','',99,'Fala fluente','Fluent speech','2021-05-08 15:13:30.324889','2021-05-08 16:11:55.560724','skills/portugues.jpg',3,31);
INSERT INTO "curriculum_skill" VALUES(35,'','',98,'Ouve bem','Listen well','2021-05-08 15:14:11.958557','2021-05-08 16:11:49.633418','skills/portugues_0ssKeCq.jpg',3,31);
INSERT INTO "curriculum_skill" VALUES(36,'','',98,'Escreve bem','Write well','2021-05-08 15:14:59.864725','2021-05-08 16:11:44.460529','skills/portugues_asbPwnC.jpg',3,31);
INSERT INTO "curriculum_skill" VALUES(37,'','',84,'Fala fluente','Fluent speech','2021-05-08 15:15:50.863380','2021-05-08 16:11:38.043022','skills/ingles_ZVeSjxD.jpg',3,32);
INSERT INTO "curriculum_skill" VALUES(38,'Por anos, graças a Deus, manejando tempo em curso de medicina, trabalho e empresa.','For years, thank God, managing time in medicine, work and business.',92,'Gerenciamento de Tempo','Time Management Skills','2021-06-01 13:32:21.644101','2021-06-01 13:32:21.644144','',4,NULL);
INSERT INTO "curriculum_skill" VALUES(39,'De consertar vaso sanitário à construir circuito elétrico, de programação à medicina.','From fixing toilets to building an electrical circuit, from programming to medicine.',92,'Multitarefa','Multitasking','2021-06-01 13:34:30.193712','2021-06-01 13:34:30.193751','',4,NULL);
INSERT INTO "curriculum_skill" VALUES(40,'Venda de produtos e serviços, já vendi algumas coisas na vida, inclusive com lojas virtuais e pessoalmente, mas não é uma das minhas melhores habilidades.','Selling products and services. I''ve sold some things in my life, including online stores and in person, but it''s not one of my best skills.',75,'Vendedor','Seller','2021-06-01 13:36:06.159744','2021-06-01 13:36:16.351630','',4,NULL);
INSERT INTO "curriculum_skill" VALUES(41,'Elogiado por boa comunicação em plataformas de freelancers. Gosto sempre de manter meus clientes informados sobre o andamento do projeto. É uma necessidade essa habilidade para transmitir confiança para clientes à distância.','Praised for good communication on freelancer platforms. I always like to keep my clients informed about the progress of the project. This skill is a necessity to convey confidence to customers from a distance.',88,'Comunicação','Communication','2021-06-01 13:39:15.763313','2021-06-01 13:39:15.763353','',4,NULL);
INSERT INTO "curriculum_skill" VALUES(42,'É uma das coisas que mais amo fazer. Resolver problemas! Criar soluções, por isso o lema da minha empresa criada. ORANGO I/O, soluções inteligentes.','It''s one of the things I love to do the most. Solve problems! Create solutions, hence the motto of my company created. ORANGO I/O, smart solutions.',98,'Resolução de Problemas','Problem Solving','2021-06-01 13:40:33.103031','2021-06-01 13:40:33.103098','',4,NULL);
INSERT INTO "curriculum_skill" VALUES(43,'Ensino desde os meus 14 anos: Física, Química e Matemática. Mais recentemente com aulas de Wordpress e Assessoria em programação. Um diferencial são as apresentações.','I teach since I was 14 years old: Physics, Chemistry and Mathematics. More recently with Wordpress classes and programming advices. A differential are the slide presentations.',88,'Ensinar','Teaching','2021-06-01 13:44:26.620542','2021-06-01 13:44:26.620600','',4,NULL);
INSERT INTO "curriculum_skill" VALUES(44,'Algo que ainda preciso melhorar um pouco e coloquei aqui pois considero um defeito em melhoria e construção. A performance para falar à frente de grupos grandes.','Something I still need to improve a little bit and I put it here because I consider it a defect in improvement and construction. The performance to speak in front of large groups.',60,'Performance pública','Talk','2021-06-01 13:46:23.804013','2021-06-01 13:46:23.804064','',4,NULL);
CREATE TABLE "django_admin_log" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "action_time" datetime NOT NULL, "object_id" text NULL, "object_repr" varchar(200) NOT NULL, "change_message" text NOT NULL, "content_type_id" integer NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "action_flag" smallint unsigned NOT NULL CHECK ("action_flag" >= 0));
INSERT INTO "django_admin_log" VALUES(1,'2021-05-04 02:48:26.545031','2','Skill object (2)','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(2,'2021-05-04 02:58:11.001704','2','Python: 75%','[{"changed": {"fields": ["Icon"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(3,'2021-05-07 21:38:29.254713','1','Post object (1)','[{"added": {}}]',12,1,1);
INSERT INTO "django_admin_log" VALUES(4,'2021-05-07 22:16:51.536055','2','Filipe Lopes - about-me','[{"added": {}}]',12,1,1);
INSERT INTO "django_admin_log" VALUES(5,'2021-05-07 22:17:43.118793','2','Teste - Academia do Saber','',9,1,3);
INSERT INTO "django_admin_log" VALUES(6,'2021-05-07 22:17:43.139298','1','Teste - Academia do Saber','',9,1,3);
INSERT INTO "django_admin_log" VALUES(7,'2021-05-07 22:31:29.401238','2','Filipe Lopes - about-me','[{"changed": {"fields": ["Content pt br"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES(8,'2021-05-07 23:29:48.158288','3','Desenvolvedor frontend ReactJS, colaborador em equipe SCRUM - International Conservation','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(9,'2021-05-07 23:30:21.728610','2','Python: 75%','',10,1,3);
INSERT INTO "django_admin_log" VALUES(10,'2021-05-07 23:30:21.748801','1','PHP: 75%','',10,1,3);
INSERT INTO "django_admin_log" VALUES(11,'2021-05-07 23:38:48.185997','3','Blender: 65%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(12,'2021-05-07 23:39:30.434651','4','Gimp: 75%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(13,'2021-05-07 23:40:06.594273','5','Corel Draw: 25%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(14,'2021-05-07 23:40:46.018283','6','Inkscape: 45%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(15,'2021-05-07 23:43:22.588405','7','Photoscan Ankisoft&reg;: 60%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(16,'2021-05-07 23:45:49.337411','8','PHP: 75%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(17,'2021-05-07 23:47:24.847391','9','Python: 80%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(18,'2021-05-07 23:47:50.164151','10','Django: 45%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(19,'2021-05-07 23:48:18.844846','11','Flask: 70%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(20,'2021-05-07 23:48:49.134524','12','FastAPI: 60%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(21,'2021-05-07 23:49:32.948052','13','SQLAlchemy: 80%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(22,'2021-05-07 23:49:59.780362','14','TensorFlow: 2%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(23,'2021-05-07 23:52:53.264143','15','Javascript: 80%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(24,'2021-05-07 23:53:15.574350','16','ReactJS: 80%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(25,'2021-05-07 23:53:41.955717','17','React Native: 45%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(26,'2021-05-07 23:53:59.966854','18','JQuery: 95%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(27,'2021-05-07 23:54:17.190731','19','Blend4Web: 70%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(28,'2021-05-07 23:54:39.773238','20','Node.js: 68%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(29,'2021-05-07 23:55:11.264258','21','Prisma: 86%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(30,'2021-05-07 23:55:37.061146','22','Graphql-yoga: 78%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(31,'2021-05-07 23:56:06.767054','23','CSS: 99%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(32,'2021-05-07 23:56:30.591512','24','Sass: 99%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(33,'2021-05-07 23:57:01.501191','25','HTML: 99%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(34,'2021-05-07 23:57:53.088842','26','MySQL: 88%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(35,'2021-05-07 23:58:34.905036','27','PostgreSQL: 82%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(36,'2021-05-07 23:58:53.947809','28','SQLite: 88%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(37,'2021-05-07 23:59:05.430835','29','Docker: 70%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(38,'2021-05-08 14:39:09.315965','30','Git: 96%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(39,'2021-05-08 14:40:59.608958','31','Português: 97%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(40,'2021-05-08 15:04:42.123563','32','Inglês: 82%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(41,'2021-05-08 15:12:09.234744','33','Língua Brasileira de Sinais (LIBRAS): 15%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(42,'2021-05-08 15:12:29.642909','33','Língua Brasileira de Sinais (LIBRAS): 15%','[{"changed": {"fields": ["Icon"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(43,'2021-05-08 15:13:30.326035','34','Fala fluente: 99%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(44,'2021-05-08 15:14:11.959256','35','Ouve bem: 98%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(45,'2021-05-08 15:14:26.152222','31','Português: 98%','[{"changed": {"fields": ["Level"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(46,'2021-05-08 15:14:59.865834','36','Escreve bem: 98%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(47,'2021-05-08 15:15:18.627576','34','Fala fluente: 99%','[]',10,1,2);
INSERT INTO "django_admin_log" VALUES(48,'2021-05-08 15:15:50.864390','37','Fala fluente: 84%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(49,'2021-05-08 16:10:06.618947','1','Category object (1)','[{"added": {}}]',13,1,1);
INSERT INTO "django_admin_log" VALUES(50,'2021-05-08 16:11:13.321203','2','Desenvolvedor Web/Mobile','[{"added": {}}]',13,1,1);
INSERT INTO "django_admin_log" VALUES(51,'2021-05-08 16:11:26.346030','3','Idiomas','[{"added": {}}]',13,1,1);
INSERT INTO "django_admin_log" VALUES(52,'2021-05-08 16:11:38.044274','37',' Idiomas - (Inglês) Fala fluente: 84%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(53,'2021-05-08 16:11:44.461951','36',' Idiomas - (Português) Escreve bem: 98%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(54,'2021-05-08 16:11:49.635293','35',' Idiomas - (Português) Ouve bem: 98%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(55,'2021-05-08 16:11:55.561785','34',' Idiomas - (Português) Fala fluente: 99%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(56,'2021-05-08 16:12:01.101137','33',' Idiomas - Língua Brasileira de Sinais (LIBRAS): 15%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(57,'2021-05-08 16:12:06.085799','32',' Idiomas - Inglês: 82%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(58,'2021-05-08 16:12:11.228194','31',' Idiomas - Português: 98%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(59,'2021-05-08 16:12:16.668598','30',' Desenvolvedor Web/Mobile - Git: 96%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(60,'2021-05-08 16:12:22.649165','29',' Desenvolvedor Web/Mobile - Docker: 70%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(61,'2021-05-08 16:12:28.131008','28',' Desenvolvedor Web/Mobile - SQLite: 88%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(62,'2021-05-08 16:12:33.713944','27',' Desenvolvedor Web/Mobile - PostgreSQL: 82%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(63,'2021-05-08 16:12:39.689935','26',' Desenvolvedor Web/Mobile - MySQL: 88%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(64,'2021-05-08 16:12:45.190786','25',' Desenvolvedor Web/Mobile - HTML: 99%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(65,'2021-05-08 16:12:51.137548','24',' Desenvolvedor Web/Mobile - (CSS) Sass: 99%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(66,'2021-05-08 16:12:56.564916','23',' Desenvolvedor Web/Mobile - CSS: 99%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(67,'2021-05-08 16:13:02.560309','22',' Desenvolvedor Web/Mobile - (Javascript) Graphql-yoga: 78%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(68,'2021-05-08 16:13:07.111858','21',' Desenvolvedor Web/Mobile - (Javascript) Prisma: 86%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(69,'2021-05-08 16:13:11.891282','20',' Desenvolvedor Web/Mobile - (Javascript) Node.js: 68%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(70,'2021-05-08 16:13:16.266484','19',' Desenvolvedor Web/Mobile - (Javascript) Blend4Web: 70%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(71,'2021-05-08 16:13:21.460453','18',' Desenvolvedor Web/Mobile - (Javascript) JQuery: 95%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(72,'2021-05-08 16:13:25.984695','17',' Desenvolvedor Web/Mobile - (Javascript) React Native: 45%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(73,'2021-05-08 16:13:31.260149','16',' Desenvolvedor Web/Mobile - (Javascript) ReactJS: 80%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(74,'2021-05-08 16:13:38.885468','15',' Desenvolvedor Web/Mobile - Javascript: 80%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(75,'2021-05-08 16:13:44.190573','14',' Desenvolvedor Web/Mobile - (Python) TensorFlow: 2%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(76,'2021-05-08 16:13:49.956475','13',' Desenvolvedor Web/Mobile - (Python) SQLAlchemy: 80%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(77,'2021-05-08 16:13:55.247600','12',' Desenvolvedor Web/Mobile - (Python) FastAPI: 60%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(78,'2021-05-08 16:14:00.996586','11',' Desenvolvedor Web/Mobile - (Python) Flask: 70%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(79,'2021-05-08 16:14:06.409127','10',' Desenvolvedor Web/Mobile - (Python) Django: 45%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(80,'2021-05-08 16:14:10.908584','9',' Desenvolvedor Web/Mobile - Python: 80%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(81,'2021-05-08 16:14:15.855290','8',' Desenvolvedor Web/Mobile - PHP: 75%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(82,'2021-05-08 16:14:21.360512','6',' Designer gráfico - Inkscape: 45%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(83,'2021-05-08 16:14:28.038885','7',' Designer gráfico - Photoscan Ankisoft&reg;: 60%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(84,'2021-05-08 16:14:32.942103','5',' Designer gráfico - Corel Draw: 25%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(85,'2021-05-08 16:14:38.032210','4',' Designer gráfico - Gimp: 75%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(86,'2021-05-08 16:14:44.053610','3',' Designer gráfico - Blender: 65%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(87,'2021-05-08 17:24:59.598426','3','Daniel 2:21 ACF - daniel-2-21','[{"added": {}}]',12,1,1);
INSERT INTO "django_admin_log" VALUES(88,'2021-05-08 18:16:57.460280','4','Resumo - curriculum-resume','[{"added": {}}]',12,1,1);
INSERT INTO "django_admin_log" VALUES(89,'2021-05-08 18:20:57.904820','2','Filipe Lopes - about-me','[{"changed": {"fields": ["Content pt br", "Content en us"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES(90,'2021-05-24 11:37:27.696533','4','CEO, CTO, Web Developer, SCRUM Master, Gerenciador de Projetos,DevOps - ORANGO I/O TECNOLOGIA','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(91,'2021-05-24 18:55:10.049475','5','Diretor de projeto e desenvolvedor ReactJS - ALT F4 Informática','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(92,'2021-05-24 19:02:22.638879','6','Desenvolvedor Fullstack Wordpress API e ReactJS - Montreal Tecnologia, alocado no INEMA','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(93,'2021-05-24 19:04:39.015659','6','Desenvolvedor Fullstack Wordpress API e ReactJS - Montreal Tecnologia, alocado no INEMA','[]',9,1,2);
INSERT INTO "django_admin_log" VALUES(94,'2021-05-24 19:12:57.991076','7','Desenvolvedor PHP Fullstack - ITMPR','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(95,'2021-05-24 19:19:29.338512','8','Desenvolvedor PHP Fullstack - Qualité Ortodontia','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(96,'2021-05-24 19:21:15.419962','9','Desenvolvedor com stack WORDPRESS + ReactJS - Instituto de Ciência e Saúde - UFBA','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(97,'2021-05-24 19:22:22.090966','10','Desenvolvedor WORDPRESS - Hangar Comunicação','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(98,'2021-05-24 19:24:11.392406','11','Desenvolvedor - Marinha do Brasil','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(99,'2021-05-25 11:48:27.720486','12','CTO, Desenvolvedor Backend, Revisor de Código, DevOps - CLICKLAV','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES(100,'2021-05-25 11:52:43.042599','1','Course object (1)','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES(101,'2021-05-25 11:55:01.490202','2','Course object (2)','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES(102,'2021-05-31 23:44:27.333532','12','CTO, Desenvolvedor Backend, Revisor de Código, DevOps - CLICKLAV','[{"changed": {"fields": ["Description en us", "Key achievement pt br", "Key achievement en us", "Until"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(103,'2021-05-31 23:55:07.056699','11','Desenvolvedor web e modelador 3D - Marinha do Brasil','[{"changed": {"fields": ["Title pt br", "Title en us", "Description pt br", "Description en us", "Key achievement pt br", "Key achievement en us"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(104,'2021-06-01 11:32:55.301624','10','Desenvolvedor WORDPRESS - Hangar Comunicação','[{"changed": {"fields": ["Title en us", "Description pt br", "Key achievement pt br", "Key achievement en us"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(105,'2021-06-01 11:43:14.872827','9','Desenvolvedor com stack WORDPRESS + ReactJS - Instituto de Ciência e Saúde - UFBA','[{"changed": {"fields": ["Title en us", "Description pt br", "Description en us", "Key achievement pt br", "Key achievement en us"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(106,'2021-06-01 11:46:59.909475','8','Desenvolvedor PHP Fullstack - Qualité Ortodontia','[{"changed": {"fields": ["Title en us", "Description pt br", "Description en us", "Key achievement pt br", "Key achievement en us"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(107,'2021-06-01 12:14:16.217121','7','Desenvolvedor PHP Fullstack - ITMPR','[{"changed": {"fields": ["Title en us", "Description pt br", "Description en us", "Key achievement pt br", "Key achievement en us", "Until"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(108,'2021-06-01 12:33:36.648382','6','Desenvolvedor Fullstack Wordpress API + SlimFramework + ReactJS - Montreal Tecnologia, alocado no INEMA','[{"changed": {"fields": ["Title pt br", "Title en us", "Description pt br", "Description en us", "Key achievement pt br", "Key achievement en us"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(109,'2021-06-01 12:38:54.575476','5','Diretor de projeto e desenvolvedor ReactJS - ALT F4 Informática (Rio de Janeiro)','[{"changed": {"fields": ["Title en us", "Organization", "Description pt br", "Description en us", "Key achievement pt br", "Key achievement en us"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(110,'2021-06-01 12:42:07.308691','4','CEO, CTO, Web Developer, SCRUM Master, Gerenciador de Projetos,DevOps - ORANGO I/O TECNOLOGIA','[{"changed": {"fields": ["Description pt br", "Description en us", "Key achievement en us", "Until"]}}]',9,1,2);
INSERT INTO "django_admin_log" VALUES(111,'2021-06-01 12:42:15.563137','3','Desenvolvedor frontend ReactJS, colaborador em equipe SCRUM - International Conservation','[]',9,1,2);
INSERT INTO "django_admin_log" VALUES(112,'2021-06-01 12:46:23.159708','4','Pesoal','[{"added": {}}]',13,1,1);
INSERT INTO "django_admin_log" VALUES(113,'2021-06-01 13:32:21.646722','38',' Pesoal - Gerenciamento de Tempo: 92%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(114,'2021-06-01 13:34:30.194974','39',' Pesoal - Multitarefa: 92%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(115,'2021-06-01 13:36:06.160859','40',' Designer gráfico - Vendedor: 75%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(116,'2021-06-01 13:36:16.353309','40',' Pesoal - Vendedor: 75%','[{"changed": {"fields": ["Category"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES(117,'2021-06-01 13:36:23.562543','4','Pessoal','[{"changed": {"fields": ["Name pt br"]}}]',13,1,2);
INSERT INTO "django_admin_log" VALUES(118,'2021-06-01 13:39:15.764630','41',' Pessoal - Comunicação: 88%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(119,'2021-06-01 13:40:33.104215','42',' Pessoal - Resolução de Problemas: 98%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(120,'2021-06-01 13:44:26.622534','43',' Pessoal - Ensinar: 88%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(121,'2021-06-01 13:46:23.805252','44',' Pessoal - Performance pública: 60%','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES(122,'2021-06-01 17:43:48.469310','5','Tiago 1:17 ARA - tiago-1-17','[{"added": {}}]',12,1,1);
CREATE TABLE "django_content_type" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL);
INSERT INTO "django_content_type" VALUES(1,'admin','logentry');
INSERT INTO "django_content_type" VALUES(2,'auth','permission');
INSERT INTO "django_content_type" VALUES(3,'auth','group');
INSERT INTO "django_content_type" VALUES(4,'auth','user');
INSERT INTO "django_content_type" VALUES(5,'contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES(6,'sessions','session');
INSERT INTO "django_content_type" VALUES(7,'core','tag');
INSERT INTO "django_content_type" VALUES(8,'curriculum','course');
INSERT INTO "django_content_type" VALUES(9,'curriculum','experience');
INSERT INTO "django_content_type" VALUES(10,'curriculum','skill');
INSERT INTO "django_content_type" VALUES(11,'portfolio','item');
INSERT INTO "django_content_type" VALUES(12,'posts','post');
INSERT INTO "django_content_type" VALUES(13,'curriculum','category');
CREATE TABLE "django_migrations" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "applied" datetime NOT NULL);
INSERT INTO "django_migrations" VALUES(1,'contenttypes','0001_initial','2021-04-02 13:10:53.809100');
INSERT INTO "django_migrations" VALUES(2,'auth','0001_initial','2021-04-02 13:10:53.835563');
INSERT INTO "django_migrations" VALUES(3,'admin','0001_initial','2021-04-02 13:10:53.857284');
INSERT INTO "django_migrations" VALUES(4,'admin','0002_logentry_remove_auto_add','2021-04-02 13:10:53.885392');
INSERT INTO "django_migrations" VALUES(5,'admin','0003_logentry_add_action_flag_choices','2021-04-02 13:10:53.908536');
INSERT INTO "django_migrations" VALUES(6,'contenttypes','0002_remove_content_type_name','2021-04-02 13:10:53.936867');
INSERT INTO "django_migrations" VALUES(7,'auth','0002_alter_permission_name_max_length','2021-04-02 13:10:53.957018');
INSERT INTO "django_migrations" VALUES(8,'auth','0003_alter_user_email_max_length','2021-04-02 13:10:53.978032');
INSERT INTO "django_migrations" VALUES(9,'auth','0004_alter_user_username_opts','2021-04-02 13:10:54.002849');
INSERT INTO "django_migrations" VALUES(10,'auth','0005_alter_user_last_login_null','2021-04-02 13:10:54.021724');
INSERT INTO "django_migrations" VALUES(11,'auth','0006_require_contenttypes_0002','2021-04-02 13:10:54.032568');
INSERT INTO "django_migrations" VALUES(12,'auth','0007_alter_validators_add_error_messages','2021-04-02 13:10:54.051174');
INSERT INTO "django_migrations" VALUES(13,'auth','0008_alter_user_username_max_length','2021-04-02 13:10:54.070697');
INSERT INTO "django_migrations" VALUES(14,'auth','0009_alter_user_last_name_max_length','2021-04-02 13:10:54.093272');
INSERT INTO "django_migrations" VALUES(15,'auth','0010_alter_group_name_max_length','2021-04-02 13:10:54.112181');
INSERT INTO "django_migrations" VALUES(16,'auth','0011_update_proxy_permissions','2021-04-02 13:10:54.128844');
INSERT INTO "django_migrations" VALUES(17,'auth','0012_alter_user_first_name_max_length','2021-04-02 13:10:54.146929');
INSERT INTO "django_migrations" VALUES(18,'sessions','0001_initial','2021-04-02 13:10:54.159582');
INSERT INTO "django_migrations" VALUES(19,'core','0001_initial','2021-04-02 17:51:46.134938');
INSERT INTO "django_migrations" VALUES(20,'curriculum','0001_initial','2021-04-02 17:51:46.153522');
INSERT INTO "django_migrations" VALUES(21,'posts','0001_initial','2021-04-02 17:51:46.166916');
INSERT INTO "django_migrations" VALUES(22,'portfolio','0001_initial','2021-04-02 17:51:46.188575');
INSERT INTO "django_migrations" VALUES(23,'curriculum','0002_auto_20210502_1438','2021-05-02 14:54:48.040259');
INSERT INTO "django_migrations" VALUES(24,'curriculum','0003_auto_20210502_1952','2021-05-02 19:53:11.923021');
INSERT INTO "django_migrations" VALUES(25,'posts','0002_auto_20210502_1952','2021-05-02 19:53:11.967176');
INSERT INTO "django_migrations" VALUES(26,'curriculum','0004_auto_20210504_0247','2021-05-04 02:47:56.003062');
INSERT INTO "django_migrations" VALUES(27,'posts','0003_auto_20210507_2135','2021-05-07 21:35:59.523666');
INSERT INTO "django_migrations" VALUES(28,'curriculum','0005_auto_20210508_1555','2021-05-08 15:56:02.937471');
CREATE TABLE "django_session" ("session_key" varchar(40) NOT NULL PRIMARY KEY, "session_data" text NOT NULL, "expire_date" datetime NOT NULL);
INSERT INTO "django_session" VALUES('58ri81ulhkgau7pcfeewp16rw7co3uu6','.eJxVjLsOwjAMAP8lM4pw8ywjO99Q2bVDCiiRmnZC_DuK1AHWu9O91YT7lqe9yTotrC4K1OmXEc5PKV3wA8u96rmWbV1I90QftulbZXldj_ZvkLHlvgUPTIDRQCIWIGvHyOiEHAWxgdAIB0yDjGAo0WwIZICzdeI5Dl59vgHsOKo:1lSJgm:jVCR7Ii42L3lHHqTsscUc8krLpcddAuImgvi0fafWWA','2021-04-16 13:18:16.678153');
INSERT INTO "django_session" VALUES('t9pxz1r9oo4fg5lg2td1wheilrj09y2c','.eJxVjLsOwjAMAP8lM4pw8ywjO99Q2bVDCiiRmnZC_DuK1AHWu9O91YT7lqe9yTotrC4K1OmXEc5PKV3wA8u96rmWbV1I90QftulbZXldj_ZvkLHlvgUPTIDRQCIWIGvHyOiEHAWxgdAIB0yDjGAo0WwIZICzdeI5Dl59vgHsOKo:1ldl4H:bRg7l9ADGr00UFrTntJQOczCR1OvZ5amSor5iNVtO18','2021-05-18 02:45:49.516726');
INSERT INTO "django_session" VALUES('h6wmh624v363owy9uewimqa6jeckt4gf','.eJxVjLsOwjAMAP8lM4pw8ywjO99Q2bVDCiiRmnZC_DuK1AHWu9O91YT7lqe9yTotrC4K1OmXEc5PKV3wA8u96rmWbV1I90QftulbZXldj_ZvkLHlvgUPTIDRQCIWIGvHyOiEHAWxgdAIB0yDjGAo0WwIZICzdeI5Dl59vgHsOKo:1lnrUa:cpKNWKopUPjSJvy1us5xvR2vXQ856huu8R4ORHe2oEs','2021-06-14 23:38:44.300240');
CREATE TABLE "portfolio_item" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(100) NOT NULL, "description_pt_br" text NOT NULL, "description_en_us" text NOT NULL, "date" date NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
CREATE TABLE "portfolio_item_posts" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "item_id" integer NOT NULL REFERENCES "portfolio_item" ("id") DEFERRABLE INITIALLY DEFERRED, "post_id" integer NOT NULL REFERENCES "posts_post" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "portfolio_item_tags" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "item_id" integer NOT NULL REFERENCES "portfolio_item" ("id") DEFERRABLE INITIALLY DEFERRED, "tag_id" integer NOT NULL REFERENCES "core_tag" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "posts_post" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title_en_us" varchar(200) NOT NULL, "slug" varchar(50) NOT NULL UNIQUE, "excerpt_pt_br" text NOT NULL, "excerpt_en_us" text NOT NULL, "content_pt_br" text NOT NULL, "content_en_us" text NOT NULL, "type" text NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "title_pt_br" varchar(200) NOT NULL);
INSERT INTO "posts_post" VALUES(1,'Pixel','pixel','','','é unidade básica da composição digital. É o símbolo da criação, criatividade, construção e transformação. Se existe algo que você pode pensar, com pixels você pode criar!','is the minimal component of the visible software tecnology. It''s a creation symbol meaning creativity and transformation. Imagine something! Now pixel it and your imagination becomes real!','TXT','2021-05-07 21:38:29.254014','2021-05-07 21:38:29.254046','Pixel');
INSERT INTO "posts_post" VALUES(2,'Filipe Lopes','about-me','','','Discípulo de Jesus Cristo, programador criativo com mais de 10 anos de experiência,  fundador da empresa ORANGO I/O TECNOLOGIA, concluindo o curso de medicina na Universidade Federal da Bahia. Ao longo dos anos trabalhei para diversos clientes como Marinha do Brasil e organizações do meio ambiente estaduais e internacionais com Javascript, Python, PHP, desenvolvendo e gerenciando desde sistemas de orçamentos e teleatendimento para clínicas até programa com visualização tridimensional. Desejoso por aprender, criar e trazer soluções práticas e simples nas diversas áreas do conhecimento, porém com foco maior em saúde. Atualmente estou estudando matemática avançada e Machine Learning para poder aumentar o alcance e eficiência dos sistemas a serem criados com a real Inteligência Artificial. Gosto muito de praticar atividades físicas e cantar em grupo nas horas vagas.','Disciple of Jesus Christ. Programmer with 10+ year of experience. Founder of ORANGO I / O TECNOLOGIA. Finishing the medicine course at Federal University of Bahia. For all those years I worked for a great variety of clients, from Brazil Navy to environment international and national organizations. I realy enjoy learning and create bringing practical solutions in all knowledge areas but now focusing on health.','TXT','2021-05-07 22:16:51.535309','2021-05-08 18:20:57.903657','Filipe Lopes');
INSERT INTO "posts_post" VALUES(3,'Daniel 2:21 KJV','daniel-2-21','','','E Ele muda os tempos e as estações; Ele remove os reis e estabelece os reis; Ele dá sabedoria aos sábios e conhecimento aos entendidos.','And He changeth the times and the seasons: He removeth kings, and setteth up kings: He giveth wisdom unto the wise, and knowledge to them that know understanding','TXT','2021-05-08 17:24:59.597444','2021-05-08 17:24:59.597502','Daniel 2:21 ACF');
INSERT INTO "posts_post" VALUES(4,'Resume','curriculum-resume','','','Discípulo de Jesus. Programador criativo com mais de 10 anos de experiência e mercado.  Fundador da ORANGO I/O TECNOLOGIA, concluindo o curso de medicina na Universidade Federal da Bahia. Ao longo dos anos trabalhei para diversos clientes como Marinha do Brasil, organizações estaduais e internacionais de meio ambiente e clínicas particulares desenvolvendo soluções que otimizaram processos. Utilizando as linguagens modernas e promissoras do mercado como Javascript, Python, construí desde sistemas de orçamentos e teleatendimento para clínicas até programa com visualização tridimensional. Desejoso por aprender, criar e trazer soluções práticas e simples nas diversas áreas do conhecimento, porém com foco maior em saúde. Estudando matemática avançada para criar com Machine Learning.','Disciple of Jesus. Creative programmer with 10+ years of experience and market. Founder of ORANGO I/O TECNOLOGIA, completing the medical course at the Federal University of Bahia. Over the years I have worked for several clients such as the Brazilian Navy, state and international environmental organizations and private clinics developing solutions that optimizing processes. Using modern and promising market languages ​​such as Javascript and Python, I built from budgeting and call center systems for clinics to a program with three-dimensional visualization. Desiring to learn, create and bring practical and simple solutions in the various areas of knowledge, but with a greater focus on health. Studying advanced mathematics to create with Machine Learning.','TXT','2021-05-08 18:16:57.459601','2021-05-08 18:16:57.459632','Resumo');
INSERT INTO "posts_post" VALUES(5,'James 1:17 KJV','tiago-1-17','','','Toda boa dádiva e todo dom perfeito são lá do alto, descendo do Pai das luzes, em quem não pode existir variação ou sombra de mudança.','Every good gift and every perfect gift is from above, and cometh down from the Father of lights, with whom is no variableness, neither shadow of turning.','TXT','2021-06-01 17:43:48.467410','2021-06-01 17:43:48.467450','Tiago 1:17 ARA');
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('django_migrations',28);
INSERT INTO "sqlite_sequence" VALUES('django_admin_log',122);
INSERT INTO "sqlite_sequence" VALUES('django_content_type',13);
INSERT INTO "sqlite_sequence" VALUES('auth_permission',52);
INSERT INTO "sqlite_sequence" VALUES('auth_group',0);
INSERT INTO "sqlite_sequence" VALUES('auth_user',1);
INSERT INTO "sqlite_sequence" VALUES('curriculum_course',2);
INSERT INTO "sqlite_sequence" VALUES('curriculum_experience',12);
INSERT INTO "sqlite_sequence" VALUES('posts_post',5);
INSERT INTO "sqlite_sequence" VALUES('curriculum_skill',44);
INSERT INTO "sqlite_sequence" VALUES('curriculum_category',4);
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" ("group_id", "permission_id");
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");
CREATE UNIQUE INDEX "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups" ("user_id", "group_id");
CREATE INDEX "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" ("user_id");
CREATE INDEX "auth_user_groups_group_id_97559544" ON "auth_user_groups" ("group_id");
CREATE UNIQUE INDEX "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions" ("user_id", "permission_id");
CREATE INDEX "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" ("user_id");
CREATE INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" ("permission_id");
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" ("content_type_id");
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log" ("user_id");
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" ("app_label", "model");
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" ("content_type_id", "codename");
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session" ("expire_date");
CREATE INDEX "core_tag_parent_id_ed6b91f6" ON "core_tag" ("parent_id");
CREATE UNIQUE INDEX "portfolio_item_posts_item_id_post_id_965153bc_uniq" ON "portfolio_item_posts" ("item_id", "post_id");
CREATE INDEX "portfolio_item_posts_item_id_c08c58a3" ON "portfolio_item_posts" ("item_id");
CREATE INDEX "portfolio_item_posts_post_id_c4fd3fa0" ON "portfolio_item_posts" ("post_id");
CREATE UNIQUE INDEX "portfolio_item_tags_item_id_tag_id_2206c882_uniq" ON "portfolio_item_tags" ("item_id", "tag_id");
CREATE INDEX "portfolio_item_tags_item_id_ba98099e" ON "portfolio_item_tags" ("item_id");
CREATE INDEX "portfolio_item_tags_tag_id_0c5f958c" ON "portfolio_item_tags" ("tag_id");
CREATE INDEX "curriculum_skill_category_id_a919d514" ON "curriculum_skill" ("category_id");
CREATE INDEX "curriculum_skill_parent_id_50a1ba07" ON "curriculum_skill" ("parent_id");
COMMIT;
