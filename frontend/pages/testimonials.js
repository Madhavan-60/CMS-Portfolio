import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CrudTable from '../components/CrudTable';
import { withAuth } from '../lib/auth';
import { fetchList, createItem, updateItem, deleteItem } from '../lib/api';

function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ author: '', role: '', message: '', avatar_url: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchList('/testimonials');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) await updateItem('/testimonials', editing.id, form);
    else await createItem('/testimonials', form);
    setForm({ author: '', role: '', message: '', avatar_url: '' });
    setEditing(null);
    load();
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ author: item.author, role: item.role, message: item.message, avatar_url: item.avatar_url });
  };

  const onDelete = async (id) => {
    await deleteItem('/testimonials', id);
    load();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card space-y-3">
          <h1 className="text-xl font-bold">Testimonials</h1>
          <form onSubmit={onSubmit} className="space-y-3">
            <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" className="w-full rounded border px-3 py-2" required />
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="w-full rounded border px-3 py-2" />
            <input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="Avatar URL" className="w-full rounded border px-3 py-2" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" className="w-full rounded border px-3 py-2" rows={4} />
            <button className="btn w-full" type="submit">{editing ? 'Update' : 'Add'} Testimonial</button>
          </form>
        </div>
        <div className="card">
          <CrudTable items={items} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(TestimonialsPage);
