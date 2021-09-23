// eslint-disable-next-line no-unused-vars
import React, {Component} from "react";
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  const vehicles = await fetch("api/vehicles.json")
    .then((res) => res.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('Looks like there was a problem!', error))

  //Temporary media query to window resize
  const mediaQuery = window.matchMedia('(max-width: 767px)');


  //Remove reference to the 'problematic' data in the json and return a new vehicle list
  const newVehicleList = vehicles.filter(function (vehicle) {
    return vehicle.id !== "problematic";
  });

  const vehicleListJson = newVehicleList.map(vehicle => {
    const apiUrls = vehicle.apiUrl;
    return apiUrls;
  })

 const consolidatedList = Promise.all(vehicleListJson.map(url => fetch(url)
 .then(response => response.json())
 .then(data => {
   return {...newVehicleList, ...data}
 })
 .catch(error => console.log('Looks like there was a problem!', error))
 ))
 



  return(
    newVehicleList.map(vehicle => 
      {
        return(        
          <div key={vehicle.id} className="vehicle">
            <div className="vehicle__img">
              <img src={mediaQuery.matches ? vehicle.media[1].url : vehicle.media[0].url} />
            </div>

            <div className="vehicle__info">
              <h1>Jaguar {vehicle.id}</h1>
              <h2>From £76,350</h2>
              <h3>The pinnacle of refined capability</h3>
            </div>

          </div>
        );
      }
    )
  );
}
