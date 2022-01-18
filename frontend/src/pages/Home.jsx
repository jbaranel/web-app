import React from 'react'
import useFetch from '../customHooks'

export default function Home() {
    const { isLoading, serverError, apiData } = useFetch(
        "/user/jgimfmy111", "GET", {}
      );
    return (
        <div>
           {isLoading && <span>Loading...</span>}
           {!isLoading && serverError ? (
               <span>{JSON.stringify(serverError)}</span>
           ) : (
               <span>{JSON.stringify(apiData)}</span>
           )}
        </div>
    )
}
