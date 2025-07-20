import React, { useEffect, useState } from 'react';

const Conversation = ({ item, ownData,handleSelectedConv,activeConvId }) => {
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {
        const ownId = ownData?._id;
        if (!item?.members || item.members.length === 0) return;

        if (item.members.length === 1) {
            // Fallback: if only one member is returned
            setMemberData(item.members[0]);
        } else {
            const other = item.members.find(m => m._id !== ownId);
            setMemberData(other || item.members[0]); // Fallback to first
        }
    }, [item, ownData]);

    if (!memberData) return null;

    const handleClickFunc = async()=>{
        handleSelectedConv(item?._id,memberData)
    }

    return (
        <div onClick={handleClickFunc}
            className={`flex items-center w-full cursor-pointer border-b border-gray-300 gap-2 p-4 hover:bg-gray-200
                ${activeConvId===item?._id?'bg-gray-200':''}`}
        >
            <div className='shrink-0'>
                <img
                    className='w-12 h-12 rounded-full object-cover'
                    src={memberData?.profilePic }
                    alt="User"
                />
            </div>
            <div>
                <div className='text-md font-medium'>{memberData?.f_name }</div>
                <div className='text-sm text-gray-500 truncate w-44'>{memberData?.headlines }</div>
            </div>
        </div>
    );
};

export default Conversation;
