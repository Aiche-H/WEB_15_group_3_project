document.addEventListener('DOMContentLoaded', function() {
    // Modaalin elementit
    const avatarModal = document.getElementById('avatar-selection-dialog');
    const editProfileModal = document.getElementById('edit-profile-dialog');
    const changePasswordModal = document.getElementById('change-password-dialog');
    const changeEmailModal = document.getElementById('change-email-dialog');
    const deleteProfileModal = document.getElementById('delete-profile-dialog');
    
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const changeEmailBtn = document.getElementById('change-email-btn');
    const deleteProfileBtn = document.getElementById('delete-profile-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    
    const saveAvatarBtn = document.getElementById('save-avatar-btn');
    const currentAvatar = document.getElementById('current-avatar');
    const avatarOptions = document.querySelectorAll('input[name="avatar"]');

    // Alusta Materialize-modaalit
    const avatarModalInstance = M.Modal.init(avatarModal);
    const editProfileModalInstance = M.Modal.init(editProfileModal);
    const changePasswordModalInstance = M.Modal.init(changePasswordModal);
    const changeEmailModalInstance = M.Modal.init(changeEmailModal);
    const deleteProfileModalInstance = M.Modal.init(deleteProfileModal);

    // Avaa avatar-modaali
    changeAvatarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        avatarModalInstance.open();
    });

    // Avaa profiilin asetukset -modaali
    editProfileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        editProfileModalInstance.open();
    });

    // Avaa salasanan vaihto -modaali
    changePasswordBtn.addEventListener('click', function() {
        editProfileModalInstance.close();
        changePasswordModalInstance.open();
    });

    // Avaa sähköpostin vaihto -modaali
    changeEmailBtn.addEventListener('click', function() {
        editProfileModalInstance.close();
        changeEmailModalInstance.open();
    });

    // Avaa profiilin poisto -modaali
    deleteProfileBtn.addEventListener('click', function() {
        editProfileModalInstance.close();
        deleteProfileModalInstance.open();
    });

    // Tallenna valittu avatar
    saveAvatarBtn.addEventListener('click', function() {
        const selectedAvatar = document.querySelector('input[name="avatar"]:checked');
        if (selectedAvatar) {
            currentAvatar.src = selectedAvatar.value;
            // Tässä voisi tallentaa valitun avatarin tietokantaan
            avatarModalInstance.close();
        } else {
            M.toast({html: 'Valitse ensin avatar!'});
        }
    });

    // Valitse avatar klikkaamalla kuvaa
    document.querySelectorAll('.avatar-option img').forEach(img => {
        img.addEventListener('click', function() {
            const radio = this.previousElementSibling;
            radio.checked = true;
        });
    });

    // Tallenna uusi salasana
    document.getElementById('change-password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;

        if (newPassword !== confirmPassword) {
            M.toast({html: 'Salasanat eivät täsmää!'});
            return;
        }

        // Tässä voisi tallentaa uuden salasanan tietokantaan
        changePasswordModalInstance.close();
        M.toast({html: 'Salasana vaihdettu!'});
    });

    // Tallenna uusi sähköposti
    document.getElementById('change-email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newEmail = document.getElementById('new-email').value;
        const confirmEmail = document.getElementById('confirm-new-email').value;

        if (newEmail !== confirmEmail) {
            M.toast({html: 'Sähköpostiosoitteet eivät täsmää!'});
            return;
        }

        // Tässä voisi tallentaa uuden sähköpostin tietokantaan
        changeEmailModalInstance.close();
        M.toast({html: 'Sähköposti vaihdettu!'});
    });

    // Vahvista profiilin poisto
    confirmDeleteBtn.addEventListener('click', function() {
        // Tässä voisi poistaa profiilin tietokannasta
        deleteProfileModalInstance.close();
        M.toast({html: 'Profiili poistettu!'});
        // Ohjaa käyttäjä kirjautumissivulle
        setTimeout(() => {
            window.location.href = '../sign.html';
        }, 2000);
    });
}); 