async function loadContactData() {
    try {
        const response = await fetch('/data/contact.json');
        const data = await response.json();
        document.getElementById('contact-email').textContent = data.contactInfo.email;
        document.getElementById('contact-phone').textContent = data.contactInfo.phone;
        
        document.getElementById('input-name').placeholder = data.formFields.name;
        document.getElementById('input-email').placeholder = data.formFields.email;
        document.getElementById('textarea-message').placeholder = data.formFields.message;
    } catch (error) {
        console.error("Failed to load contact data:", error);
    }
}

window.onload = loadContactData;
