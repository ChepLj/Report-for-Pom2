import { update } from 'firebase/database'
import { useRef, useState } from 'react'
import { dbRT } from '../../../../../firebase/firebaseConfig'
import Modal from '../../../../../Modal/Modal'
import style from './AdminReport.module.css'
import deleteFolderDataFromStorage from '../../../../../api/deleteFolderDataFromStorage';

export default function AdminReport({ data, authEmailCurrent }) {
   const arrayData = []
   if (data) {
      for (const key in data) arrayData.push(data[key])
      arrayData.reverse()
   }
   return (
      <section className={style.warp}>
         <div className={style.title}>Báo cáo hành chính</div>
         <div className={style.elementsWarp}>
            {arrayData.map((crr, index) => {
               return <ElementDoc data={crr} key={index} authEmailCurrent={authEmailCurrent} />
            })}
         </div>
      </section>
   )
}

function ElementDoc({ data, authEmailCurrent }) {
   const [state, setState] = useState({state: false, ref: ''})

   ////////////////////
   const handelConfirm = (ref) => {
      let valueConfirm = prompt('Nhập mã sau để xóa ( pomina )')
      if (valueConfirm.trim() === 'pomina') {
         handelDelete(ref)
      } else {
         alert('Lỗi ! Mã xác thực không đúng !!!')
      }
   }
   const handelDelete = (ref) => {
      try {
         const object = {};
         const newReportRef = 'NewReport/' + ref.replace(/[^0-9]/g, '');
         object[ref] = null;
         object[newReportRef] = null;
         // dung hàm update với giá trị null để xóa
         const callback = (result) => {
            if (result == 'All files deleted successfully.') {
               window.location.href = '/';
               alert('Xóa thành công !!!');
            }
            else{
               alert('Lỗi xóa file ! báo cáo đã được xóa, nhưng file và hình ảnh đính kèm không được xóa.')
               window.location.href = '/';
            }
         };

         update(dbRT, object)
            .then((result) => {
               deleteFolderDataFromStorage(data, callback);
            })
            .catch((error) => {
               throw Error(error);
            });
      } catch (error) {
         alert('Lỗi', error);
      }
   };
   ////////////////
   return (
      <>
         <section
            className={style.documentWarp}
            onClick={() => {
               setState({state: true, ref: data.ref})
            }}
         >
            <div className={style.document}>
               Báo cáo HC{' '}
               <span  style={{ color: 'red', fontSize: '22px', fontWeight: '700' }}>
                  <br />
                  {data.date.date}
               </span>
               <br />
               Tháng{' '}
               <span style={{ color: 'green', fontSize: '22px', fontWeight: '700' }}>
                  {data.date.month}
               </span>
               <br />
               <span className={style.userName}>{data.user}</span>
               <div className={style.time}>{data.date.timestamp}</div>
            </div>
            {(data.authEmail === authEmailCurrent || authEmailCurrent === 'permission') && (
               <span
                  className={`${style.delete} material-symbols-outlined `}
                  onClick={(event) => {
                     handelConfirm(data.ref)
                     // handelDelete(data.ref)
                     event.stopPropagation()
                  }}
               >
                  delete
               </span>
            )}
         </section>
         {/* ẩn hiện Save Modal */}
         {state.state && (
            <Modal
               type={'adminReport'}
               upload={false}
               refDirection={state.ref}
               callBackClose={(value) => {
                  setState(false)
               }}
            />
         )}
      </>
   )
}
