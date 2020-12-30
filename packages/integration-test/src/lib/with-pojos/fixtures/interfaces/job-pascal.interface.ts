import { createMetadataMap } from '@automapper/pojos';

export interface PascalJob {
  Title: string;
  AnnualSalary: number;
}

export function createJobPascalMetadata() {
  createMetadataMap('PascalJob', {
    Title: String,
    AnnualSalary: Number,
  });
}
