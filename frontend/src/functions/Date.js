export function getActualDate(){
    const datenow=new Date()
    let temp=datenow.toLocaleString('sv')
    let temp2=temp.split(' ')
    return temp2.join('T')
}

export function formatDate(date){
    const getDate=new Date(date)
    return getDate.toLocaleString()
}


export function TotalMinutes(start,end){
    const startDate=new Date(start)
    const endDate=new Date(end)
    return Math.round(((endDate-startDate)/1000)/60)
}