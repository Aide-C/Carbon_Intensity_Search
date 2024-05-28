import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function Results() {
  const [resp1, setResp1] = useState(null);
  const [resp2, setResp2] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { latitude, longitude } = location.state || {};

  useEffect(() => {
    if (!latitude || !longitude) {
      setError("Location data is missing");
      return;
    }

    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('/get_carbon_intensity', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          }),
          fetch('/get_power_breakdown', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          }),
        ]);

        if (!response1.ok || !response2.ok) {
          throw new Error('Failed to fetch data');
        }

        const data1 = await response1.json();
        const data2 = await response2.json();

        setResp1(data1);
        setResp2(data2);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const handleBackClick = () => {
    navigate('/');
  };

  const formatPieChartData = (data) => {
    const labels = Object.keys(data);
    const values = Object.values(data);
    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFD700',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FFCD56',
            '#6A8EAE',
            '#D4A5A5',
            '#A4DE02',
            '#DDA0DD',
            '#FF6F61'
          ],
        },
      ],
    };
  };

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <button className='prevBtn' onClick={handleBackClick}>Back</button>
      <h1 className='resultTitle'>Estimated Carbon Intensity and Power Breakdown Report</h1>

      <div className='respContainer'>
        {resp1 && (
          <div className='borders'>
            <h2>Carbon Intensity</h2>
            <p><strong>Electrical Grid Region:</strong> {resp1.zone}</p>
            <p><strong>Carbon Intensity:</strong> {resp1.carbonIntensity} gCO2eq/kWh</p>
            <p><strong>Created At:</strong> {resp1.createdAt}</p>
            <p><strong>Updated At:</strong> {resp1.updatedAt}</p>
            <p><strong>Datetime:</strong> {resp1.datetime}</p>
            <p><strong>Emission Factor Type:</strong> {resp1.emissionFactorType}</p>
            <p><strong>Estimation Method:</strong> {resp1.estimationMethod}</p>
          </div>
        )}

        
        {resp2 && (
          <div className='equal'>

            <div className='borders'>
              <h2>Power Consumption</h2>
              <ul>
                {Object.entries(resp2.powerConsumptionBreakdown).map(([source, value], index) => (
                  <li key={index}>
                    <strong>{source}:</strong> {value} MW
                  </li>
                ))}
              </ul>
              <p><strong>Total Power Consumption: {resp2.powerConsumptionTotal} MW</strong></p>
              <p><strong>Only {resp2.renewablePercentage}% of power consumed is from Renewable Energy</strong></p>
            </div>

            <div className='borders'>
              <h2>Power Production</h2>
              <ul>
                {Object.entries(resp2.powerProductionBreakdown).map(([source, value], index) => (
                  <li key={index}>
                    <strong>{source}:</strong> {value !== null ? `${value} MW` : 'Not available'}
                  </li>
                ))}
              </ul>
              <p><strong>Total Power Production: {resp2.powerProductionTotal} MW</strong></p>
              <p><strong>Imported Power (By Electrical Grid): {resp2.powerImportTotal} MW</strong></p>


              <ul>
                {Object.entries(resp2.powerImportBreakdown).map(([source, value], index) => (
                  <li key={index}>
                    <strong>{source}:</strong> {value} MW
                  </li>
                ))}
              </ul>
              <p><strong>Exported Power (By Electrical Grid): {resp2.powerExportTotal} MW</strong></p>



              <ul>
                {Object.entries(resp2.powerExportBreakdown).map(([source, value], index) => (
                  <li key={index}>
                    <strong>{source}:</strong> {value} MW
                  </li>
                ))}
              </ul>
            </div>

            <div className='borders'>
              <h2>Power Consumption Pie Chart</h2>
              <Pie data={formatPieChartData(resp2.powerConsumptionBreakdown)} />
            </div>

          </div>
        )}
      </div> 
    </div>
  );
}

export default Results;
