import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { withAuth } from '../lib/auth';
import { fetchList, getAbout, fetchMessages } from '../lib/api';

function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, skills: 0, messages: 0 });
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [projects, blogs, skills, messages, aboutData] = await Promise.all([
        fetchList('/projects'),
        fetchList('/blogs'),
        fetchList('/skills'),
        fetchMessages().catch(() => []),
        getAbout(),
      ]);
      setStats({ projects: projects.length, blogs: blogs.length, skills: skills.length, messages: messages.length });
      setAbout(aboutData);
    };
    load();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Projects', value: stats.projects },
            { label: 'Blogs', value: stats.blogs },
            { label: 'Skills', value: stats.skills },
            { label: 'Messages', value: stats.messages },
          ].map((card) => (
            <div key={card.label} className="card">
              <div className="text-sm text-slate-500">{card.label}</div>
              <div className="text-3xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="mb-2 text-lg font-semibold">About preview</div>
          <div className="text-sm text-slate-700 whitespace-pre-line">{about?.content || 'No about content yet.'}</div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Dashboard);
