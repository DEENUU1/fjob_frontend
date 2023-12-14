import getApiUrl from "@/components/api";


export async function GetNumberOfCompaniesToCreate(){

    const response = await fetch(`${getApiUrl()}api/user/num_of_available_companies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    return = await response.json()
}



export default async function NumberOfCompaniesToCreate(){
    const data = await GetNumberOfCompaniesToCreate()

    return (
        <>
            <span>{data}</span>
        </>

    )

}