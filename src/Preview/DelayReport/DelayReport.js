import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, Link, ListItem, ListItemIcon } from '@mui/material';
import { useContext } from 'react';
import AllDataContext from '../../context/allDataContext';
import noImage from '../../static/img/No_Image_Available.jpg';
import { logoPomina } from '../../static/svg/sgv';
import style from './DelayReport.module.css';

export default function DelayReport({ content, setModalImageOpen }) {
   console.log('🚀 ~ DelayReport ~ content:', content);
   const { allData } = useContext(AllDataContext);
   // Lấy current user login
   let currentUser = 'none';
   if (localStorage.getItem('user')) {
      const temp = JSON.parse(localStorage.getItem('user'));
      currentUser = temp.email;
   }
   ////
   const isVideoType = (type) => {
      if (type) {
         return type.startsWith('video/');
      }
      return '';
   };
   const productTimeInFloat = parseFloat(content?.summary?.productTimeTotal.replace(',', '.'));

   const delayTimeKPIInFloat = parseFloat(content?.summary?.delayTimeKPITotal.replace(',', '.'));
   const maintenanceTimeInFloat = parseFloat(content?.summary?.maintenanceTimeTotal.replace(',', '.'));
   const maintenanceTimeKPIInFloat = parseFloat(content?.summary?.maintenanceTimeKPITotal.replace(',', '.'));
   const { week1, week2, week3, week4, week5 } = content.weekDelay || {};

   const monthDelay = () => {
      // Convert the week values to numbers
      const weeks = [
         parseFloat(week1.replace(',', '.')),
         parseFloat(week2.replace(',', '.')),
         parseFloat(week3.replace(',', '.')),
         parseFloat(week4.replace(',', '.')),
         parseFloat(week5.replace(',', '.')),
      ];

      // Filter out weeks with values <= 0
      const validWeeks = weeks.filter((week) => week > 0);

      // Calculate the sum of valid weeks
      const sum = validWeeks.reduce((total, week) => total + week, 0);

      // Divide by the number of valid weeks (or return 0 if no valid weeks)
      const result = validWeeks.length > 0 ? sum / validWeeks.length : 0;

      return sum;
   };
   const renderDelayTimeKPI = Math.round((delayTimeKPIInFloat * productTimeInFloat) / 100);

   const delayTimePresent = ((monthDelay() / renderDelayTimeKPI) * 100).toFixed(2);
   const renderMaintenancePresent = ((maintenanceTimeInFloat / maintenanceTimeKPIInFloat) * 100).toFixed(2);
   const renderWeek1 = ((week1 / renderDelayTimeKPI) * 100).toFixed(2);
   const renderWeek2 = ((week2 / renderDelayTimeKPI) * 100).toFixed(2);
   const renderWeek3 = ((week3 / renderDelayTimeKPI) * 100).toFixed(2);
   const renderWeek4 = ((week4 / renderDelayTimeKPI) * 100).toFixed(2);
   const renderWeek5 = ((week5 / renderDelayTimeKPI) * 100).toFixed(2);

   return (
      <section className={`${style.warp} shift-warp`}>
         <header className={`${style.header} shift-header`}>
            <div className={`${style.headerItem} shift-headerItem`}>
               <div className={`${style.logoImg} shift-logoImg`}>{logoPomina}</div>
               <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Phân Xưởng {allData?.WorkShop}</span>
            </div>
            <div className={`${style.headerItem} ${style.headerItemBorderLR} shift-headerItem shift-headerItemBorderLR`}>
               <span className={`${style.headerTitle} shift-headerTitle`} style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  Báo Cáo Delay
               </span>
               <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Bảo Trì Điện </span>
            </div>
            <div className={`${style.headerItemInfo} shift-headerItemInfo`}>
               <div className={`${style.infoItem} shift-infoItem`}>
                  Tháng
                  <span className={`${style.infoItemChild} shift-infoItemChild`} style={{ color: 'blue', paddingLeft: '1px' }}>
                     {content?.date.month}
                  </span>
               </div>
               <div className={`${style.infoItem} shift-infoItem`}>
                  Năm
                  <span className={`${style.infoItemChild} shift-infoItemChild`} style={{ color: 'green' }}>
                     {content?.date.year}
                  </span>
               </div>
            </div>
         </header>
         <div className={`${style.timeStamp} shift-timeStamp`}>{content.user}</div>
         <section style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <table className={`${style.table} shift-table`}>
               <caption className={`${style.tableCaption} shift-tableCaption`}>I. Tổng Quan</caption>
               <thead>
                  <tr>
                     <th className={`${style.tableTitle} shift-tableTitle`} style={{ width: 'auto', fontWeight: 700 }}>
                        Hạng mục
                     </th>
                     <th className={`${style.tableTitle} shift-tableTitle`} style={{ width: 'auto', fontWeight: 700 }}>
                        Thời gian
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td className={`${style.tableContent} shift-tableContent`}>Tổng thời gian sản xuất</td>
                     <td className={`${style.tableContent} shift-tableContent`}>
                        <b>{productTimeInFloat}</b> <i>phút</i>
                     </td>
                  </tr>
                  <tr>
                     <td className={`${style.tableContent} shift-tableContent`}>
                        Tổng thời gian Delay{' '}
                        <i>
                           (KPI: <b>{renderDelayTimeKPI}</b> phút)
                        </i>
                     </td>
                     <td className={`${style.tableContent} shift-tableContent`}>
                        <b>{monthDelay()}</b> <i>phút</i> (<span style={{ color: delayTimePresent > 100 ? 'red' : '' }}>{delayTimePresent} %</span>)
                     </td>
                  </tr>
                  <tr>
                     <td className={`${style.tableContent} shift-tableContent`}>
                        Tổng thời gian bảo trì{' '}
                        <i>
                           (KPI: <b>{maintenanceTimeKPIInFloat}</b> phút)
                        </i>
                     </td>
                     <td className={`${style.tableContent} shift-tableContent`}>
                        <b>{maintenanceTimeInFloat}</b> <i>phút</i> ( {renderMaintenancePresent} %)
                     </td>
                  </tr>
               </tbody>
            </table>

            {/* Delay Section */}
            <section style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
               <table className={`${style.table} shift-table`}>
                  <caption className={`${style.tableCaption} shift-tableCaption`}>II. Tỷ lệ Delay</caption>
                  <thead>
                     <tr>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tuần 1</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tuần 2</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tuần 3</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tuần 4</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tuần 5</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tháng</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className={`${style.tableContent} shift-tableContent`}>{renderWeek1} %</td>
                        <td className={`${style.tableContent} shift-tableContent`}>{renderWeek2} %</td>
                        <td className={`${style.tableContent} shift-tableContent`}>{renderWeek3} %</td>
                        <td className={`${style.tableContent} shift-tableContent`}>{renderWeek4} %</td>
                        <td className={`${style.tableContent} shift-tableContent`}>{renderWeek5} %</td>
                        <td className={`${style.tableContent} shift-tableContent`}>{delayTimePresent} %</td>
                     </tr>
                  </tbody>
               </table>
            </section>

            {/* Incident Section */}
            <section style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
               <table className={`${style.table} shift-table`}>
                  <caption className={`${style.tableCaption} shift-tableCaption`}>III. Các Sự Cố Delay</caption>
                  <thead>
                     <tr>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Ngày</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Tên sự cố</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Thời gian Delay</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}>Biện pháp</th>
                        <th className={`${style.tableTitle} shift-tableTitle`}></th>
                     </tr>
                  </thead>
                  <tbody>
                     {content?.issue?.map((item, index) => (
                        <tr key={index}>
                           <td className={`${style.tableContent} shift-tableContent`}>{item.date}</td>
                           <td className={`${style.tableContent} shift-tableContent`}>{item.name}</td>
                           <td className={`${style.tableContent} shift-tableContent`}>
                              {item.content} <i>(phút)</i>
                           </td>
                           <td className={`${style.tableContent} shift-tableContent`}>{item.solution}</td>
                           <td className={`${style.tableContent} shift-tableContent`} style={{ width: '18px' }}>
                              {content.images?.issueImage?.[item.id] && (
                                 <Button
                                    sx={{
                                       padding: '0', // Remove default padding
                                       minWidth: '15px', // Set button minimum width
                                       width: '15px', // Restrict button width
                                       height: '15px', // Restrict button height
                                       fontSize: '0', // Hide text if any
                                    }}
                                    variant="text"
                                    size="small"
                                    onClick={() => setModalImageOpen({ isOpen: true, data: content.images.issueImage[item.id], index: 0 })}
                                 >
                                    <AddPhotoAlternateIcon
                                       sx={{
                                          fontSize: '14px', // Set the icon size to fit within the button
                                       }}
                                    />
                                 </Button>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>

            {/* Proposed Section */}
            <section style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
               <div className={`${style.tableCaption} shift-tableCaption`} style={{ margin: '0.5rem 0.1rem  0.1rem 1rem' }}>
                  IV. Những việc cần lưu ý
               </div>
               <ul style={{ marginLeft: '10px', boxSizing: 'border-box' }}>
                  {content?.propose?.map((crr, index) => (
                     <li key={index} style={{ fontSize: '12px', textAlign: 'left', boxSizing: 'border-box' }}>
                        {crr.text}
                        {crr.id ? (
                           <div className={`${style.thumbnailContainer} thumbnailContainer`}>
                              {content.images?.proposeImage?.[crr.id]?.map((image, imgIndex) => {
                                 const mediaUrl = image.fileURL;
                                 const isVideo = isVideoType(image.type);
                                 return (
                                    <div
                                       key={imgIndex}
                                       className={style.mediaContainer}
                                       onClick={() => setModalImageOpen({ isOpen: true, data: content.images.proposeImage[crr.id], index: imgIndex })}
                                    >
                                       {isVideo ? (
                                          <>
                                             <video
                                                className={`${style.thumbnail} thumbnail`}
                                                src={mediaUrl}
                                                onError={(e) => {
                                                   e.target.src = noImage; // Handle error
                                                }}
                                                //controls // Add controls if needed
                                             >
                                                Your browser does not support the video tag.
                                             </video>
                                             <span className={style.playbackOverlay}>▶</span>
                                          </>
                                       ) : (
                                          <img
                                             src={mediaUrl}
                                             alt={`Thumbnail ${imgIndex + 1}`}
                                             onError={(e) => {
                                                e.target.src = noImage;
                                             }}
                                             className={`${style.thumbnail} thumbnail`}
                                          />
                                       )}
                                    </div>
                                 );
                              })}
                           </div>
                        ) : (
                           ''
                        )}
                     </li>
                  ))}
               </ul>
            </section>
            <section style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
               <div className={`${style.tableCaption} shift-tableCaption`} style={{ margin: '0.5rem 0.1rem  0.1rem 1rem' }}>
                  V. File đính kèm
               </div>
               <ul className={`${style.list} attachmentWrap`} style={{ margin: 0, padding: 0, fontSize: '12px' }}>
                  {content.attachments?.[0] && (
                     <ul className={`${style.list2} list hidden`}>
                   
                        {content?.attachments.length &&
                           content.attachments.map((crr, fileIndex) => {
                              return (
                                 <li key={`fileIndex ${fileIndex}`} style={{ listStyle: 'none' }}>
                                    <ListItemIcon sx={{ minWidth: '10px' }}>
                                       <AttachFileIcon />
                                    </ListItemIcon>
                                    <Link href={crr.fileURL} target="_blank" download>
                                       {crr?.name || 'download'}
                                    </Link>
                                 </li>
                              );
                           })}
                     </ul>
                  )}
               </ul>
            </section>
         </section>
         <section className={`${style.signature} signature`}>
            <div className={`${style.signatureTemp} signatureTemp`}></div>
            <div className={`${style.signatureWarp} signatureWarp`}>
               <span className={`${style.signatureDate} signatureDate`}>
                  Pomina, Ngày {content.date.timestamp.slice(8)} tháng {content.date.timestamp.slice(5, 7)} năm {content.date.timestamp.slice(0, 4)}
               </span>
               <span className={`${style.signatureName} signatureName`}>{content.user}</span>
            </div>
         </section>
         <div className={`${style.auth} auth`}>{(content.authEmail ??= 'none')}</div>
         <div className="reviewPaddingBottom" style={{ width: '100%', textAlign: 'center', paddingBottom: '5rem' }}>
            .
         </div>
      </section>
   );
}
