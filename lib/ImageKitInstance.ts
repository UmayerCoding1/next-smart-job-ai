import ImageKit from "imagekit";



export const imagekit = new ImageKit({
    publicKey : "public_aeAom5lADG/KhMYt6mh215mVOtI=",
    privateKey : "private_eUKwuY3oauVm8mCAkqCPo3Q4aSM=",
    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
});