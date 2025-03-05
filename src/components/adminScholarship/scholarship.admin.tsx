"use client";

import React, { useState } from 'react';
import { Trash2,Plus } from "lucide-react";


export default function ScholarshipForm() {
  // Basic state for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [criteria, setCriteria] = useState(['']);

  // Simple function to add a new criterion
  const addCriterion = () => {
    setCriteria([...criteria, '']);
  };

  // Function to remove a criterion
  const removeCriterion = (indexToRemove:number) => {
    setCriteria(criteria.filter((_, index) => index !== indexToRemove));
  };

  // Update a specific criterion
  const updateCriterion = (index:number, value:string) => {
    const newCriteria = [...criteria];
    newCriteria[index] = value;
    setCriteria(newCriteria);
  };

  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !lastDate || criteria.every(c => c.trim() === '')) {
      alert('Please fill out all fields');
      return;
    }

    // Prepare scholarship data
    const scholarshipData = {
      title,
      description,
      lastDate,
      criteria: criteria.filter(c => c.trim() !== '')
    };

    console.log('Scholarship Submission:', scholarshipData);
    // Add your submission logic here
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg mt-16 w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Scholarship Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Scholarship Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Scholarship Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter scholarship title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Scholarship Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the scholarship"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            required
          />
        </div>

        {/* Last Date to Apply */}
        <div>
          <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-2">
            Last Date to Apply
          </label>
          <input
            type="date"
            id="lastDate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Scholarship Criteria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scholarship Criteria
          </label>
          {criteria.map((criterion, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <textarea
                value={criterion}
                onChange={(e) => updateCriterion(index, e.target.value)}
                placeholder={`Enter criterion ${index + 1}`}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {criteria.length > 1 && (
                 <button
                 className='h-11 rounded-md px-8 bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                 type="button"
                 onClick={() => removeCriterion(index)}
               >
                 <Trash2 className="h-4 w-4" />
               </button>
              )}
            </div>
          ))}
          
          {/* Add Criterion Button */}
          <button
            type="button"
            onClick={addCriterion}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"

          >
            <Plus className="mr-2 h-4 w-4" />
            Add Criterion
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-10 px-4 py-2 bg-black text-white hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Create Scholarship
        </button>
      </form>
    </div>
  );
}