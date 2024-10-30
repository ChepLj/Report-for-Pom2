import style from './ModalImageShow.module.css';
import noImage from '../../static/img/No_Image_Available.jpg';
import { useState, useEffect } from 'react';

export function ModalImageShow({ modalImageOpen, setModalImageOpen }) {
   const [imageState, setImageState] = useState({ type: 'image', src: '' });
   //TODO: handle change image main view
   const handelChangeImageMainView = (image) => {
      const type = image.type || '';
      if (isVideoType(type)) {
         setImageState({ type: 'video', src: image.fileURL });
      } else {
         setImageState({ type: 'image', src: image.fileURL });
      }
   };
   //TODO_END: handle change image main view

   const isVideoType = (type) => {
      if (type) {
         return type.startsWith('video/');
      }
      return '';
   };
   useEffect(() => {
      const type = modalImageOpen?.data?.[modalImageOpen.index]?.type || '';

      if (isVideoType(type)) {
         setImageState({ type: 'video', src: modalImageOpen?.data?.[modalImageOpen.index]?.fileURL });
      } else {
         setImageState({ type: 'image', src: modalImageOpen?.data?.[modalImageOpen.index]?.fileURL });
      }
   }, [modalImageOpen.index]);

   return (
      <div className={style.mainContainer}>
         <span className={style.closeButton} onClick={() => setModalImageOpen({ isOpen: false })}>
            Close
         </span>
         <div className={style.mainImage}>
            {imageState.type == 'video' ? (
               <video
                  src={imageState.src}
                  className={style.mainImageItem}
                  onError={(e) => {
                     e.target.src = noImage; // Handle error
                  }}
                  controls
               />
            ) : (
               <img
                  src={imageState.src}
                  className={style.mainImageItem}
                  onError={(e) => {
                     e.target.src = noImage; // Handle error
                  }}
               />
            )}
         </div>
         <div className={style.sideImage}>
            {modalImageOpen.data.map((crr, index) => {
               const mediaUrl = crr.fileURL;
               const isVideo = isVideoType(crr.type);
               return (
                  <div className={style.sideImageItem} key={index} onClick={() => handelChangeImageMainView(crr)}>
                     {isVideo ? (
                        <div className={style.sideImageItemImg}>
                           <video
                              className={style.sideImageItemImg}
                              src={mediaUrl}
                              onError={(e) => {
                                 e.target.src = noImage; // Handle error
                              }}
                              //controls // Add controls if needed
                           >
                              Your browser does not support the video tag.
                           </video>
                           <span className={style.playbackOverlay}>▶</span>
                        </div>
                     ) : (
                        <img
                           src={mediaUrl}
                           alt={`Thumbnail ${index + 1}`}
                           onError={(e) => {
                              e.target.src = noImage;
                           }}
                           className={style.sideImageItemImg}
                        />
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
