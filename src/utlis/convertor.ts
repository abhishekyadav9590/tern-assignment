export const convertFileToBlobUrl = (file:File)=> {
    let blobUrl:string='';
    try {
        const blob = new Blob([file], { type: file.type });
        blobUrl = URL.createObjectURL(blob);
    }catch (e) {
        console.error('something went wrong while converting file to blob')
    }
    return blobUrl;
}
