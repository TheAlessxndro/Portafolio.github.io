import { Injectable, inject, computed } from '@angular/core';
import { SkillsRepository } from '../../domain/skills/skills.repository';
import { SkillsRepositoryImpl } from '../../infrastructure/persistence/skills.repository.impl';
import { Skill } from '../../domain/skills/entities/skill.entity';

/**
 * Skills Facade
 * Orchestrates skills-related operations
 */
@Injectable({
  providedIn: 'root'
})
export class SkillsFacade {
  private readonly repository: SkillsRepository = inject(SkillsRepositoryImpl);

  readonly skills = computed(() => this.repository.getAll());

  readonly skillCount = computed(() => this.skills().length);

  readonly allItems = computed(() =>
    this.skills().flatMap(skill => skill.items)
  );

  getByCategory(category: string): Skill | undefined {
    return this.repository.getByCategory(category);
  }
}
