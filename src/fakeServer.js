import { createServer, Model } from 'miragejs';
import axios from 'axios';
import { sortByNumber, sortByAscii } from '@/inc/sortFunctions';

export default async function () {
  const options = {
    url: 'https://api.spacexdata.com/v5/launches',
    method: 'get',
  };
  const { data } = await axios(options);
  const keywords = data.map((item) => item.name);

  createServer({
    models: {
      launch: Model,
      keyword: Model,
    },
    seeds(server) {
      data.forEach((launch) => {
        server.create('launch', {
          ...launch,
        });
      });
    },
    routes() {
      this.get('/api/launches', (schema, request) => {
        const defaultSettings = {
          prePage: 20,
          page: 1,
          isSuccess: null,
          search: null,
          sortBy: 'date_unix',
          sort: 'asc',
        };
        const { models: launches } = schema.launches.all();
        const {
          page, prePage, search, sortBy, isSuccess, sort,
        } = {
          ...defaultSettings,
          ...request.queryParams,
        };
        let output = [...launches];
        // search filter
        if (search) {
          const find = search;
          const re = new RegExp(find, 'gi');
          output = output.filter((launch) => re.test(launch.name));
        }
        // success filter
        if (isSuccess !== null) {
          output = output.filter((launch) => launch.success === (isSuccess === 'true'));
        }
        // all filter is end, start sorting logic.
        // sort logic
        if (sortBy && sort) {
          if (sortBy === 'date_unix') {
            sortByNumber(output, sortBy);
          } else if (sortBy === 'name') {
            sortByAscii(output, sortBy);
          }
          if (sort === 'desc') {
            output.reverse();
          }
        }
        const total = output.length;
        // items offest
        const offset = (page - 1) * prePage;
        output = output.slice(offset, offset + prePage);

        return {
          total,
          launches: output,
        };
      });
      this.get('/api/suggestions', (schema, request) => {
        const { search } = request.queryParams;
        if (!search) return [];
        const find = search;
        const re = new RegExp(find, 'gi');
        return keywords.filter((keyword) => re.test(keyword)).slice(0, 10);
      });
    },
  });
  return Promise.resolve();
}
