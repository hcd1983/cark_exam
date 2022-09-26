import { createServer } from 'miragejs';
import axios from 'axios';

export default async function () {
  const options = {
    url: 'https://api.spacexdata.com/v5/launches',
    method: 'get',
  };
  const { data } = await axios(options);
  createServer({
    routes() {
      this.get('/api/users', () => [
        { id: '1', name: 'Luke' },
        { id: '2', name: 'Leia' },
        { id: '3', name: 'Anakin' },
      ]);

      this.get('/api/launches', async () => data);
    },
  });
  return Promise.resolve();
}
