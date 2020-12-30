import { createMetadataMap } from '@automapper/pojos';

export interface Job {
  title: string;
  annualSalary: number;
}

export function createJobMetadata() {
  createMetadataMap('Job', {
    title: String,
    annualSalary: Number,
  });
}
