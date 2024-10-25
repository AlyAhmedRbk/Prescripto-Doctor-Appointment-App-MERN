import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {assets} from "../../assets/assets";
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

  const {aToken, getDashData, cancelAppointment, dashData} = useContext(AdminContext);
  const {slotDateFormat} = useContext(AppContext);

  useEffect(()=>{
    if(aToken){
      getDashData();
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2  border-gray-100 hover:scale-105 transition-all cursor-pointer'>
          <img src={assets.doctor_icon} alt=""  className='w-14'/>
          <div>
            <p className='text-xl font-semibold text-gra6'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2  border-gray-100 hover:scale-105 transition-all cursor-pointer'>
          <img src={assets.appointments_icon} alt=""  className='w-14'/>
          <div>
            <p className='text-xl font-semibold text-gra6'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2  border-gray-100 hover:scale-105 transition-all cursor-pointer'>
          <img src={assets.patients_icon} alt=""  className='w-14'/>
          <div>
            <p className='text-xl font-semibold text-gra6'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t  boorder'>
          <img src={assets.list_icon} />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {
            dashData.latestAppointments.map((items, index)=>{
              return(
                <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                  <img src={items.docData.image} className='rounded-full w-10' />
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>{items.docData.name}</p>
                    <p className='text-gray-600'>{slotDateFormat(items.slotDate)}</p>
                  </div>
                  {
                    items.cancelled
                    ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    : items.isComplete 
                      ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                      :<img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer'/>
                  }
                </div>
              )
            })
          }

        </div>

      </div>
    </div>
  )
  
}

export default Dashboard