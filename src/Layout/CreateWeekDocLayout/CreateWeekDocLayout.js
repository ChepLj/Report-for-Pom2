import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './CreateWeekDocLayout.module.css';
import Header from './Header/Header';
import LeftSide from '../CreateMonthDocLayout/LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';
import { handelOpenImageFile, handelOpenTextFile } from '../../FCComponent/browserFile';

export default function CreateWeekDocLayout() {
   const [jobState, setJobState] = useState([{ id: 1, images: [] }]);
   const [planState, setPlanState] = useState([{ id: 1, images: [] }]);
   const [proposeState, setProposeState] = useState([{ id: 1, images: [] }]);
   const [issueState, setIssueState] = useState([{ id: 1, images: [] }]);
   const [equipmentState, setEquipmentState] = useState([]);
   const [snackBarOpen, setSnackBarOpen] = useState(false);
   const [file, setFile] = useState();

   let location = useLocation(); //dùng useLocation để lấy prop
   const user = location.state.user;

   let auth = {};
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'));
   } else {
      window.location.href = '/login';
   }
   ////////

   //TODO: handle add image
   const handleAddImage = (id, group) => {
      switch (group) {
         case 'CV': {
            const updatedJobState = jobState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length < 4) {
                     const handleNewArray = (image) => {
                        const updatedImages = [...(item.images || []), image];
                        item.images = updatedImages;
                        setJobState(updatedJobState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else if (!Array.isArray(item.images)) {
                     const handleNewArray = (image) => {
                        item.images = [image];
                        setJobState(updatedJobState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else {
                     setSnackBarOpen(true);
                  }
               }
               return item;
            });
            break;
         }
         case 'KH': {
            const updatedPlanState = planState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length < 4) {
                     const handleNewArray = (image) => {
                        const updatedImages = [...(item.images || []), image];
                        item.images = updatedImages;
                        setPlanState(updatedPlanState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else if (!Array.isArray(item.images)) {
                     const handleNewArray = (image) => {
                        item.images = [image];
                        setPlanState(updatedPlanState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else {
                     setSnackBarOpen(true);
                  }
               }
               return item;
            });
            break;
         }
         case 'ĐX': {
            const updatedProposeState = proposeState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length < 4) {
                     const handleNewArray = (image) => {
                        const updatedImages = [...(item.images || []), image];
                        item.images = updatedImages;
                        setProposeState(updatedProposeState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else if (!Array.isArray(item.images)) {
                     const handleNewArray = (image) => {
                        item.images = [image];
                        setProposeState(updatedProposeState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else {
                     setSnackBarOpen(true);
                  }
               }
               return item;
            });
            break;
         }
         case 'SC': {
            const updatedIssueState = issueState.map((item) => {
               if (item.id === id) {
                  if (Array.isArray(item.images) && item.images.length < 4) {
                     const handleNewArray = (image) => {
                        const updatedImages = [...(item.images || []), image];
                        item.images = updatedImages;
                        setIssueState(updatedIssueState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else if (!Array.isArray(item.images)) {
                     const handleNewArray = (image) => {
                        item.images = [image];
                        setIssueState(updatedIssueState);
                     };
                     handelOpenImageFile(handleNewArray);
                  } else {
                     setSnackBarOpen(true);
                  }
               }
               return item;
            });
            break;
         }
      }
      
   };
   //TODO_END: handle add image

   //TODO: choose file
   const handleChooseFile = () => {
      handelOpenTextFile(setFile);
   };
   //TODO_END: choose file

   return (
      <section className={style.container}>
         <Header auth={auth} mediaData={{ images: { jobImage: jobState ,planImage: planState ,proposeImage: proposeState ,issueImage: issueState }, attachments: [file] }} />
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
