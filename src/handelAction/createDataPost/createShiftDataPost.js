
export default function createShiftDataPost(callBack) {
   const equipElm = document.querySelectorAll('.create-equip')
   const issueElm = document.querySelectorAll('.create-issue')
   const orderElm = document.querySelectorAll('.create-order')
   const proposeElm = document.querySelectorAll('.create-propose')
   const handoverElm = document.querySelectorAll('.create-handover')
   const timeElm = document.getElementsByTagName('select')

   //////////
   const handover = []
   const equip = []
   const issue = []
   const order = []
   const propose = []
   const today = new Date
   const monthStamp = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
   const dateStamp = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`
   const timestamp = `${today.getFullYear()}-${monthStamp}-${dateStamp}`

   // tạo biến để tạo  giá trị upload
   let date = 0
   let month = 0
   let year = 0
   let shift = ''
   let session = ''
   let result = {}
   let authEmail = 'none'

   if (sessionStorage.getItem('user')) {
      const temp = JSON.parse(sessionStorage.getItem('user'))
      authEmail = temp.email
   }
   ///////// lấy giá trị từ trang viết báo cáo
   for (const value of timeElm) {
      if (value.name === 'shiftDateReport') {
         date = value.value
      }
      if (value.name === 'shiftMonthReport') {
         month = value.value
      }
      if (value.name === 'shiftYearReport') {
         year = value.value
      }
      if (value.name === 'shiftSessionReport') {
         session = value.value
      }
      if (value.name === 'shiftShiftReport') {
         shift = value.value
      }
   }

   //////////
   for (const value of proposeElm) {
      const temp = value.getElementsByTagName('p')
      const text = temp[0].innerText.trim()
      if (!(text === '')) {
         propose.push(text)
      }
   }
   ////////////
   for (const value of issueElm) {
      const area = value.querySelector('select[name=shiftAreaSelect]').value
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.issueInput
         result[title] = crr.innerText
      })
      result['area'] = area
      issue.push(result)
   }
   ////////////

   for (const value of equipElm) {
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.equipInput
         result[title] = crr.innerText
      })
      equip.push(result)
   }
   ////////////
   for (const value of orderElm) {
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.orderInput
         result[title] = crr.innerText
      })
      order.push(result)
   }
   ////////////
   for (const value of handoverElm) {
      const temp = [...value.querySelectorAll('.handoverItem')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.handoverInput
         result[title] = crr.innerText
      })
      handover.push(result)
   }
   ////////////
   propose.length >= 1 ? (result.propose = propose) : (result.propose = ['...'])
   order.length >= 1 ? (result.order = order) : (result.order = ['...'])
   handover.length >= 1 ? (result.handover = handover) : (result.handover = ['...'])
   issue.length >= 1 ? (result.issue = issue) : (result.issue = ['...'])
   equip.length >= 1 ? (result.equipmentUsed = equip) : (result.equipmentUsed = ['...'])
   // result.order = order
   // result.handover = handover
   // result.issue = issue
   // result.equipmentUsed = equip
   result.status = ['normal']
   result.authEmail = authEmail
   result.user = 'Ca ' + shift
   result.shift = shift
   result.date = { session: session, date: date, month: month, year: year, timestamp: timestamp }
   result.images = { job: {}, plan: {}, issue: {}, propose: {}, equipmentStatus: {},equipment: {} };

   result.attachments = [];
   result.reportType = 'ShiftReport';
   console.log(result)
   callBack({ state: 'file Upload', data: result });
}
////////////
