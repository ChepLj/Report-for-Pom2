import style from './CreateShiftDocLayout.module.css';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import { getFirebaseData } from '../../handelAction/getFirebaseData';
import getTimeAPI from './../../handelAction/getTime';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';

export default function CreateShiftDocLayout() {
   // let location = useLocation(); //dùng useLocation để lấy prop
   const [handoverEquip, setHandoverEquip] = useState([]);

   // const user = location.state.user;

   let auth = {};
   if (sessionStorage.getItem('user')) {
      auth = JSON.parse(sessionStorage.getItem('user'));
   } else {
      window.location.href = '/login';
   }

   useEffect(() => {
      // TODO: goi lên firebase để lấy vật tu bàn giao của ca trước
      getFirebaseData('ShiftEquipHandover').then((data) => {
         const dataResults = data.val();
         const initHandoverEquip = [];
         for (const item in dataResults) {
            initHandoverEquip.push([dataResults[item]?.name, dataResults[item]?.amount, dataResults[item]?.unit]); //:chuyển qua dạng mảng
         }
         setHandoverEquip(initHandoverEquip);
      });
   }, []);
   return (
      <section className={style.container}>
         <Header auth={auth} />
         {/* <h2>Đang phát triển, vui lòng quay lại sau!!!</h2> */}
         <section className={style.contentWrap}>
            <div className={style.leftSide}>
               <LeftSide />
            </div>
            <div className={style.rightSide}>
               <RightSide handoverEquip={handoverEquip} />
            </div>
         </section>
      </section>
   );
}
