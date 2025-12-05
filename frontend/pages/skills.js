import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CrudTable from '../components/CrudTable';
import { withAuth } from '../lib/auth';
import { fetchList, createItem, updateItem, deleteItem } from '../lib/api';

function SkillsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', level: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const data = await fetchList('/skills');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateItem('/skills', editing.id, form);
    } else {
      await createItem('/skills', form);
    }
    setForm({ name: '', level: '' });
    setEditing(null);
    load();
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, level: item.level });
  };

  const onDelete = async (id) => {
    await deleteItem('/skills', id);
    load();
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="card">
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="rounded border px-3 py-2" required />
            <input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} placeholder="Level" className="rounded border px-3 py-2" />
            <button className="btn" type="submit">{editing ? 'Update' : 'Add'} Skill</button>
          </form>
        </div>
        <div className="card">
          <CrudTable items={items} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(SkillsPage);
