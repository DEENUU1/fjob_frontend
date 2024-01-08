import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

// async function getCandidates(offerId: number){
//     const response = await fetch(process.env.API_URL + `api/candidate/candidate/offer/${offerId}`, {
//         credentials: "include",
//     })
//
//     if (!response.ok){
//         throw new Error("Something went wrong")
//     }
//
//     return response.json();
// }
//


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Candidates last 30 days',
            data: [10, 20, 30, 40, 50],
            borderColor: 'rgb(0,0,0)',
            backgroundColor: 'rgba(141,141,141,0.5)',
        },
    ],
};

export default function CandidateChartTimeline() {
    return <Line options={options} data={data} />;
}