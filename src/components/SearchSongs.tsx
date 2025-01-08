import React, { useEffect, useState } from 'react';
import { getDashBoardData, searchSongsData, addSongToPlaylist } from "../services/ApiServices.ts"
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Utils } from '../utils/utils.ts';

const SearchSongs = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [songs, setSongs] = useState<any>([]);
  const [playlists, setPlayLists] = useState([]);
  const [curData, setCurData] = useState<any>({});

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    let dashData = await getDashBoardData();
    setPlayLists(dashData.data.data)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onSubmit = async () => {
    try{
      let songsData = await searchSongsData(input);
      setSongs(songsData.data.data);
      toast.success("Songs fetched successfully");
    }catch(e){
      console.log(e);
      toast.error("Error fetching Songs");
    }
  }

  const addToPlayList = async () => {
    try{
      let songsData = await addSongToPlaylist(curData, value);
      setOpen(false);
      setValue('');
      setCurData({});
      toast.success("Songs Added To Playlist");
    }catch(e){
      toast.error("Error Adding Songs To Playlist");
      console.log(e);
    }
  }
  const handleChangePlaylist = (data: any) => {
    setValue(data.target.value)
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div className="flex justify-center items-center">
          <DialogTitle>Choose Playlist</DialogTitle>
          <Button sx={{ marginLeft: "auto", paddingRight: "24px" }} onClick={handleClose}>Cancel</Button>
        </div>

        <DialogContent>
          <DialogContentText>
            Add songs to a playlist to save and organize your favorite tracks for easy access.
          </DialogContentText>

          <div className="w-full">
            <label className="block text-sm/6 font-medium text-gray-900">Select Playlist</label>
            <div className="my-4 w-full ">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Playlist</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="choose playlist"
                onChange={handleChangePlaylist}
              >
                {
                  playlists && playlists.length > 0 && playlists.map((data: any, index: number) => {
                    return (
                      <MenuItem value={data._id}>{data.title}</MenuItem>
                    )
                  })
                }
                {
                  playlists && playlists.length === 0 ?
                  <MenuItem value={"None"} disabled>No Playlist Found</MenuItem>
                  : ''
                }
              </Select>
            </FormControl>
            </div>
          </div>

          <div>
            <button onClick={addToPlayList} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
          </div>

        </DialogContent>
      </Dialog>
      <div className="p-10">
        <div className="flex items-center align-center">
          <h1>Search Songs</h1>
        </div>

        <div className="pt-5 pb-5">
          <form className="max-w-md mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" onChange={(e: any) => { setInput(e.target.value) }} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Mockups, Logos..." required />
              <button type="button" onClick={onSubmit} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
            </div>
          </form>
        </div>
        {
          songs && songs.length > 0 ? 
          <ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
            {
              songs.map((data: any, index: number) => {
                return (
                  <li key={index} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">
                    <div className="flex items-center">
                      <img className="w-12 h-12 rounded-full" src="/musicimage.jpg" alt="song image" />
                      <div className="ml-3 flex justify-between items-center gap-4 w-full">
                        <p className="font-semibold text-gray-900 ">{data.name}</p>
                        <div className='left-aligned'>
                          <p className="mr-auto text-sm text-gray-500 ">{data.artists.map((names: any, index: number) => {
                            return (
                              <span>{names.name}{data.artists.length === (index + 1) ? "" : ", "} </span>
                            )
                          })}</p>
                        </div>
                        <p className="text-xs text-gray-400 ">{Utils.convertMsToTime(data.duration_ms)}</p>
                      </div>
                      <button onClick={() => { setOpen(true); setCurData(data) }}>Add To Playlist</button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          :
          <h1 className="mt-4">Search To See Songs List</h1>
        }

      </div>
    </>
  );
}

export default SearchSongs;