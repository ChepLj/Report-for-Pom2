import { useEffect, useState } from 'react';
import style from './Filter.module.css';

export default function Filter({ user, callback }) {
   const [hasRun, setHasRun] = useState(false);
   const arrayUser = [];
   if (user) {
      for (const key in user) {
         arrayUser.push(user[key]);
      }
   }

   // kiểm tra điều kiện lọc và gọi callback
   const checkFilter = () => {
      const type = [];
      const user = [];
      const nodeListTypeFilter = document.querySelectorAll(`.${style.buttonTypeFilter}`);
      const nodeListUserFilter = document.querySelectorAll(`.${style.buttonUserFilter}`);
      for (const value of nodeListTypeFilter) {
         if (value.classList.contains(style.active)) {
            type.push(value.innerText);
         }
      }
      //
      for (const value of nodeListUserFilter) {
         if (value.classList.contains(style.active)) {
            user.push(value.innerText);
         }
      }

      // goi ham callback de render lai
      callback({ type: type, user: user });
   };

   //  hàm xử lý khi nhấn loại báo cáo
   const handelEvenTypeClick = (e) => {
      const nodeList = document.querySelectorAll(`.${style.buttonTypeFilter}`);
      if (e.innerText === 'Tất Cả') {
         if (!e.classList.contains(style.active)) {
            for (const value of nodeList) {
               value.classList.remove(style.active);
            }
            e.classList.add(style.active);
         }
      } else {
         document.querySelector(`.${style.allTypeFilter}`).classList.remove(style.active);
         e.classList.toggle(style.active);
      }
      ////// kiểm tra xem có nút nào được nhấn hay không
      const nodeListCheck = document.querySelectorAll(`.${style.buttonTypeFilter}`);
      for (const node of nodeListCheck) {
         if (node.classList.contains(style.active)) {
            return checkFilter(); //nếu có 1 nút bất kì được chọn thì kết thúc kiểm tra
         }
      }
      // nếu không có nút nào được chọn thì gán cho nút Tất cả
      document.querySelector(`.${style.allTypeFilter}`).classList.add(style.active);
      checkFilter();
   };
   /////////  hàm xử lý khi nhấn người báo cáo
   const handelEvenUserClick = (e) => {

      const nodeList = document.querySelectorAll(`.${style.buttonUserFilter}`)
      if (e.innerText === 'Tất Cả') {
         if (!e.classList.contains(style.active)) {
            for (const value of nodeList) {
               value.classList.remove(style.active)
            }
            e.classList.add(style.active)

         }
      } else {

         document.querySelector(`.${style.allUserFilter}`).classList.remove(style.active)
         e.classList.toggle(style.active)
      }
      ////// kiểm tra xem có nút nào được nhấn hay không
      const nodeListCheck = document.querySelectorAll(`.${style.buttonUserFilter}`)
      for (const node of nodeListCheck) {
         if (node.classList.contains(style.active)) {
            return checkFilter() //nếu có 1 nút bất kì được chọn thì kết thúc kiểm tra
         }
      }
      // nếu không có nút nào được chọn thì gán cho nút Tất cả
      document.querySelector(`.${style.allUserFilter}`).classList.add(style.active)
      checkFilter()
   };

   //////////
   useEffect(() => {
      if (user && !hasRun) {
         console.log("🚀 ~ useEffect ~ user:", user);
         console.log('user');
         const nodeListTypeFilter = document.querySelectorAll(`.${style.buttonTypeFilter}`);
         const nodeListUserFilter = document.querySelectorAll(`.${style.buttonUserFilter}`);
   
         for (const value of nodeListTypeFilter) {
            value.addEventListener('click', (e) => {
               handelEvenTypeClick(e.target);
            });
         }
         ///////////
         for (const value of nodeListUserFilter) {
            value.addEventListener('click', (e) => {
               handelEvenUserClick(e.target);
            });
         }
   
         setHasRun(true); // Mark as executed
      }
   }, [user]); // Include user to check for initial content
   return (
      <section className={style.warp}>
         <div className={style.titleWarp}>
            <div className={style.title}>Lọc Báo Cáo Theo </div>
            <span className={`material-symbols-outlined ${style.titleIcon}`}>filter_alt</span>
         </div>
         <section className={style.fieldWarp}>
            <div className={style.fieldTitle}>Loại Báo Cáo</div>
            <ul className={style.lists}>
               <button className={`${style.buttonTypeFilter} ${style.allTypeFilter} ${style.button} ${style.active}`}>Tất Cả</button>
               <button className={`${style.buttonTypeFilter} ${style.button}`}>Báo Cáo Ca</button>
               <button className={`${style.buttonTypeFilter} ${style.button}`}>Báo Cáo Tuần</button>
               <button className={`${style.buttonTypeFilter} ${style.button}`}>Báo Cáo Tháng</button>
               <button className={`${style.buttonTypeFilter} ${style.button}`}>Kế Hoạch Bảo Trì</button>
            </ul>
         </section>
         <section className={style.fieldWarp}>
            <div className={style.fieldTitle}>Người Báo Cáo</div>
            <ul className={style.listsUser} >
               <button className={`${style.buttonUserFilter} ${style.allUserFilter} ${style.button}  ${style.active}`}>Tất Cả</button>
               {arrayUser.map((crr, index) => {
                  return (
                     <button className={`${style.buttonUserFilter} ${style.button}`} key={index}>
                        {crr}
                     </button>
                  );
               })}
            </ul>
         </section>
      </section>
   );
}
