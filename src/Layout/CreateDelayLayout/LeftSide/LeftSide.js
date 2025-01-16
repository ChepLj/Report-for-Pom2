import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import style from './LeftSide.module.css';

export default function LeftSide({
   user,
   handleAddImage,
   jobState,
   planState,
   proposeState,
   setPlanState,
   setProposeState,
   setJobState,
   issueState,
   setIssueState,
   equipmentState,
   setEquipmentState,
}) {
   const [formData, setFormData] = useState({
      company: '',
      department: '',
      reportTitle: '',
      reportMonth: '',
      productionTime: '',
      delayTime: '',
      delayRate: '',
      costs: [{ month: '', value: '', production: '', unitCost: '' }],
      tasks: [''],
      incidents: [{ date: '', location: '', duration: '', details: '' }],
   });

   //TODO: set max width
   useEffect(() => {
      const inputs = document.querySelectorAll('[data-input-width-fixed]');
      for (const input of inputs) {
         const currentWidth = input.offsetWidth;
         input.style.maxWidth = `${currentWidth}px`;
      }
   }, [jobState, planState, proposeState, issueState]);

   //TODO_END: set max width
   function getWeekInMonth(date) {
      // Find the first Monday of the month
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const firstMonday = new Date(firstDayOfMonth);

      // If the month doesn't start on a Monday, find the first Monday
      if (dayOfWeek !== 1) {
         firstMonday.setDate(firstMonday.getDate() + ((8 - dayOfWeek) % 7));
      }

      // Calculate the difference in days and determine the week number
      const daysDifference = date.getDate() - firstMonday.getDate();
      let weekNumber = Math.floor(daysDifference / 7);

      const decimal = daysDifference / 7 - weekNumber;
      let month = date.getMonth();
      if (weekNumber > 0 && decimal > 0.4) {
         weekNumber = weekNumber + 1;
      } else if (weekNumber <= 0) {
         weekNumber = 5;
      }
      console.log('🚀 ~ getWeekInMonth ~ weekNumber:', weekNumber);
      if (weekNumber > 0 && weekNumber <= 4) {
         month = month + 1;
      }

      return { weekInMonth: weekNumber, month: month };
   }
   const date = new Date();
   console.dir(date);
   return (
      <section className={style.warpPage}>
         <section className={style.writeArea}>
            <div className={style.writeAreaTitle}>Báo Cáo Delay</div>
            <div className={style.writeAreaTime}>
               Tháng{' '}
               <select className={style.optionMonth} name="monthWeekReport" defaultValue={getWeekInMonth(date).month}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
               </select>{' '}
               Năm
               <select className={style.optionMonth} name="yearWeekReport" defaultValue={date.getFullYear()}>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2028}>2028</option>
                  <option value={2029}>2029</option>
                  <option value={2030}>2030</option>
                  <option value={2031}>2031</option>
                  <option value={2032}>2032</option>
                  <option value={2033}>2033</option>
                  <option value={2034}>2034</option>
                  <option value={2035}>2035</option>
                  <option value={2036}>2036</option>
               </select>{' '}
               <select className={style.user} name="userWeekReport">
                  <option style={{ color: 'gray' }} value={''}>
                     chọn Tổ báo cáo
                  </option>
                  {['Điện Động Lực', 'Điện Tự Động'].map((crr, index) => {
                     return (
                        <option value={crr} key={index}>
                           {crr}
                        </option>
                     );
                  })}
               </select>
            </div>

            {/* <i style={{ fontSize: '0.7rem', marginTop: '2px' }}>(Ngày đầu tiên của Tuần 1 sẽ là Thứ 2 đầu tiên của tháng)</i> */}
            <SummaryWrite handleAddImage={handleAddImage} jobState={jobState} setJobState={setJobState} />
            <DelayWrite handleAddImage={handleAddImage} jobState={jobState} setJobState={setJobState} />
            <IssueWrite handleAddImage={handleAddImage} issueState={issueState} setIssueState={setIssueState} />

            <ProposeWrite handleAddImage={handleAddImage} proposeState={proposeState} setProposeState={setProposeState} />
         </section>
      </section>
   );
}

/////////////////////

