'use client';
import React, { use } from 'react';

const ApplyPage = (Context: { params: Promise<{ id: string }>}) => {
    const id = use(Context.params);
 console.log(id);
    return (
        <div>
            <h2>Apply id: {id.id}</h2>
        </div>
    );
};

export default ApplyPage;