import { Project } from './entities/project.entity';

/**
 * Portfolio Repository Interface (Port)
 * Defines the contract for accessing portfolio/projects data
 */
export abstract class PortfolioRepository {
  abstract getAll(): Project[];
  abstract getById(id: string): Project | undefined;
  abstract getByTechnology(tech: string): Project[];
  abstract getFeatured(): Project[];
  abstract getAllTechnologies(): string[];
}
