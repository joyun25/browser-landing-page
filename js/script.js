// Selectors
const reloads = document.querySelectorAll('.reload');
const addFavorites = document.querySelectorAll('.addFavorite');
const forms = document.querySelectorAll('.form');
const favoriteLists = document.querySelectorAll('.favoriteList');
const favoriteMenus = document.querySelectorAll('.favoriteMenu');
let favorites;

// Set Up LocalStorage
if(localStorage.getItem('favorites') === null || localStorage.getItem('favorites') === '[]'){
    console.log(favorites)
    favorites = [
        {
            "favName": "Stack Overflow", 
            "favLink": "https://stackoverflow.com/" 
        },
        {
            "favName": "Github", 
            "favLink": "https://github.com/joyun25/" 
        },
        {
            "favName": "Codepen", 
            "favLink": "https://codepen.io/" 
        },
        {
            "favName": "MDN", 
            "favLink": "https://developer.mozilla.org/en-US/" 
        },
        {
            "favName": "Youtube", 
            "favLink": "https://www.youtube.com/" 
        },
        {
            "favName": "CNN", 
            "favLink": "https://edition.cnn.com/" 
        },
        {
            "favName": "TodoList", 
            "favLink": "https://joyun25.github.io/todo-list02/" 
        },
    ];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorite();
}else{
    favorites = JSON.parse(localStorage.getItem('favorites'));
    renderFavorite();
}

// Reload
reloads.forEach(reload => {
    reload.addEventListener('click', () => {
        window.location.reload();
    })
});

// Menu Toggle
favoriteMenus.forEach((favoriteMenu, i) => {
    favoriteMenu.addEventListener('click', () => {
        if (favorites == '' ) {
            alert('Favorite List is empty now.')
            return
        }else if (favoriteLists[i].classList.contains('d-none')){
            favoriteLists[i].classList.remove('d-none');
        } else {
            favoriteLists[i].classList.add('d-none');
        }
    })
});

// Add Favorite
addFavorites.forEach(addFavorite => {
    addFavorite.addEventListener('click', () => {
        let favoriteName = prompt('What is the NAME of the website?');
        if (favoriteName.trim() == '') {
            alert('Please fill in a valid name.');
            return
        }else if(favoriteName.trim().length > 20) {
            alert('Please enter within 20 characters.')
            return
        }
        let favoriteLink = prompt('What is the LINK of the website?');
        if (favoriteLink.trim() == '') {
            alert('Please fill in a valid link.');
            return
        }
        let favorite ={
            "favName": favoriteName.trim(), 
            "favLink": favoriteLink.trim() 
        }
        favorites.push(favorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorite();
    })
});

// Render Favorite List
function renderFavorite() {
    const favoriteBarList = document.querySelector('.favoriteBar ul');
    favoriteBarList.innerHTML = '';

    // Render Menu
    favoriteLists.forEach((favoriteList) => {
        favoriteList.innerHTML = '';
        favorites.forEach((favorite, index) => {
            const createLi = document.createElement('li');
            const createA = document.createElement('a');
            const createButton = document.createElement('button');
            const createI = document.createElement('i');
            createLi.dataset.num = index;
            createLi.classList.add('linkBtn');
            createA.classList.add('btn');
            createA.classList.add('btn-darkGreen');
            createA.classList.add('d-flex');
            createA.classList.add('justify-between');
            createA.classList.add('align-center');
            createButton.classList.add('btn');
            createButton.classList.add('btn-transparent');
            createI.classList.add('fas');
            createI.classList.add('fa-times');
            createA.textContent = favorite.favName.trim();
            createA.href = favorite.favLink.trim();
            createA.target = '_blank';
            createButton.appendChild(createI);
            createA.appendChild(createButton);
            createLi.appendChild(createA);
            favoriteList.appendChild(createLi);
            favoriteLists[1].setAttribute('style', `top: -${favorites.length * 26 + (favorites.length + 1) * 5}px;`);
        })
    })
    
    // Render Bar
    favorites.forEach((favorite, index) => {
        const createLi = document.createElement('li');
        const createA = document.createElement('a');
        const createButton = document.createElement('button');
        const createI = document.createElement('i');
        createLi.dataset.num = index;
        createLi.classList.add('linkBtn');
        createA.classList.add('btn');
        createA.classList.add('btn-darkGreen');
        createA.classList.add('d-flex');
        createA.classList.add('align-center');
        createButton.classList.add('btn');
        createButton.classList.add('btn-transparent');
        createI.classList.add('fas');
        createI.classList.add('fa-times');
        createA.textContent = favorite.favName.trim();
        createA.href = favorite.favLink.trim();
        createA.target = '_blank';
        createButton.appendChild(createI);
        createA.appendChild(createButton);
        createLi.appendChild(createA);
        favoriteBarList.appendChild(createLi);
    })

    // deleteFavorites
    const linkBtns = document.querySelectorAll('.linkBtn');
    linkBtns.forEach(linkBtn => {
        linkBtn.addEventListener('click', e => {
            if (e.target.nodeName == 'BUTTON' || e.target.nodeName == 'I') {
                e.stopPropagation();
                e.preventDefault();
                let linkIndex = e.target.closest('li').dataset.num;
                favorites.splice(linkIndex, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorite();
            }
        })
    })
}

// Search
forms.forEach((form, i) => {
    form.addEventListener('click', e => {
        const inputs = document.querySelectorAll('input');
        if (e.target.nodeName == 'INPUT') {
            inputs[i].addEventListener('keypress', element => {
                if (element.key == 'Enter') {
                    window.open(`https://www.google.com/search?q=${inputs[i].value}`);
                    inputs.forEach(input => {
                        input.value = '';
                    })
                }
            })
        }else if(e.target.nodeName == 'BUTTON' || e.target.nodeName == 'I') {
            window.open(`https://www.google.com/search?q=${inputs[i].value}`);
            inputs.forEach(input => {
                input.value = '';
            })
        }else{
            return
        }
    });
});