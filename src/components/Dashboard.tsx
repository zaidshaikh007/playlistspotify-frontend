import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { addPlaylistSchema } from "../services/formschema/FormSchema.ts"
import { getDashBoardData, addPlaylistData } from "../services/ApiServices.ts"
import { Link } from "react-router";
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [playlists, setPlayLists] = useState([]);

  const objForm = useForm({
    defaultValues: {
      title: '',
      description: ''
    },
    resolver: yupResolver(addPlaylistSchema)
  });

  const fetchData = async () => {
    let dashData = await getDashBoardData();
    setPlayLists(dashData.data.data)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const addPlayList = () => {
    setOpen(true)
  }

  const onSubmit = async (data: any) => {
    try{
      let dashData = await addPlaylistData(data.title, data.description);
      objForm.reset();
      toast.success("Playlist created successfully");
      fetchData();
      setOpen(false);
    }catch(e){
      console.log(e);
      toast.error("Error In Playlist Add");
      setOpen(false);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <div className="flex justify-center items-center">
          <DialogTitle>Add Playlist</DialogTitle>
          <Button sx={{ marginLeft: "auto", paddingRight: "24px" }} onClick={handleClose}>Cancel</Button>
        </div>

        <DialogContent>
          <DialogContentText>
            Add songs to a playlist to save and organize your favorite tracks for easy access.
          </DialogContentText>

          <form className="space-y-6 pt-4" onSubmit={objForm.handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">Title</label>
              <div className="mt-2">
                <input type="text" {...objForm.register("title")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
              {
                objForm.formState.errors["title"]?.message &&
                <span className="text-red-600 text-sm">{objForm.formState.errors["title"]?.message}</span>
              }
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm/6 font-medium text-gray-900">Description</label>
              </div>
              <div className="mt-2">
                <textarea {...objForm.register("description")} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
              </div>
              {
                objForm.formState.errors["description"]?.message &&
                <span className="text-red-600 text-sm">{objForm.formState.errors["description"]?.message}</span>
              }
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
            </div>
          </form>

        </DialogContent>
      </Dialog>

      <div className="p-10">
        <div className="flex items-center align-center">
          <h1>Playlist</h1>
          <button type="button" onClick={() => { addPlayList() }} className="ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Add Playlist</button>
        </div>
        
        <div className="pt-5 pb-5">
          {
            playlists && playlists.length > 0 ?
            <div className="grid mb-8 p-5 border border-gray-200 rounded-lg shadow-sm md:mb-12 md:grid-cols-2 bg-white">
              {
                playlists.map((data: any, index: number) => {
                  return (
                    <Link key={index} to={`/playlist/${data._id}`}>
                      <figure className="flex flex-col items-center justify-center p-4 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e ">
                        <blockquote className="max-w-2xl mx-auto text-gray-500 ">
                          <h3 className="text-lg font-semibold text-gray-900 ">{data.title}</h3>
                          <p className="">{data.description}</p>
                        </blockquote>
                      </figure>
                    </Link>
                  )
                })
              }
            </div>
            :
            <h2 className='bg-white flex justify-center items-center'>Empty Playlist</h2> 
          }
        </div>
      </div>
    </>
  );
}

export default Dashboard;