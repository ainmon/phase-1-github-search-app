document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let user = e.target[0].value
        findUser(user)
        
    })


})

function findUser(username){
    fetch(`https://api.github.com/search/users?q=${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(obj => obj.items.map(item => userData(item)))

}

function userData(user){
    // display avatar and login name
    let userList = document.querySelector('#user-list')
    const li = document.createElement('li')
    const image = document.createElement('img')

    const h3 = document.createElement('h3')

    image.src = user.avatar_url
    image.id = user.login
    image.addEventListener('click', repoPush)
    console.log('image')
    h3.textContent = user.login

    li.append(image, h3)
    userList.append(li)

}

function repoPush(event){
    fetch(`https://api.github.com/search/users/${event.target.id}/repos`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }

    })
    .then(res => res.json())
    .then(res => res.map(r => displayRepo(r))

    )
}

function displayRepo(repo){
    const repoList = document.querySelector('repos-list')
    const li = document.createElement('li')
    li.textContent = repo.name
    repoList.append(li)
}
