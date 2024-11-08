import { useEffect, useState } from 'react';
import style from './EquipmentHandover.module.css';
import { useRef } from 'react';
import { getFirebaseData } from '../../../handelAction/getFirebaseData'
//////////////// Vật tue bàn giao///////////////////
export default function EquipmentHandover() {
   const [handoverEquip, setHandoverEquip] = useState([])
   const [state, setState] = useState([]);
   const nameRef = useRef(null);
   const amountRef = useRef(null);
   const unitRef = useRef(null);
   useEffect(() => {
      // TODO: goi lên firebase để lấy vật tu bàn giao của ca trước
      getFirebaseData('Handover/Admin').then((data) => {
         const dataResults = data.val();
         const initHandoverEquip = [];
         for (const item in dataResults) {
            initHandoverEquip.push([dataResults[item]?.name, dataResults[item]?.amount, dataResults[item]?.unit]); //:chuyển qua dạng mảng
         }
         setHandoverEquip(initHandoverEquip);
      });
   }, []);
   useEffect(() => {
      setState([...handoverEquip]);
   }, [handoverEquip]);

   const handelAddEquipmentField = () => {
      const nameEquip = nameRef.current.innerText;
      const amountEquip = amountRef.current.innerText;
      const unitEquipElm = unitRef.current.value;

      if (nameEquip !== '' && amountEquip !== '') {
         // kiểm tra nếu có dữ liệu thì mới cho thêm
         const array = [...state, [nameEquip, amountEquip, unitEquipElm]];
         nameRef.current.innerText = ''; // xoa sau khi them
         amountRef.current.innerText = ''; // xoa sau khi them
         unitRef.current.value = 'Cái';
         setState(array);
      } else {
         alert('Tên Vật Tư và Số Lượng không được bỏ trống !!!');
      }
   };
   const handelDeleteEquipmentField = (indexDlt) => {
      const indexDltParseInt = parseInt(indexDlt, 10);
      const newArray = [];
      state.forEach((crr, index) => {
         if (index !== indexDltParseInt) {
            newArray.push(crr);
         }
      });
      setState(newArray);
   };

   return (
      <div className={style.fieldJobWarp}>
         <div className={`${style.fieldEquipHandOverWrap}`}>
            <ul className={style.fieldJobList} style={{ padding: 0, marginTop: '3px', marginBottom: '3px' }}>
               {state.map((crr, index) => {
                  return (
                     <li className={`${style.fieldEquipHandOverItem} create-handover`} key={index}>
                        <span
                           className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                           onClick={(e) => {
                              handelDeleteEquipmentField(e.target.dataset.index);
                           }}
                           data-index={index}
                        >
                           delete
                        </span>
                        <span className={style.spaceLR5} style={{ width: '20px', textAlign: 'right' }}>
                           {index + 1}.
                        </span>
                        <span className="handoverItem" style={{ color: 'blue', flex: 1, flexBasis: '100%' }} data-handover-input="name">
                           {crr[0]}
                        </span>
                        <p
                           className={`${style.fieldJobItemInput} handoverItem`}
                           style={{ color: 'blue', paddingTop: 0, paddingBottom: 0 }}
                           data-handover-input="amount"
                           // data-job-input={index}
                           contentEditable="true"
                           suppressContentEditableWarning={true}
                        >
                           {crr[1]}
                        </p>
                        <span className={`${style.unit} handoverItem`} data-handover-input="unit">
                           {crr[2]}
                        </span>
                     </li>
                  );
               })}
            </ul>
         </div>
         {/* ///////////////////////////////// */}
         <div className={style.fieldJobTitle}>Thêm vật tư/ Công cụ mới</div>
         <section className={style.fieldJobList}>
            <div className={`${style.fieldIssueItem} add-handover-equip`}>
               <div className={style.fieldIssueItemContentWarp}>
                  <div className={style.fieldIssueItemContentWarpItem}>
                     <span className={style.fieldIssueItemTitleChild}>Tên công cụ*</span>
                     <p className={`${style.fieldJobItemInput} name`} ref={nameRef} contentEditable="true" />
                  </div>
                  <div className={style.fieldIssueItemContentWarpItem}>
                     <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                     <p
                        className={`${style.fieldJobItemInput} amount`}
                        ref={amountRef}
                        style={{ textAlign: 'right' }}
                        contentEditable="true"
                        inputMode="numeric"
                     />
                     <span className={style.space5}></span>
                     <select className={`${style.optionUnit} unit`} ref={unitRef} name="unit">
                        <option value={'Cái'}>Cái</option>
                        <option value={'Bộ'}>Bộ</option>
                        <option value={'Mét'}>Mét</option>
                        <option value={'Cuộn'}>Cuộn</option>
                        <option value={'Thanh'}>Thanh</option>
                        <option value={'Hộp'}>Hộp</option>
                     </select>
                     <span className={style.spaceLR2dot5}></span>
                  </div>
               </div>
            </div>

            <div className={style.addJobWrap} onClick={handelAddEquipmentField}>
               <div className={style.addJobWrapText}>Thêm Công Cụ </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </section>
      </div>
   );
}

/////////////////handel even///////////////////////
