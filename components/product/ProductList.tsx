

async function FetchProducts() {
    const response = await fetch(process.env.API_URL + "/api/payment/product/");
    return await response.json();
}


