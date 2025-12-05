import { useState } from 'react';
import Layout from '../components/Layout';
import { withAuth } from '../lib/auth';
import { uploadImage } from '../lib/api';

function MediaPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus('Uploading...');
    try {
      const response = await uploadImage(file);
      setUrl(response.url);
      setStatus('Uploaded successfully');
    } catch (err) {
      setStatus(err?.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <Layout>
      <div className="card space-y-4">
        <h1 className="text-xl font-bold">Media Upload</h1>
        <form onSubmit={onUpload} className="space-y-3">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
          <button className="btn" type="submit" disabled={!file}>Upload</button>
        </form>
        {status && <div className="text-sm text-slate-600">{status}</div>}
        {url && (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Public URL</div>
            <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{url}</a>
            <img src={url} alt="uploaded" className="max-h-64 rounded" />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default withAuth(MediaPage);
