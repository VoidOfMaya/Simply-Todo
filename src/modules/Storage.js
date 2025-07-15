class Storage{
    constructor(){}

    load(key){
        return localStorage.getItem(key);
    };
    save(key,data){
        localStorage.setItem(key, data);
    };
    delet(key){
        localStorage.removeItem(key);
    };
    resetAll(){
        let index = localStorage.length
        for(i = 0; i < index; i++){
            localStorage.removeItem(i);
        }
    };
    

}

export{Storage,}