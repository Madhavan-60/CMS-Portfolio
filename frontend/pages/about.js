import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { withAuth } from '../lib/auth';
import { getAbout, saveAbout } from '../lib/api';

function AboutPage() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getAbout().then((data) => setContent(data?.content || ''));
  }, []);

  const onSave = async () => {
    setStatus('Saving...');
    await saveAbout({ content });
    setStatus('Saved');
    setTimeout(() => setStatus(''), 1500);
  };

  return (
    <Layout>
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">About</h1>
          <button className="btn" onClick={onSave}>Save</button>
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full rounded border p-3" />
        {status && <div className="text-sm text-green-600">{status}</div>}
      </div>
    </Layout>
  );
}

export default withAuth(AboutPage);
