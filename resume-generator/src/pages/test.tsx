import { NextPage } from 'next';
import useSWR from 'swr';

const fetcher = async (query: string) => {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  return json.data;
};

const query = `
    {
        candidate {
            name {
                first
            }
        }
        jobs {
            title
        }
    }
`;

const Test: NextPage = () => {
  const { data, error } = useSWR(query, fetcher);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Test;
