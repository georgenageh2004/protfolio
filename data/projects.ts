/**
 * Projects data array used to populate the Projects section via map()
 */

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string; // path relative to /public
  featured: boolean;
  color: string; // gradient class
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'AXIS',
    subtitle: 'AI-powered Football Scouting Platform',
    description:
      'Graduation project featuring comprehensive player scouting, advanced analytics dashboard, squad builder, and AI-powered player recommendation engine. Built with a scalable full-stack architecture.',
    tech: ['Angular', '.NET', 'SQL Server', 'AI/ML'],
    github: 'https://github.com/georgenageh2004',
    live: '#',
    image: '/project-axis.png',
    featured: true,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Sam Store',
    subtitle: 'Full Stack E-Commerce Platform',
    description:
      'Responsive e-commerce platform featuring secure authentication, dynamic shopping cart, full-featured admin dashboard, containerized deployment, and clean REST API design.',
    tech: ['Angular', '.NET Core', 'Docker', 'SQL Server'],
    github: 'https://github.com/georgenageh2004',
    live: '#',
    image: '/project-samstore.png',
    featured: true,
    color: 'green',
  },
  {
    id: 3,
    title: 'EasyTask',
    subtitle: 'Angular Task Management App',
    description:
      'Intuitive task management application built while studying Angular, featuring task creation, status tracking, priority filtering, and a clean, minimal interface for productivity.',
    tech: ['Angular', 'TypeScript', 'RxJS', 'CSS3'],
    github: 'https://github.com/georgenageh2004',
    live: '#',
    image: '/project-easytask.png',
    featured: false,
    color: 'orange',
  },
];
