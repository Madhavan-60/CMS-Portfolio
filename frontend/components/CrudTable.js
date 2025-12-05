// Simple CRUD table renderer for list of items
const CrudTable = ({ items = [], onEdit, onDelete }) => {
  if (!items.length) return <div className="text-sm text-slate-500">No data yet.</div>;
  const columns = Object.keys(items[0]).filter((k) => k !== 'id');
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border-b px-3 py-2 text-left font-semibold text-slate-600">{col}</th>
            ))}
            <th className="border-b px-3 py-2 text-left font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              {columns.map((col) => (
                <td key={col} className="px-3 py-2">{String(item[col] ?? '')}</td>
              ))}
              <td className="px-3 py-2 space-x-2">
                <button className="text-blue-600" onClick={() => onEdit(item)}>Edit</button>
                <button className="text-red-600" onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
