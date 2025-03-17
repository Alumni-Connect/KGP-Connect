'use client'
import { Trash } from 'lucide-react';


export default function RemoveButton({id, handleDeleteAction}: {id: string, handleDeleteAction: (id:string)=>void}) {
    return (
        <>
            <button onClick={()=>handleDeleteAction(id)}><Trash/></button>
        </>
    )
}