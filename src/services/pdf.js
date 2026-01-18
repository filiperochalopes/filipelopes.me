import { jsPDF } from 'jspdf';
import { fetchData } from './getters';

const CONTACT = {
  name: 'Filipe Rocha Lopes',
  title: 'MD, SOFTWARE (FULL STACK - AI) ENGINEER',
  location: 'FEIRA DE SANTANA, STATE OF BAHIA, BRAZIL',
  phone: '+55 71 99251-8950',
  email: 'contato@filipelopes.med.br',
  website: 'https://filipelopes.me',
  linkedin: 'linkedin.com/in/filipelopes-med-br',
  github: 'github.com/filiperochalopes',
};

const COLORS = {
  text: '#0f141f',
  textMuted: '#7a8599',
  link: '#1155cc',
  headerText: '#0f141f',
  accent: '#953f98', // Purple from HTML
};

const loadImage = (src) => new Promise((resolve) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = src;
  img.onload = () => resolve(img);
  img.onerror = (e) => {
    console.warn(`Failed to load image: ${src}`, e);
    resolve(null);
  };
});

const formatMonthYear = (stringDate, language) => {
  if (!stringDate) return '';
  const locale = language === 'en-us' ? 'en-US' : 'pt-BR';
  const date = new Date(`${stringDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date);
};

const splitBullets = text => {
  if (!text) return [];
  // Corrigido: usando escape para quebras de linha em vez de quebra literal
  return text
    .split(/[\n\r]+|- /)
    .map(item => item.trim())
    .filter(item => item.length > 0 && item !== '-');
};

export const generateCurriculumPdf = async (language = 'pt-br', { download = true } = {}) => {
  const [resume, experiences, skills, courses, certificates, ai] = await Promise.all([
    fetchData('/posts/curriculum-resume', language),
    fetchData('/curriculum/experience', language),
    fetchData('/curriculum/skill', language),
    fetchData('/curriculum/course', language),
    fetchData('/curriculum/certificate', language),
    fetchData('/posts/curriculum-ai', language),
  ]);

  const [profileImg, logoImg, aiIcon, profileIcon, skillsIcon, expIcon] = await Promise.all([
    loadImage('/img/cv/profile.jpg'),
    loadImage('/img/cv/logo.png'),
    loadImage('/img/cv/icon_ai.png'),
    loadImage('/img/cv/icon_profile.png'),
    loadImage('/img/cv/icon_skills.png'),
    loadImage('/img/cv/icon_experience.png'),
  ]);

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const margin = 40;
  const colGap = 30;
  const sidebarWidth = 150; 
  const mainColumnX = margin + sidebarWidth + colGap;
  const mainColumnWidth = pageWidth - mainColumnX - margin;
  
  let y = margin;

  // --- HEADER SECTION (Full Width, Centered) ---
  if (profileImg) {
    const imgSize = 60;
    doc.addImage(profileImg, 'JPEG', (pageWidth - imgSize) / 2, y, imgSize, imgSize);
    y += imgSize + 10;
  }

  if (logoImg) {
    const w = 180;
    const h = (logoImg.height / logoImg.width) * w;
    doc.addImage(logoImg, 'PNG', (pageWidth - w) / 2, y, w, h);
    y += h + 15;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);
  const headerLine = `${CONTACT.title}  •  ${CONTACT.location}  •  ${CONTACT.phone}`;
  doc.text(headerLine, pageWidth / 2, y, { align: 'center' });
  y += 30;

  let ySidebar = y;
  let yMain = y;

  const ensureSpace = (height, isSidebar = false) => {
    let currentY = isSidebar ? ySidebar : yMain;
    if (currentY + height > pageHeight - margin) {
      doc.addPage();
      ySidebar = margin;
      yMain = margin;
      return margin;
    }
    return currentY;
  };

  // --- LEFT COLUMN (SIDEBAR - NO BACKGROUND) ---
  const drawSidebarSection = (title, items, isLink = false) => {
    ensureSpace(40, true);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLORS.text);
    doc.text(title.toUpperCase(), margin, ySidebar);
    ySidebar += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    items.forEach(item => {
      if (!item) return;
      if (isLink) doc.setTextColor(COLORS.link);
      else doc.setTextColor(COLORS.text);

      const lines = doc.splitTextToSize(item, sidebarWidth);
      ensureSpace(lines.length * 11, true);
      doc.text(lines, margin, ySidebar);
      ySidebar += lines.length * 11 + 4;
    });
    ySidebar += 15;
  };

  drawSidebarSection('Details', [
    CONTACT.location,
    CONTACT.phone,
    CONTACT.email
  ]);

  drawSidebarSection('Links', [
    CONTACT.github,
    CONTACT.linkedin,
    CONTACT.website
  ], true);

  const languages = (skills || []).filter(s => s.category?.id === 3);
  if (languages.length > 0) {
    drawSidebarSection(language === 'en-us' ? 'Languages' : 'Idiomas', 
      languages.map(l => `${l.name}: ${l.level >= 90 ? 'Native' : 'Fluent'}`)
    );
  }

  drawSidebarSection('Areas of Expertise', [
    'Health Sciences - Medicine, Primary Care',
    'Exact & Earth Sciences - Computer Science',
    'Public Health - Policy, Planning'
  ]);


  // --- RIGHT COLUMN (MAIN) ---
  const drawMainSection = (title, icon, content) => {
    ensureSpace(50);
    
    const iconSize = 14;
    if (icon) {
      doc.addImage(icon, 'PNG', mainColumnX - 20, yMain - 10, iconSize, iconSize);
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(title === 'AI' ? COLORS.accent : COLORS.headerText);
    doc.text(title.toUpperCase(), mainColumnX, yMain);
    yMain += 18;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.text);

    if (Array.isArray(content)) {
      content.forEach(block => {
        if (block.title) {
            ensureSpace(15);
            doc.setFont('helvetica', 'bold');
            doc.text(block.title, mainColumnX, yMain);
            yMain += 12;
        }
        if (block.subtitle) {
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(COLORS.textMuted);
            doc.text(block.subtitle, mainColumnX, yMain);
            doc.setTextColor(COLORS.text);
            yMain += 12;
            doc.setFont('helvetica', 'normal');
        }
        if (block.text) {
             const lines = doc.splitTextToSize(block.text, mainColumnWidth);
             ensureSpace(lines.length * 11);
             doc.text(lines, mainColumnX, yMain);
             yMain += lines.length * 11 + 5;
        }
        if (block.bullets) {
            block.bullets.forEach(bullet => {
                const bLines = doc.splitTextToSize(`• ${bullet}`, mainColumnWidth);
                ensureSpace(bLines.length * 11);
                doc.text(bLines, mainColumnX, yMain);
                yMain += bLines.length * 11 + 2;
            });
            yMain += 5;
        }
      });
    } else if (typeof content === 'string') {
        const lines = doc.splitTextToSize(content, mainColumnWidth);
        ensureSpace(lines.length * 11);
        doc.text(lines, mainColumnX, yMain);
        yMain += lines.length * 11 + 10;
    }
    yMain += 10;
  };

  if (ai) drawMainSection('AI', aiIcon, ai.content);
  if (resume) drawMainSection('Profile', profileIcon, resume.content);

  const techSkills = (skills || []).filter(s => s.category?.id !== 3 && s.category?.id !== 4);
  const groupedSkills = techSkills.reduce((acc, skill) => {
    const catName = skill.category ? (language === 'en-us' ? skill.category.name_en_us : skill.category.name_pt_br) : 'Other';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(skill.name);
    return acc;
  }, {});

  const skillsBlocks = Object.keys(groupedSkills).map(cat => ({
      text: `${cat}: ${groupedSkills[cat].join(', ')}`
  }));
  
  if (skillsBlocks.length > 0) {
      drawMainSection('Technical & Method Skills', skillsIcon, skillsBlocks);
  }

  const expBlocks = (experiences || []).map(exp => ({
      title: `${exp.title} - ${exp.organization}`,
      subtitle: `${formatMonthYear(exp.since, language)} - ${exp.until ? formatMonthYear(exp.until, language) : 'Present'} | ${exp.place}`,
      bullets: splitBullets(exp.description)
  }));
  
  if (expBlocks.length > 0) {
      drawMainSection('Professional Experience', expIcon, expBlocks);
  }

  if (download) {
    doc.save(`curriculo-filipe-lopes-${language}.pdf`);
  }

  return doc;
};