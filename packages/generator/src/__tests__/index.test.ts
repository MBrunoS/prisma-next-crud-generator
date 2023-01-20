import fs from 'fs';
import { generatePagesForModels } from '../templates/index';
import { getSampleDMMF } from './__fixtures__/getSampleDMMF';

// jest.mock('fs');

describe('generatePagesForModels', () => {
  it('should have only one model', async () => {
    const sampleDMMF = await getSampleDMMF();
    const numOfModels = sampleDMMF.datamodel.models.length;
    expect(numOfModels).toBe(1);
  });
});
