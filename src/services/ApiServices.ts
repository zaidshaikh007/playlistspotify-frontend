import axios from "axios"
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const userLogin = async (email: string, password: string) => {
    let data = await axios.post("api/user/login", { email, password });
    return data;
}
export const userProfile = async () => {
    let data = await axios.get("api/user/profile", {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
    return data;
}

export const userRegister = async (firstName: string, lastName: string, email: string, password: string, mobile: string) => {
    let data = await axios.post("api/user/signup", { firstName, lastName, email, password, mobile });
    return data;
}

export const getDashBoardData = async () => {
    let data = await axios.get(`api/playlist/getplaylistdata`, {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
    return data;
}

export const addPlaylistData = async (title: string, description: string) => {
    let data = await axios.post("api/playlist/addplaylist", { title, description }, {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
    return data;
}

export const getPlayListSongs = async (id: string) => {
    let data = await axios.get(`api/playlist/getplaylistsongs?id=${id}`, {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
    return data;
}

export const searchSongsData = async (input: string) => {
    let data = await axios.get(`api/playlist/searchsong?name=${input}`, {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
    return data;
}

export const addSongToPlaylist = async (song: any, id: string) => {
    console.log('id: ', id);
    console.log('song: ', song);
    let data = await axios.post("api/playlist/addsongtoplaylist", { song, id }, {headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
    return data;
}
