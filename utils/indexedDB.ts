import { IDBDraftJobData, iDBUserData } from '@/lib/types';
import {openDB} from 'idb';


async function initianizeDB() {
    const db = await openDB('users', 1, {
        upgrade(db){
            if(!db.objectStoreNames.contains('users')){
                db.createObjectStore('users', {keyPath: 'iid'})
            }
        }
    })

    return db;
}


const addUserIDB = async (userData: iDBUserData) => {
    const db = await initianizeDB();
    await db.put('users', userData);
}

const getAllUserIDB = async () => {
    const db = await initianizeDB();
    return await db.getAll('users');
}



const addDraftJobIDB = async (jobData:IDBDraftJobData) => {
    const db = await initianizeDB();
    await db.put('draftJobs', jobData);
}

export {
    addUserIDB,
    getAllUserIDB,
    addDraftJobIDB
}