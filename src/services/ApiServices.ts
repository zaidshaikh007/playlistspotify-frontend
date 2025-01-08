import axios from "axios"
axios.defaults.baseURL = process.env.REACT_APP_API_URL;



const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
});


export const userLogin = async (email: string, password: string) => {
    let data = await axios.post("api/user/login", { email, password });
    return data;
}
export const userProfile = async () => {
    let data = await axiosInstance.get("api/user/profile");
    return data;
}

export const userRegister = async (firstName: string, lastName: string, email: string, password: string, mobile: string) => {
    let data = await axios.post("api/user/signup", { firstName, lastName, email, password, mobile });
    return data;
}

export const getDashBoardData = async () => {
    let data = await axiosInstance.get(`api/playlist/getplaylistdata`);
    return data;
}

export const addPlaylistData = async (title: string, description: string) => {
    let data = await axiosInstance.post("api/playlist/addplaylist", { title, description });
    return data;
}

export const getPlayListSongs = async (id: string) => {
    let data = await axiosInstance.get(`api/playlist/getplaylistsongs?id=${id}`);
    return data;
}

export const searchSongsData = async (input: string) => {
    let data = await axiosInstance.get(`api/playlist/searchsong?name=${input}`);
    return data;
}

export const addSongToPlaylist = async (song: any, id: string) => {
    console.log('id: ', id);
    console.log('song: ', song);
    let data = await axiosInstance.post("api/playlist/addsongtoplaylist", { song, id });
    return data;
}