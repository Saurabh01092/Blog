import { Link } from "react-router-dom"

interface BlogCardProps {
    id: number,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div className="flex justify-center">
                        <Avatar name={authorName}/>
                    </div>
                    <div className="font-extralight pl-2 tesxt-sm flex flex-col justify-center">{authorName}</div>
                    <div className="flex flex-col justify-center pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm flex flex-col justify-center">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0,100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length/100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 bg-slate-300 rounded-full">

        </div>
    )
}

export function Avatar({ name, size="small" }: {name:string, size?:"small" | "big"}) {
    return(
        <div className={`relative inline-flex items-center justify-center 
        ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden 
        bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    )
}