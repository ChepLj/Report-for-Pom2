import style from './WeekReport.module.css';
import { logoPomina } from '../../static/svg/sgv';
import noImage from '../../static/img/No_Image_Available.jpg';
import { useEffect } from 'react';
import { ModalImageShow } from '../../Modal/ImageShow/ModalImageShow';

import { List, ListItem, Link, ListItemIcon } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
export default function WeekReport({ content, setModalImageOpen }) {
   console.log('🚀 ~ WeekReport ~ content:', content);

   return (
      <>
         {' '}
         <section className={`${style.warp} warp`}>
            <header className={`${style.header} header`}>
               <div className={`${style.address} address`}>
                  CÔNG TY CỔ PHẦN THÉP POMINA <br />
                  Khu Công nghiệp Phú Mỹ I Thị Xã Phú mỹ, Tỉnh Bà rịa Vũng tàu <br />
                  ÐT: 064 3922-521 / Fax: 064 3922-446
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
                              {content.images?.jobImage?.[crr.id]?.map((image, imgIndex) => (
                                 <img
                                    key={imgIndex}
                                    src={image.fileURL}
                                    onClick={() => setModalImageOpen({ isOpen: true, data: content.images.jobImage[crr.id] })}
                                    alt={`Thumbnail ${imgIndex + 1}`}
                                    onError={(e) => {
                                       e.target.src = noImage;
                                    }}
                                    className={`${style.thumbnail} thumbnail`}
                                 />
                              ))}
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
                                    {content.images?.issueImage?.[crr.id]?.map((image, imgIndex) => (
                                       <img
                                          key={imgIndex}
                                          src={image.fileURL}
                                          onClick={() => setModalImageOpen({ isOpen: true, data: content.images.issueImage[crr.id] })}
                                          alt={`Thumbnail ${imgIndex + 1}`}
                                          onError={(e) => {
                                             e.target.src = noImage;
                                          }}
                                          className={`${style.thumbnail} thumbnail`}
                                       />
                                    ))}
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
                              {content.images?.planImage?.[crr.id]?.map((image, imgIndex) => (
                                 <img
                                    key={imgIndex}
                                    src={image.fileURL}
                                    onClick={() => setModalImageOpen({ isOpen: true, data: content.images.planImage[crr.id] })}
                                    alt={`Thumbnail ${imgIndex + 1}`}
                                    onError={(e) => {
                                       e.target.src = noImage;
                                    }}
                                    className={`${style.thumbnail} thumbnail`}
                                 />
                              ))}
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
                              {content.images?.proposeImage?.[crr.id]?.map((image, imgIndex) => (
                                 <img
                                    key={imgIndex}
                                    src={image.fileURL}
                                    onClick={() => setModalImageOpen({ isOpen: true, data: content.images.proposeImage[crr.id] })}
                                    alt={`Thumbnail ${imgIndex + 1}`}
                                    onError={(e) => {
                                       e.target.src = noImage;
                                    }}
                                    className={`${style.thumbnail} thumbnail`}
                                 />
                              ))}
                           </div>
                        ) : (
                           ''
                        )}
                     </li>
                  );
               })}
            </ul>
            <ul className={`${style.list} list`}>
               Vật tư đã xuất/Sử dụng
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
                     Pomina3, Ngày {content.date.timestamp.slice(8)} tháng {content.date.timestamp.slice(5, 7)} năm{' '}
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
   console.log('🚀 ~ EquipmentTable ~ data:', data);
   return (
      <>
         {data?.length && (
            <table style={{ borderCollapse: 'collapse', width: '100%', margin: '5px 0' }}>
               <thead>
                  <tr>
                     <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>STT</th>
                     <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>Mã Vật Tư</th>
                     <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>Tên</th>
                     <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>Số Lượng</th>
                     <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>Đơn Vị</th>
                     <th style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>Hành Động</th>
                  </tr>
               </thead>

               <tbody>
                  {data.map((crr, index) => {
                     console.log('🚀 ~ {data.map ~ crr:', crr);
                     return crr.text ? (
                        <tr key={index} className={`create-equipment`}>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '9px' }}>
                              <div style={{ fontStyle: 'italic', pointerEvents: 'none', userSelect: 'none' }}>{index + 1}</div>
                           </td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: 400 }}>{crr.text[0]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: 400 }}>{crr.text[1]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: 400 }}>{crr.text[2]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: 400 }}>{crr.text[3]}</td>
                           <td style={{ border: '1px solid black', padding: '4px', fontSize: '10px', fontWeight: 400 }}>{crr.text[4]}</td>
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
