import {handleCreate, updateJob} from "@/actions/jobboard";
import {z} from "zod";
import {Job} from "@/types";
import Link from "next/link";
import {Button} from "@mui/material";


export default function EditInvoiceForm({id}:{id:string}) {

    const updateJobWithId = updateJob.bind(null,id)

    return(
        <>
            <div className="mt-16">
                <form action={updateJobWithId}>
                    {/*Job title*/}
                    <div>
                        <label htmlFor="title">Title</label>
                        <div>
                            <input
                                id="title"
                                type="text"
                                name="title"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="company">Company</label>
                        <div>
                            <input type="text" name="company" id="company"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <div>
                            <input type="text" name="location" id="location"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="salary">Salary</label>
                        <div>
                            <input type="number" name="salary" id="salary"/>
                        </div>
                    </div>
                    <fieldset>
                        <legend>
                            Set the listing status
                        </legend>
                        <div>
                            <div className="flex">
                                <div className="flex items-center">
                                    <input type="radio" name="status" id="open" value="open" className ="cursor-pointer" />
                                    <label htmlFor="open">Open</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" name="status" id="closed" value="closed" className="cursor-pointer" />
                                    <label htmlFor="closed">Closed</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/jobboard-admin"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <Button type="submit">Edit Invoice</Button>
                    </div>
                </form>
            </div>
        </>
    )
}