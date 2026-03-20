import { Skill } from '../../domain/skills/entities/skill.entity';

/**
 * Static skills data
 */
export const SKILLS_DATA: Skill[] = [
  new Skill(
    'backend',
    'Backend',
    'fas fa-server',
    ['PHP', 'Laravel', 'NestJS']
  ),
  new Skill(
    'frontend',
    'Frontend',
    'fas fa-code',
    ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Angular']
  ),
  new Skill(
    'database-tools',
    'Database & Tools',
    'fas fa-database',
    ['MySQL', 'Git', 'Linux / Ubuntu']
  ),
  new Skill(
    'devops',
    'DevOps & CI/CD',
    'fas fa-infinity',
    ['Docker', 'Jenkins']
  )
];
