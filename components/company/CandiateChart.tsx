'use client';

import Spinner from "@/components/common/Spinner";
import React, {useEffect, useState} from 'react';
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
import {Line} from 'react-chartjs-2';

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

function getCandidates(offerId: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch(process.env.API_URL + `api/candidate/candidate/${offerId}/timeline`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => setData(data));
    }, [offerId]);

    return data;
}


export default function CandidateChartTimeline({offerId}: { offerId: number }) {
    const timelineData = getCandidates(offerId);

    if (!timelineData){
        return <div><Spinner/></div>
    }

    const labels = timelineData.map((item: any) => item?.created_at__date);
    const dataset = timelineData.map((item: any) => item?.num_candidates);

    const data = {
        labels,
        datasets: [
            {
                label: 'Candidates last 30 days',
                data: dataset,
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(141,141,141,0.5)',
            },
        ],
    };

    return <Line options={options} data={data}/>;
}