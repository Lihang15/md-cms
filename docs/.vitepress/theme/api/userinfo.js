export function getUserInfo(){
    const currentUserStr = localStorage.getItem('currentUser')
    let currentUser = {username:'',roles: ['']};
    
    if(currentUserStr){
      currentUser = JSON.parse(currentUserStr);
    }
    return currentUser
}