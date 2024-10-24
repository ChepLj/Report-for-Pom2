export default function createWeekDataPost(callBack) {
   const jobElm = document.querySelectorAll('.create-job');
   const issueElm = document.querySelectorAll('.create-issue');
   const planElm = document.querySelectorAll('.create-plan');
   const proposeElm = document.querySelectorAll('.create-propose');
   const timeElm = document.getElementsByTagName('select');
   const equipmentElm = document.getElementById('equipment-data-store');

   //////////
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
   let week = 0;
   let user = '';
   let result = {};
   let authEmail = 'none';
   if (sessionStorage.getItem('user')) {
      const temp = JSON.parse(sessionStorage.getItem('user'));
      authEmail = temp.email;
   }
   /////////
   for (const value of timeElm) {
      if (value.name === 'weekWeekReport') {
         week = value.value;
      }
      if (value.name === 'monthWeekReport') {
         month = value.value;
      }
      if (value.name === 'userWeekReport') {
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
   console.log("🚀 ~ createWeekDataPost ~ temp:", temp)
   if (temp.length > 0) {
      for (const value of temp) {
         if (value.data.length > 0) {
            equipment.push({ text: value.data, id: value.id });
         }
      }
   }

   ////////////

   //////////
   job.length >= 1 ? (result.job = job) : (result.job = ['...']);
   plan.length >= 1 ? (result.plan = plan) : (result.plan = ['...']);
   propose.length >= 1 ? (result.propose = propose) : (result.propose = ['...']);
   result.equipment = equipment;
   result.status = ['normal'];
   result.issue = issue;
   // result.job = job
   // result.plan = plan
   // result.propose = propose
   result.authEmail = authEmail;

   result.user = user;
   result.date = { month: month, week: week, timestamp: timestamp };

   result.images = { job: {}, plan: {}, issue: {}, propose: {}, equipment: {} };

   result.attachments = [];
   result.reportType = 'WEEK REPORT';
   console.log(result)
   callBack({ state: 'file Upload', data: result });
}
////////////
