// Päivitä käyttäjän tietoja
const updateUserData = async (userId, token, data) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Käyttäjän tietojen päivitys epäonnistui');
        }

        return await response.json();
    } catch (error) {
        console.error('Virhe käyttäjän tietojen päivityksessä:', error);
        throw error;
    }
};

module.exports = { updateUserData }; 