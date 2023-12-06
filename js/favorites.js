export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        
        this.update()
    }

}
   

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
    }

    update(){ 
        const tbody = this.root.querySelector('table tbody')
        tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        });
    }

}
   