import { Profile } from '../../domain/profile/entities/profile.entity';
import { Email } from '../../domain/profile/value-objects/email.vo';
import { SocialLink } from '../../domain/profile/value-objects/social-link.vo';

/**
 * Static profile data
 */
export const PROFILE_DATA: Profile = new Profile(
  'Randy Molina',
  'Full Stack Developer',
  'Desarrollo soluciones web a medida.',
  'Soy un Desarrollador de Software enfocado en PHP y tecnologías web modernas. Me especializo en construir sistemas robustos y escalables para clientes diversos.',
  new Email('randyjoelmr2003@gmail.com'),
  [
    new SocialLink('github', 'https://github.com/TheAlessxndro', 'TheAlessxndro'),
    new SocialLink('linkedin', 'https://www.linkedin.com/in/randy-molina/', 'randy-molina')
  ],
  'assets/images/fot.jpg',
  'https://drive.google.com/file/d/1NtOrqgfC7anbexGFYb4zS0jDZ2bakJy1/view?usp=sharing',
  [
    'PHP (Laravel)',
    'JavaScript (ES6+)',
    'Angular',
    'MySQL',
    'Linux / Ubuntu',
    'Git'
  ]
);
