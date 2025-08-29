class Storage{
    constructor(){}

    load(key){
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };
    save(key,data){
        localStorage.setItem(key, JSON.stringify(data));
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