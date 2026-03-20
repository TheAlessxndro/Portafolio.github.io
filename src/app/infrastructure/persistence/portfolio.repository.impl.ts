import { Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/portfolio/portfolio.repository';
import { Project } from '../../domain/portfolio/entities/project.entity';
import { PROJECTS_DATA } from '../data/projects.data';

/**
 * Portfolio Repository Implementation (Adapter)
 * Provides portfolio/projects data from static data source
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioRepositoryImpl extends PortfolioRepository {
  private readonly projects: Project[] = PROJECTS_DATA;

  getAll(): Project[] {
    return [...this.projects];
  }

  getById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  getByTechnology(tech: string): Project[] {
    return this.projects.filter(project => project.hasTechnology(tech));
  }

  getFeatured(): Project[] {
    return this.projects.filter(project => project.featured);
  }

  getAllTechnologies(): string[] {
    const techSet = new Set<string>();
    this.projects.forEach(project => {
      project.technologyNames.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }
}
