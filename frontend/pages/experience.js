import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CrudTable from '../components/CrudTable';
import { withAuth } from '../lib/auth';
import { fetchList, createItem, updateItem, deleteItem } from '../lib/api';

function ExperiencePage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', start_date: '', end_date: '', description: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchList('/experience');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) await updateItem('/experience', editing.id, form);
    else await createItem('/experience', form);
    setForm({ company: '', role: '', start_date: '', end_date: '', description: '' });
    setEditing(null);
    load();
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({
      company: item.company,
      role: item.role,
      start_date: item.start_date,
      end_date: item.end_date || '',
      description: item.description || '',
    });
  };

  const onDelete = async (id) => {
    await deleteItem('/experience', id);
    load();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card space-y-3">
          <h1 className="text-xl font-bold">Experience</h1>
          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="rounded border px-3 py-2" required />
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="rounded border px-3 py-2" required />
            <input value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} type="date" className="rounded border px-3 py-2" />
            <input value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} type="date" className="rounded border px-3 py-2" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded border px-3 py-2 md:col-span-2" rows={3} />
            <button className="btn md:col-span-2" type="submit">{editing ? 'Update' : 'Add'} Experience</button>
          </form>
        </div>
        <div className="card">
          <CrudTable items={items} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ExperiencePage);
