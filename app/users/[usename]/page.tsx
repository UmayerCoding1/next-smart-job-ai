import React from 'react';

const page = async(context: { params: Promise<{ usename: string }> }) => {
    const user = await context.params;

    console.log(user)
    return (
        <div className='p=10'>
            <h2>User_name:  {user.usename}</h2>
            lskdl
        </div>
    );
};

export default page;