import { Project } from '../../domain/portfolio/entities/project.entity';
import { Technology } from '../../domain/portfolio/value-objects/technology.vo';

/**
 * Static projects data
 */
export const PROJECTS_DATA: Project[] = [
  // Proyectos personales/profesionales
  new Project(
    'inventory-system',
    'Sistema de Inventario',
    'Sistema completo que gestiona productos por categorías y ofrece un dashboard contable en tiempo real. Conecta un frontend en Angular con un backend en Laravel mediante APIs RESTful.',
    'assets/images/sistema_inventario.png',
    [
      new Technology('Angular'),
      new Technology('Laravel'),
      new Technology('MySQL')
    ],
    undefined,
    undefined,
    true
  ),
  new Project(
    'tech-store',
    'Tienda de Tecnología',
    'Plataforma de comercio electrónico para artículos tecnológicos. Incluye catálogo dinámico y gestión de productos.',
    'assets/images/Sist.png',
    [
      new Technology('PHP'),
      new Technology('MySQL'),
      new Technology('Bootstrap')
    ],
    undefined,
    undefined,
    true
  ),
  new Project(
    'segurikids',
    'SeguriKids',
    'Plataforma educativa sobre el bullying escolar. Recursos informativos para la comunidad educativa.',
    'assets/images/seguri.png',
    [
      new Technology('HTML/CSS'),
      new Technology('JavaScript'),
      new Technology('PHP')
    ],
    undefined,
    undefined,
    true
  )
];
