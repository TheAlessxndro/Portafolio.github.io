import { Skill } from './entities/skill.entity';

/**
 * Skills Repository Interface (Port)
 * Defines the contract for accessing skills data
 */
export abstract class SkillsRepository {
  abstract getAll(): Skill[];
  abstract getByCategory(category: string): Skill | undefined;
}
