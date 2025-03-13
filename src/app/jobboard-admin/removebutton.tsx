'use client'


export default function RemoveButton({id, handleDeleteAction}: {id: string, handleDeleteAction: (id:string)=>void}) {
    return (
        <>
            <button onClick={()=>handleDeleteAction(id)}>Remove</button>
        </>
    )
}