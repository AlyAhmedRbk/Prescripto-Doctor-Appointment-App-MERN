import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import {assets} from "../assets/assets_frontend/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const {userData, setUserData, token, backendUrl, loadProfileData} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {

    try {
      
      const formData = new FormData();

      formData.append("name", userData.name)
      formData.append("phone", userData.phone)
      formData.append("gender", userData.gender)
      formData.append("dob", userData.dob)
      formData.append("address", JSON.stringify(userData.address));

      image && formData.append('image', image);

      const {data} = await axios.post(backendUrl + "/api/user/update-profile", formData, {headers : {token}});

      if(data.success){
        toast.success(data.message);
        loadProfileData();
        setIsEdit(false);
        setImage(false)
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 textx-sm'>

        {
          isEdit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img src={image ? URL.createObjectURL(image): userData.image} className='w-36 rounded opacity-75'  />
              <img src={image ? "" : assets.upload_icon} className='w-10 absolute bottom-12 right-12' />
            </div>
            <input type="file"  id="image" hidden onChange={(e)=>setImage(e.target.files[0])}/>
          </label>
          :<img src={userData.image} className='w-36 rounded'/>
        }


        {
          isEdit
          ? <input
           type="text" 
           value={userData.name} 
           onChange={(e)=>setUserData(prev => ({...prev, name:e.target.value}))}
           className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
           />
          :<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
        }
        <hr className='bg-zinc-400 h-[1px] border-none'/>
        <div>
          <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email Id :</p>
            <p className='text-blue-500'>{userData.email}</p>
            <p className='font-medium'>Phone :</p>
            {
              isEdit
              ? <input
                type="text" 
                value={userData.phone} 
                onChange={(e)=>setUserData(prev => ({...prev, phone:e.target.value}))}
                className='bg-gray-100 max-w-52'
                />
              :<p className='text-blue-400'>{userData.phone}</p>
            }
            <p className='font-medium'>Address :</p>
            {
              isEdit
              ? <p>
                <input type="text" 
                value={userData.address.line1} 
                onChange={(e)=>setUserData((prev)=>({...prev.address, line1 : e.target.value}))}
                className='bg-gray-50'
                />
                <br />
                <input type="text"
                value={userData.address.line2} 
                onChange={(e)=>setUserData((prev)=>({...prev.address, line2 : e.target.value}))}
                className='bg-gray-50'
                />
              </p>
              :<p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            }
          </div>
        </div>
        
        <div>
          <p className='text-neutral-500 underline mt-3'>Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className='font-medium'>Gender :</p>
            {
              isEdit
              ? <select
                onChange={(e)=>{setUserData(prev => ({...prev, gender: e.target.value}))}} 
                value={userData.gender}
                className='max-w-20 bg-gray-100'
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :<p className='text-gray-400'>{userData.gender}</p>
            }
            <p className='font-medium'>Birthday:</p>
            {
              isEdit 
              ?<input 
                type='date'
                onChange={(e)=>{setUserData(prev => ({...prev, dob : e.target.value}))}}
                value={userData.dob}
                className='max-w-28 bg-gray-100'
               />
              :<p className='text-gray-400'>{userData.dob}</p>
            }
          </div>
        </div>

        <div className='mt-10'>
          {
            isEdit
            ? <button
             onClick={updateUserProfileData}
             className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white 
             transition-all duration-300'
             >Save Information</button>
            : <button
             onClick={()=>setIsEdit(true)}
             className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white 
             transition-all duration-300'
             >Edit</button>
          }
        </div>
    </div>
  )
}

export default MyProfile;
