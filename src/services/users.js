import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/user' });


export const getUsers = async ()=> await instance.get();

export const access = async(name)=>{
  const result = await instance.get('/'+name);
    console.log('iiiiiiiiiiii',result)
      if(result.length == 0){
        const r = await instance.post({
          name
        });

        return r.id;
      }else{
        return result.data;
      }
  }