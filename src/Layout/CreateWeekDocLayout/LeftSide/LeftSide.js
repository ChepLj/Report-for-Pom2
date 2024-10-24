import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
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
   return (
      <section className={style.warpPage}>
         <section className={style.writeArea}>
            <div className={style.writeAreaTitle}>Báo Cáo Tuần</div>
            <div className={style.writeAreaTime}>
               Tuần{' '}
               <select className={style.optionWeek} name="weekWeekReport">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
               </select>
               {' .'}
               Tháng{' '}
               <select className={style.optionMonth} name="monthWeekReport">
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
               <select className={style.user} name="userWeekReport">
                  {user.map((crr, index) => {
                     return (
                        <option value={crr} key={index}>
                           {crr}
                        </option>
                     );
                  })}
               </select>{' '}
            </div>
            <i style={{ fontSize: '0.8rem' }}>(Ngày đầu tiên của Tuần 1 sẽ là Thứ 2 đầu tiên của tháng)</i>
            <JobWrite handleAddImage={handleAddImage} jobState={jobState} setJobState={setJobState} />
            <IssueWrite handleAddImage={handleAddImage} issueState={issueState} setIssueState={setIssueState} />
            <PlanWrite handleAddImage={handleAddImage} planState={planState} setPlanState={setPlanState} />
            <ProposeWrite handleAddImage={handleAddImage} proposeState={proposeState} setProposeState={setProposeState} />
            <EquipmentWrite equipmentState={equipmentState} setEquipmentState={setEquipmentState} />
         </section>
      </section>
   );
}

/////////////////////

