import axios from 'axios';


  // useEffect(() => {
  //   axios.get('/api/message')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);
export const getTestHello = async () => {
    const path = 'api/message';
    const response = await axios.get(path);

    return response.data;
};