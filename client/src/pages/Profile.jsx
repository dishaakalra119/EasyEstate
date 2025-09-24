import React from 'react'
import { useState,useEffect } from 'react';
import {useRef} from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
export default function Profile() {
  const fileRef=useRef(null);
  const {currentUser} = useSelector((state) => state.user) 
  const [file,setFile]= useState(undefined);
  const [filePercentage, setFilePercentage]= useState(0);

  const[fileUploadError,setFileUploadError]=useState(false);
  const[formData,setFormData]=useState({});

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload=(file)=>{
    const storage= getStorage(app);
    const fileName=new Date().getTime() + file.name;
    const storageRef= ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log('Upload is '+progress+'% done');
        setFilePercentage(Math.round(progress));
      },

      (error)=>{
        setFileUploadError(true);
      },

      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{setFormData({...formData,avatar: downloadURL})})
      },
    )
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])}type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()}src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder='username' id='username' className=' border-2 p-3 rounded-xl bg-white'/>
        <input type="email" placeholder='email' id='email' className=' border-2 p-3 rounded-xl bg-white'/>
        <input type="text" placeholder='password' id='password' className=' border-2 p-3 rounded-xl bg-white'/>
        <button className='bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}