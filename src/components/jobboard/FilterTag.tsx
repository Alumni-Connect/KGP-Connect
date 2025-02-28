import { X } from "lucide-react";

interface BadgeProps {
    label: string;
    onRemove: () => void;
}

export function FilterTag({label, onRemove }:BadgeProps) {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg px-3 text-gray-700 text-sm">
            <span className="pr-2 text-xs py-1 rounded-lg font-medium text-gray-500">{label}</span>
            <div className="w-px h-full bg-gray-300 mx-2"></div>
            <button className="hover:text-gray-900" onClick={onRemove}>
                <X className="w-4 h-4 cursor-pointer"/>
            </button>
        </div>
    );
}
