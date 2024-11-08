import { useState } from 'react'
import SaveModal from '../../../Modal/SaveModal/SaveModal'
import style from './Header.module.css'
import logo from '../../../static/img/logo.png'
import Modal from '../../../Modal/Modal';
export default function Header({ auth, mediaData }) {
   const [state, setState] = useState(false)
   auth.displayName ??= 'guest'
   auth.email ??= 'none'
   auth.photoURL ??= 'https://cdn4.iconfinder.com/data/icons/hotel-service-5/300/guest-512.png'

   // Check bỏ trống trường sự cố
   const validateIssue = () => {
      const issueElm = document.querySelectorAll('.create-issue')
      const jobElm = document.querySelectorAll('.create-job')
      const planElm = document.querySelectorAll('.create-plan')
      const proposeElm = document.querySelectorAll('.create-propose')
      const shiftElm = document.getElementsByName('shiftShiftReport');
      const collectElm = [...jobElm, ...planElm, ...proposeElm]
      if(shiftElm[0].value == ''){
         alert('Chưa chọn Ca')
         return false
      }
      for (const item of issueElm) {
         const pTagnameInput = item.querySelector('p[data-issue-input=name]')
         const pTagResultInput = item.querySelector('p[data-issue-input=result]')
         if (pTagnameInput.innerText.trim() === '') {
               alert('LỖI ! Tên đầu việc trong Mục sự cố không được bỏ trống !!!')
               return false
            }
            if (pTagResultInput.innerText.trim() === '') {
               alert('LỖI ! Kết quả trong Mục sự cố không được bỏ trống !!!')
               return false
            }
      }
      /////////////// Check dữ liệu trống
      // for (const item of collectElm) {
      //    const pTagInput = item.getElementsByTagName('p')
      //    for (const item of pTagInput) {
      //       if (!(item.innerText.trim() === '')) {
      //          return true
      //       }
      //    }
      // }
      // ////////////////
      // alert('LỖI ! Phải điền ít nhất 1 trường')
     
      return true
   }
   /////////
   return (
      <section className={style.warp}>
         <div
            className={style.home}
            onClick={() => {
               window.location.href = '/'
            }}
         >
            <img className={style.logo} src={logo} />
            Home
         </div>

         <div className={style.nav}>
            <div
               className={style.writeReport}
               onClick={() => {
                  if (validateIssue()) {
                     const confirmed = window.confirm(
                        'Kiểm tra dữ liệu trước khi Upload. Đảm bảo các trường phải được nhập. Nếu các trường bị bỏ trống, hình ảnh của trường đó sẽ không được Upload !\n(mẹo: nếu muốn upload nhiều hơn 4 bức hình, sử dụng ký tự dấu chấm ở trường tiếp theo)\n\nNhấn OK để Upload !!!',
                     );
                     if (confirmed) {
                        // User clicked OK
                        setState(true);
                     } else {
                        // User clicked Cancel
                        console.log('User canceled');
                     }
                  }
               }}
            >
               Lưu báo cáo{'...'}
               <span className="material-symbols-outlined">save</span>
            </div>

            <img className={style.avatar} src={auth.photoURL} />
         </div>
         {/* ẩn hiện Save Modal */}
         {state && (
            <Modal
            upload={true}
            mediaData={mediaData}
            type={'shiftReport'}
            callBackClose={(value) => {
               // setState(value)
               window.location.href = '/';
            }}
         />
         )}
      </section>
   )
}
