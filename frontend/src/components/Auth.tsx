import { SignupInput } from "@saurabh1274/medium-common-zod";
import { ChangeEvent, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {

    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data
            localStorage.setItem('token', jwt)
            navigate('/blogs')
        } catch(e) {
            alert("Error while signing up")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                    {type === "signin" ? <p className="pl-20">Log In</p> : "Create an account" }
                    </div>
                    <div className="text-slate-500 mx-4">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Saurabh Upadhyay" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Username" placeholder="Saurabh@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className=" w-full text-gray-900 bg-white border 
                    border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
                    focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                    dark:bg-gray-800 dark:text-white dark:border-gray-600 
                    dark:hover:bg-gray-700 dark:hover:border-gray-600 
                    dark:focus:ring-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}
    

interface LabelledInputType {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return (
        <div className="m-4">
            <label className="block mb-2 text-sm font-bold text-black">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300
             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
             p-2.5" placeholder={placeholder} required />
        </div>
    )
}























































































// return (
//     <div className="h-screen flex justify-center flex-col">
//         <div className="flex justify-center">
//             <div>
//                 <div className="px-10">
//                     <div className="text-3xl font-extrabold">
//                         Create an Account
//                     </div>
//                     <div className="pl-4">
//                         Already have an account?
//                         <Link className="pl-2 underline" to={"/signin"}>Login</Link>
//                     </div>
//                 </div>
//                 <div className="pt-4">
//                     <LabelledInput label="Name" placeholder="Name" onChange={(e) => {
//                         setPostInputs({
//                             ...postInputs,
//                             name: e.target.value
//                         })
//                     }} />

//                     <LabelledInput label="Username" placeholder="Email" onChange={(e) => {
//                         setPostInputs({
//                             ...postInputs,
//                             username: e.target.value
//                         })
//                     }} />

//                     <LabelledInput label="Password" placeholder="Password" type={"password"} onChange={(e) => {
//                         setPostInputs({
//                             ...postInputs,
//                             password: e.target.value
//                         })
//                     }} />
//                     <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
//                     focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 
//                    dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
//                     dark:border-gray-700">Dark</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// )
// }