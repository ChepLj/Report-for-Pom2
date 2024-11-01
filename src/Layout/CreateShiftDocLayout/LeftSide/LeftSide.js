import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './LeftSide.module.css';
import getTimeAPI from '../../../handelAction/getTime';
export default function LeftSide({}) {
   const date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
   const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   const year = [2022, 2023, 2024, 2025];

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

   return (
      <section className={style.writeArea}>
         <div className={style.writeAreaTitle}>Báo Cáo Ca</div>
         <div className={style.writeAreaTime}>
            <div>
               Ca
               <span className={style.space5}></span>
               <select className={style.optionWeek} name="shiftShiftReport">
                  <option value={'HC'}>HC</option>
                  <option value={'D'}>D</option>
                  <option value={'E'}>E</option>
                  <option value={'F'}>F</option>
               </select>
            </div>
            <span className={style.space10}></span>
            <select className={style.date} name="shiftSessionReport">
               <option value={'Ca Đêm'}>Ca Đêm</option>
               <option value={'Ca Ngày'}>Ca Ngày</option>
               <option value={'Ca HC'}>Ca HC</option>
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
         <div className={style.fieldIssueItemTitle}>Công việc</div>
         <div className={style.fieldIssueItemContentWarp}>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên đầu việc*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="name" contentEditable="true" />
            </div>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Khu vực</div>
               <select style={{ margin: '0 2rem 0 2rem' }} name="shiftAreaSelect">
                  <option value={'BF'}>BF</option>
                  <option value={'Lò Vôi'}>Lò Vôi</option>
                  <option value={'Máng Quặng'}>Máng Quặng</option>
                  <option value={'Đỉnh lò'}>Đỉnh lò</option>
                  <option value={'Lò gió nóng'}>Lò gió nóng</option>
                  <option value={'Nhà Quạt'}>Nhà Quạt</option>
                  <option value={'Đúc gang'}>Đúc gang</option>
                  <option value={'Phun Than'}>Phun Than</option>
                  <option value={'XLB BFTrough'}>XLB BFTrough</option>
                  <option value={'XLB Sàn ra gang'}>XLB Sàn ra gang</option>
                  <option value={'XLB Đúc Gang'}>XLB Đúc Gang</option>
                  <option value={'XLB Khí CO'}>XLB Khí CO</option>
                  <option value={'XLN Xỉ'}>XLN Xỉ</option>
                  <option value={'XLN Chính'}>XLN Chính</option>
                  <option value={'XLN Đúc gang'}>XLN Đúc gang</option>
                  <option value={'Trạm cân gang '}>Trạm cân gang</option>
                  <option value={'Nhà Vàng'}>Nhà Vàng</option>
                  <option value={'Trạm điện'}>Trạm điện</option>
                  <option value={'Cẩu 125t'}>Cẩu 125t</option>
                  <option value={'Cẩu hố xỉ'}>Cẩu hố xỉ</option>
                  <option value={'Cẩu sàn ra gang'}>Cẩu sàn ra gang</option>
                  <option value={'Cẩu kho than'}>Cẩu kho than</option>
                  <option value={'Cẩu nhà quạt'}>Cẩu nhà quạt</option>
                  <option value={'Tháp đốt'}>Tháp đốt</option>
                  <option value={'Lò trộn'}>Lò trộn</option>
                  <option value={'Other'}>Khác...</option>
               </select>
               {/* <p
                   className={style.fieldIssueItemInput}
                   style={{flex:5} }
                   data-issue-input="time"
                   // contentEditable="true"
                   //! Chua làm chức năng nhập khu vực khác
                /> */}

               <div className={style.fieldIssueItemTitleChild}>Thời gian xử lý</div>
               <p className={style.fieldIssueItemInput} style={{ flex: 2 }} data-issue-input="time" contentEditable="true" />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Chi tiết</div>
               <p className={style.fieldIssueItemInput} data-issue-input="content" contentEditable="true" />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục</div>
               <p className={style.fieldIssueItemInput} data-issue-input="solution" contentEditable="true" />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={`${style.fieldIssueItemTitleChild} ${style.redColor}`}>Kết quả/ Ghi chú CA sau*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="result" contentEditable="true" />
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
                     <div className={style.fieldJobItemTitle}>Vật tư</div>
                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Mã vật tư</span>
                           <p
                              className={style.fieldJobItemInput}
                              data-equip-input="IDCode"
                              // data-job-input={index}
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Tên vật tư*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="name"
                              contentEditable="true"
                           />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                           <p
                              className={style.fieldJobItemInput}
                              // data-job-input={index}
                              data-equip-input="amount"
                              contentEditable="true"
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
                     <div className={style.fieldJobItemTitle}>Đề xuất</div>
                     <p className={style.fieldJobItemInput} data-propose-input={index} contentEditable="true" />

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
               <div className={style.addJobWrapText}>Thêm kế hoạch </div>
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
                     <div className={style.fieldJobItemTitle}>Công việc</div>

                     <div className={style.fieldIssueItemContentWarp}>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <div className={style.fieldIssueItemTitleChild}>Nội dung</div>
                           <p className={style.fieldJobItemInput} data-order-input="content" contentEditable="true" />
                        </div>
                        <div className={style.fieldIssueItemContentWarpItem}>
                           <div className={style.fieldIssueItemTitleChild}>Người giao</div>
                           <p className={style.fieldJobItemInput} data-order-input="people" contentEditable="true" />
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
