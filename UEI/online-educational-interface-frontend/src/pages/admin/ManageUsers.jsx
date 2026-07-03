import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { adminAPI } from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    adminAPI.getAllUsers().then(r => { setUsers(r.data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const openCreate = () => {
    setEditUser(null);
    setForm({ name: '', email: '', password: '', role: 'STUDENT' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (u) => {
    setEditUser(u);
    setForm({ name: u.name, email: u.email, password: '', role: u.role });
    setError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    setError('');
    try {
      if (editUser) {
        await adminAPI.updateUser(editUser.id, form);
      } else {
        await adminAPI.createUser(form);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await adminAPI.deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const roleBadge = (role) => {
    const map = { ADMIN: 'danger', TEACHER: 'purple', STUDENT: 'primary' };
    const cls = role === 'TEACHER' ? 'badge text-white' : 'badge';
    const style = role === 'TEACHER' ? { background: '#7c3aed' } : {};
    return <span className={`${cls} bg-${map[role] || 'secondary'}`} style={style}>{role}</span>;
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Manage Users">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          className="form-control w-auto" placeholder="Search users..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ minWidth: 250 }}
        />
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="bi bi-plus-lg me-1"></i> Add User
        </button>
      </div>

      <div className="table-custom">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4"><div className="spinner-border text-primary"></div></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-muted py-4">No users found</td></tr>
            ) : filtered.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td>{roleBadge(u.role)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(u)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editUser ? 'Edit User' : 'Add User'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                {['name', 'email'].map(field => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input className="form-control" value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })} />
                  </div>
                ))}
                {!editUser && (
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })} />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageUsers;
