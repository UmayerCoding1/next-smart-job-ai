import { IDBDraftJobData, iDBUserData } from '@/lib/types';
import { openDB } from 'idb';

// A helper function to safely open the database and ensure stores exist
async function initializeDB() {
  const dbName = 'samartjoai';
  const currentDB = await indexedDB.databases();
  const existingDB = currentDB.find((db) => db.name === dbName);
  const version = existingDB?.version ? existingDB.version + 1 : 1;

  const db = await openDB(dbName, version, {
    upgrade(db) {
      // ✅ Create 'users' store if not exists
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'iid' });
      }

      // ✅ Create 'draftJobs' store if not exists
      if (!db.objectStoreNames.contains('draftJobs')) {
        db.createObjectStore('draftJobs', { keyPath: '_id' });
      }
    },
  });

  return db;
}

// ✅ Add user
const addUserIDB = async (userData: iDBUserData) => {
  const db = await initializeDB();
  await db.put('users', userData);
};

// ✅ Get all users
const getAllUserIDB = async () => {
  const db = await initializeDB();
  return await db.getAll('users');
};

// ✅ Add draft job
const addDraftJobIDB = async (jobData: IDBDraftJobData) => {
    console.log('jobData', jobData);
  const db = await initializeDB();
  await db.put('draftJobs', jobData);
};

export {
  addUserIDB,
  getAllUserIDB,
  addDraftJobIDB,
};
