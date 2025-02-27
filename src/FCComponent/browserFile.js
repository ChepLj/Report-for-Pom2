import { fileOpen, supported } from "browser-fs-access";
if (supported) {
  console.log("Using the File System Access API.");
} else {
  console.log("Using the fallback implementation.");
}
//TODO: handel open Text
export const handelOpenImageFile = async (callback) => {
  try {
    const blob = await fileOpen({
      description: "Image and Video files",
      mimeTypes: [
        "image/jpg", "image/png", "image/gif", "image/webp",
        "video/mp4", "video/webm", "video/avi", "video/mkv",
        "video/mov", "video/wmv", "video/mpeg", "video/flv"
    ],
    extensions: [
        ".jpg", ".jpeg", ".png", ".gif", ".webp",
        ".mp4", ".webm", ".avi", ".mkv", ".mov",
        ".wmv", ".mpeg", ".mpg", ".flv"
    ],
      multiple: true,
    });
    console.log("🚀 ~ file: CreatePage.tsx:57 ~ handelOpenFile ~ blob:", blob);
    if (blob) {
      callback(blob);
    }
  } catch {}
};

//TODO_END: handel open image

//TODO: handel open Text
export const handelOpenTextFile = async (callback) => {
  try {
    const blob = await fileOpen({
      description: "Files",
      mimeTypes: [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/elk",
        "image/vnd.dwg",
        "image/vnd.dxf",
        "model/vnd.dwf",
        "application/x-rar-compressed",
        "application/zip",
      ],
      extensions: [".docx", ".doc", ".xls", ".xlsx", ".pdf", ".txt", ".elk", ".dwg", ".dwf", ".dxf", ".rar", ".zip"],
      multiple: true,
    });

    if (blob) {
    console.log("🚀 ~ handelOpenTextFile ~ blob:", blob)

      if (blob.size > 500000000) {
        alert("The File is over size > 0.5Gb !");
      } else {

        callback(blob);
      }
      
    }
  } catch {}
};

//TODO_END: handel open Text
