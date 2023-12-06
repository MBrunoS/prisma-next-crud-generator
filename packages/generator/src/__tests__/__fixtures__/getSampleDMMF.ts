import { getDMMF, getSchema } from '@prisma/internals'
import path from 'path'

export const getSampleDMMF = async () => {
  const samplePrismaSchema = await getSchema(
    path.join(__dirname, './sample.prisma'),
  )

  return getDMMF({
    datamodel: samplePrismaSchema,
  })
}
