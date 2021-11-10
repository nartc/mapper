import type { MappingProfile } from '@automapper/core';
import { Doctor, DoctorDto } from '../models/doctor';

export const doctorProfile: MappingProfile = (mapper) => {
  mapper.createMap(Doctor, DoctorDto);
};
