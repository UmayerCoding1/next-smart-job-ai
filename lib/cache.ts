import {LRUCache} from "lru-cache";

const resumeCache = new LRUCache({
    max: 100,
    ttl: 10 * 60 * 1000 
});



export  {resumeCache}