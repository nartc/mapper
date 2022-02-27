import { createMetadataMap } from '@automapper/pojos';

export interface SnakeJob {
  title: string;
  annual_salary: number;
}

export function createJobSnakeMetadata() {
  createMetadataMap('SnakeJob', {
    title: String,
    annual_salary: Number,
  });
}
