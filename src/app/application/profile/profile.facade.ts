import { Injectable, inject, computed } from '@angular/core';
import { ProfileRepository } from '../../domain/profile/profile.repository';
import { ProfileRepositoryImpl } from '../../infrastructure/persistence/profile.repository.impl';
import { Profile } from '../../domain/profile/entities/profile.entity';

/**
 * Profile Facade
 * Orchestrates profile-related operations and exposes data to presentation layer
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileFacade {
  private readonly repository: ProfileRepository = inject(ProfileRepositoryImpl);

  readonly profile = computed(() => this.repository.getProfile());

  readonly name = computed(() => this.profile().name);
  readonly title = computed(() => this.profile().title);
  readonly subtitle = computed(() => this.profile().subtitle);
  readonly description = computed(() => this.profile().description);
  readonly email = computed(() => this.profile().email);
  readonly socialLinks = computed(() => this.profile().socialLinks);
  readonly profileImage = computed(() => this.profile().profileImage);
  readonly cvUrl = computed(() => this.profile().cvUrl);
  readonly recentTechnologies = computed(() => this.profile().recentTechnologies);
  readonly initials = computed(() => this.profile().initials);

  getProfile(): Profile {
    return this.repository.getProfile();
  }
}
