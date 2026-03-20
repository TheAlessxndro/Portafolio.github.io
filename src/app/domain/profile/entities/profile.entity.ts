import { Email } from '../value-objects/email.vo';
import { SocialLink } from '../value-objects/social-link.vo';

/**
 * Profile Entity
 * Represents the developer's profile information
 */
export class Profile {
  constructor(
    public readonly name: string,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly description: string,
    public readonly email: Email,
    public readonly socialLinks: SocialLink[],
    public readonly profileImage: string,
    public readonly cvUrl?: string,
    public readonly recentTechnologies: string[] = []
  ) {}

  get firstName(): string {
    return this.name.split(' ')[0];
  }

  get lastName(): string {
    const parts = this.name.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }

  get initials(): string {
    return this.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  getSocialLink(platform: string): SocialLink | undefined {
    return this.socialLinks.find(link => link.platform === platform);
  }

  hasCV(): boolean {
    return !!this.cvUrl;
  }
}
