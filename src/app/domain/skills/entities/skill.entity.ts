/**
 * Skill Entity
 * Represents a skill category with items
 */
export class Skill {
  constructor(
    public readonly id: string,
    public readonly category: string,
    public readonly icon: string,
    public readonly items: string[]
  ) {}

  get itemCount(): number {
    return this.items.length;
  }

  hasItem(item: string): boolean {
    return this.items.some(
      i => i.toLowerCase() === item.toLowerCase()
    );
  }
}
