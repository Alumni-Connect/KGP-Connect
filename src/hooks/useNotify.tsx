// import { useState } from "react"

// type notification={
//     message:string,duration:number,type:string
// }
// export const useNotify=()=>{
//   const [notification,setNotification]=useState<notification[]>([])

//   function addNotification(msg:string,dur:number,type:string){

//     setNotification((prev)=>[...prev,{type,message:msg,duration:dur}])
//     setTimeout(() => {
//      const filteredOne=notification.filter((notify)=> notify.message!==msg)
//      setNotification((prev)=>[...filteredOne])
//     }, dur)
//     console.log(notification)
//   console.log(document.getElementsByTagName("body"))
//   }

//   return {addNotification,notification}

// }