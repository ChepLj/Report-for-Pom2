import { deleteObject, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';


const deleteFolderDataFromStorage = async (data, callback) => {
   const fileRefs = extractFileRefs(data);
   try {
    let deletePromises = [];

    fileRefs.forEach((filePath) => {
      const fileRef = ref(storage, filePath);
      console.log("🚀 ~ fileRefs.forEach ~ filePath:", filePath)
      deletePromises.push(deleteObject(fileRef));
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    console.log("All files deleted successfully.");
    callback("All files deleted successfully.");
  } catch (error) {
    console.error("Error deleting files:", error);
    callback("Error deleting files:");
  }
};

export default deleteFolderDataFromStorage;



export const extractFileRefs = (data) => {
  let fileRefs = [];
  const bucket = storage?._bucket?.bucket || 'ERROR'
  console.log("🚀 ~ extractFileRefs ~ bucket:", bucket)
  console.log("🚀 ~ extractFileRefs ~ storage:", storage)
  // Extract from "attachments"
  if (data.attachments) {
    data.attachments.forEach((attachment) => {
      if (attachment.fileRef) {
        fileRefs.push(`gs://${bucket}/${attachment.fileRef}`);
      }
    });
  }

  // Dynamically extract from all keys inside "images"
  if (data.images) {
    Object.values(data.images).forEach((imageGroups) => {
      if (Array.isArray(imageGroups)) {
        imageGroups.forEach((group) => {
          if (Array.isArray(group)) {
            group.forEach((image) => {
              if (image.fileRef) {
                fileRefs.push(`gs://${bucket}/${image.fileRef}`);
              }
            });
          }
        });
      }
    });
  }

  return fileRefs;
};