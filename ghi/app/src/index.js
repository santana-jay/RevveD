import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadData() {
  try{
    const appointmentResponse = await fetch('http://localhost:8080/api/appointments/')
    const technicianResponse = await fetch('http://localhost:8080/api/technicians/')

    if(appointmentResponse.ok && technicianResponse.ok){
      const appointmentData = await appointmentResponse.json()
      const technicianData = await technicianResponse.json()

      console.log('app data:', appointmentData)
      console.log('tech data', technicianData)

      root.render(
        <React.StrictMode>
          <App appointments={appointmentData.appointments} technicians={technicianData.technicians}/>
        </React.StrictMode>
      )
    }else{
      console.error('failed to load data:', appointmentResponse.status, appointmentResponse.statusText, technicianResponse.statusText, technicianResponse.statusText)
    }
  }catch(e){
    console.error('error fetch data', e)
  }

}

loadData()
