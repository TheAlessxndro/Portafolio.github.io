/**
 * Social Link Value Object
 * Represents a social media link with platform type
 */
export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'instagram' | 'website';

export class SocialLink {
  constructor(
    public readonly platform: SocialPlatform,
    public readonly url: string,
    public readonly username?: string
  ) {
    if (!this.isValidUrl(url)) {
      throw new Error(`Invalid URL: ${url}`);
    }
  }

  get icon(): string {
    const icons: Record<SocialPlatform, string> = {
      github: 'fab fa-github',
      linkedin: 'fab fa-linkedin-in',
      twitter: 'fab fa-twitter',
      instagram: 'fab fa-instagram',
      website: 'fas fa-globe'
    };
    return icons[this.platform];
  }

  get label(): string {
    const labels: Record<SocialPlatform, string> = {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      instagram: 'Instagram',
      website: 'Website'
    };
    return labels[this.platform];
  }

  equals(other: SocialLink): boolean {
    return this.platform === other.platform && this.url === other.url;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
