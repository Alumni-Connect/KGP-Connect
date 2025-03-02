import {useState} from "react";
import {Tag} from "@/components/jobboard/Tag";


type JobSearchProps = {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
};

export default function JobSearch({ selectedTags, setSelectedTags }: JobSearchProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(true);

    const [availableTags] = useState<string[]>([
        "Frontend",
        "Backend",
        "Fullstack",
        "UI",
        "UX",
        "DevOps",
        "Cloud",
        "machine learning",
        "artificial intelligence",
        "Data Science",
        "Security",
        "full-time",
        "remote"
    ]);

    const addTag = (newTag:string) => {
        setSelectedTags(
             (selectedTags.includes(newTag))
                ? selectedTags.filter((t)=>t!==newTag)
                : [...selectedTags,newTag]
        )
    }

    const removeTag = (toBeRemoved:string) => {
        setSelectedTags(
             selectedTags.filter((t) => t !== toBeRemoved)
        )
    };

    const handleTagSelect = (tag: string) => {
        addTag(tag);
        setShowDropdown(false);  // Close dropdown after selection
    };

    return(
        <>
            <div className="py-5 flex flex-col items-center bg-white">
                <div className="w-full flex-col max-w-xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 w-full rounded-lg border bg-gray-50"/>
                    <div className="flex gap-2 py-2 flex-wrap relative">
                        {selectedTags.map((tag) => (
                            <Tag key={tag} label={tag} onRemove={() => {removeTag(tag)}} />
                        ))}
                        <div className="relative">
                            <button className="text-xs py-1 px-3 border rounded-lg font-semibold text-gray-500" onClick={() => setShowDropdown(!showDropdown)}>
                                + Add filter
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto w-48 z-10">
                                    <ul className="text-sm">
                                        {availableTags.map((tag) => (
                                            <li
                                                key={tag}
                                                onClick={() => handleTagSelect(tag)}
                                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                                    selectedTags.includes(tag) ? "text-gray-400 cursor-not-allowed" : ""
                                                }`}
                                            >
                                                {selectedTags.includes(tag) ? `${tag} (Added)` : tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}