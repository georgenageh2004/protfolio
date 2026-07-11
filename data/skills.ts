/**
 * Skills data array used to populate the Skills section via map()
 * Each skill has a name, category, and proficiency level (1-5)
 */

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'language';
  level: number; // 1-5
  color: string; // key indicating primary color theme for highlighting
}

export const skills: Skill[] = [
  // Languages
  { name: 'HTML5', category: 'frontend', level: 5, color: 'orange' },
  { name: 'CSS3', category: 'frontend', level: 5, color: 'blue' },
  { name: 'JavaScript', category: 'language', level: 5, color: 'amber' },
  { name: 'TypeScript', category: 'language', level: 4, color: 'blue' },
  { name: 'C#', category: 'language', level: 3, color: 'purple' },

  // Frontend Frameworks
  { name: 'Angular', category: 'frontend', level: 5, color: 'red' },
  { name: 'React', category: 'frontend', level: 4, color: 'cyan' },
  { name: 'Next.js', category: 'frontend', level: 4, color: 'slate' },
  { name: 'Tailwind CSS', category: 'frontend', level: 5, color: 'teal' },
  { name: 'Bootstrap', category: 'frontend', level: 4, color: 'violet' },
  { name: 'RxJS', category: 'frontend', level: 4, color: 'pink' },

  // Backend
  { name: '.NET', category: 'backend', level: 4, color: 'indigo' },
  { name: 'REST APIs', category: 'backend', level: 4, color: 'emerald' },

  // Tools
  { name: 'Git', category: 'tools', level: 4, color: 'orange' },
  { name: 'GitHub', category: 'tools', level: 4, color: 'slate' },
];
