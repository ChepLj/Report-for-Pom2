import { update } from 'firebase/database'
import { dbRT } from '../../firebase/firebaseConfig'
import { getFirebaseData } from '../getFirebaseData'

export default function createMonthDataPost(callBack) {
   const jobElm = document.querySelectorAll('.create-job')
   const equipElm = document.querySelectorAll('.create-equip')
   const issueElm = document.querySelectorAll('.create-issue')
   const planElm = document.querySelectorAll('.create-plan')
   const proposeElm = document.querySelectorAll('.create-propose')
   const timeElm = document.getElementsByTagName('select')

   //////////
   const job = []
   const equip = []
   const issue = []
   const plan = []
   const propose = []
   const today = new Date()
   const monthStamp = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
   const dateStamp = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`
   const timestamp = `${today.getFullYear()}-${monthStamp}-${dateStamp}`
   let month = 0
   let year = 0
   let user = ''
   let result = {}
   let authEmail = 'none'
   if (sessionStorage.getItem('user')) {
      const temp = JSON.parse(sessionStorage.getItem('user'))
      authEmail = temp.email
   }
   /////////
   for (const value of timeElm) {
      if (value.name === 'yearMonthReport') {
         year = value.value
      }
      if (value.name === 'monthMonthReport') {
         month = value.value
      }
      if (value.name === 'userMonthReport') {
         user = value.value
      }
   }
   /////////////////////////
   // for (const value of jobElm) {
   //    const temp = value.getElementsByTagName('p')
   //    if (!(temp[0].innerText.trim() === '')) {
   //       job.push(temp[0].innerText)
   //    }
   // }
   /////////
   for (const value of planElm) {
      const temp = value.getElementsByTagName('p')
      const text = temp[0].innerText.trim()
      if (!(text === '')) {
         plan.push(text)
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
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.issueInput
         result[title] = crr.innerText
      })
      issue.push(result)
   }
   ////////////
   for (const value of jobElm) {
      const temp = [...value.getElementsByTagName('p')] // rải để sử dụng với map()
      const result = {}
      temp.forEach((crr, index) => {
         const title = crr.dataset.jobInput
         result[title] = crr.innerText
      })
      job.push(result)
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
   // job.length >= 1 ? (result.job = job) : (result.job = ['...'])
   plan.length >= 1 ? (result.plan = plan) : (result.plan = ['...'])
   propose.length >= 1 ? (result.propose = propose) : (result.propose = ['...'])

   result.issue = issue
   result.status = ['normal']
   result.equipment = job
   result.equipmentUsed = equip
   // result.plan = plan
   // result.propose = propose
   result.authEmail = authEmail
   result.user = user
   result.date = { month: month, year: year, timestamp: timestamp }
   console.log(result)
   const ref = `Report/MonthReport/${Date.now()}`
   updateDataFirebase(ref, result).then(() => {
      getFirebaseData(ref)
         .then((result) => {
            // console.log(result.val())
            callBack(result.val())
         })
         .catch((error) => {
            alert(error)
         })
   })
   return true
}
////////////

function updateDataFirebase(ref, objectData) {
   objectData['ref'] = ref
   // const newRef = ref
   const updates = {}
   updates[ref] = objectData
   const objectDataNew = {}
   objectDataNew.authEmail = objectData.authEmail
   objectDataNew.ref = ref
   objectDataNew.user = objectData.user
   objectDataNew.date = objectData.date
   objectDataNew.type = 'monthReport'
   updates[`NewReport/${Date.now()}`] = objectDataNew
   //   for (const key in objectData) {
   //     updates["Report"] = objectData[key];
   //   }

   // console.log(updates);

   return update(dbRT, updates)
}
