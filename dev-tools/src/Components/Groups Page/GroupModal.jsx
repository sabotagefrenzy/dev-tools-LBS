// src/components/GroupModal.jsx
import React from 'react';

const GroupModal = ({
  isOpen,
  groupName,
  selectedTools,
  onClose,
  onToolSelect,
  onGroupNameChange,
  onSubmit,
  allTools,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#1c1235] p-6 rounded-lg w-[90%] max-w-lg text-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Group' : 'Create New Group'}
        </h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={onGroupNameChange}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2b1f4a] text-white focus:outline-none"
        />

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Select Tools</h3>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {allTools.map((tool) => (
              <label key={tool.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTools.includes(tool.id)}
                  onChange={() => onToolSelect(tool.id)}
                />
                <span>{tool.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button className="bg-gray-600 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-[#00c8a0] px-4 py-2 rounded text-black font-semibold"
            onClick={onSubmit}
          >
            {isEditing ? 'Update Group' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
