import clientPromise from '../../../app/Mongo/mongoDbClient';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Xplore'); // Ensure this matches your database name

  if (req.method === 'GET') {
    try {
      const { id } = req.query; // Extract ID from the query

      // Validate the ID format
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      // Fetch the question by ID
      const question = await db
        .collection('test_questions')
        .findOne({ _id: new ObjectId(id) });

      if (!question) {
        res.status(404).json({ error: 'Question not found' });
        return;
      }

      res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      res.status(500).json({ error: 'Failed to fetch the question' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}