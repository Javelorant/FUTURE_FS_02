import React, { useState, useEffect, useContext } from 'react';
import { Users, Briefcase, Activity, Plus, Search, Edit2, Trash2, DollarSign, Mail, Phone, Calendar, Tag, LogOut } from 'lucide-react';
import { contactAPI, dealAPI, activityAPI } from './services/api';
import { AuthContext } from './auth/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';
import './index.css';

const MiniCRM = () => {
  const { user, logout } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [contactsData, dealsData, activitiesData] = await Promise.all([
        contactAPI.getAll(),
        dealAPI.getAll(),
        activityAPI.getAll()
      ]);
      
      setContacts(contactsData);
      setDeals(dealsData);
      setActivities(activitiesData);
    } catch (err) {
      setError('Failed to load data. Please make sure the server is running.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSaveContact = async (contactData) => {
    try {
      if (editingItem) {
        const updated = await contactAPI.update(editingItem._id, contactData);
        setContacts(contacts.map(c => c._id === updated._id ? updated : c));
      } else {
        const created = await contactAPI.create(contactData);
        setContacts([created, ...contacts]);
      }
      closeModal();
    } catch (err) {
      alert('Failed to save contact: ' + err.message);
    }
  };

  const handleSaveDeal = async (dealData) => {
    try {
      if (editingItem) {
        const updated = await dealAPI.update(editingItem._id, dealData);
        setDeals(deals.map(d => d._id === updated._id ? updated : d));
      } else {
        const created = await dealAPI.create(dealData);
        setDeals([created, ...deals]);
      }
      closeModal();
    } catch (err) {
      alert('Failed to save deal: ' + err.message);
    }
  };

  const handleSaveActivity = async (activityData) => {
    try {
      if (editingItem) {
        const updated = await activityAPI.update(editingItem._id, activityData);
        setActivities(activities.map(a => a._id === updated._id ? updated : a));
      } else {
        const created = await activityAPI.create(activityData);
        setActivities([created, ...activities]);
      }
      closeModal();
    } catch (err) {
      alert('Failed to save activity: ' + err.message);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id);
        setContacts(contacts.filter(c => c._id !== id));
      } catch (err) {
        alert('Failed to delete contact: ' + err.message);
      }
    }
  };

  const deleteDeal = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealAPI.delete(id);
        setDeals(deals.filter(d => d._id !== id));
      } catch (err) {
        alert('Failed to delete deal: ' + err.message);
      }
    }
  };

  const deleteActivity = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await activityAPI.delete(id);
        setActivities(activities.filter(a => a._id !== id));
      } catch (err) {
        alert('Failed to delete activity: ' + err.message);
      }
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeals = deals.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActivities = activities.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show login/register if not authenticated
  if (!user) {
    return (
      <div className="app-container">
        <div className="max-w-container">
          <div className="auth-container">
            <h1 className="auth-title">Mini CRM</h1>
            {showRegister ? (
              <div>
                <Register />
                <p className="auth-switch">
                  Already have an account?{' '}
                  <button onClick={() => setShowRegister(false)} className="link-button">
                    Login here
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <Login />
                <p className="auth-switch">
                  Don't have an account?{' '}
                  <button onClick={() => setShowRegister(true)} className="link-button">
                    Register here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="app-container">
        <div className="max-w-container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="max-w-container">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={loadData} className="retry-button">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="max-w-container">
        <div className="header">
          <div>
            <h1>Mini CRM</h1>
            <p>Manage your contacts, deals, and activities</p>
          </div>
          <div className="user-info">
            <span className="welcome-text">Welcome, {user.name}!</span>
            <button onClick={logout} className="logout-button">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p>Total Contacts</p>
                <p>{contacts.length}</p>
              </div>
              <Users className="stat-card-icon blue" size={40} />
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p>Active Deals</p>
                <p>{deals.length}</p>
              </div>
              <Briefcase className="stat-card-icon green" size={40} />
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p>Total Value</p>
                <p>${deals.reduce((sum, d) => sum + (d.value || 0), 0).toLocaleString()}</p>
              </div>
              <DollarSign className="stat-card-icon purple" size={40} />
            </div>
          </div>
        </div>

        <div className="main-card">
          <div className="tabs-border">
            <div className="tabs-container">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
              >
                <Users size={20} className="tab-icon" />
                Contacts
              </button>
              <button
                onClick={() => setActiveTab('deals')}
                className={`tab-button ${activeTab === 'deals' ? 'active' : ''}`}
              >
                <Briefcase size={20} className="tab-icon" />
                Deals
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
              >
                <Activity size={20} className="tab-icon" />
                Activities
              </button>
            </div>
          </div>

          <div className="search-add-section">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button onClick={() => openModal(activeTab)} className="add-button">
              <Plus size={20} className="add-button-icon" />
              Add {activeTab.slice(0, -1)}
            </button>
          </div>

          <div className="content-area">
            {activeTab === 'contacts' && <ContactsList contacts={filteredContacts} onEdit={(c) => openModal('contacts', c)} onDelete={deleteContact} />}
            {activeTab === 'deals' && <DealsList deals={filteredDeals} onEdit={(d) => openModal('deals', d)} onDelete={deleteDeal} />}
            {activeTab === 'activities' && <ActivitiesList activities={filteredActivities} onEdit={(a) => openModal('activities', a)} onDelete={deleteActivity} />}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={closeModal}
          onSave={(item) => {
            if (modalType === 'contacts') {
              handleSaveContact(item);
            } else if (modalType === 'deals') {
              handleSaveDeal(item);
            } else if (modalType === 'activities') {
              handleSaveActivity(item);
            }
          }}
        />
      )}
    </div>
  );
};

