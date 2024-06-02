'use client'

import React from 'react'

import { 
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

import style from './skillsChart.module.css';

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

const options = {
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 10,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

interface Props {
  skills_labels: string[];
  skills_values: number[];
}

export function SkillsChart({ skills_labels, skills_values }: Props) {

  const data = {
    labels: skills_labels,
    datasets: [
      {
        label: 'Capability Level',
        data: skills_values,
        fill: true,
        backgroundColor: '#282828',
        borderColor: '#434D57',
        pointBackgroundColor: '#D5E963',
        borderWidth: 3,
        pointBorderWidth: 1,
      },
    ],
  }

  return (
    <div className={style.chart_container}>
      <h1 className={style.title}>Employee Skills</h1>
      <div className={style.chart}>
        <Radar data={data} options={options} />
      </div>
      
    </div>
  )
}