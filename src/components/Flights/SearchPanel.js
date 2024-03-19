import React, { useState, useEffect } from 'react'


export const Search = async (setdata, input) => {
    const endpoint = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${input}"}`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                projectID: "cr81p0a2xrtw",
            },
        })
        const res = await response.json();
        setdata(res.data.airports)
        // console.log(res.data.airports);
    } catch (error) {
        console.error('Error fetching flight', error);
    }
}