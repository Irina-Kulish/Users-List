import React from 'react';
import { SearchFilterProps } from '../../interface/searchFilterProps';

export const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, sortOrder, onSearchChange, onSortChange, onReset }) => {
  return (
    <div className='w-1/5 min-h-full p-5 flex-shrink-0 mt-3'>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={onSearchChange}
        className="mb-4 bg-white w-full h-12 border-2 p-3 text-black"
      />
      <select
        value={sortOrder}
        onChange={onSortChange}
        className="mb-4 bg-white border-2 w-full p-3 text-black"
      >
        <option 
          value="asc"
        >
          Sort A-Z
        </option>
        <option 
          value="desc"
        >
          Sort Z-A
        </option>
      </select>
      <button 
        onClick={onReset} 
        className=" w-full mt-4 h-12 bg-gray-500 btn"
      >
        Reset
      </button>
    </div>
  );
};

