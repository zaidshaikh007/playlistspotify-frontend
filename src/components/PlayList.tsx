import React, { useEffect, useState } from 'react';
import { getPlayListSongs } from "../services/ApiServices.ts"
import { Link, useParams } from 'react-router-dom';
import { Utils } from '../utils/utils.ts';

const PlayList = () => {

  const { id } = useParams();

  const [songsList, setSongsLists] = useState([]);

  const fetchData = async () => {
    if (id) {
      let dashData = await getPlayListSongs(id);
      setSongsLists(dashData.data.data)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id])

  return (
    <>
      <div className="p-10">
        <div className="flex items-center align-center">
          <h1>List Of Songs in playlist</h1>
        </div>

        <div className="pt-5 pb-5">
          {
            songsList && songsList.length > 0 ?
              <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
                {
                  songsList.map((data: any, index: number) => {
                    return (
                      <li key={index} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                        <div className="flex items-center">
                          <img className="w-12 h-12 rounded-full" src="/musicimage.jpg" alt="song image" />
                          <div className="ml-3 flex justify-between items-center gap-4 w-full">
                            <p className="font-semibold text-gray-900">{data.name}</p>
                            <p className="text-sm text-gray-500 ">{data.artists.map((names: any, index: number) => {
                              return (
                                <span>{names.name}{data.artists.length === (index + 1) ? "" : ", "} </span>
                              )
                            })}</p>
                            <p className="text-xs text-gray-400">{Utils.convertMsToTime(data.duration_ms)}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            // </div>
            : 
            <Link to="/searchsongs" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none">Click here to add songs in playlist</Link>
          }
        </div>

      </div>
    </>
  );
}

export default PlayList;