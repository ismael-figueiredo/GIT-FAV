import { FavoritesView } from "./favorites.js"




const minhaImagem = document.getElementById('star-button');
const mybutton = document.getElementById('search-button');

mybutton.addEventListener('mouseover', function() {
    minhaImagem.src = './assets/star-button-white.svg'; // Muda a imagem quando o mouse está sobre o botão
});

mybutton.addEventListener('mouseout', function() {
    minhaImagem.src = './assets/star-button.svg'; // Volta para a imagem original quando o mouse sai do botão
});

new FavoritesView("app")