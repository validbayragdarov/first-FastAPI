document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('create-user-form');
    const loadUsersButton = document.getElementById('load-users');
    const usersList = document.getElementById('users');
    const getUserByIdForm = document.getElementById('get-user-by-id-form');
    const userByIdResult = document.getElementById('user-by-id-result');
    const getUserByNameForm = document.getElementById('get-user-by-name-form');
    const userByNameResult = document.getElementById('user-by-name-result');

    createUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createUserForm);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch('/users/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (result.message === 'success') {
            alert('User created successfully!');
            createUserForm.reset();
        } else {
            alert('Error creating user.');
        }
    });

    loadUsersButton.addEventListener('click', async () => {
        const response = await fetch('/users/');
        const result = await response.json();

        if (result.message === 'success') {
            usersList.innerHTML = '';
            result.users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `Name: ${user.name}, Email: ${user.email}`;
                usersList.appendChild(li);
            });
        } else {
            alert('Error loading users.');
        }
    });

    getUserByIdForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('user-id').value;

        const response = await fetch(`/users/user/${userId}`);
        const result = await response.json();

        if (result.message === 'success') {
            userByIdResult.innerHTML = '';
            result.users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                userByIdResult.appendChild(li);
            });
        } else {
            alert('Error fetching user by ID.');
        }
    });

    getUserByNameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userName = document.getElementById('user-name').value;

        const response = await fetch(`/users/user?user_name=${userName}`);
        const result = await response.json();

        if (result.message === 'success') {
            userByNameResult.innerHTML = '';
            result.users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `Name: ${user.name}, Email: ${user.email}`;
                userByNameResult.appendChild(li);
            });
        } else {
            alert('Error fetching user by name.');
        }
    });
});
