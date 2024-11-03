import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:8080/message'})


export const createMessage = async (remitenteId, destinatarioId,mensaje)=> instance.post(('/'),{remitenteId: {id:remitenteId}, destinatarioId:{id:destinatarioId}, texto:mensaje});

//leer el mensaje
export const getMessages = async (id) => await instance.get('/'+id);