import React from 'react';
import { Pie } from 'react-chartjs-2';
import './App.css';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const PowerBreakdown = ({ data }) => {
  const consumptionLabels = Object.keys(data.powerConsumptionBreakdown);
  const consumptionValues = Object.values(data.powerConsumptionBreakdown);

  const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  const consumptionDataset = {
    labels: consumptionLabels,
    datasets: [
      {
        data: consumptionValues,
        backgroundColor: consumptionValues.map(() => randomColor()),
      },
    ],
  };
  

  return (
    <div className='respContainer'>
        <div className='response'>
            <h2>Power Consumption Breakdown:</h2>
            <ul>
                {Object.entries(data.powerConsumptionBreakdown).map(([source, value], index) => (
                <li key={index}>
                <strong>{source}:</strong> {value} MW
                </li>
                ))}
            </ul>
            <p><strong>Total Power Consumption: {resp2.powerConsumptionTotal} MW</strong></p>
            <p><strong>Only {resp2.renewablePercentage}% of power consumed is from Renewable Energy</strong></p>
        </div>

        <div className='chart'>
            <Pie data={consumptionDataset} />
            <p><strong>Shows visual of top 5 power resourse</strong></p>
        </div>

        <div className='response'>
            <h2>Power Production Breakdown:</h2>
            <ul>
            {Object.entries(resp2.powerProductionBreakdown).map(([source, value], index) => (
                <li key={index}>
                    <strong>{source}:</strong> {value !== null ? `${value} MW`: 'Not available'} 
                </li>
            ))}
            </ul>
            <p><strong>Total Power Production: {resp2.powerProductionTotal} MW</strong></p>
        </div>

        <div className='response'>
            <h2>Power Import Breakdown:</h2>
            <h3>By electrical grid region</h3>
            <ul>
            {Object.entries(resp22.powerImportBreakdown).map(([source, value], index) => (
                <li key={index}>
                    <strong>{source}:</strong> {value} MW
                </li>
            ))}
            </ul>
            <p><strong>Total Power Import: {resp2.powerImportTotal} MW</strong></p>
        </div>

        <div className='response'>
            <h2>Power Export Breakdown:</h2>
            <h3>By electrical grid region</h3>
            <ul>
            {Object.entries(resp2.powerExportBreakdown).map(([source, value], index) => (
                <li key={index}>
                    <strong>{source}:</strong> {value} MW
                </li>
            ))}
            </ul>
            <p><strong>Total Power Export: {resp2.powerExportTotal} MW</strong></p>.
        </div>
    </div>
  );
};

export default PowerBreakdown;

