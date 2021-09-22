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
  let vehicles = await fetch("api/vehicles.json")
    .then((res) => res.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('Looks like there was a problem!', error))

  return(
    vehicles.map(vehicle => 
      <div key={vehicle.id}>
        <h1>{vehicle.id}</h1>
        <h2>From</h2>
        <h3>Descripton</h3>
      </div>
    )
  );
}
