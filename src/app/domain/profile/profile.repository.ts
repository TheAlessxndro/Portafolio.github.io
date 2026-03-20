import { Profile } from './entities/profile.entity';

/**
 * Profile Repository Interface (Port)
 * Defines the contract for accessing profile data
 */
export abstract class ProfileRepository {
  abstract getProfile(): Profile;
}
