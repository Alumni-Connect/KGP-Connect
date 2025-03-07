// File: components/WorkExperienceForm.tsx
import { useState } from 'react';
import { z } from 'zod';
import { Trash2,Plus } from 'lucide-react';

const workExperienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  criteria: z.array(z.string()).min(1, "At least one criterion is required"),
});

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
}

export  function ScholarshipCreation({ formData, updateFormData, nextStep }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
    const [criteria, setCriteria] = useState(['']);

    // Simple function to add a new criterion
    const addCriterion = () => {
      //  setCriteria([...criteria, '']);
      setCriteria([...criteria, '']);
    };

    // Function to remove a criterion
    const removeCriterion = (indexToRemove:number) => {
     //   setCriteria(criteria.filter((_, index) => index !== indexToRemove));
     setCriteria(criteria.filter((_, index) => index !== indexToRemove));
    };

    // Update a specific criterion
    const updateCriterion = (index:number, value:string) => {
        const newCriteria = [...criteria];
        newCriteria[index] = value;
        setCriteria(newCriteria);
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateFormData({ [name]: checked });
    } else {
      updateFormData({ [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate only the fields that would be required if not currently working
      const dataToValidate = {
        ...formData,
      };
      formData["criteria"]=criteria
    console.log(formData)  
      workExperienceSchema.parse(dataToValidate);
      setErrors({});
      console.log("hello")
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Scholarship for IIT KGP</h2>
      <p className="text-gray-600 mb-6">we totally endorse the way you think for us</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Title<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Type the title of scholarship"
              className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Start date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="startDate"
            value={new Date().toISOString().split('T')[0]}
            disabled={true}
            onChange={handleChange}
            placeholder="Start date"
            className={`w-full p-2 border rounded-md `}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            End date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="End date"
            disabled={formData.currentlyWorkHere}
            className={`w-full p-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'} ${formData.currentlyWorkHere ? 'bg-gray-100' : ''}`}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>
        
        {/* <div className="col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="currentlyWorkHere"
              checked={formData.currentlyWorkHere}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm">I currently work here</span>
          </label>
        </div> */}

        {/* <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Description<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. what is the scholarship about"
            className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div> */}
        
        
        
        {/* <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">This position is a...</label>
          <select
            name="positionType"
            value={formData.positionType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md appearance-none"
          >
            <option value="">Select</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div> */}


        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Eligibilty Criteria<span className="text-red-500">*</span>
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



      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => {}}
          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
        >
          Save
        </button>
      </div>
    </form>
  );
}

// File: components/ProfileForm.tsx


// File: components/ProgressBar.tsx
