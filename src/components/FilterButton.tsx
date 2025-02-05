import React, { useState } from 'react';
import {Filter} from "lucide-react";

const FilterButton = ({ categories, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        onFilterChange(updatedCategories);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                // className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                <Filter/>
            </button>
            {isOpen && (
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {categories.map(category => (
                            <label key={category} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterButton;
