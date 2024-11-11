import { useEffect, useState } from 'react';
import { getFirebaseData } from '../../handelAction/getFirebaseData';
import Header from './Header/Header';
import style from './MainLayout.module.css';
import Collection from './Section/Collection/Collection';
import Filter from './Section/Filter/Filter';
import NewReport from './Section/NewReport/NewReport';

export default function MainLayout() {
   const [state, setState] = useState({ NewReport: '', Report: '' });
   const [filterState, setFilterState] = useState();

   let auth = {};
   const now = new Date();
   const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds

   if (localStorage.getItem('user')) {
      const authTemp = JSON.parse(localStorage.getItem('user'));
      if (now.getTime() - authTemp?.timestamp >= oneDayInMs) {
         localStorage.removeItem('user'); // Remove data if it's older than 1 day
         
      } else {
         auth = authTemp;
      }
   }
   // useEffect(() => {
   //    /////tao element lodding mount vaof DOM
   //    const elementLoadding = document.createElement('span')
   //    elementLoadding.classList.add('loader')
   //    document.querySelector('.App').appendChild(elementLoadding)
   //    //////////// lay du lieu
   //    getFirebaseData('/')
   //       .then((result) => {
   //          elementLoadding.remove()
   //          // console.log(result.val())
   //          setState(result.val())
   //       })
   //       .catch((error) => {
   //          alert(error)
   //          elementLoadding.remove()
   //       })
   // }, [filterState])
   const fetchData = () => {
      const elementLoadding = document.createElement('span');
      elementLoadding.classList.add('loader');
      document.querySelector('.App').appendChild(elementLoadding);

      let isDataFetched = false;

      const reloadTimer = setTimeout(() => {
         if (!isDataFetched) {
            console.warn('Data not fetched within timeout. Retrying...');
            fetchData(); // Call the fetch function again
         }
      }, 10000); // 10 seconds timeout

      // Fetch data from Firebase
      getFirebaseData('/')
         .then((result) => {
            isDataFetched = true;
            clearTimeout(reloadTimer); // Clear the timer on successful fetch
            elementLoadding.remove();
            setState(result.val());
         })
         .catch((error) => {
            clearTimeout(reloadTimer); // Clear the timer on error
            console.error('Data fetch error:', error);
            elementLoadding.remove();
            // Optionally retry immediately on error
            setTimeout(fetchData, 5000); // Retry fetching after 5 seconds
         });
   };

   useEffect(() => {
      fetchData(); // Initial fetch
   }, [filterState]);

   return (
      <section className={style.warpPage}>
         <Header user={state?.User} authLogin={auth} />
         <section className={style.warpContent}>
            <section className={style.leftSideContent}>
               <Filter
                  user={state?.User}
                  callback={(value) => {
                     setFilterState(value);
                  }}
               />
            </section>
            <section className={style.rightSideContent}>
               <section className={style.newReport}>
                  <NewReport data={state?.NewReport} />
               </section>
               <section className={style.collection}>
                  <Collection data={state?.Report} filter={filterState} auth={auth} />
               </section>
            </section>
         </section>
      </section>
   );
}
