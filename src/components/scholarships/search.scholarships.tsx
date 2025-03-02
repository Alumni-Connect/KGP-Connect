"use client"
import { m } from "framer-motion";
import Fuse,{FuseResult} from "fuse.js"
import { useEffect, useRef, useState } from "react"

export default function FuseSearch({filter,setFilter,mutate}:{filter:string[] | undefined, setFilter:React.Dispatch<React.SetStateAction<string[] >>,mutate:any}){
  
  const [result,setResult]=useState<FuseResult<string>[] | undefined>(undefined)
  const [activeIndex, setActiveIndex] = useState(-1);
  const ulRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);


  useEffect(() => {
    setActiveIndex(-1);
    itemRefs.current = result ? new Array(result.length).fill(null) : [];
  }, [result]);

  
    const fuse= useRef<Fuse<string>>(null)
    useEffect(()=>{
        const ScholarshipTags=  fetch("api/scholarships",{
          method: "POST"
        }).then(async(res)=>{
           if(res.status===200){
            const result=await res.json()
            //setTags(result.tags)
             console.log(result.tags)
             const options = {
              includeScore: true,
              threshold:0.3,
          };
            fuse.current = new Fuse(result.tags, options);
           }
           
        }).catch(e=>{
          console.log(e)
        })
     },[])
    

     useEffect(() => {
      const handleKeyDown = (e:any) => {
      if (!result || result.length === 0) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prevIndex => {
            const newIndex = prevIndex < result.length - 1 ? prevIndex + 1 : 0;
            scrollItemIntoView(newIndex);
            return newIndex;
          });
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prevIndex => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : result.length - 1;
            scrollItemIntoView(newIndex);
            return newIndex;
          });
          break;
          
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < result.length) {
            selectItem(result[activeIndex].item);
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          setResult(undefined);
          break;
          
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [result, activeIndex, setResult]);


  const scrollItemIntoView = (index:number) => {
    if (itemRefs.current[index] && ulRef.current) {
      const listItem = itemRefs.current[index];
      const list = ulRef.current;
      
      const listItemTop = listItem.offsetTop;
      const listItemBottom = listItemTop + listItem.offsetHeight;
      
      const listScrollTop = list.scrollTop;
      const listHeight = list.clientHeight;
      const listScrollBottom = listScrollTop + listHeight;
      
      if (listItemTop < listScrollTop) {
        list.scrollTop = listItemTop;
      } else if (listItemBottom > listScrollBottom) {
        list.scrollTop = listItemBottom - listHeight;
      }
    }
  };


     const selectItem = (suggestion:string) => {
      console.log("hello");
      if (filter) {
        console.log(filter);
        setFilter([...filter, suggestion]);
      } else {
        setFilter([suggestion]);
      }
      mutate();
      setResult(undefined);
    };
      

    return(
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="e.g. you can search for the scholarships title or tags"
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{
                const res= fuse.current?.search(e.target.value)
                setResult(res)
                console.log(res)
              }}
             />
            </div>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-200">
              Select Tags
            </button>
          </div>


           {/* suggestion code */}
          <div 
              className="absolute z-10  mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              <ul className="py-1"  ref={ulRef}>
                {result?.map((suggestion, index) => (
                  <li
                    key={index} 
                    ref={(el: HTMLLIElement | null) => {
                      itemRefs.current[index] = el;
                    }}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 text-gray-700 hover:text-blue-700"
                    onClick={() => {
                      selectItem(suggestion.item)
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {suggestion.item}
                  </li>
                ))}
              </ul>
            </div>
        </div>


    )
}