import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CrudTable from '../components/CrudTable';
import { withAuth } from '../lib/auth';
import { fetchList, createItem, updateItem, deleteItem } from '../lib/api';

function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', url: '', image_url: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchList('/projects');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateItem('/projects', editing.id, form);
    } else {
      await createItem('/projects', form);
    }
    setForm({ title: '', description: '', url: '', image_url: '' });
    setEditing(null);
    load();
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, url: item.url, image_url: item.image_url });
  };

  const onDelete = async (id) => {
    await deleteItem('/projects', id);
    load();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card space-y-3">
          <h1 className="text-xl font-bold">Projects</h1>
          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="rounded border px-3 py-2" required />
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL" className="rounded border px-3 py-2" />
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL" className="rounded border px-3 py-2" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded border px-3 py-2 md:col-span-2" rows={3} />
            <button className="btn md:col-span-2" type="submit">{editing ? 'Update' : 'Add'} Project</button>
          </form>
        </div>
        <div className="card">
          <CrudTable items={items} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ProjectsPage);
