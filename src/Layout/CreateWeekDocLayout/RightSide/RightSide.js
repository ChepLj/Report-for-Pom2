//JSX: Right side component

import AttachFileIcon from '@mui/icons-material/AttachFile';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { getKeyByValue } from '../../../FCComponent/getKeyByValue';
import { MIMEtype } from '../../../FCComponent/MIMEtype';
import noImageAvailable from '../../../static/img/No_Image_Available.jpg';
import style from './RightSide.module.css';

export default function RightSide({
   prop,
   jobState,
   planState,
   proposeState,
   setPlanState,
   setProposeState,
   setJobState,
   handleChooseFile,
   file,
   setFile,
   issueState,
   setIssueState,
   equipmentStatusState,
   setEquipmentStatusState,
}) {
   console.log("🚀 ~ file:", file)
   const arrayImageRender = [1, 2, 3, 4];
   const videoRefs = useRef([]);
   //TODO: handle delete File
   const handleDeleteFile = (itemIndex) => {
      const arr = [...file];
      const newArray = arr.filter((_, index) => index !== itemIndex);
      setFile(newArray);
   };
   //TODO: handle delete File
   //TODO: handle delete image
   const handleDeleteImage = (id, itemIndex, group) => {
      switch (group) {
         case 'TB': {
            const updatedEquipmentStatusState = equipmentStatusState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length > 1) {
                     const handleNewArray = item.images.filter((image, index) => {
                        return itemIndex !== index;
                     });
                     item.images = handleNewArray;
                  } else {
                     item.images = [];
                  }
               }

               return item;
            });
            setEquipmentStatusState(updatedEquipmentStatusState);
            break;
         }
         case 'CV': {
            const updatedJobState = jobState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length > 1) {
                     const handleNewArray = item.images.filter((image, index) => {
                        return itemIndex !== index;
                     });
                     item.images = handleNewArray;
                  } else {
                     item.images = [];
                  }
               }

               return item;
            });
            setJobState(updatedJobState);
            break;
         }
         case 'KH': {
            const updatedPlanState = planState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length > 1) {
                     const handleNewArray = item.images.filter((image, index) => {
                        return itemIndex !== index;
                     });
                     item.images = handleNewArray;
                  } else {
                     item.images = [];
                  }
               }

               return item;
            });
            setPlanState(updatedPlanState);
            break;
         }
         case 'ĐX': {
            const updatedProposeState = proposeState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length > 1) {
                     const handleNewArray = item.images.filter((image, index) => {
                        return itemIndex !== index;
                     });
                     item.images = handleNewArray;
                  } else {
                     item.images = [];
                  }
               }

               return item;
            });
            setProposeState(updatedProposeState);
            break;
         }
         case 'SC': {
            const updatedIssueState = issueState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length > 1) {
                     const handleNewArray = item.images.filter((image, index) => {
                        return itemIndex !== index;
                     });
                     item.images = handleNewArray;
                  } else {
                     item.images = [];
                  }
               }

               return item;
            });
            setIssueState(updatedIssueState);
            break;
         }
      }
   };

   //TODO_END: handle delete image
   return (
      <section className={style.rightSide}>
         <div className={style.rightSideFile}>
            <div className={style.rightSideFileHeader}>
               <span style={{ color: 'black', fontWeight: 600, textAlign: 'start' }}>File*</span>
               <Button variant="outlined" size="small" color="primary" startIcon={<AttachFileIcon />} onClick={handleChooseFile}>
                  choose file
               </Button>
            </div>
            {file?.length ?
               file.map((fileCrr, fileIndex) => {
                  return (
                     <div key={fileIndex}>
                        <div style={{ color: 'green', fontWeight: 600, textAlign: 'start', margin: '5px' }}>
                           {fileCrr?.name ? fileCrr.name : '...'}
                        </div>
                        <div style={{ color: 'gray', fontStyle: 'italic', textAlign: 'start', margin: '5px' }}>
                           {fileCrr?.size ? (
                              <span
                                 className={`material-symbols-outlined ${style.fileDeleteIcon}`}
                                 onClick={(e) => {
                                    handleDeleteFile(fileIndex);
                                 }}
                              >
                                 delete
                              </span>
                           ) : (
                              ''
                           )}

                           <span style={{ padding: '5px' }}>type: {fileCrr?.type ? getKeyByValue(MIMEtype, fileCrr?.type) : '...'}</span>
                           <span style={{ padding: '5px' }}>size: {fileCrr?.size ? fileCrr.size : '...'} BYTE</span>
                        </div>
                     </div>
                  );
               }):<i>(không có file nào được chọn)</i>}
         </div>
         <div className={style.rightSideFile}>
            <div className={style.rightSideFileHeader}>
               <span style={{ color: 'black', fontWeight: 600, textAlign: 'start' }}>Image</span>
            </div>
            {equipmentStatusState?.map((crr) => {
               if (crr.images?.length) {
                  return (
                     <section className={style.rightSideImageList} key={crr.id}>
                        {`TB${crr.id}`}
                        {arrayImageRender.map((_, indexItem) => {
                           const file = crr.images[indexItem];
                           const isVideo = file && file.type.startsWith('video');
                           return (
                              <div className={style.rightSideImageItem} key={`${crr.id}-${indexItem}`}>
                                 {isVideo ? (
                                    <>
                                       <video
                                          className={style.rightSideImageItemImage}
                                          src={URL.createObjectURL(file)}
                                          ref={(el) => (videoRefs.current[`TB-${crr.id}-${indexItem}`] = el)}
                                          onClick={() => {
                                             const videoElement = videoRefs.current[`TB-${crr.id}-${indexItem}`]; // Access the specific video ref
                                             if (videoElement) {
                                                videoElement.requestFullscreen(); // Request fullscreen
                                                videoElement.play(); // Play the video
                                             }
                                          }}
                                       >
                                          Your browser does not support the video tag.
                                       </video>
                                       <span className={style.playbackOverlay}>▶</span>
                                    </>
                                 ) : (
                                    <img className={style.rightSideImageItemImage} alt="" src={file ? URL.createObjectURL(file) : noImageAvailable} />
                                 )}
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem, 'TB')}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
               return null;
            })}

            {jobState?.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {`CV${crr.id}`}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           const file = crr.images[indexItem];
                           const isVideo = file && file.type.startsWith('video');
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 {isVideo ? (
                                    <>
                                       <video
                                          className={style.rightSideImageItemImage}
                                          src={URL.createObjectURL(file)}
                                          ref={(el) => (videoRefs.current[`CV-${crr.id}-${indexItem}`] = el)}
                                          onClick={() => {
                                             const videoElement = videoRefs.current[`CV-${crr.id}-${indexItem}`]; // Access the specific video ref
                                             if (videoElement) {
                                                videoElement.requestFullscreen(); // Request fullscreen
                                                videoElement.play(); // Play the video
                                             }
                                          }}
                                       >
                                          Your browser does not support the video tag.
                                       </video>
                                       <span className={style.playbackOverlay}>▶</span>
                                    </>
                                 ) : (
                                    <img className={style.rightSideImageItemImage} alt="" src={file ? URL.createObjectURL(file) : noImageAvailable} />
                                 )}
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem, 'CV')}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
            })}

            {planState?.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {`KH${crr.id}`}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           const file = crr.images[indexItem];
                           const isVideo = file && file.type.startsWith('video');
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 {isVideo ? (
                                    <>
                                       <video
                                          className={style.rightSideImageItemImage}
                                          src={URL.createObjectURL(file)}
                                          ref={(el) => (videoRefs.current[`KH-${crr.id}-${indexItem}`] = el)}
                                          onClick={() => {
                                             const videoElement = videoRefs.current[`KH-${crr.id}-${indexItem}`]; // Access the specific video ref
                                             if (videoElement) {
                                                videoElement.requestFullscreen(); // Request fullscreen
                                                videoElement.play(); // Play the video
                                             }
                                          }}
                                       >
                                          Your browser does not support the video tag.
                                       </video>
                                       <span className={style.playbackOverlay}>▶</span>
                                    </>
                                 ) : (
                                    <img className={style.rightSideImageItemImage} alt="" src={file ? URL.createObjectURL(file) : noImageAvailable} />
                                 )}
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem, 'KH')}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
            })}

            {proposeState?.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {`ĐX${crr.id}`}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           const file = crr.images[indexItem];
                           const isVideo = file && file.type.startsWith('video');
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 {isVideo ? (
                                    <>
                                       <video
                                          className={style.rightSideImageItemImage}
                                          src={URL.createObjectURL(file)}
                                          ref={(el) => (videoRefs.current[`ĐX-${crr.id}-${indexItem}`] = el)}
                                          onClick={() => {
                                             const videoElement = videoRefs.current[`ĐX-${crr.id}-${indexItem}`]; // Access the specific video ref
                                             if (videoElement) {
                                                videoElement.requestFullscreen(); // Request fullscreen
                                                videoElement.play(); // Play the video
                                             }
                                          }}
                                       >
                                          Your browser does not support the video tag.
                                       </video>
                                       <span className={style.playbackOverlay}>▶</span>
                                    </>
                                 ) : (
                                    <img className={style.rightSideImageItemImage} alt="" src={file ? URL.createObjectURL(file) : noImageAvailable} />
                                 )}
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem, 'ĐX')}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
            })}

            {issueState?.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {`SC${crr.id}`}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           const file = crr.images[indexItem];
                           const isVideo = file && file.type.startsWith('video');
                           return (
                              <div className={style.rightSideImageItem} key={`SC-${crr?.id}-${indexItem}`}>
                                 {isVideo ? (
                                    <>
                                       <video
                                          className={style.rightSideImageItemImage}
                                          src={URL.createObjectURL(file)}
                                          ref={(el) => (videoRefs.current[`SC-${crr.id}-${indexItem}`] = el)}
                                          onClick={() => {
                                             const videoElement = videoRefs.current[`SC-${crr.id}-${indexItem}`]; // Access the specific video ref
                                             if (videoElement) {
                                                videoElement.requestFullscreen(); // Request fullscreen
                                                videoElement.play(); // Play the video
                                             }
                                          }}
                                       >
                                          Your browser does not support the video tag.
                                       </video>
                                       <span className={style.playbackOverlay}>▶</span>
                                    </>
                                 ) : (
                                    <img className={style.rightSideImageItemImage} alt="" src={file ? URL.createObjectURL(file) : noImageAvailable} />
                                 )}
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem, 'SC')}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
            })}
         </div>
      </section>
   );
}

//JSX_END: Right side component
