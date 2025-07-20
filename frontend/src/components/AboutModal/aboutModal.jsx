import React, { useState } from 'react';
import axios from 'axios';

const AboutModal = ( { handleEditFunc, selfData } ) =>
{
  const [ data, setData ] = useState( { about: selfData?.about, skillInp: selfData?.skills?.join( ',' ), resume: selfData?.resume } );

  const [ loading, setLoading ] = useState( false );

  const onChangeHandle = ( event, key ) =>
  {
    setData( { ...data, [ key ]: event.target.value } );
  };

  const handleInputImage = async ( e ) =>
    {
      const files = e.target.files;
      const data = new FormData();
      data.append( 'file', files[ 0 ] ); // should be 'file', not 'files'
      data.append( 'upload_preset', "careerNest" ); // make sure this matches your Cloudinary preset
      setLoading( true );
  
      try
      {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dlvaadqgr/image/upload",
          data
        );
        const imageUrl = response.data.secure_url; // more secure and recommended
         setData({...data,resume:imageUrl})
      } catch ( error )
      {
        console.log( error );
      } finally
      {
        setLoading( false );
      }
    };

    const handleOnSave=async()=>{
      let arr = data?.skillInp?.split(',');
      let newData ={...selfData,about:data.about,skills:arr,resume:data.resume};
      handleEditFunc(newData)
    }

  return (
    <div className='my-3'>
      <div className='w-full mb-'>
        <label> About*</label>
        <br />
        <textarea value={data.about} onChange={(e)=>onChangeHandle(e,'about')}
        className='p-2 mt-1 w-full border-1 rounded-md ' cols={ 10 } rows={ 3 } ></textarea>
      </div>
      <div className='w-full mb-4'>
        <label>Skills*(Add by seperating comma)</label>
        <br />
        <textarea value={data.skillInp} onChange={(e)=>onChangeHandle(e,'skillInp')}
        className='p-2 mt-1 w-full border-1 rounded-md ' cols={ 10 } rows={ 3 } ></textarea>
      </div>
      <div className='w-full mb-4'>
        <label htmlFor="resumeUpload" className='p-2 bg-blue-800 text-white rounded-lg cursor-pointer '>
          Resume Upload
        </label>
        <input onChange={handleInputImage} type="file" className='hidden' id="resumeUpload" />
        {
          data.resume 
          && <div className='mt-2 flex max-w-full overflow-auto'>{data.resume}</div>
        }
      </div>
      <div className='bg-blue-950 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl'
       onClick={handleOnSave}>Save</div>
    </div>
  );
};

export default AboutModal;