function JobWrite({ handleAddImage, jobState, setJobState }) {
   const handelAddJobField = () => {
      // const array = [...state, state[state.length - 1] + 1];

      const array = [...jobState];
      array.push({ id: jobState.length + 1, images: [] });
      setJobState(array);
   };
   const handelDeleteJobField = (id) => {
      // console.log('🚀 ~ handelDeleteJobField ~ index:', id);

      const arrayNode = document.querySelectorAll(`.create-job`);
      for (const item of arrayNode) {
         if (+item.dataset.jobIndex === id) {
            item.remove();
            let array = [...jobState];
            array[id - 1].images = [];
            setJobState([...array]);
            break;
         }
      }
   };

   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Công việc đã làm trong tuần</div>
         <ul className={style.fieldJobList}>
            {jobState?.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-job`} key={index} data-job-index={crr.id} data-job-id={crr.id}>
                     <div className={style.fieldJobItemTitle}>Công việc {crr.id}</div>
                     <p className={style.fieldJobItemInput} data-job-input={index} contentEditable="true" data-job-id={crr.id} />

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
                              handleAddImage(crr.id, 'CV');
                           }}
                        >
                           {crr?.images?.length}
                        </Button>
                     </div>
                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeleteJobField(crr.id);
                        }}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJob_addImageWrap}>
               <div className={style.addJobWrap} onClick={handelAddJobField}>
                  <div className={style.addJobWrapText}>Thêm công việc </div>
                  <span className="material-symbols-outlined">add</span>
               </div>
            </div>
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
         <div className={style.fieldIssueTitle}>Sự cố xảy ra trong tuần</div>
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
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Tên sự cố*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="name" data-issue-id={crr.id} contentEditable="true" />
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

            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Ngày*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="date" contentEditable="true" />
            </div>
            {/*  */}
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Nội dung*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="content" contentEditable="true" />
            </div>
            {/*  */}
            <div className={style.fieldIssueItemContentWarpItem}>
               <div className={style.fieldIssueItemTitleChild}>Biện pháp khắc phục*</div>
               <p className={style.fieldIssueItemInput} data-issue-input="solution" contentEditable="true" />
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

///////////////////
function PlanWrite({ handleAddImage, planState, setPlanState }) {
   // const [state, setState] = useState([1]);

   const handelAddPlanField = () => {
      // const array = [...state, state[state.length - 1] + 1];
      // setState(array);
      const array = [...planState];
      array.push({ id: planState.length + 1, images: [] });
      setPlanState(array);
   };
   const handelDeletePlanField = (id) => {
      const arrayNode = document.querySelectorAll(`.create-plan`);
      for (const item of arrayNode) {
         if (+item.dataset.planIndex === id) {
            item.remove();
            let array = [...planState];
            array[id - 1].images = [];
            setPlanState([...array]);
            break;
         }
      }
   };
   return (
      <div className={style.fieldJobWarp}>
         <div className={style.fieldJobTitle}>Kế hoạch tuần tới</div>
         <ul className={style.fieldJobList}>
            {planState?.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-plan`} key={index} data-plan-index={crr.id} data-plan-id={crr.id}>
                     <div className={style.fieldJobItemTitle}>Kế hoạch {crr.id}</div>
                     <p className={style.fieldJobItemInput} data-plan-input={index} data-plan-id={crr.id} contentEditable="true" />
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
                              handleAddImage(crr.id, 'KH');
                           }}
                        >
                           {crr?.images?.length}
                        </Button>
                     </div>
                     <span
                        className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                        onClick={(e) => {
                           handelDeletePlanField(crr.id);
                        }}
                     >
                        delete
                     </span>
                  </li>
               );
            })}

            <div className={style.addJobWrap} onClick={handelAddPlanField}>
               <div className={style.addJobWrapText}>Thêm kế hoạch </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
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
         <div className={style.fieldJobTitle}>Ý kiến/Đề xuất</div>
         <ul className={style.fieldJobList}>
            {proposeState?.map((crr, index) => {
               return (
                  <li className={`${style.fieldJobItem} create-propose`} key={index} data-propose-index={crr.id} data-propose-id={crr.id}>
                     <div className={style.fieldJobItemTitle}>Đề xuất {crr.id}</div>
                     <p className={style.fieldJobItemInput} data-propose-input={crr.id} data-propose-id={crr.id} contentEditable="true" />
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
               <div className={style.addJobWrapText}>Thêm ý kiến/đề xuất </div>
               <span className="material-symbols-outlined">add</span>
            </div>
         </ul>
      </div>
   );
}

//////////////// Vật tu///////////////////
function EquipmentWrite({ equipmentState, setEquipmentState }) {
   const handelAddEquipmentField = () => {
      const motherFieldElm = document.querySelector('.add-handover-equip');
      const nameEquip = motherFieldElm.querySelector('.name').innerText;
      const codeEquip = motherFieldElm.querySelector('.code').innerText;
      const amountEquip = motherFieldElm.querySelector('.amount').innerText;
      const unitEquipElm = motherFieldElm.querySelector('.unit').value;
      const actionEquipElm = motherFieldElm.querySelector('.action').value;

      if (nameEquip !== '' && amountEquip !== '' && actionEquipElm !== '') {
         // kiểm tra nếu có dữ liệu thì mới cho thêm
         // const array = [...state, [nameEquip, amountEquip, unitEquipElm, actionEquipElm, codeEquip]];
         motherFieldElm.querySelector('.code').innerText = ''; // xoa sau khi them
         motherFieldElm.querySelector('.name').innerText = ''; // xoa sau khi them
         motherFieldElm.querySelector('.amount').innerText = ''; // xoa sau khi them
         motherFieldElm.querySelector('.unit').value = '';
         motherFieldElm.querySelector('.action').value = '';
         // setState(array);
         const array = [...equipmentState];
         array.push({ id: equipmentState.length + 1, images: [], data: [codeEquip, nameEquip, amountEquip, unitEquipElm, actionEquipElm] });
         setEquipmentState(array);
      } else {
         alert('Các trường vật tư có đánh dấu * không được bỏ trống !!!');
      }
   };

   return (
      <div className={style.fieldJobWarp}>
         {/* ///////////////////////////////// */}
         <div className={style.fieldJobTitle}>Vật tư đã xuất/Sử dụng</div>

         <EquipmentTable equipmentState={equipmentState} setEquipmentState={setEquipmentState} />
         <div className={style.bottomBorder}></div>
         <section className={style.fieldJobList}>
            <div className={`${style.fieldIssueItem} add-handover-equip`}>
               <div className={style.fieldIssueItemContentWarp}>
                  <div className={style.fieldIssueItemContentWarpItem}>
                     <span className={style.fieldIssueItemTitleChild} inputMode="numeric" >Mã vật tư</span>
                     <p className={`${style.fieldJobItemInput} code`} contentEditable="true" />
                     <span className={style.fieldIssueItemTitleChild}>Tên vật tư*</span>
                     <p className={`${style.fieldJobItemInput} name`} contentEditable="true" />
                  </div>

                  <div className={style.fieldIssueItemContentWarpItem}>
                     <span className={style.fieldIssueItemTitleChild}>Số lượng*</span>
                     <p className={`${style.fieldJobItemInput} amount`} style={{ textAlign: 'right' }} contentEditable="true"  inputMode="numeric" />
                     <span className={style.space5}></span>
                     <select className={`${style.optionUnit} unit`} name="unit" defaultValue="">
                        <option value="" disabled hidden>
                           Chọn đơn vị
                        </option>
                        <option value={'Cái'}>Cái</option>
                        <option value={'Bộ'}>Bộ</option>
                        <option value={'Mét'}>Mét</option>
                        <option value={'Cuộn'}>Cuộn</option>
                        <option value={'Thanh'}>Thanh</option>
                        <option value={'Hộp'}>Hộp</option>
                     </select>
                     <span className={style.spaceLR5}></span>
                     <span className={style.fieldIssueItemTitleChild}>Hành động* </span>
                     <select className={`${style.optionUnit} action`} name="action" defaultValue="">
                        <option value="" disabled hidden>
                           Chọn hành động
                        </option>
                        <option value={'Xuất Kho'}>Xuất Kho</option>
                        <option value={'Sử dụng'}>Sử dụng</option>
                        <option value={'Xuất Kho + Sử Dụng'}>Xuất Kho + Sử Dụng</option>
                     </select>
                     <span className={style.spaceLR5}></span>
                     <span className={style.spaceLR5}></span>
                     <Button
                        sx={{
                           padding: '1px 6px', // Adjust the padding
                           fontSize: '0.6rem', // Adjust the font size
                           minWidth: 'auto', // Remove the default minWidth
                        }}
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handelAddEquipmentField}
                     >
                        <span className="material-symbols-outlined">add</span>
                        Thêm vật tư
                     </Button>
                     <span className={style.spaceLR2dot5}></span>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

////////////////////////////////////////
/////////////////
function EquipmentTable({ equipmentState, setEquipmentState }) {
   const handelDeleteEquipmentField = (id) => {
      const arrayNode = document.querySelectorAll(`.create-equipment`);
      for (const item of arrayNode) {
         if (+item.dataset.equipmentIndex === id) {
            item.remove();
            let array = [...equipmentState];
            array[id - 1].images = [];
            array[id - 1].data = [];
            setEquipmentState([...array]);
            break;
         }
      }
   };

   useEffect(()=>{
      const equipmentData = document.getElementById('equipment-data-store')
      const temp = JSON.stringify(equipmentState)
      equipmentData.innerHTML= temp
      console.dir(equipmentData.innerHTML)
   },[equipmentState])
   return (
      <>
         {' '}
         <table style={{ borderCollapse: 'collapse', width: '100%', margin: '5px 0' }}>
            <thead>
               <tr>
                  <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>STT</th>
                  <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Mã Vật Tư</th>
                  <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Tên</th>
                  <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Số Lượng</th>
                  <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Đơn Vị</th>
                  <th style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>Hành Động</th>
               </tr>
            </thead>

            <tbody>
               {equipmentState?.map((crr, index) => {
                  return (
                     crr.data && (
                        <tr key={index} className={`create-equipment`} data-equipment-index={crr.id} data-equipment-id={crr.id}>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>
                              <div style={{ fontStyle: 'italic', pointerEvents: 'none', userSelect: 'none' }}>Vật tư {crr.id}</div>
                           </td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{crr.data[0]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{crr.data[1]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{crr.data[2]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{crr.data[3]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px' }}>{crr.data[4]}</td>
                           <td style={{ border: '0px solid black', padding: '0px', fontSize: '0px', width: '0' }}>
                              <span
                                 className={`material-symbols-outlined ${style.fieldJobItemDelete}`}
                                 onClick={(e) => {
                                    handelDeleteEquipmentField(crr.id);
                                 }}
                              >
                                 delete
                              </span>
                           </td>
                        </tr>
                     )
                  );
               })}
            </tbody>
         </table>
         <div id="equipment-data-store" style={{ display: 'none' }}></div>
      </>
   );
}
