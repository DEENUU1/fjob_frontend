const getApiUrl = () => {
    // console.log(process.env.WORK_MODE);
    if (process.env.WORK_MODE === 'dev') {
        return 'http://localhost:8000/';
    } else {
        return process.env.API_URL;
    }
};

export default getApiUrl;
