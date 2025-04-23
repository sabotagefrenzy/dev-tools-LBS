import React, { useState, useEffect } from 'react';
import NavigationBar from '../NavigationBar';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import GroupModal from './GroupModal';
import useModal from '../../hooks/useModal';

const allTools = [
  { id: 1, title: 'API Tool' },
  { id: 2, title: 'Password Generator' },
];

const EditGroups = () => {
  const [groups, setGroups] = useState({});
  const [groupName, setGroupName] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);

  const modal = useModal();

  // Load groups from localStorage on mount
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('toolGroups'));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  // Save groups to localStorage when groups change
  useEffect(() => {
    localStorage.setItem('toolGroups', JSON.stringify(groups));
  }, [groups]);

  const handleToolSelect = (id) => {
    setSelectedTools((prev) =>
      prev.includes(id) ? prev.filter((toolId) => toolId !== id) : [...prev, id]
    );
  };

  const handleGroupSubmit = () => {
    if (!groupName.trim() || selectedTools.length === 0) return;

    const newGroup = allTools
      .filter((tool) => selectedTools.includes(tool.id))
      .map((tool) => ({
        id: tool.id,
        title: tool.title,
      }));

    setGroups((prevGroups) => {
      const updated = { ...prevGroups };
      if (editingGroup && editingGroup !== groupName) {
        delete updated[editingGroup];
      }
      updated[groupName] = newGroup;
      return updated;
    });

    setGroupName('');
    setSelectedTools([]);
    setEditingGroup(null);
    modal.close();
  };

  const openCreateModal = () => {
    setGroupName('');
    setSelectedTools([]);
    setEditingGroup(null);
    modal.open();
  };

  const openEditModal = (name) => {
    setGroupName(name);
    setSelectedTools(groups[name].map((tool) => tool.id));
    setEditingGroup(name);
    modal.open();
  };

  const handleDeleteGroup = (name) => {
    const updated = { ...groups };
    delete updated[name];
    setGroups(updated);
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-[#10002b] min-h-screen text-[#f7ebff] px-16 py-10 pt-25">
        <div className="flex justify-between items-center mb-8 mt-6">
          <h1 className="text-4xl font-bold">Edit Groups</h1>
          <button
            onClick={openCreateModal}
            className="bg-[#3a2f59] hover:bg-[#4c3f70] transition text-[#f7ebff] px-4 py-2 rounded-lg shadow"
          >
            + Create New Group
          </button>
        </div>

        {Object.entries(groups).length === 0 ? (
          <p className="text-gray-400 text-xl text-center">No groups created yet.</p>
        ) : (
          Object.entries(groups).map(([name, tools]) => (
            <div key={name} className="mb-10">
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-xl font-semibold text-[#c3b1ff]">{name}</h2>
                <button onClick={() => openEditModal(name)}>
                  <FiEdit2 className="text-[#c3b1ff] hover:text-white transition" />
                </button>
                <button onClick={() => handleDeleteGroup(name)}>
                  <FiTrash2 className="text-red-400 hover:text-red-600 transition" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-[#3a2f59] p-4 rounded-xl shadow-md hover:shadow-lg transition text-center"
                  >
                    <h3 className="text-2xl font-bold text-[#00c8a0]">{tool.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <GroupModal
          isOpen={modal.isOpen}
          groupName={groupName}
          selectedTools={selectedTools}
          onClose={modal.close}
          onToolSelect={handleToolSelect}
          onGroupNameChange={(e) => setGroupName(e.target.value)}
          onSubmit={handleGroupSubmit}
          allTools={allTools}
          isEditing={!!editingGroup}
        />
      </div>
    </div>
  );
};

export default EditGroups;
