document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('create-user-form');
    const loadUsersButton = document.getElementById('load-users');
    const usersList = document.getElementById('users');

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
});
