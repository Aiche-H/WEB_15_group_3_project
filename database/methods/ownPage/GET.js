// Hae käyttäjän tiedot
const fetchUserData = async (token) => {
    try {
        const response = await fetch('/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Käyttäjän tietojen hakeminen epäonnistui');
        }

        return await response.json();
    } catch (error) {
        console.error('Virhe käyttäjän tietojen haussa:', error);
        throw error;
    }
};

module.exports = { fetchUserData }; 