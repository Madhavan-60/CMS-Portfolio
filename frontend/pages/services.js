import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CrudTable from '../components/CrudTable';
import { withAuth } from '../lib/auth';
import { fetchList, createItem, updateItem, deleteItem } from '../lib/api';

function ServicesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchList('/services');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) await updateItem('/services', editing.id, form);
    else await createItem('/services', form);
    setForm({ title: '', description: '', price: '' });
    setEditing(null);
    load();
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, price: item.price || '' });
  };

  const onDelete = async (id) => {
    await deleteItem('/services', id);
    load();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card space-y-3">
          <h1 className="text-xl font-bold">Services</h1>
          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="rounded border px-3 py-2" required />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="rounded border px-3 py-2" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded border px-3 py-2 md:col-span-3" rows={3} />
            <button className="btn md:col-span-3" type="submit">{editing ? 'Update' : 'Add'} Service</button>
          </form>
        </div>
        <div className="card">
          <CrudTable items={items} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ServicesPage);
