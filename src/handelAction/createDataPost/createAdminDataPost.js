export default function createAdminDataPost(callBack) {
   const jobElm = document.querySelectorAll('.create-job');
   const issueElm = document.querySelectorAll('.create-issue');
   const planElm = document.querySelectorAll('.create-plan');
   const proposeElm = document.querySelectorAll('.create-propose');
   const timeElm = document.getElementsByTagName('select');
   const equipmentElm = document.getElementById('equipment-data-store');
   const handoverElm = document.querySelectorAll('.create-handover');

   //////////
   const handover = [];
   const job = [];
   const issue = [];
   const plan = [];
   const propose = [];
   const equipment = [];
   const today = new Date();
   const monthStamp = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
   const dateStamp = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`;
   const timestamp = `${today.getFullYear()}-${monthStamp}-${dateStamp}`;
   let month = 0;
   let date = 0;
   let year = 0;
   let user = '';
   let result = {};
   let authEmail = 'none';
   if (localStorage.getItem('user')) {
      const temp = JSON.parse(localStorage.getItem('user'));
      authEmail = temp.email;
   }
   /////////
   for (const value of timeElm) {
      if (value.name === 'dateAdminReport') {
         date = value.value;
      }
      if (value.name === 'monthAdminReport') {
         month = value.value;
      }
      if (value.name === 'yearAdminReport') {
         year = value.value;
      }
      if (value.name === 'userAdminReport') {
         user = value.value;
      }
   }
   /////////////////////////
   for (const value of jobElm) {
      const temp = value.getElementsByTagName('p');
      const text = temp[0].innerText.trim();

      const id = temp[0].dataset.jobId;
      if (!(text === '')) {
         job.push({ text: text, id: id });
      }
   }
   /////////
   for (const value of planElm) {
      const temp = value.getElementsByTagName('p');
      const text = temp[0].innerText.trim();
      const id = temp[0].dataset.planId;

      if (!(text === '')) {
         plan.push({ text: text, id: id });
      }
   }
   //////////
   for (const value of proposeElm) {
      const temp = value.getElementsByTagName('p');
      const text = temp[0].innerText.trim();
      const id = temp[0].dataset.proposeId;

      if (!(text === '')) {
         propose.push({ text: text, id: id });
      }
   }
   ////////////
   for (const value of issueElm) {
      const temp = [...value.getElementsByTagName('p')]; // rải để sử dụng với map()
      const result = {};
      const id = temp[0].dataset.issueId;
      temp.forEach((crr, index) => {
         const title = crr.dataset.issueInput;
         result[title] = crr.innerText;
      });
      result.id = id;
      issue.push(result);
   }
   //////////
   const equipmentArray = equipmentElm.innerText;
   const temp = JSON.parse(equipmentArray);
   console.log('🚀 ~ createAdminDataPost ~ temp:', temp);
   if (temp.length > 0) {
      for (const value of temp) {
         if (value.data.length > 0) {
            equipment.push({ text: value.data, id: value.id });
         }
      }
   }

   ////////////
   ////////////
   for (const value of handoverElm) {
      const temp = [...value.querySelectorAll('.handoverItem')]; // rải để sử dụng với map()
      const result = {};
      temp.forEach((crr, index) => {
         const title = crr.dataset.handoverInput;
         result[title] = crr.innerText;
      });
      handover.push(result);
   }
   ////////////
   //////////
   handover.length >= 1 ? (result.handover = handover) : (result.handover = ['...']);
   job.length >= 1 ? (result.job = job) : (result.job = ['...']);
   // plan.length >= 1 ? (result.plan = plan) : (result.plan = ['...']);
   propose.length >= 1 ? (result.propose = propose) : (result.propose = ['...']);
   result.equipment = equipment;
   result.status = ['normal'];
   // result.issue = issue;
   // result.job = job
   // result.plan = plan
   // result.propose = propose
   result.authEmail = authEmail;

   result.user = user;
   result.date = { month: month, date: date, year: year, timestamp: timestamp };

   result.images = { job: {}, plan: {}, issue: {}, propose: {}, equipment: {} };

   result.attachments = [];
   result.reportType = 'AdminReport';
   console.log(result);
   callBack({ state: 'file Upload', data: result });
}
////////////
