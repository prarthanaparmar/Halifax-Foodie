import Axios from 'axios';

export default async function getOrders() {
    // console.log(payload);
    return await Axios.get('https://backend-yfg27siima-uc.a.run.app/api/order')
        .then( async (res) => {
            console.log(res.data)
            return await res.data.results;
        })
        .catch(err => { return err.response })
};
