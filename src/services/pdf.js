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
  sidebarBg: '#0f141f',
  sidebarText: '#ffffff',
  sidebarTextMuted: '#7a8599',
  sidebarTextHighlight: '#cfd6e6', // Light blue/gray
  mainText: '#0f141f',
  mainTextMuted: '#7a8599',
  headerText: '#0f141f',
  accent: '#2e74b5', // Blue for subheaders
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
  // Split by newlines or bullet points if present in text
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
  
  const sidebarWidth = 180;
  const margin = 20;
  const mainColumnX = sidebarWidth + margin * 2;
  const mainColumnWidth = pageWidth - mainColumnX - margin;
  
  let yMain = margin + 10;
  let ySidebar = margin + 10;

  // Helper to check page break
  const ensureSpace = (height, isSidebar = false) => {
    let y = isSidebar ? ySidebar : yMain;
    if (y + height > pageHeight - margin) {
      doc.addPage();
      // Redraw sidebar background on new page
      doc.setFillColor(COLORS.sidebarBg);
      doc.rect(0, 0, sidebarWidth, pageHeight, 'F');
      
      if (isSidebar) {
        ySidebar = margin;
        return ySidebar;
      } else {
        yMain = margin;
        return yMain;
      }
    }
    return y;
  };

  // --- SIDEBAR RENDER ---
  doc.setFillColor(COLORS.sidebarBg);
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

  // Profile Image
  if (profileImg) {
    const imgSize = 80;
    const x = (sidebarWidth - imgSize) / 2;
    // Circular mask approximation (not supported directly in jsPDF without advanced API, using square for now or clipping)
    // To do circle: doc.circle(x+r, y+r, r, 'Clip'); doc.addImage(...);
    // Simple square for stability
    doc.addImage(profileImg, 'JPEG', x, ySidebar, imgSize, imgSize);
    ySidebar += imgSize + 20;
  }

  // Logo
  if (logoImg) {
    const w = 140;
    const h = (logoImg.height / logoImg.width) * w;
    const x = (sidebarWidth - w) / 2;
    doc.addImage(logoImg, 'PNG', x, ySidebar, w, h);
    ySidebar += h + 20;
  }

  // Contact Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLORS.sidebarText);
  
  const drawSidebarSection = (title, items) => {
    ensureSpace(30, true);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLORS.sidebarText);
    doc.text(title.toUpperCase(), 15, ySidebar);
    ySidebar += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.sidebarTextHighlight);
    
    items.forEach(item => {
      if (!item) return;
      const lines = doc.splitTextToSize(item, sidebarWidth - 30);
      ensureSpace(lines.length * 11, true);
      doc.text(lines, 15, ySidebar);
      ySidebar += lines.length * 11 + 6;
    });
    ySidebar += 10;
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
  ]);

  // Languages
  // Filter language skills
  const languages = (skills || []).filter(s => s.category?.id === 3); // Category 3 is Languages in db
  if (languages.length > 0) {
    drawSidebarSection(language === 'en-us' ? 'Languages' : 'Idiomas', 
      languages.map(l => `${l.name}: ${l.level >= 90 ? 'Fluent/Native' : 'Advanced'}`)
    );
  }

  // Areas of Expertise (Static)
  drawSidebarSection('Areas of Expertise', [
    'Health Sciences - Medicine, Primary Care',
    'Exact & Earth Sciences - Computer Science, Information Systems',
    'Public Health - Policy, Planning, Management'
  ]);


  // --- MAIN COLUMN RENDER ---
  
  // Header Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(COLORS.mainText);
  const nameLines = doc.splitTextToSize(CONTACT.name.toUpperCase(), mainColumnWidth);
  doc.text(nameLines, mainColumnX, yMain);
  yMain += nameLines.length * 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(COLORS.mainTextMuted);
  const titleLines = doc.splitTextToSize(CONTACT.title, mainColumnWidth);
  doc.text(titleLines, mainColumnX, yMain);
  yMain += titleLines.length * 12 + 20;

  const drawMainSection = (title, icon, content, isHtml = false) => {
    ensureSpace(40);
    
    // Icon and Title Line
    const iconSize = 15;
    if (icon) {
      doc.addImage(icon, 'PNG', mainColumnX - 25, yMain - 12, iconSize, iconSize);
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(COLORS.headerText);
    doc.text(title.toUpperCase(), mainColumnX, yMain);
    yMain += 20;

    // Content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(COLORS.mainText);

    if (Array.isArray(content)) {
      content.forEach(block => {
        ensureSpace(20);
        // Sub-blocks handling
        if (block.title) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(block.title, mainColumnX, yMain);
            yMain += 14;
        }
        if (block.subtitle) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(9);
            doc.setTextColor(COLORS.mainTextMuted);
            doc.text(block.subtitle, mainColumnX, yMain);
            doc.setTextColor(COLORS.mainText);
            yMain += 12;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
        }
        if (block.text) {
             const lines = doc.splitTextToSize(block.text, mainColumnWidth);
             ensureSpace(lines.length * 12);
             doc.text(lines, mainColumnX, yMain);
             yMain += lines.length * 12 + 8;
        }
        if (block.bullets) {
            block.bullets.forEach(bullet => {
                const bText = `• ${bullet}`;
                const bLines = doc.splitTextToSize(bText, mainColumnWidth);
                ensureSpace(bLines.length * 12);
                doc.text(bLines, mainColumnX, yMain);
                yMain += bLines.length * 12 + 4;
            });
            yMain += 4;
        }
      });
    } else if (typeof content === 'string') {
        const lines = doc.splitTextToSize(content, mainColumnWidth);
        ensureSpace(lines.length * 12);
        doc.text(lines, mainColumnX, yMain);
        yMain += lines.length * 12 + 10;
    }
    yMain += 10;
  };

  // AI Section
  if (ai) {
    drawMainSection('AI', aiIcon, ai.content);
  }

  // Profile (Resume) Section
  if (resume) {
    drawMainSection('Profile', profileIcon, resume.content);
  }

  // Technical Skills
  // Group non-language skills
  const techSkills = (skills || []).filter(s => s.category?.id !== 3 && s.category?.id !== 4); // Exclude Languages(3) and Personal(4)
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

  // Experience Section
  const expBlocks = (experiences || []).map(exp => ({
      title: `${exp.title} - ${exp.organization}`,
      subtitle: `${formatMonthYear(exp.since, language)} - ${exp.until ? formatMonthYear(exp.until, language) : 'Present'} | ${exp.place}`,
      text: exp.description ? null : '', // If we have bullets, use them, otherwise text
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