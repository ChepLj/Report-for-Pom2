import ProgressUpload from './ProgressUpload/ProgressUpload';
import SaveModal from './SaveModal/SaveModal';
import { useEffect, useState } from 'react';
import { getFirebaseData } from '../handelAction/getFirebaseData';
import { ModalImageShow } from './ImageShow/ModalImageShow';
import style from "./Modal.module.css"


export default function Modal({ type, upload = false, refDirection, callBackClose, mediaData }) {
   const [state, setState] = useState([false, {}]);
   const [modalImageOpen, setModalImageOpen] = useState({ isOpen: false, data: [] });
   const reRender = (result) => {
      setState([true, result]);
   };

   ////////////////////
   useEffect(() => {
      if (upload) {
         setState([false, {}]);
      } else {
         //! lấy du lieu tu server khi o che do xem o trang chu
         refDirection &&
            getFirebaseData(refDirection).then((result) => {
               setState([true, result.val()]);
            });
      }
   }, []);

   return (
      <section className={style.modal}>
         <div className={style.form}>
            {state[0] ? (
               <SaveModal type={type} state={state} callBackClose={callBackClose} setModalImageOpen={setModalImageOpen} />
            ) : (
              upload && <ProgressUpload reRender={reRender} type={type} mediaData={mediaData} />
            )}
         </div>
         {modalImageOpen.isOpen && <ModalImageShow modalImageOpen={modalImageOpen} setModalImageOpen={setModalImageOpen} />}
      </section>
   );
}
