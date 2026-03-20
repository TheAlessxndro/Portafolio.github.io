import { Injectable } from '@angular/core';
import { SkillsRepository } from '../../domain/skills/skills.repository';
import { Skill } from '../../domain/skills/entities/skill.entity';
import { SKILLS_DATA } from '../data/skills.data';

/**
 * Skills Repository Implementation (Adapter)
 * Provides skills data from static data source
 */
@Injectable({
  providedIn: 'root'
})
export class SkillsRepositoryImpl extends SkillsRepository {
  private readonly skills: Skill[] = SKILLS_DATA;

  getAll(): Skill[] {
    return [...this.skills];
  }

  getByCategory(category: string): Skill | undefined {
    return this.skills.find(
      skill => skill.category.toLowerCase() === category.toLowerCase()
    );
  }
}
