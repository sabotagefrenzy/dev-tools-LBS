import React from "react";
import { fieldTypes } from "./store";

const FieldComponent = ({ id, name, type, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-2">
      <input
        type="text"
        value={name}
        className="p-2 rounded-lg border border-[#3a2f59] text-[#f7ebff] bg-[#3a2f59] focus:outline-none"
        onChange={(e) => onChange(id, "name", e.target.value)}
      />
      <select
        className="p-2 rounded-lg border border-[#3a2f59] text-[#f7ebff] bg-[#3a2f59] focus:outline-none"
        value={type}
        onChange={(e) => onChange(id, "type", e.target.value)}
      >
        {fieldTypes.map((ft) => (
          <option key={ft} value={ft}>
            {ft}
          </option>
        ))}
      </select>
      <button
        onClick={() => onRemove(id)}
        className="text-[#00c8a0] hover:text-[#00b393] transition-colors duration-200 "
      >
        🗑️
      </button>
    </div>
  );
};

export default FieldComponent;
