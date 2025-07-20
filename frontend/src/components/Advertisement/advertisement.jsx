import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react'

const Advertisement = () => {
 
    const [userData,setUserData]=useState(null)

    useEffect(()=>{
        const userData=localStorage.getItem('userInfo')
        setUserData(userData?JSON.parse(userData):null)
    },[])

  return (
    <div className='sticky top-18'>
        <Card padding={0}>
            <div className='relative h-25'>
                <div className='relative w-full h-22 rounded-md'>
                    <img src={userData?.cover_pic}
                        alt="" className='rounded-t-md h-full w-full' />
                </div>
                <div className='absolute top-14 left-[40%] z-10'>
                    <img src={userData?.profilePic}
                        alt="" className='rounded-full broder-2 h-13 w-13 border-white cursor-pointer' />
                </div>
                </div>

                <div className='px-5 my-5 mx-auto'>
                    <div className='text-sm font-semibold text-center'>{userData?.f_name}</div>
                    <div className='text-sm my-3 text-center '>Get the latest jobs industry news</div>
                    <div className='text-sm my-1 border-1 text-center p-2 font-bold border-blue-950 rounded-2xl
                    text-white bg-blue-800 cursor-pointer'>Explore</div>

                </div>
        </Card>
    </div>
  )
}

export default Advertisement