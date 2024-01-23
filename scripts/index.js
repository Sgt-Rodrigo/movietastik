class Activity {
    contructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title,
        this.description = description,
        this.imgUrl = imgUrl
    }
}


class Repository {
    constructor(){
     this.activities = [];   
     this.contador =1;
    }

    getAllActivities(){
        return this.activities
    }

    createActivity(title, description, imgUrl){
        const newActividad = new Activity(this.contador, title, description, imgUrl);
        this.activities.push(newActividad);
        this.contador++
        
    }

    deleteActivity (id) {
        this.activities = this.activities.filter(activity => this.activity.id !== id );
        
    }
}

const repositorio = new Repository();
console.log(repositorio);
repositorio.createActivity('saltar la cuerda', 'descripcion', 'url');
console.log(repositorio);
repositorio.createActivity('correr', 'descripcion', 'url');
console.log(repositorio);
repositorio.createActivity('bailar', 'descripcion', 'url');
console.log(repositorio);

repositorio.deleteActivity(3);
console.log(repositorio);

