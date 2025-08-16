'use client';
import React, { useEffect, useState } from 'react';
import SignIN from '../form/signIn';
import { getAllUserIDB } from '@/utils/indexedDB';
import { iDBUserData } from '@/lib/types';

const LoginPage = () => {
    const [popup, setPopup] = useState(false);
  const [idbUser, setIdbUser] = useState<iDBUserData[]>([]);

  useEffect(() => {
    const handleIdbUser = async () => {
      
      const user = await getAllUserIDB();
      if(user.length > 0) {
       
        setIdbUser(user);
      }
    };
    handleIdbUser();

    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);
    return (
        <div>
            <SignIN popup={popup} setPopup={setPopup} idbUserData={idbUser}/>
        </div>
    );
};

export default LoginPage;