export class Favorites{
    constructor(root){
        this.root = document.querySelector(root) 
        this.load()
        
    }
    load(){
        this.entries = [   
            {
                login: 'ismael-figueiredo',
                name: 'Ismael fogueiredo',
                public_repos: '75',
                follower:'400'
            },
            {
                login: 'maykbrito',
                name: 'mayk brito',
                public_repos: '75',
                follower:'40010'
            }
        ]
    }

}
   

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update(){ 
        this.removeAllTr()

        this.entries.forEach( user => {
           const row = this.createRow()
           row.querySelector('.user img').alt =`Imagem do ${user.name}`
           row.querySelector('.user img').src =`https://github.com/${user.login}.png`
           row.querySelector('.user p').textContent = user.name 
           row.querySelector('.user span').textContent = `/${user.login}`
           row.querySelector('.repositories').textContent = user.public_repos
           row.querySelector('.followers').textContent = user.follower
            
           this.tbody.append(row)
    } )
    
    
    }

    removeAllTr(){
       
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }

    createRow() {
        const tr = document.createElement('tr')

        
        const content = `<tr>
        <td class="user">
            <img src="https://github.com/maykbrito.png" alt="Imagem de maykbrito">
            <a href="https://github.com/maykbrito" target="_blank">
                <p>Mayk Brito</p>
                <span>/maykbrito</span>
            </a>
        </td>
        <td class="repositories">
            76
        </td>
        <td class="followers">
            9589
            </td>
        <td>
            <button class="acao">Remover</button>
        </td>
            </tr>`
        tr.innerHTML = content
        return tr
        }

}
   