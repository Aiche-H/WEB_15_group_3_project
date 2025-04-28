document.addEventListener('DOMContentLoaded', async function() {
    // Tarkista käyttäjän rooli
    try {
        const response = await fetch('/api/users/current', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Käyttäjätietojen haku epäonnistui');
        }
        
        const userData = await response.json();
        
        if (userData.role !== 'admin') {
            // Jos käyttäjä ei ole admin, ohjaa ownPage-sivulle
            window.location.href = '/pages/own-page/ownPage.html';
            return;
        }
        
        // Alustetaan Materialize-komponentit
        const modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
        
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
        
        // Haetaan käyttäjätiedot sivun latautuessa
        fetchUserData();
        fetchStatistics();
        
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
        // Jos tapahtuu virhe, ohjaa kirjautumissivulle
        window.location.href = '/pages/sign-in-page/sign.html';
    }
});

// Globaalit muuttujat
let users = [];
let currentEditUserId = null;

// Käyttäjätietojen hakeminen
async function fetchUserData() {
    try {
        const response = await fetch('/api/admin/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Käyttäjätietojen haku epäonnistui');
        
        users = await response.json();
        updateUserTable(users);
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

// Tilastotietojen hakeminen
async function fetchStatistics() {
    try {
        const response = await fetch('/api/admin/statistics', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Tilastotietojen haku epäonnistui');
        
        const stats = await response.json();
        updateStatistics(stats);
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

// Tilastojen päivitys
function updateStatistics(stats) {
    document.getElementById('total-users').textContent = stats.totalUsers;
    document.getElementById('new-users-today').textContent = stats.newUsersToday;
    document.getElementById('page-views').textContent = stats.pageViews;
    document.getElementById('active-users').textContent = stats.activeUsers;
}

// Käyttäjätaulukon päivitys
function updateUserTable(users) {
    const tableBody = document.querySelector('#users-table-body');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${new Date(user.joinDate).toLocaleDateString()}</td>
            <td class="action-buttons">
                <button class="btn-small btn-edit waves-effect waves-light" 
                        onclick="openEditModal('${user._id}')">
                    <i class="material-icons">edit</i>
                </button>
                <button class="btn-small btn-delete waves-effect waves-light" 
                        onclick="deleteUser('${user._id}')">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Käyttäjien hakutoiminto
document.getElementById('searchUsers').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    updateUserTable(filteredUsers);
});

// Muokkausmodaalin avaaminen
function openEditModal(userId) {
    currentEditUserId = userId;
    const user = users.find(u => u._id === userId);
    
    if (user) {
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editRole').value = user.role;
        
        // Päivitetään Materialize select
        M.FormSelect.init(document.getElementById('editRole'));
        
        // Avataan modaali
        const modal = M.Modal.getInstance(document.getElementById('editUserModal'));
        modal.open();
    }
}

// Käyttäjän päivitys
async function updateUser(event) {
    event.preventDefault();
    
    if (!currentEditUserId) return;
    
    const updatedData = {
        username: document.getElementById('editUsername').value,
        email: document.getElementById('editEmail').value,
        role: document.getElementById('editRole').value
    };
    
    try {
        const response = await fetch(`/api/users/${currentEditUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) throw new Error('Käyttäjän päivitys epäonnistui');
        
        M.toast({html: 'Käyttäjä päivitetty onnistuneesti', classes: 'green'});
        const modal = M.Modal.getInstance(document.getElementById('editUserModal'));
        modal.close();
        
        // Päivitetään käyttäjätiedot
        await fetchUserData();
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

// Käyttäjän poisto
async function deleteUser(userId) {
    if (!confirm('Haluatko varmasti poistaa tämän käyttäjän?')) return;
    
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Käyttäjän poisto epäonnistui');
        
        M.toast({html: 'Käyttäjä poistettu onnistuneesti', classes: 'green'});
        
        // Päivitetään käyttäjätiedot
        await fetchUserData();
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

// Uloskirjautuminen
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/pages/sign/sign.html';
}
