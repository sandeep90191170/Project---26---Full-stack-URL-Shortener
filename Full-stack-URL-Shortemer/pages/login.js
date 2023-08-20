import React,{useState} from 'react'
import Link from 'next/link'
import { signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../styles/Firebase/firebase"
import {useRouter} from "next/router"
import Head from 'next/head';

function Login() {

    const [error,setError] = useState(null)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [success,setSuccess] = useState(null)
    const router = useRouter();

    const  login = async (e)=>{
        e.preventDefault();
        //setLoading(true)
    
        if(email === "" || !password === "" ){
          setError("Fields are empty")
          //setLoading(false)
        }
    
       else{
        try{
          await signInWithEmailAndPassword(auth,email,password)
        // setLoading(false)
         router.push("/");
         setSuccess("Welcome to KUTI")
         
       }
       catch(err){
         console.log(err)
         setError(err.message)
       }
    
       }
       
       
      
    
      }
  return (
    <>
    <Head>
        <title>Kuti - Login Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="h-[100vh] mt-[60px]">
           
           <div className="flex items-center flex-col justify-center mt-[80px] w-full">
           {error?(<div className='flex items-center justify-center text-red-600 border border-red-600  w-[300px] p-2'><p>{error}</p></div>):null}
                   {success?(<div className="text-green-300 flex items-center justify-center"><p>{success}</p></div>):null}
           <h2 className="text-black p-3 text-3xl text-left">Sign In</h2>
               <form className="flex flex-col gap-4" onSubmit={login}>
                   <div className="w-full"><input type="email" placeholder="Email" value={email} className='p-2 w-[300px] rounded focus:outline-none text-black  border-[#2BD0D0] border-2 mb-[20px]'  onChange={(e)=>setEmail(e.target.value)}/></div>
                   <div><input type="password" placeholder="Password" value={password} className='p-2 w-[300px] rounded focus:outline-none text-black  border-[#2BD0D0] border-2'  onChange={(e)=>setPassword(e.target.value)}/></div>
                
                   <div><button className="bg-[#2BD0D0] p-2 w-[300px] rounded mt-[15px]">Submit</button></div>
               </form>
              
           
               <div className='py-2'>New to <span className="text-[#2BD0D0]">Kuti</span> <span>?</span> <Link href="signup">SignUp Now</Link></div>
           </div>

          

       </div>
     
      
    </>
  )
}

export default Login