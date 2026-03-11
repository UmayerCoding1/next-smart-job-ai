import React from 'react'

export const JobPagination = ({ jobs, filtered }: { jobs: number, filtered: number }) => {
    return (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>
                Showing{" "}
                <span className="font-semibold text-gray-700">
                    {filtered}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                    {jobs}
                </span>{" "}
                jobs
            </span>
            <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded border hover:bg-white transition-colors disabled:opacity-40">
                    Prev
                </button>
                <button className="px-2.5 py-1 rounded border bg-blue-600 text-white">
                    1
                </button>
                <button className="px-2.5 py-1 rounded border hover:bg-white transition-colors">
                    Next
                </button>
            </div>
        </div>
    )
}
