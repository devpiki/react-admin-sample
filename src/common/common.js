export function axioError(error){
    let errCk = sessionStorage.getItem('errCk')||'Y';
    let obj;
    if(errCk == 'Y'){
        obj = alert;
        sessionStorage.setItem('errCk','N');
    }else{
        obj = console.log;
    }
    if(error && error['response'] && error['response']['data'] && error['response']['data']['message']){
        obj(error['response']['data']['message']);
    }else if(error && error['response'] && error['response']['status']){
        obj(`에러가 발생하였습니다[${error['response']['status']}]${error['response']['statusText']}`);
    }else {
        obj(`에러가 발생하였습니다. 로그를 확인 바랍니다.`);
        console.error(error);
    }
    setTimeout(()=>{sessionStorage.removeItem('errCk')},1000);
}

export function dateToString(searchEntryDate){
    if(isNaN(searchEntryDate.getTime())){
        return ;
    }
    let month = (1 + searchEntryDate.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    let day = searchEntryDate.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return (searchEntryDate.getFullYear() + '-' + month + '-' + day);
}