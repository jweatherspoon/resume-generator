import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import BooleanEditor from '../components/editors/boolean-editor';
import DateEditor from '../components/editors/date-editor';
import NumericEditor from '../components/editors/numeric-editor';
import TextEditor from '../components/editors/text-editor';

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
  const [d, sd] = useState(false);
  const [n, sn] = useState(0);
  const [ss, sss] = useState('');
  const [ms, sms] = useState('');
  const [dv, sdv] = useState(new Date());
  const { data, error } = useSWR(query, fetcher);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <BooleanEditor value={d} setValue={sd} />
      <NumericEditor value={n} setValue={sn} />
      <TextEditor value={ss} setValue={sss} />
      <TextEditor value={ms} setValue={sms} inputProps={{ multiline: true }} />
      <DateEditor value={dv} setValue={sdv} />
    </div>
  );
};

export default Test;
