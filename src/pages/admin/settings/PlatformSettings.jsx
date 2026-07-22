import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PlatformSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('GENERAL');

  const categories = ['GENERAL', 'PRICING', 'SMTP', 'PAYMENT', 'UI'];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/settings');
      const settingsMap = {};
      response.data.forEach(s => {
        if (!settingsMap[s.category]) settingsMap[s.category] = [];
        settingsMap[s.category].push(s);
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      alert('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (category, key, value) => {
    setSettings(prev => {
      const updatedCategory = prev[category].map(item => 
        item.key === key ? { ...item, value } : item
      );
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleSave = async (category) => {
    try {
      setSaving(true);
      const itemsToUpdate = settings[category];
      await api.put('/admin/settings', itemsToUpdate);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64 text-slate-400">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Platform Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Configure platform-level settings by category</p>
      </div>
      
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-slate-800/60 gap-1 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-5 py-3 font-bold text-sm transition-colors rounded-t-xl ${activeTab === cat ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900/40' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-200 mb-5">{activeTab} Settings</h3>
        
        {settings[activeTab] && settings[activeTab].length > 0 ? (
          <div className="space-y-5 max-w-2xl">
            {settings[activeTab].map(setting => (
              <div key={setting.key} className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{setting.key.replace(/_/g, ' ')}</label>
                <div className="flex">
                  <input
                    type="text"
                    value={setting.value || ''}
                    onChange={(e) => handleInputChange(activeTab, setting.key, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">{setting.description}</p>
              </div>
            ))}
            
            <div className="pt-4">
              <button
                onClick={() => handleSave(activeTab)}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all text-sm disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 py-8 text-center">No settings found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default PlatformSettings;
