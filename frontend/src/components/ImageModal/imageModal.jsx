import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const ImageModal = ( { isCircular, selfData,handleEditFunc } ) =>
{
  const [ imageLink, setImageLink ] = useState( isCircular ? selfData?.profilePic : selfData?.cover_pic );

  const [ loading, setLoading ] = useState( false );


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
      setImageLink( imageUrl );
    } catch ( error )
    {
      console.log( error );
    } finally
    {
      setLoading( false );
    }
  };
  const handleSubmitBtn =async()=>{
    let {data} = {...selfData};
    if(isCircular){
      data={...data,['profilePic']:imageLink}
    }else{
      data = {...data,['cover_pic']:imageLink}
    }
    handleEditFunc(data)

  }
  return (
    <div className='p-5 relative flex items-center flex-col h-full'>
      {
        isCircular ? (
          <img src={ imageLink } alt="" className='rounded-full w-[150px] h-[150px]' />
        ) : (
          <img className='rounded-xl w-full h-[200px] object-cover'
            src={ imageLink } />
        )
      }

      <div className="w-full flex justify-between mt-20">
        {/* Left-side Upload button */ }
        <label
          htmlFor="btn-submit"
          className="p-2 bg-blue-900 text-white rounded-2xl cursor-pointer hover:bg-blue-800 transition"
        >
          Upload
        </label>
        <input onChange={ handleInputImage } type="file" className="hidden" id="btn-submit" />

        {/* Right-side Submit button */ }
        {
          loading ? <Box sx={ { display: 'flex' } }>
            <CircularProgress />
          </Box> : <label onClick={handleSubmitBtn}
            className="p-2 bg-blue-900 text-white rounded-2xl cursor-pointer hover:bg-blue-800 transition">Submit
          </label>
        }

      </div>







    </div>
  );
};

export default ImageModal;