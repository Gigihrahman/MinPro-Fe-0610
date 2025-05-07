
/**
 * Type definition for updating organizer profile
 */
export interface UpdateOrganizerProfile {
  // User data
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string;

  // Organizer specific data
  name?: string;
  organizerPhoneNumber?: string;
  organizerProfilePicture?: string;
  npwp?: string;
  bankName?: string;
  norek?: string;
}
