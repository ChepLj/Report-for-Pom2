//JSX: Right side component

import { Button } from '@mui/material';
import { handelOpenTextFile } from '../../../FCComponent/browserFile';
import { getKeyByValue } from '../../../FCComponent/getKeyByValue';
import style from './RightSide.module.css';
import { MIMEtype } from '../../../FCComponent/MIMEtype';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import noImageAvailable from '../../../static/img/No_Image_Available.jpg';

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

   const arrayImageRender = [1, 2, 3, 4];

   //TODO: handle delete File
   const handleDeleteFile = (id, itemIndex) => {
      setFile('');
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
            <div style={{ color: 'green', fontWeight: 600, textAlign: 'start', margin: '5px' }}>{file?.name ? file.name : '...'}</div>
            <div style={{ color: 'gray', fontStyle: 'italic', textAlign: 'start', margin: '5px' }}>
               {file?.size ? (
                  <span
                     className={`material-symbols-outlined ${style.fileDeleteIcon}`}
                     onClick={(e) => {
                        handleDeleteFile();
                     }}
                  >
                     delete
                  </span>
               ) : (
                  ''
               )}

               <span style={{ padding: '5px' }}>type: {file?.type ? getKeyByValue(MIMEtype, file?.type) : '...'}</span>
               <span style={{ padding: '5px' }}>size: {file?.size ? file.size : '...'} BYTE</span>
            </div>
         </div>
         <div className={style.rightSideFile}>
            <div className={style.rightSideFileHeader}>
               <span style={{ color: 'black', fontWeight: 600, textAlign: 'start' }}>Image</span>
            </div>
            {equipmentStatusState?.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {`TB${crr.id}`}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.images[indexItem] ? URL.createObjectURL(crr.images[indexItem]) : noImageAvailable}
                                 />
                                 <div className={style.rightSideImageItemDeleteIcon} onClick={() => handleDeleteImage(crr.id, indexItem, 'TB')}>
                                    <HighlightOffRoundedIcon className={style.rightSideImageItemDeleteIconItem} />
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
               }
            })}


            {jobState?.map((crr, index) => {
               if (crr.images.length) {
                  return (
                     <section className={style.rightSideImageList} key={index}>
                        {`CV${crr.id}`}
                        {arrayImageRender.map((crrItem, indexItem) => {
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.images[indexItem] ? URL.createObjectURL(crr.images[indexItem]) : noImageAvailable}
                                 />
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
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.images[indexItem] ? URL.createObjectURL(crr.images[indexItem]) : noImageAvailable}
                                 />
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
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.images[indexItem] ? URL.createObjectURL(crr.images[indexItem]) : noImageAvailable}
                                 />
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
                           return (
                              <div className={style.rightSideImageItem} key={`${crr?.id}-${indexItem}`}>
                                 <img
                                    className={style.rightSideImageItemImage}
                                    alt=""
                                    src={crr.images[indexItem] ? URL.createObjectURL(crr.images[indexItem]) : noImageAvailable}
                                 />
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
