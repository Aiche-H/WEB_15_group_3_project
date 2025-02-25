// MODAALIT REGISTER JA PASSWORD RECOVERY

document.addEventListener('DOMContentLoaded', function() {
    // Alustetaan Materialize modaalit
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Haetaan tarvittavat elementit
    const registerModal = document.getElementById('sign-in-dialog');
    const passwordRecoveryModal = document.getElementById('password-recovery-dialog');
    const openRegisterModalBtn = document.getElementById('open-register-modal');
    const openPasswordRecoveryBtn = document.getElementById('open-password-recovery');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Rekisteröitymismodaalin avaaminen
    openRegisterModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var instance = M.Modal.getInstance(registerModal);
        instance.open();
    });

    // Salasanan palautus -modaalin avaaminen
    openPasswordRecoveryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var instance = M.Modal.getInstance(passwordRecoveryModal);
        instance.open();
    });

    // Sulkemistoiminnallisuus kaikille modal-close -luokan elementeille
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.modal');
            if (modal) {
                var instance = M.Modal.getInstance(modal);
                instance.close();
            }
        });
    });
});
