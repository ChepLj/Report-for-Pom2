import style from './DelayReport.module.css'
import { useRef, useState } from 'react'
import Modal from '../../../../../Modal/Modal'
import { dbRT } from '../../../../../firebase/firebaseConfig'
import { update } from 'firebase/database'

export default function DelayReport({ data, authEmailCurrent }) {
   const arrayData = []
   if (data) {
      for (const key in data) arrayData.push(data[key])
      arrayData.reverse()
   }
   return (
      <section className={style.warp}>
         <div className={style.title}>Báo cáo delay</div>
         <div className={style.elementsWarp}>
            {arrayData.map((crr, index) => {
               return <ElementDoc data={crr} key={index} authEmailCurrent={authEmailCurrent} />
            })}
         </div>
      </section>
   )
}

function ElementDoc({ data, authEmailCurrent }) {
   const [state, setState] = useState({state: false, ref:''})
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
      const object = {}
      const newReportRef = 'NewReport/' + ref.replace(/[^0-9]/g, '')
      object[ref] = null
      object[newReportRef] = null
      // dung hàm update với giá trị null để xóa
      update(dbRT, object)
         .then((result) => {
            window.location.href = '/'
            alert('Xóa thành công !!!')
         })
         .catch((error) => {
            alert('Lỗi', error)
         })
   }
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
               Báo cáo Delay
               <span style={{ color: 'green', fontSize: '28px', fontWeight: '700' }}>
                  <br />
                  {data.date.month}
                  {/* <br /> */}
                  <span style={{fontSize: '12px'}}>/{data.date.year}</span>
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
               type={'delayReport'}
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
