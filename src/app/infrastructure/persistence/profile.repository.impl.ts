import { Injectable } from '@angular/core';
import { ProfileRepository } from '../../domain/profile/profile.repository';
import { Profile } from '../../domain/profile/entities/profile.entity';
import { PROFILE_DATA } from '../data/profile.data';

/**
 * Profile Repository Implementation (Adapter)
 * Provides profile data from static data source
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileRepositoryImpl extends ProfileRepository {
  getProfile(): Profile {
    return PROFILE_DATA;
  }
}