function SummaryWrite({ handleAddImage, jobState, setJobState }) {
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Tổng quan</div>
         <ul className={style.fieldJobList}>
            <li className={`${style.fieldJobItem} `}>
               <div className={`${style.fieldJobItemTitle} `}>Tổng thời gian sản xuất : </div>
               <p className={`${style.fieldJobItemInput} `} id='create-summary_productTimeTotal' contentEditable="true" inputMode="numeric" />
               <i>(phút)</i>
            </li>
            <li className={`${style.fieldJobItem} `}>
               {/* <div className={`${style.fieldJobItemTitle} `}>Tổng thời gian delay thiết bị : </div>
               <p className={`${style.fieldJobItemInput} `} id='create-summary_delayTimeTotal' contentEditable="true" inputMode="numeric" /> */}
               <div className={style.fieldJobItemTitle}>Tổng tỷ lệ Delay định mức (KPI) : </div>
               <p className={`${style.fieldJobItemInput} `} id='create-summary_delayTimeKPITotal' contentEditable="true" inputMode="numeric" >0.788</p>
               <i>(%)</i>
            </li>

            <li className={`${style.fieldJobItem} `}>
               <div className={style.fieldJobItemTitle}>Tổng thời gian bảo trì theo kế hoạch : </div>
               <p className={`${style.fieldJobItemInput} `} id='create-summary_maintenanceTimeTotal' contentEditable="true" inputMode="numeric" >1440</p>
               <div className={style.fieldJobItemTitle}>&nbsp;&nbsp;&nbsp;Định mức (KPI) : </div>
               <p className={`${style.fieldJobItemInput} `} id='create-summary_maintenanceTimeKPITotal' contentEditable="true" inputMode="numeric" >2880</p>
               <i>(phút)</i>
            </li>
         </ul>
      </div>
   );
}
/////////////////
function DelayWrite({ handleAddImage, jobState, setJobState }) {
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Thời gian  delay theo tuần <i>(phút)</i></div>
         <ul className={style.fieldJobList}>
            <li className={` ${style.fieldDelayItem} `}>
               <div className={`${style.fieldDelayItemWarp}`}>
                  <div className={style.fieldDelayItemWarpTitle}>Tuần 1 </div>
                  <p className={`${style.fieldDelayItemWarpInput} `} id='create-delay_week-1' contentEditable="true" inputMode="numeric" >0</p>
               </div>
               <div className={`${style.fieldDelayItemWarp}`}>
                  <div className={style.fieldDelayItemWarpTitle}>Tuần 2 </div>
                  <p className={`${style.fieldDelayItemWarpInput} `} id='create-delay_week-2' contentEditable="true" inputMode="numeric" >0</p>
               </div>
               <div className={`${style.fieldDelayItemWarp}`}>
                  <div className={style.fieldDelayItemWarpTitle}>Tuần 3 </div>
                  <p className={`${style.fieldDelayItemWarpInput} `} id='create-delay_week-3' contentEditable="true" inputMode="numeric" >0</p>
               </div>
               <div className={`${style.fieldDelayItemWarp}`}>
                  <div className={style.fieldDelayItemWarpTitle}>Tuần 4 </div>
                  <p className={`${style.fieldDelayItemWarpInput} `} id='create-delay_week-4' contentEditable="true" inputMode="numeric" >0</p>
               </div>
               <div className={`${style.fieldDelayItemWarp}`}>
                  <div className={style.fieldDelayItemWarpTitle}>Tuần 5 </div>
                  <p className={`${style.fieldDelayItemWarpInput} `} id='create-delay_week-5' contentEditable="true" inputMode="numeric" >0</p>
               </div>
            </li>
            <div style={{fontSize: '10px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>(nhập số 0 nếu không có giá trị)</div>
         </ul>
      </div>
   );
}
/////////////////

function IssueWrite({ handleAddImage, issueState, setIssueState }) {
   // const [state, setState] = useState([1]);

   const handelAddIssueField = () => {
      const array = [...issueState];
      array.push({ id: issueState.length + 1, images: [] });
      setIssueState(array);
   };
   const handelDeleteIssueField = (id) => {
      const arrayNode = document.querySelectorAll(`.create-issue`);
      for (const item of arrayNode) {
         if (+item.dataset.issueIndex === id) {
            item.remove();
            let array = [...issueState];
            array[id - 1].images = [];
            setIssueState([...array]);
            break;
         }
      }
   };
   return (
      <div className={style.fieldIssueWarp}>
         <div className={style.fieldIssueTitle}>Sự cố gây Delay</div>
         <ul className={style.fieldIssueList}>
            {/*  */}
            {issueState?.map((crr, index) => {
               return (
                  <IssueWriteElement
                     key={index}
                     index={index}
                     crr={crr}
                     handleAddImage={handleAddImage}
                     callBack={(indexFB) => {
                        handelDeleteIssueField(crr.id);
                     }}
                  />
               );
            })}

            {/*  */}
            <div className={style.addIssueWrap} onClick={handelAddIssueField}>
               <div className={style.addIssueWrapText}>Thêm sự cố </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}

function IssueWriteElement({ index, crr, callBack, handleAddImage }) {
   return (
      <li className={`${style.fieldIssueItem} create-issue`} data-issue-index={crr.id} data-issue-id={crr.id}>
         <div className={style.fieldIssueItemTitle}>Sự cố {crr.id}</div>
         <div className={style.fieldIssueItemContentWarp}>
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Ngày*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="date"
                  data-input-width-fixed="width fixed"
                  contentEditable="true"
                  inputMode="numeric"
               />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên sự cố*</div>
               <p
                  className={style.fieldIssueItemInput}
                  data-issue-input="name"
                  data-input-width-fixed="width fixed"
                  data-issue-id={crr.id}
                  contentEditable="true"
               />
               <div>
                  <Button
                     sx={{
                        padding: '1px 4px', // Adjust the padding
                        fontSize: '0.6rem', // Adjust the font size
                        minWidth: 'auto', // Remove the default minWidth
                     }}
                     variant="outlined"
                     size="small"
                     color={crr?.images?.length ? 'error' : 'primary'}
                     startIcon={<AddPhotoAlternateIcon />}
                     onClick={() => {
                        handleAddImage(crr.id, 'SC');
                     }}
                  >
                     {crr?.images?.length}
                  </Button>
               </div>
            </div>

            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Thời gian Delay <i>(phút)</i>*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="content" data-input-width-fixed="width fixed" contentEditable="true" />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="solution" data-input-width-fixed="width fixed" contentEditable="true" />
            </div>
            {/*  */}
         </div>
         <span
            className={`material-symbols-outlined ${style.fieldIssueItemDelete}`}
            onClick={(e) => {
               callBack();
            }}
            data-index={index}
         >
            delete
         </span>
      </li>
   );
}

/////////////////
function ProposeWrite({ handleAddImage, proposeState, setProposeState }) {
   // const [state, setState] = useState([1]);

   const handelAddProposeField = () => {
      const array = [...proposeState];
      array.push({ id: proposeState.length + 1, images: [] });
      setProposeState(array);
   };
   const handelDeleteProposeField = (id) => {
      const arrayNode = document.querySelectorAll(`.create-propose`);
      for (const item of arrayNode) {
         if (+item.dataset.proposeIndex === id) {
            item.remove();
            let array = [...proposeState];
            array[id - 1].images = [];
            setProposeState([...array]);
            break;
         }
      }
   };

   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Những việc cần lưu ý /Đề xuất</div>
         <ul className={style.fieldJobList}>
            {proposeState?.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-propose`} key={index} data-propose-index={crr.id} data-propose-id={crr.id}>
                     <div className={style.fieldJobItemTitle}>Đề xuất {crr.id}</div>
                     <p
                        className={style.fieldJobItemInput}
                        data-propose-input={crr.id}
                        data-input-width-fixed="width fixed"
                        data-propose-id={crr.id}
                        contentEditable="true"
                     />
                     <div>
                        <Button
                           sx={{
                              padding: '1px 4px', // Adjust the padding
                              fontSize: '0.6rem', // Adjust the font size
                              minWidth: 'auto', // Remove the default minWidth
                           }}
                           variant="outlined"
                           size="small"
                           color={crr?.images?.length ? 'error' : 'primary'}
                           startIcon={<AddPhotoAlternateIcon />}
                           onClick={() => {
                              handleAddImage(crr.id, 'ĐX');
                           }}
                        >
                           {crr?.images?.length}
                        </Button>
                     </div>
                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteProposeField(crr.id);
                        }}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddProposeField}>
               <div className={style.addJobWrapText}>Thêm việc cần lưu ý </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}
