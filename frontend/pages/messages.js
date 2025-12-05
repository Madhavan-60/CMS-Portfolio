import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { withAuth } from '../lib/auth';
import { fetchMessages } from '../lib/api';

function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then(setMessages);
  }, []);

  return (
    <Layout>
      <div className="card space-y-4">
        <h1 className="text-xl font-bold">Contact Messages</h1>
        {!messages.length && <div className="text-sm text-slate-500">No messages yet.</div>}
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded border border-slate-200 p-3">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{msg.name} ({msg.email})</span>
                <span>{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <p className="mt-2 whitespace-pre-line text-slate-700">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(MessagesPage);
