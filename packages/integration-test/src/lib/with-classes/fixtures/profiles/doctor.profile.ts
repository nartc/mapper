import type { MappingProfile } from '@automapper/types';
import { Doctor, DoctorDto } from '../models/doctor';

export const doctorProfile: MappingProfile = (mapper) => {
  mapper.createMap(Doctor, DoctorDto);
};
