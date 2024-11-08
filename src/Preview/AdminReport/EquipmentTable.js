
import style from './EquipmentTable.module.css'

export default function EquipmentTable({data}) {
   console.log("🚀 ~ data:", data)
   return (
      <table border="1px" className={`${style.table} shift-table`}>
         <thead>
            <tr>
               <th className={`${style.tableTitle} shift-tableTitle`} style={{ width: '50%' }}>
                  Vật tư đã sử dụng 
               </th>
               <th className={`${style.tableTitle} shift-tableTitle`}>Công cụ, dụng cụ </th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td style={{ verticalAlign: 'top' }}>
                  <table className={`${style.tableChild} shift-tableChild`} border={'1px'}>
                     <thead>
                        <tr>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '10%' }}>
                              Stt
                           </th>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '25%' }}>
                              Mã vật tư
                           </th>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`}>Tên vật tư</th>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '15%' }}>
                              Số lượng
                           </th>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '15%' }}>
                              Đơn vị
                           </th>
                        </tr>
                     </thead>
                     {data?.equipment?.map((crr, index) => {
                        const content = crr.text || [0,0,0,0,0]
                        console.log("🚀 ~ {data?.equipment?.map ~ content:", content)
                        return (
                           <tbody key={index}>
                              <tr>
                                 <td className={`${style.tableContentChild} shift-tableTitleChild`}>{index + 1}</td>
                                 <td className={`${style.tableContentChild} shift-tableTitleChild`}>{content[0]}</td>

                                 <td className={`${style.tableContentChild} shift-tableTitleChild`}>{content[1]}</td>
                                 <td className={`${style.tableContentChild} shift-tableTitleChild`}>{content[2]}</td>
                                 <td className={`${style.tableContentChild} shift-tableTitleChild`}>{content[3]}</td>
                              </tr>
                           </tbody>
                        );
                     })}
                        
                  </table>
               </td>
               <td style={{ verticalAlign: 'top' }}>
                  <table className={`${style.tableChild} shift-tableChild`} border={'1px'}>
                     <thead>
                        <tr>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '10%' }}>
                              Stt
                           </th>

                           <th className={`${style.tableTitleChild} shift-tableTitleChild`}>Tên công dụng cụ</th>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '15%' }}>
                              Số lượng
                           </th>
                           <th className={`${style.tableTitleChild} shift-tableTitleChild`} style={{ width: '15%' }}>
                              Đơn vị
                           </th>
                        </tr>
                     </thead>
                     {data?.handover?.map((crr, index) => {
                        return (
                           <tbody key={index}>
                              <tr>
                                 <td className={`${style.tableContentChild} shift-tableContentChild`}>{index + 1}</td>

                                 <td className={`${style.tableContentChild} shift-tableContentChild`}>{crr?.name}</td>
                                 <td className={`${style.tableContentChild} shift-tableContentChild`}>{crr?.amount}</td>
                                 <td className={`${style.tableContentChild} shift-tableContentChild`}>{crr?.unit}</td>
                              </tr>
                           </tbody>
                        );
                     })}
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   );
}
