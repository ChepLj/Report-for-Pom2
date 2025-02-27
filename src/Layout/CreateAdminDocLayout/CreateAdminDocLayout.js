import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './CreateAdminDocLayout.module.css';
import Header from './Header/Header';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';
import { handelOpenImageFile, handelOpenTextFile } from '../../FCComponent/browserFile';

export default function CreateAdminDocLayout() {
   const [jobState, setJobState] = useState([{ id: 1, images: [] }]);
   const [planState, setPlanState] = useState([{ id: 1, images: [] }]);
   const [proposeState, setProposeState] = useState([{ id: 1, images: [] }]);
   const [issueState, setIssueState] = useState([{ id: 1, images: [] }]);
   const [equipmentState, setEquipmentState] = useState([]);
   const [snackBarOpen, setSnackBarOpen] = useState(false);
   const [file, setFile] = useState([]);

   let location = useLocation(); //dùng useLocation để lấy prop
   const user = location.state.user;

   let auth = {};
   if (localStorage.getItem('user')) {
      auth = JSON.parse(localStorage.getItem('user'));
   } else {
      window.location.href = '/login';
   }
   ////////

   //TODO: handle add image
   const handleAddImage = (id, group) => {
      const handleImageUpdate = (state, setState) => {
         const updatedState = state.map((item) => {
            if (item.id === id) {
               if (Array.isArray(item.images) && item.images.length < 4) {
                  handelOpenImageFile((newImages) => {
                     item.images = handleNewArray(newImages, item.images || []);
                     setState(updatedState);
                  });
               } else if (!Array.isArray(item.images)) {
                  handelOpenImageFile((newImages) => {
                     item.images = handleNewArray(newImages, []);
                     setState(updatedState);
                  });
               } else {
                  setSnackBarOpen(true);
               }
            }
            return item;
         });
      };

      const handleNewArray = (newImages, currentImages) => {
         const updatedImages = [...currentImages, ...newImages];
         if (updatedImages.length <= 4) {
            return updatedImages;
         } else {
            setSnackBarOpen(true);
            return updatedImages.slice(0, 4);
         }
      };

      switch (group) {
         case 'CV': {
            handleImageUpdate(jobState, setJobState);
            break;
         }
         case 'KH': {
            handleImageUpdate(planState, setPlanState);
            break;
         }
         case 'ĐX': {
            handleImageUpdate(proposeState, setProposeState);
            break;
         }
         case 'SC': {
            handleImageUpdate(issueState, setIssueState);
            break;
         }
      }
   };

   
   //TODO_END: handle add image

   //TODO: choose file
   const handleChooseFile = () => {
      try {
         const checkFile = (newFileArray) => {
            const tempArray = file.concat(newFileArray);

            if (tempArray.length < 6) {
               setFile([...file, ...newFileArray]);
            } else {
               alert('You can upload a maximum of 5 files!');
            }
         };
         handelOpenTextFile(checkFile);
      } catch (error) {
         console.error(error);
      }
   };
   //TODO_END: choose file

   return (
      <section className={style.container}>
         <Header auth={auth} mediaData={{ images: { jobImage: jobState ,planImage: planState ,proposeImage: proposeState ,issueImage: issueState }, attachments: file }} />
         <section className={style.contentWrap}>
            <div className={style.leftSide}>
               <LeftSide
                  user={user}
                  handleAddImage={handleAddImage}
                  jobState={jobState}
                  setJobState={setJobState}
                  equipmentState={equipmentState}
                  setEquipmentState={setEquipmentState}
                  planState={planState}
                  setPlanState={setPlanState}
                  proposeState={proposeState}
                  setProposeState={setProposeState}
                  handleChooseFile={handleChooseFile}
                  issueState={issueState}
                  setIssueState={setIssueState}
               />
            </div>
            <div className={style.rightSide}>
               <RightSide
                  jobState={jobState}
                  planState={planState}
                  issueState={issueState}
                  setIssueState={setIssueState}
                  setPlanState={setPlanState}
                  proposeState={proposeState}
                  setProposeState={setProposeState}
                  setJobState={setJobState}
                  handleChooseFile={handleChooseFile}
                  file={file}
                  setFile={setFile}
               />
            </div>
         </section>

         <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
            <Alert onClose={() => setSnackBarOpen(false)} severity="warning" sx={{ width: '100%', color: 'red' }}>
               Maximum 4 images in this line!
            </Alert>
         </Snackbar>
      </section>
   );
}
