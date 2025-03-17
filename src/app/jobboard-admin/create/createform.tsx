'use client'

import { useSession } from "next-auth/react";

import Link from "next/link";
import {Button} from "@mui/material";
import {useActionState} from "react";
import {handleCreate} from "@/actions/jobboard";


export default function CreateForm() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>You must be signed in to create a job.</p>;

    const userId = session.user.id;
    // const userId = "cm877bxh90000ip2gj41j6b0d";
    return(
        <div className="mt-16 w-full">
            <form action={handleCreate} className="bg-white shadow-md rounded-lg p-6 border border-gray-200 w-full">
                <h2 className="text-xl font-semibold text-indigo-700 mb-6">Create New Job Listing</h2>

                <input type="hidden" name="userId" value={userId} />

                    {/* Job title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <div>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Job Title"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                        </label>
                        <div>
                            <input
                                type="text"
                                name="company"
                                id="company"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Company Name"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <div>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Job Location"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                            Salary
                        </label>
                        <div>
                            <input
                                type="number"
                                name="salary"
                                id="salary"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Annual Salary"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                            Link
                        </label>
                        <div>
                            <input
                                type="text"
                                name="url"
                                id="url"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Application URL"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-2">
                                Set the listing status
                            </legend>
                            <div>
                                <div className="flex gap-6">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            id="open"
                                            value="open"
                                            className="cursor-pointer h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <label htmlFor="open" className="ml-2 text-sm text-gray-700 cursor-pointer">Open</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            id="closed"
                                            value="closed"
                                            className="cursor-pointer h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <label htmlFor="closed" className="ml-2 text-sm text-gray-700 cursor-pointer">Closed</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/jobboard-admin"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex h-10 items-center rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Create Job Listing
                    </button>
                </div>
            </form>
        </div>
    )
}