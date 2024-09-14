interface ResumeData {
    name: string;
    email: string;
    phone: string;
    knowledgebase: string;
    experience: string;
    achievements: string;
    skills: string;
    profilePic?: string; 
}

function handleFormSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission

    // Get form elements
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const knowledgebaseInput = document.getElementById('Knowledgebase') as HTMLTextAreaElement;
    const experienceInput = document.getElementById('experience') as HTMLTextAreaElement;
    const achievementsInput = document.getElementById('achievements') as HTMLTextAreaElement;
    const skillsInput = document.getElementById('skills') as HTMLTextAreaElement;
    const fileInput = document.getElementById('profile-pic') as HTMLInputElement;

    // Handle file input
    let profilePicUrl: string | undefined;
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        profilePicUrl = URL.createObjectURL(file);
    }

    // Create resume data object
    const resumeData: ResumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        knowledgebase: knowledgebaseInput.value,
        experience: experienceInput.value,
        achievements: achievementsInput.value,
        skills: skillsInput.value,
        profilePic: profilePicUrl
    };

    // Basic validation
    if (!resumeData.name || !resumeData.email || !resumeData.phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Save resume data to local storage with unique ID
    const uniqueId = Date.now().toString(); // Using timestamp as unique ID
    localStorage.setItem(`resume-${uniqueId}`, JSON.stringify(resumeData));

    // Generate the resume
    generateResume(resumeData);

    // Create a unique URL
    const resumeLink = `${window.location.origin}/resume.html?id=${uniqueId}`;
    const uniqueUrlDiv = document.getElementById('unique-url') as HTMLDivElement;
    const resumeLinkElement = document.getElementById('resume-link') as HTMLAnchorElement;

    if (resumeLinkElement) {
        resumeLinkElement.href = resumeLink;
        resumeLinkElement.textContent = resumeLink;
    }

    if (uniqueUrlDiv) {
        uniqueUrlDiv.style.display = 'block';
    }

    // Hide the form and show save button
    const mainForm = document.getElementById('mainform') as HTMLFormElement;
    const saveResumeButton = document.getElementById('save-resume') as HTMLButtonElement;

    if (mainForm) {
        mainForm.style.display = 'none';
    }

    if (saveResumeButton) {
        saveResumeButton.style.display = 'block';
    }
}

function generateResume(data: ResumeData): void {
    const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;
    resumeContainer.innerHTML = ''; 
    
    const resumeContent = `
        <div class="resume">
            ${data.profilePic ? `<div class="resume-pic"><img src="${data.profilePic}" alt="Profile Picture"></div>` : ''}
            <div contenteditable="true" data-field="name">${data.name}</div>
            <div contenteditable="true" data-field="email">${data.email}</div>
            <div contenteditable="true" data-field="phone">${data.phone}</div>
            <h3>Credentials / Qualifications</h3>
            <div contenteditable="true" data-field="knowledgebase">${data.knowledgebase}</div>
            <h3>Career Highlights</h3>
            <div contenteditable="true" data-field="experience">${data.experience}</div>
            <h3>Achievements</h3>
            <div contenteditable="true" data-field="achievements">${data.achievements}</div>
            <h3>Skills</h3>
            <div contenteditable="true" data-field="skills">${data.skills}</div>
        </div>
    `;

    resumeContainer.innerHTML = resumeContent;
}

function clearForm(): void {
    const form = document.getElementById('mainform') as HTMLFormElement;
    form.reset();
    const imagePreview = document.getElementById('image-preview') as HTMLDivElement;
    imagePreview.innerHTML = ''; 
}

function handleImagePreview(event: Event): void {
    const input = event.target as HTMLInputElement;
    const imagePreview = document.getElementById('image-preview') as HTMLDivElement;

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e: ProgressEvent<FileReader>) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target?.result as string;
            imgElement.alt = 'Profile Picture';
            imagePreview.innerHTML = ''; // Clear existing preview
            imagePreview.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
    }
}

document.getElementById('mainform')?.addEventListener('submit', handleFormSubmit);
document.getElementById('profile-pic')?.addEventListener('change', handleImagePreview);

