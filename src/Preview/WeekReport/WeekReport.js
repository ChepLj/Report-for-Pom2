import noImage from '../../static/img/No_Image_Available.jpg';
import { logoPomina } from '../../static/svg/sgv';
import style from './WeekReport.module.css';
import { useEffect, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Link, ListItem, ListItemIcon } from '@mui/material';
export default function WeekReport({ content, setModalImageOpen }) {
   console.log('🚀 ~ WeekReport ~ content:', content);
   const isVideoType = (type) => {
      if(type){
        return type.startsWith('video/') 
      }
      return ''
   };
   return (
      <>
         {' '}
         <section className={`${style.warp} warp width-wrap`}>
            <header className={`${style.header} header`}>
               <div className={`${style.address} address`}>
                  CÔNG TY CỔ PHẦN THÉP POMINA <br />
                  Bộ phận Bảo Trì Điện <br />
                  Phân xưởng Luyện
               </div>
               <div className={`${style.logo} logo`}>
                  <div className={`${style.logoImg} logoImg`}>{logoPomina}</div>

                  <span>NHÀ MÁY LUYỆN PHÔI THÉP</span>
               </div>
            </header>
            <div className={`${style.title} title`}>
               Báo Cáo Tuần {content.date.week} Tháng {content.date.month}
            </div>
            <div className={`${style.user} user`}>{content.user}</div>
            <ul className={`${style.list} list`}>
               Công việc đã làm trong tuần
               {content.job.map((crr, index) => {
                  return (
                     <li className={`${style.item} item`} key={index}>
                        {typeof crr === 'string' ? crr : crr.text}
                        {crr.id ? (
                           <div className={`${style.thumbnailContainer} thumbnailContainer`}>
                              {content.images?.jobImage?.[crr.id]?.map((image, imgIndex) => {
                                 const mediaUrl = image.fileURL;
                                 const isVideo = isVideoType(image.type);
                                 return (
                                    <div
                                       key={imgIndex}
                                       className={style.mediaContainer}
                                       onClick={() => setModalImageOpen({ isOpen: true, data: content.images.jobImage[crr.id] , index: imgIndex})}
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
                  );
               })}
            </ul>
            <div className={`${style.issueWarp} issueWarp`}>
               Các sự cố xảy ra trong tuần
               {content.issue ? (
                  content.issue.map((crr, index) => {
                     return (
                        <ul className={`${style.listItem} listItem`} key={index}>
                           <div className={`${style.itemTitle} itemTitle`}>{crr.name}</div>
                           <li className={`${style.item} item`}>
                              <i>Ngày xảy ra:</i> {crr.date}
                           </li>
                           <li className={`${style.item} item`}>
                              <i>Nội dung:</i> {crr.content}
                           </li>
                           <li className={`${style.item} item`}>
                              <i>Biện pháp khắc phục:</i> {crr.solution}
                              {crr.id ? (
                                 <div className={`${style.thumbnailContainer} thumbnailContainer`}>
                                    {content.images?.issueImage?.[crr.id]?.map((image, imgIndex) => {
                                       const mediaUrl = image.fileURL;
                                       const isVideo = isVideoType(image.type);
                                       return (
                                          <div
                                             key={imgIndex}
                                             className={style.mediaContainer}
                                             onClick={() => setModalImageOpen({ isOpen: true, data: content.images.issueImage[crr.id] , index: imgIndex })}
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
                        </ul>
                     );
                  })
               ) : (
                  <span
                     className={`${style.item} item`}
                     style={{
                        fontStyle: 'italic',
                     }}
                  >
                     <br />
                     không có sự cố ảnh hưởng sản xuất
                  </span>
               )}
            </div>
            <ul className={`${style.list} list`}>
               Kế hoạch tuần tới
               {content.plan.map((crr, index) => {
                  return (
                     <li className={`${style.item} item`} key={index}>
                        {typeof crr === 'string' ? crr : crr.text}
                        {crr.id ? (
                           <div className={`${style.thumbnailContainer} thumbnailContainer`}>
                              {content.images?.planImage?.[crr.id]?.map((image, imgIndex) => {
                                 const mediaUrl = image.fileURL;
                                 const isVideo = isVideoType(image.type);
                                 return (
                                    <div
                                       key={imgIndex}
                                       className={style.mediaContainer}
                                       onClick={() => setModalImageOpen({ isOpen: true, data: content.images.planImage[crr.id], index: imgIndex })}
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
                  );
               })}
            </ul>
            <ul className={`${style.list} list`}>
               Ý kiến/Đề xuất
               {content.propose.map((crr, index) => {
                  return (
                     <li className={`${style.item} item`} key={index}>
                        {typeof crr === 'string' ? crr : crr.text}
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
                  );
               })}
            </ul>
            <ul className={`${style.list} list`} style={{ paddingRight: '10px' }}>
               Vật tư đã xuất/Sử dụng
               <li className={`${style.item} get-table-width item`} style={{ marginTop: 0, listStyleType: 'none' }}></li>
               <EquipmentTable data={content.equipment} />
            </ul>
            {content.attachments?.[0] && (
               <ul className={`${style.list} list hidden`}>
                  File đính kèm
                  <ListItem>
                     <ListItemIcon sx={{ minWidth: '15px' }}>
                        <AttachFileIcon />
                     </ListItemIcon>
                     <Link href={content.attachments?.[0].fileURL} target="_blank" download>
                        Download File
                     </Link>
                  </ListItem>
               </ul>
            )}

            <section className={`${style.signature} signature`}>
               <div className={`${style.signatureTemp} signatureTemp`}></div>
               <div className={`${style.signatureWarp} signatureWarp`}>
                  <span className={`${style.signatureDate} signatureDate`}>
                     Pomina, Ngày {content.date.timestamp.slice(8)} tháng {content.date.timestamp.slice(5, 7)} năm{' '}
                     {content.date.timestamp.slice(0, 4)}
                  </span>
                  <span className={`${style.signatureName} signatureName`}>{content.user}</span>
               </div>
            </section>
            <div className={`${style.auth} auth`}>{(content.authEmail ??= 'none')}</div>
         </section>
      </>
   );
}

//////////////////
function EquipmentTable({ data }) {
   // console.log('🚀 ~ EquipmentTable ~ data:', data);\
   const [motherWidth, setMotherWidth] = useState(0);
   console.log('🚀 ~ EquipmentTable ~ motherWidth:', motherWidth);

   useEffect(() => {
      const widthElm = document.querySelector('.get-table-width');
      setMotherWidth(widthElm.offsetWidth);
   }, []);

   const thStyles = {
      border: '1px solid black',
      padding: '4px ',
      fontSize: '9px',
      fontWeight: 400,
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      boxSizing: 'border-box',
   };

   return (
      <>
         {data?.length && motherWidth && (
            <table style={{ borderCollapse: 'collapse', width: '100%', margin: '5px 0' }}>
               <thead>
                  <tr>
                     <th style={thStyles}>STT</th>
                     <th style={thStyles}>Mã Vật Tư</th>
                     <th style={thStyles}>Tên</th>
                     <th style={thStyles}>Số Lượng</th>
                     <th style={thStyles}>Đơn Vị</th>
                     <th style={thStyles}>Hành Động</th>
                  </tr>
               </thead>

               <tbody>
                  {data.map((crr, index) => {
                     return crr.text ? (
                        <tr key={index} className={`create-equipment`}>
                           <td style={{ ...thStyles, maxWidth: `${eval((motherWidth * 5) / 100)}px` }}>
                              <div style={{ fontStyle: 'italic', pointerEvents: 'none', userSelect: 'none' }}>{index + 1}</div>
                           </td>
                           <td style={{ ...thStyles, maxWidth: `${eval((motherWidth * 15) / 100)}px` }}>{crr.text[0]}</td>
                           <td style={{ ...thStyles, maxWidth: `${eval((motherWidth * 55) / 100)}px` }}>{crr.text[1]}</td>
                           <td style={{ ...thStyles, maxWidth: `${eval((motherWidth * 5) / 100)}px` }}>{crr.text[2]}</td>
                           <td style={{ ...thStyles, maxWidth: `${eval((motherWidth * 10) / 100)}px` }}>{crr.text[3]}</td>
                           <td style={{ ...thStyles, maxWidth: `${eval((motherWidth * 10) / 100)}px` }}>{crr.text[4]}</td>
                        </tr>
                     ) : (
                        ''
                     );
                  })}
               </tbody>
            </table>
         )}
      </>
   );
}