const ContactsList = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return <div className="empty-state">No contacts found. Add your first contact!</div>;
  }

  return (
    <div className="contacts-grid">
      {contacts.map(contact => (
        <div key={contact._id} className="contact-card">
          <div className="contact-header">
            <h3 className="contact-name">{contact.name}</h3>
            <div className="contact-actions">
              <button onClick={() => onEdit(contact)} className="icon-button edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => onDelete(contact._id)} className="icon-button delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p className="contact-company">{contact.company}</p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <Mail size={14} className="contact-detail-icon" />
              {contact.email}
            </div>
            <div className="contact-detail-item">
              <Phone size={14} className="contact-detail-icon" />
              {contact.phone}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DealsList = ({ deals, onEdit, onDelete }) => {
  if (deals.length === 0) {
    return <div className="empty-state">No deals found. Add your first deal!</div>;
  }

  const getStatusClass = (status) => {
    const classes = {
      'Prospecting': 'prospecting',
      'Qualification': 'qualification',
      'Proposal': 'proposal',
      'Negotiation': 'negotiation',
      'Closed Won': 'closed-won',
      'Closed Lost': 'closed-lost'
    };
    return classes[status] || '';
  };

  return (
    <div className="deals-list">
      {deals.map(deal => (
        <div key={deal._id} className="deal-card">
          <div className="deal-content">
            <div className="deal-info">
              <div className="deal-title-row">
                <h3 className="deal-title">{deal.title}</h3>
                <span className={`status-badge ${getStatusClass(deal.status)}`}>
                  {deal.status}
                </span>
              </div>
              <p className="deal-company">{deal.company}</p>
              <div className="deal-meta">
                <div className="deal-meta-item">
                  <DollarSign size={14} className="deal-meta-icon" />
                  ${deal.value.toLocaleString()}
                </div>
                <div className="deal-meta-item">
                  <Calendar size={14} className="deal-meta-icon" />
                  {deal.closeDate}
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <button onClick={() => onEdit(deal)} className="icon-button edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => onDelete(deal._id)} className="icon-button delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ActivitiesList = ({ activities, onEdit, onDelete }) => {
  if (activities.length === 0) {
    return <div className="empty-state">No activities found. Add your first activity!</div>;
  }

  const getTypeClass = (type) => {
    const classes = {
      'Call': 'call',
      'Email': 'email',
      'Meeting': 'meeting',
      'Task': 'task',
      'Note': 'note'
    };
    return classes[type] || '';
  };

  return (
    <div className="activities-list">
      {activities.map(activity => (
        <div key={activity._id} className="activity-card">
          <div className="activity-content">
            <div className="activity-info">
              <div className="activity-title-row">
                <h3 className="activity-title">{activity.title}</h3>
                <span className={`type-badge ${getTypeClass(activity.type)}`}>
                  {activity.type}
                </span>
              </div>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-meta">
                <div className="activity-meta-item">
                  <Calendar size={14} className="activity-meta-icon" />
                  {activity.date}
                </div>
                <div className="activity-meta-item">
                  <Tag size={14} className="activity-meta-icon" />
                  {activity.relatedTo}
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <button onClick={() => onEdit(activity)} className="icon-button edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => onDelete(activity._id)} className="icon-button delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Modal = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    item || (type === 'contacts'
      ? { name: '', email: '', phone: '', company: '' }
      : type === 'deals'
      ? { title: '', company: '', value: '', status: 'Prospecting', closeDate: '' }
      : { title: '', description: '', type: 'Call', date: '', relatedTo: '' })
  );

  const handleSave = () => {
    if (type === 'contacts') {
      if (!formData.name || !formData.email || !formData.phone || !formData.company) {
        alert('Please fill in all fields');
        return;
      }
    } else if (type === 'deals') {
      if (!formData.title || !formData.company || !formData.value || !formData.closeDate) {
        alert('Please fill in all fields');
        return;
      }
    } else if (type === 'activities') {
      if (!formData.title || !formData.description || !formData.date || !formData.relatedTo) {
        alert('Please fill in all fields');
        return;
      }
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {item ? 'Edit' : 'Add'} {type.slice(0, -1)}
        </h2>
        <div className="modal-form">
          {type === 'contacts' && (
            <>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>
            </>
          )}

          {type === 'deals' && (
            <>
              <div className="form-group">
                <label className="form-label">Deal Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Value ($)</label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option>Prospecting</option>
                  <option>Qualification</option>
                  <option>Proposal</option>
                  <option>Negotiation</option>
                  <option>Closed Won</option>
                  <option>Closed Lost</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Expected Close Date</label>
                <input
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                  className="form-input"
                />
              </div>
            </>
          )}

          {type === 'activities' && (
            <>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="form-select"
                >
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                  <option>Task</option>
                  <option>Note</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Related To</label>
                <input
                  type="text"
                  value={formData.relatedTo}
                  onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                  className="form-input"
                  placeholder="Contact or Deal name"
                />
              </div>
            </>
          )}

          <div className="modal-actions">
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleSave} className="save-button">
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCRM;