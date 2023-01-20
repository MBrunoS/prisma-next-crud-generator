export const simpleRoutes = (modelName: string) => {
  const modelNameLower = modelName.toLowerCase();

  return `
    import { NextApiRequest, NextApiResponse } from 'next'
    import { prisma } from '../../../lib/prisma'

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      const { method } = req;

      if (method === 'GET') {
        const ${modelNameLower}s = await prisma.${modelNameLower}.findMany();
        return res.status(200).json(${modelNameLower}s);
      } else if (method === 'POST') {
        const data = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
        const ${modelNameLower} = await prisma.${modelNameLower}.create({
          data
        });
        return res.status(201).json(${modelNameLower});
      }

      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(\`Method \${method} Not Allowed\`);
    }
    `;
};

export const dynamicRoutes = (modelName: string) => {
  const modelNameLower = modelName.toLowerCase();

  return `
    import { NextApiRequest, NextApiResponse } from 'next'
    import { prisma } from '../../../lib/prisma'

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      const { method } = req;
      const id = req.query.id as string;

      if (method === 'GET') {
        const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
          where: { id }
        });
        return res.status(200).json(${modelNameLower});
      } else if (method === 'PUT') {
        try {
          const data = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
          const ${modelNameLower} = await prisma.${modelNameLower}.update({
            where: { id },
            data
          });
          return res.status(201).json(${modelNameLower});
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      } else if (method === 'DELETE') {        
        try {
          const ${modelNameLower} = await prisma.${modelNameLower}.delete({
            where: { id }
          });
          return res.status(200).json(${modelNameLower});
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      }

      res.setHeader("Allow", ["GET", "PUT, DELETE"]);
      return res.status(405).end(\`Method \${method} Not Allowed\`);
    }
    `;
};
