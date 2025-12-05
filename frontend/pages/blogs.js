import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CrudTable from '../components/CrudTable';
import { withAuth } from '../lib/auth';
import { fetchList, createItem, updateItem, deleteItem } from '../lib/api';

function BlogsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', cover_image: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchList('/blogs');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) await updateItem('/blogs', editing.id, form);
    else await createItem('/blogs', form);
    setForm({ title: '', content: '', cover_image: '' });
    setEditing(null);
    load();
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, content: item.content, cover_image: item.cover_image });
  };

  const onDelete = async (id) => {
    await deleteItem('/blogs', id);
    load();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card space-y-3">
          <h1 className="text-xl font-bold">Blogs</h1>
          <form onSubmit={onSubmit} className="space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full rounded border px-3 py-2" required />
            <input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="Cover Image URL" className="w-full rounded border px-3 py-2" />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Content" className="w-full rounded border px-3 py-2" rows={6} />
            <button className="btn w-full" type="submit">{editing ? 'Update' : 'Add'} Blog</button>
          </form>
        </div>
        <div className="card">
          <CrudTable items={items} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(BlogsPage);
