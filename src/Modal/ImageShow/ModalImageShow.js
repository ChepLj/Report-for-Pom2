import style from './ModalImageShow.module.css';
import noImage from '../../static/img/No_Image_Available.jpg'

export function ModalImageShow({ modalImageOpen, setModalImageOpen }) {
   //TODO: handle change image main view
   const handelChangeImageMainView = (image) => {
      const mainImageElm = document.getElementById('viewPort2ModalImageMainView');
      mainImageElm.src = image;
   };
   //TODO_END: handle change image main view
   return (
      <div className={style.mainContainer}>
         <span className={style.closeButton} onClick={() => setModalImageOpen({ isOpen: false })}>
            Close
         </span>
         <div className={style.mainImage}>
            <img src={modalImageOpen?.data?.[0].fileURL} className={style.mainImageItem} id="viewPort2ModalImageMainView" />
         </div>
         <div className={style.sideImage}>
            {modalImageOpen.data.map((crr, index) => {
               return (
                  <div className={style.sideImageItem} key={index}>
                     <img
                        className={style.sideImageItemImg}
                        src={crr.fileURL}
                        onError={(e) => {
                           e.target.src = noImage;
                        }}
                        onClick={() => handelChangeImageMainView(crr.fileURL)}
                     />
                  </div>
               );
            })}
         </div>
      </div>
   );
}
