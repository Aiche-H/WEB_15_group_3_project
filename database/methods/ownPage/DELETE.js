// Poista käyttäjä
const deleteUser = async (userId, token) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Käyttäjän poisto epäonnistui');
        }

        return await response.json();
    } catch (error) {
        console.error('Virhe käyttäjän poistossa:', error);
        throw error;
    }
};

module.exports = { deleteUser }; 