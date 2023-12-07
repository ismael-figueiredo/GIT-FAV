export class GithubUser {
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}


export class Favorites{
    constructor(root){
        this.root = document.querySelector(root) 
        this.load()
        
    }
    load(){
        this.entries = JSON.parse(localStorage.getItem
            ('@girhub-favorites:')) || []


    }

    save( ){
        localStorage.setItem('@girhub-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login === username)

            if(userExists){
                throw new Error('Usuário já cadastrado')
            }



            const user = await GithubUser.search(username)

            if(user.login === undefined) {
                throw new Error('Usuário não encontrado!')
            }
            this.entries = [user, ...this.entries]
            this.update()
            this.save()
            } catch(error) {
                alert(error.message)
            }        
    }


    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }

}
   

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }

    onAdd(){
        const addButton = this.root.querySelector('#search-button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('#input-search')
           
            this.add(value)
        }
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
            row.querySelector('.followers').textContent = user.followers
            row.querySelector('.acao').onclick = () => {
                const isOk = confirm("Tem certeza que deseja deletar esta linha?")

                if(isOk) {
                    this.delete(user)
                }
            }
            this.tbody.append(row)
            
    } )
    
    
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        });
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
   