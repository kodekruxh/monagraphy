// Contact Form Submission
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx298rNWZ0scWOU4qvWD2ew-tI58rGFSQjXniIsdOYsB0l_NM2yRTPFg9qUOczEnGWF/exec";

document.addEventListener('DOMContentLoaded', () => {
const contactForm = document.querySelector('.form-block-contact form');
if (!contactForm) return;

const submitBtn = contactForm.querySelector('input[type="submit"]');
const originalBtnText = submitBtn ? submitBtn.value : "Submit";

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formWrapper = form.closest('.form-block-contact');
    const doneDiv = formWrapper.querySelector('.w-form-done');
    const failDiv = formWrapper.querySelector('.w-form-fail');

    // 1. Reset state: Hide both alert messages
    hideElement(doneDiv);
    hideElement(failDiv);

    // 2. Set button to loading state
    submitBtn.disabled = true;
    submitBtn.value = "Please wait...";

    // 3. Prepare payload for Sheet1
    const payload = {
    targetSheet: "Sheet1",
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('Message').value
    };

    // 4. Send data to Google Apps Script
    fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.result === 'success') {
        // Show success message, hide failure message
        showElement(doneDiv);
        hideElement(failDiv);
        
        // Update button state to Submitted
        submitBtn.value = "Submitted";
        form.reset();

        // Keep disabled for 5 minutes (300,000 ms), then re-enable
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.value = originalBtnText;
        }, 5 * 60 * 1000);

        } else {
        // Show failure message
        showElement(failDiv);
        hideElement(doneDiv);
        
        // Re-enable button on failure so user can retry
        submitBtn.disabled = false;
        submitBtn.value = originalBtnText;
        }
    })
    .catch(err => {
        console.error('Contact Form Error:', err);
        showElement(failDiv);
        hideElement(doneDiv);

        // Re-enable button on error so user can retry
        submitBtn.disabled = false;
        submitBtn.value = originalBtnText;
    });
});
});

// Helper functions using !important to prevent Webflow JS overrides
function showElement(el) {
if (el) el.style.setProperty('display', 'block', 'important');
}

function hideElement(el) {
if (el) el.style.setProperty('display', 'none', 'important');
}










// Newsletter Form Submission

document.addEventListener('DOMContentLoaded', () => {
const newsletterForm = document.querySelector('.form-block form');
if (!newsletterForm) return;

const submitBtn = newsletterForm.querySelector('input[type="submit"]');
const originalBtnText = submitBtn ? submitBtn.value : "Submit";

newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formWrapper = form.closest('.form-block');
    const doneDiv = formWrapper.querySelector('.w-form-done');
    const failDiv = formWrapper.querySelector('.w-form-fail');

    // 1. Reset state: Hide both alert messages
    hideElement(doneDiv);
    hideElement(failDiv);

    // 2. Set button to loading state
    submitBtn.disabled = true;
    submitBtn.value = "Please wait...";

    // 3. Prepare payload for Sheet2
    const payload = {
    targetSheet: "Sheet2",
    email: document.getElementById('email-2').value
    };

    // 4. Send data to Google Apps Script
    fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.result === 'success') {
        // Show success message, hide failure message
        showElement(doneDiv);
        hideElement(failDiv);
        
        // Update button state to Submitted
        submitBtn.value = "Submitted";
        form.reset();

        // Keep disabled for 5 minutes (300,000 ms), then re-enable
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.value = originalBtnText;
        }, 5 * 60 * 1000);

        } else {
        // Show failure message
        showElement(failDiv);
        hideElement(doneDiv);
        
        // Re-enable button on failure so user can retry
        submitBtn.disabled = false;
        submitBtn.value = originalBtnText;
        }
    })
    .catch(err => {
        console.error('Newsletter Form Error:', err);
        showElement(failDiv);
        hideElement(doneDiv);

        // Re-enable button on error so user can retry
        submitBtn.disabled = false;
        submitBtn.value = originalBtnText;
    });
});
});

function showElement(el) {
if (el) el.style.setProperty('display', 'block', 'important');
}

function hideElement(el) {
if (el) el.style.setProperty('display', 'none', 'important');
}