import { countScholarship, paginatedResponses } from "@/actions/scholarships";
import UserList from "@/components/admin/adminScholarship/responses/responses";




export default async function Page({params,searchParams}: { 
   params: Promise<{ id: string }> ;
   searchParams:Promise<{page? : number | undefined}>;
   }){
  const {id}= await params;
  const {page = 1}= await searchParams
  console.log(id)
  console.log(page)
  const limit=10
  
  const userResponse= await paginatedResponses(page,limit,id[0])
  const totalCount= await countScholarship(id[0])




  return(
 <UserList users={userResponse!} currentPage={page}  usersPerPage={limit} totalCount={totalCount}/>
  )
}