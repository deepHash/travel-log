export async function listLogEntries(){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logs`);
    return response.json(); 
}

export async function addNewLogEntry(data){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logs`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Contect-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
}