
import { useEffect, useState } from 'react';
import getTimeAPI from '../../../handelAction/getTime';
import style from './LeftSide.module.css';
export default function LeftSide({}) {
   const date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
   const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   const year = [ 2024, 2025, 2026,2027,2028,2029,2030,2031,2032];

   ////////
   function setTime({ dateStamp, monthStamp, yearStamp, hourStamp, timeStamp }) {
      const timeElm = document.getElementsByTagName('select');

      //gán ngày tự động
      for (const Elm of timeElm) {
         if (Elm.name === 'shiftMonthReport') {
            Elm.value = monthStamp;
         } else if (Elm.name === 'shiftYearReport') {
            Elm.value = yearStamp;
         } else if (Elm.name === 'shiftDateReport') {
            hourStamp >= 8 && hourStamp <= 20 ? (Elm.value = dateStamp) : dateStamp === 1 ? (Elm.value = dateStamp) : (Elm.value = dateStamp - 1);
            // Elm.value = today.getDate()
            const sessionElm = document.querySelector('select[name=shiftSessionReport]');
            hourStamp >= 8 && hourStamp <= 20 ? (sessionElm.value = 'Ca Ngày') : (sessionElm.value = 'Ca Đêm');
         }
      }
   }
   //////////////////

   useEffect(() => {
      getTimeAPI(setTime);
   }, []);
   ///////////
   //TODO: set max width
   useEffect(() => {
      const inputs = document.querySelectorAll('[data-input-width-fixed]');
      for (const input of inputs) {
         const currentWidth = input.offsetWidth;
         input.style.maxWidth = `${currentWidth}px`;
      }
   }, []);

   //TODO_END: set max width
   return (
      <section className={style.writeArea}>
         <div className={style.writeAreaTitle}>Báo Cáo Ca</div>
         <div className={style.writeAreaTime}>
            <div>
               Ca
               <span className={style.space5}></span>
               <select className={style.optionWeek} name="shiftShiftReport">
                  <option value={''}></option>

                  <option value={'A'}>A</option>
                  <option value={'B'}>B</option>
                  <option value={'C'}>C</option>
                  <option value={'D'}>D</option>
                  <option value={'E'}>E</option>
                  <option value={'F'}>F</option>
               </select>
            </div>
            <span className={style.space10}></span>
            <select className={style.date} name="shiftSessionReport">
               <option value={'Ca Đêm'}>Ca Đêm</option>
               <option value={'Ca Ngày'}>Ca Ngày</option>
            </select>
            <span className={style.spaceLR2dot5}></span>
            <div>
               {' '}
               Ngày
               <span className={style.spaceLR2dot5}></span>
               <select className={style.date} name="shiftDateReport">
                  {date.map((crr, index) => {
                     return (
                        <option value={crr} key={index}>
                           {crr}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div>
               {' '}
               <span className={style.spaceLR2dot5}></span>
               Tháng
               <span className={style.spaceLR2dot5}></span>
               <select className={style.date} name="shiftMonthReport">
                  {month.map((crr, index) => {
                     return (
                        <option value={crr} key={index}>
                           {crr}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div>
               <span className={style.spaceLR2dot5}></span>
               Năm
               <span className={style.spaceLR2dot5}></span>
               <select className={style.date} name="shiftYearReport">
                  {year.map((crr, index) => {
                     return (
                        <option value={crr} key={index}>
                           {crr}
                        </option>
                     );
                  })}
               </select>
            </div>
         </div>

         <IssueWrite />
         <EquipmentUseWrite />
         <OrderWrite />
         <ProposeWrite />
      </section>
   );
}

/////////////////////
function IssueWrite() {
   const [state, setState] = useState([1]);

   const handelAddIssueField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeleteIssueField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-issue`);
      for (const item of arrayNode) {
         if (item.dataset.issueIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldIssueWarp}>
         <div className={style.fieldIssueTitle}>Công việc/ Sự cố trong CA</div>
         <ul className={style.fieldIssueList}>
            {/*  */}
            {state.map((crr, index) => {
               return (
                  <IssueWriteElement
                     key={index}
                     index={index}
                     callBack={(indexFB) => {
                        handelDeleteIssueField(indexFB);
                     }}
                  />
               );
            })}

            {/*  */}
            <div className={style.addIssueWrap} onClick={handelAddIssueField}>
               <div className={style.addIssueWrapText}>Thêm đầu việc </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}

function IssueWriteElement({ index, callBack }) {
   return (
      <li className={`${style.fieldIssueItem} create-issue`} data-issue-index={index}>
         <div className={style.fieldIssueItemTitle}>Công việc {index +1}</div>
         <div className={style.fieldIssueItemContentWarp}>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên đầu việc*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="name" data-input-width-fixed="width fixed" contentEditable="true" />
            </div>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Khu vực</div>
               <select style={{ margin: '0 2rem 0 2rem' }} name="shiftAreaSelect">
                  <option value={'LÒ EAF'}>LÒ EAF</option>
                  <option value={'LÒ LF'}>LÒ LF</option>
                  <option value={'CCM'}>CCM</option>
                  <option value={'TRẠM NÉN KHÍ'}>TRẠM NÉN KHÍ</option>
                  <option value={'TRỢ DUNG'}>TRỢ DUNG</option>
                  <option value={'XỬ LÝ BỤI'}>XỬ LÝ BỤI</option>
                  <option value={'CONSTEEL'}>CONSTEEL</option>
                  <option value={'CẨU TRỤC'}>CẨU TRỤC</option>
                  <option value={'CỔNG TRỤC'}>CỔNG TRỤC</option>
                  <option value={'TRẠM T1'}>TRẠM T1</option>
                  <option value={'TRẠM T2'}>TRẠM T2</option>
                  <option value={'XỬ LÝ NƯỚC'}>XỬ LÝ NƯỚC</option>
                  <option value={'MÁY PHÁT '}>MÁY PHÁT </option>
                  <option value={'KHÁC'}>KHÁC</option>
               </select>
               {/* <p
                   className={style.fieldIssueItemInput}
                   style={{flex:5} }
                   data-issue-input="time"
                   // contentEditable="true"
                   //! Chua làm chức năng nhập khu vực khác
                /> */}

               <div className={style.fieldIssueItemTitleChild}>Thời gian </div>
               <p className={style.fieldIssueItemInput} style={{ flex: 2 }} data-issue-input="time" data-input-width-fixed="width fixed" contentEditable="true"  />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Chi tiết</div>
               <p className={style.fieldIssueItemInput} data-issue-input="content" data-input-width-fixed="width fixed" contentEditable="true" />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục</div>
               <p className={style.fieldIssueItemInput} data-issue-input="solution" data-input-width-fixed="width fixed" contentEditable="true" />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={`${style.fieldIssueItemTitleChild} ${style.redColor}`}>Kết quả/ Ghi chú CA sau*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="result" data-input-width-fixed="width fixed" contentEditable="true" />
            </div>
            {/*  */}
         </div>
         <span
            className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
            onClick={(e) => {
               callBack(e.target.dataset.index);
            }}
            data-index={index}
         >
            delete
         </span>
      </li>
   );
}

///////////////////
/////////////////
function EquipmentUseWrite() {
   const [state, setState] = useState([1]);

   const handelAddEquipmentField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeleteEquipmentField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-equip`);
      for (const item of arrayNode) {
         if (item.dataset.jobIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Vật tư đã sử dụng</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li className={`${style.fieldIssueItem} create-equip`} key={index} data-job-index={index}>
                     <div className={style.fieldJobItemTitle}>Vật tư  {index +1}</div>
                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Mã vật tư</span>
                           <p
                              className={style.fieldJobItemInput}
                              data-equip-input="IDCode"
                              // data-job-input={index}
                              contentEditable="true"
                              data-input-width-fixed="width fixed"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Tên vật tư*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="name"
                              contentEditable="true"
                              data-input-width-fixed="width fixed"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="amount"
                              contentEditable="true"
                              data-input-width-fixed="width fixed"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Đơn Vị*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="unit"
                              contentEditable="true"
                           />
                        </div>
                     </div>

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteEquipmentField(e.target.dataset.index);
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddEquipmentField}>
               <div className={style.addJobWrapText}>Thêm Vật Tư </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}
/////////////////

/////////////////
function ProposeWrite() {
   const [state, setState] = useState([1]);

   const handelAddProposeField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeleteProposeField = (index) => {
      const arrayNode = document.querySelectorAll(`.create-propose`);
      for (const item of arrayNode) {
         if (item.dataset.proposeIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Ý kiến/Đề xuất</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-propose`} key={index} data-propose-index={index}>
                     <div className={style.fieldJobItemTitle}>Đề xuất  {index +1}</div>
                     <p className={style.fieldJobItemInput} data-propose-input={index} data-input-width-fixed="width fixed" contentEditable="true" />

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteProposeField(e.target.dataset.index);
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddProposeField}>
               <div className={style.addJobWrapText}>Thêm đề xuất </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}
/////////////////
function OrderWrite() {
   const [state, setState] = useState([1]);

   const handelAddOrderField = () => {
      const array = [...state, state[state.length - 1] + 1];
      setState(array);
   };
   const handelDeleteOrderField = (index) => {
      console.log('🚀 ~ file: CreateShiftDocLayout.js:438 ~ handelDeleteOrderField ~ index', index);
      const arrayNode = document.querySelectorAll(`.create-order`);
      for (const item of arrayNode) {
         if (item.dataset.orderIndex === index) {
            return item.remove();
         }
      }
   };
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>KSKV/ CA trước giao việc</div>
         <ul className={style.fieldJobList}>
            {state.map((crr, index) => {
               return (
                  <li className={`${style.fieldIssueItem} create-order`} key={index} data-order-index={index}>
                     <div className={style.fieldJobItemTitle}>Công việc  {index +1}</div>

                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <div className={style.fieldIssueItemTitleChild}>Nội dung</div>
                           <p className={style.fieldJobItemInput} data-order-input="content" data-input-width-fixed="width fixed" contentEditable="true" />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <div className={style.fieldIssueItemTitleChild}>Người giao</div>
                           <p className={style.fieldJobItemInput} data-order-input="people" data-input-width-fixed="width fixed" contentEditable="true" />
                        </div>
                     </div>

                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteOrderField(e.target.dataset.index);
                        }}
                        data-index={index}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddOrderField}>
               <div className={style.addJobWrapText}>Thêm công việc </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}
