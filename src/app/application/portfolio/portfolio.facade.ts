import { Injectable, inject, signal, computed } from '@angular/core';
import { PortfolioRepository } from '../../domain/portfolio/portfolio.repository';
import { PortfolioRepositoryImpl } from '../../infrastructure/persistence/portfolio.repository.impl';
import { Project } from '../../domain/portfolio/entities/project.entity';

/**
 * Portfolio Facade
 * Orchestrates portfolio-related operations with filtering support
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioFacade {
  private readonly repository: PortfolioRepository = inject(PortfolioRepositoryImpl);

  // State
  private readonly _selectedTech = signal<string | null>(null);
  private readonly _allProjects = signal<Project[]>(this.repository.getAll());

  // Computed values
  readonly selectedTech = this._selectedTech.asReadonly();

  readonly projects = computed(() => {
    const tech = this._selectedTech();
    if (!tech) {
      return this._allProjects();
    }
    return this._allProjects().filter(project => project.hasTechnology(tech));
  });

  readonly featuredProjects = computed(() =>
    this._allProjects().filter(project => project.featured)
  );

  readonly technologies = computed(() =>
    this.repository.getAllTechnologies()
  );

  readonly projectCount = computed(() => this.projects().length);

  readonly hasFilter = computed(() => this._selectedTech() !== null);

  // Actions
  filterByTechnology(tech: string | null): void {
    this._selectedTech.set(tech);
  }

  clearFilter(): void {
    this._selectedTech.set(null);
  }

  toggleTechnology(tech: string): void {
    if (this._selectedTech() === tech) {
      this.clearFilter();
    } else {
      this.filterByTechnology(tech);
    }
  }

  getProjectById(id: string): Project | undefined {
    return this.repository.getById(id);
  }
}
