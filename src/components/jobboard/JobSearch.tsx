import {useState} from "react";
import {FilterTag} from "@/components/jobboard/FilterTag";

export default function JobSearch() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<string[]>(["UI","UX","machine learning","artifical intelligence"]);

    const addFilter = (newFilter:string) => {
        setFilters(()=> {
            return (filters.includes(newFilter))
                ? filters.filter((f)=>f!==newFilter)
                : [...filters,newFilter];
        });
    }

    const removeFilter = (toBeRemoved:string) => {
        setFilters(()=> {
            return filters.filter((f) => f !== toBeRemoved)
        })
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
                    <div className="flex gap-2 py-2 flex-wrap">
                        {filters.map((filter) => (
                            <FilterTag key={filter} label={filter} onRemove={() => {removeFilter(filter)}} />
                        ))}
                        <button className="text-xs py-1 px-3 border rounded-lg font-semibold text-gray-500">
                            + Add filter
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}