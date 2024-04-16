// import React, { useState, useEffect } from 'react';
// import ReactApexChart from 'react-apexcharts';
//
// const UserActivityGraph = () => {
//     // Sample user activity data (replace this with your actual data)
//     const [userActivityData, setUserActivityData] = useState({
//         series: [{
//             name: 'User Activity',
//             data: [65, 59, 80, 81, 56, 55, 40], // Sample data (replace with actual data)
//         }],
//         options: {
//             chart: {
//                 type: 'line',
//                 height: 350,
//             },
//             xaxis: {
//                 categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//             },
//         },
//     });
//
//     return (
//         <div>
//             {/*<h2>User Activity</h2>*/}
//             <div>
//                 <ReactApexChart options={userActivityData.options} series={userActivityData.series} type="line" height={220} />
//             </div>
//         </div>
//     );
// };
//
// export default UserActivityGraph;


import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const UserActivityGraph = () => {
    // Sample user activity data (replace this with your actual data)
    const [userActivityData, setUserActivityData] = useState({
        series: [{
            name: 'User Activity',
            data: [65, 59, 80, 81, 56, 55, 40], // Sample data (replace with actual data)
        }],
        options: {
            chart: {
                type: 'radar', // Change chart type to radar
                height: 350,
            },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            },
        },
    });

    return (
        <div>
            {/*<h2>User Activity</h2>*/}
            <div>
                <ReactApexChart options={userActivityData.options} series={userActivityData.series} type="radar" height={220} />
            </div>
        </div>
    );
};

export default UserActivityGraph;
