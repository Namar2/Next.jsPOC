import clientPromise from '../../../app/Mongo/mongoDbClient';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Xplore');

  if (req.method === 'GET') {
    try {
      const questions = await db.collection('users').find({}).toArray();
      res.status(200).json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 