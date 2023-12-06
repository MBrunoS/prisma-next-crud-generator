import { getSampleDMMF } from './__fixtures__/getSampleDMMF'

test('generate pages', async () => {
  const sampleDMMF = await getSampleDMMF()

  expect(sampleDMMF.datamodel.models[0].name).toBe('User')
})
