import { jsPDF } from 'jspdf';
import { fetchData } from './getters';

const CONTACT = {
  name: 'Filipe Rocha Lopes',
  phone: '+55 71 98605-6232',
  email: 'contato@filipelopes.me',
  website: 'https://filipelopes.me',
};

const splitBullets = text => {
  if (!text) return [];
  const parts = text
    .split('-')
    .map(item => item.replace(/\r?\n/g, '').trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [text];
};

const formatMonthYear = (stringDate, language) => {
  if (!stringDate) return '';
  const locale = language === 'en-us' ? 'en-US' : 'pt-BR';
  const date = new Date(`${stringDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
};

export const generateCurriculumPdf = async (language = 'pt-br', { download = true } = {}) => {
  const [resume, experiences, skills, courses, certificates] = await Promise.all([
    fetchData('/posts/curriculum-resume', language),
    fetchData('/curriculum/experience', language),
    fetchData('/curriculum/skill', language),
    fetchData('/curriculum/course', language),
    fetchData('/curriculum/certificate', language),
  ]);

  const groupedSkills = (() => {
    if (!Array.isArray(skills)) return [];
    const parents = skills
      .filter(skill => skill.parent === null || typeof skill.parent === 'undefined')
      .reduce((acc, cur) => ({ ...acc, [cur.id]: { ...cur, children: [] } }), {});
    skills.forEach(skill => {
      if (skill.parent && parents[skill.parent]) {
        parents[skill.parent].children.push(skill);
      }
    });
    return Object.values(parents);
  })();

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = height => {
    if (y + height > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeTitle = text => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42);
    ensureSpace(28);
    doc.text(text, margin, y);
    y += 28;
  };

  const writeSubtitle = text => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(51, 65, 85);
    ensureSpace(18);
    doc.text(text, margin, y);
    y += 18;
  };

  const writeParagraph = (text, fontSize = 10, leading = 14) => {
    if (!text) return;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(71, 85, 105);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
      ensureSpace(leading);
      doc.text(line, margin, y);
      y += leading;
    });
    y += 6;
  };

  const writeBullets = items => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const indent = 14;
    const leading = 14;
    items.forEach(item => {
      const lines = doc.splitTextToSize(item, maxWidth - indent);
      lines.forEach((line, index) => {
        ensureSpace(leading);
        if (index === 0) {
          doc.text('•', margin, y);
          doc.text(line, margin + indent, y);
        } else {
          doc.text(line, margin + indent, y);
        }
        y += leading;
      });
    });
    y += 6;
  };

  writeTitle(CONTACT.name);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  [CONTACT.phone, CONTACT.email, CONTACT.website].forEach(line => {
    ensureSpace(14);
    doc.text(line, margin, y);
    y += 14;
  });
  y += 8;

  writeSubtitle(language === 'en-us' ? 'Resume' : 'Resumo');
  writeParagraph(resume?.content, 10, 15);

  writeSubtitle(language === 'en-us' ? 'Experiences' : 'Experiências');
  (experiences || []).forEach(experience => {
    ensureSpace(24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`${experience.title} · ${experience.organization}`, margin, y);
    y += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `${formatMonthYear(experience.since, language)} — ${
        experience.until ? formatMonthYear(experience.until, language) : language === 'en-us' ? 'Today' : 'Hoje'
      } · ${experience.local || experience.place}`,
      margin,
      y
    );
    y += 12;
    const bullets = splitBullets(experience.description);
    if (bullets.length > 1) {
      writeBullets(bullets);
    } else {
      writeParagraph(experience.description, 9, 13);
    }
    if (experience.key_achievement) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(217, 119, 6);
      ensureSpace(12);
      const label = language === 'en-us' ? 'Key achievement: ' : 'Principal conquista: ';
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const textWidth = doc.getTextWidth(label);
      doc.text(experience.key_achievement, margin + textWidth, y);
      y += 14;
    }
    y += 4;
  });

  writeSubtitle(language === 'en-us' ? 'Skills' : 'Habilidades');
  (groupedSkills || []).forEach(skill => {
    const childNames = (skill.children || []).map(child => child.name);
    const line = childNames.length > 0 ? `${skill.name} · ${childNames.join(', ')}` : skill.name;
    writeParagraph(line, 9, 13);
  });

  writeSubtitle(language === 'en-us' ? 'Courses' : 'Cursos');
  (courses || []).forEach(course => {
    ensureSpace(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${course.name} · ${course.place}`, margin, y);
    y += 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(formatMonthYear(course.since, language), margin, y);
    y += 12;
    if (course.description) writeParagraph(course.description, 9, 13);
  });

  writeSubtitle(language === 'en-us' ? 'Certificates' : 'Certificados');
  (certificates || []).forEach(certificate => {
    ensureSpace(14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const date = formatMonthYear(certificate.date, language);
    doc.text(`${date ? `${date} · ` : ''}${certificate.title}`, margin, y);
    y += 12;
  });

  if (download) {
    doc.save(`curriculo-filipe-lopes-${language}.pdf`);
  }

  return doc;
};
