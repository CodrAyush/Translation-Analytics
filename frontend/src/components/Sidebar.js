import React from 'react';
import logActivity from '../utils/logActivity'; // Import the helper function

const Sidebar = () => {
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    logActivity('Changed Language Filter', selectedLanguage);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    logActivity('Changed Date Filter', selectedDate);
  };

  return (
    <aside className="bg-blue-900 text-gray-100 w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4 text-yellow-400">Filters</h2>
      <div>
        <label htmlFor="language" className="block mb-2 text-gray-200">Language:</label>
        <select id="language" className="w-full p-2 mb-4 bg-gray-700 text-gray-100 border border-gray-500 rounded" onChange={handleLanguageChange}>
          <option value="">All</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="es">French</option>
          <option value="es">German</option>
        </select>
      </div>
      <div>
        <label htmlFor="date" className="block mb-2 text-gray-200">Date:</label>
        <input
          type="date"
          id="date"
          className="w-full p-2 mb-4 bg-gray-700 text-gray-100 border border-gray-500 rounded"
          onChange={handleDateChange}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
