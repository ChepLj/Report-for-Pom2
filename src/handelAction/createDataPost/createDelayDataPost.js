export default function createDelayDataPost(callBack) {

   const issueElm = document.querySelectorAll('.create-issue');

   const proposeElm = document.querySelectorAll('.create-propose');
   const timeElm = document.getElementsByTagName('select');
 


   const productTimeTotalElm = document.getElementById('create-summary_productTimeTotal');
   // const delayTimeTotalElm = document.getElementById('create-summary_delayTimeTotal');
   const delayTimeKPITotalElm = document.getElementById('create-summary_delayTimeKPITotal');
   const maintenanceTimeTotalElm = document.getElementById('create-summary_maintenanceTimeTotal');
   const maintenanceTimeKPITotalElm = document.getElementById('create-summary_maintenanceTimeKPITotal');
   const delayWeek1Elm = document.getElementById('create-delay_week-1');
   const delayWeek2Elm = document.getElementById('create-delay_week-2');
   const delayWeek3Elm = document.getElementById('create-delay_week-3');
   const delayWeek4Elm = document.getElementById('create-delay_week-4');
   const delayWeek5Elm = document.getElementById('create-delay_week-5');

   //////////

   const issue = [];

   const propose = [];

   const today = new Date();
   const monthStamp = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
   const dateStamp = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`;
   const timestamp = `${today.getFullYear()}-${monthStamp}-${dateStamp}`;
   let month = 0;
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

      if (value.name === 'monthWeekReport') {
         month = value.value;
      }
      if (value.name === 'yearWeekReport') {
         year = value.value;
      }
      if (value.name === 'userWeekReport') {
         user = value.value;
      }
   }
   /////////////////////////

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
      const id = temp[1].dataset.issueId;
      temp.forEach((crr, index) => {
         const title = crr.dataset.issueInput;
         result[title] = crr.innerText;
      });
      result.id = id;
      if (result?.name !== '') {
         issue.push(result);
      }
   }
   //////////
   const summary = {
      productTimeTotal : productTimeTotalElm.innerText.trim(),
      // delayTimeTotal : delayTimeTotalElm.innerText.trim(),
      delayTimeKPITotal : delayTimeKPITotalElm.innerText.trim(),
      maintenanceTimeTotal : maintenanceTimeTotalElm.innerText.trim(),
      maintenanceTimeKPITotal : maintenanceTimeKPITotalElm.innerText.trim(),
   }
   const weekDelay = {
      week1: delayWeek1Elm.innerText.trim(),
      week2: delayWeek2Elm.innerText.trim(),
      week3: delayWeek3Elm.innerText.trim(),
      week4: delayWeek4Elm.innerText.trim(),
      week5: delayWeek5Elm.innerText.trim(),
   }
   //////////
   result.summary = summary
   result.weekDelay = weekDelay
   propose.length >= 1 ? (result.propose = propose) : (result.propose = ['...']);

   result.status = ['normal'];
   result.issue = issue;

   result.authEmail = authEmail;

   result.user = user;
   result.date = { month: month, year: year,timestamp: timestamp };

   result.images = { issue: {}, propose: {} };

   result.attachments = [];
   result.reportType = 'DelayReport';
   console.log(result);
   callBack({ state: 'file Upload', data: result });
}
////////////
