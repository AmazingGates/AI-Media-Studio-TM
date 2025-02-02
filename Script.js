// Mock AI generation function
async function mockAIGeneration(prompt, mediaType) {
    const placeholderImages = {
        image: 'images/placeholder-image.jpg',
        video: 'https://youtu.be/EUB-5xURYlY?si=TYRjrPLgbddkduQa'
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
        success: true,
        mediaType: mediaType,
        url: placeholderImages[mediaType],
        prompt: prompt
    };
}

function generateMedia() {
    const prompt = document.getElementById('prompt-input').value;
    const mediaType = document.getElementById('media-type').value;
    const spinner = document.getElementById('spinner');
    const preview = document.getElementById('result-preview');

    if (!prompt) {
        alert('Please enter a description');
        return;
    }

    // Clear previous results
    preview.innerHTML = '<div class="loading-spinner" id="spinner"></div>';
    spinner.style.display = 'block';

    mockAIGeneration(prompt, mediaType)
        .then(result => {
            spinner.style.display = 'none';
            if (result.mediaType === 'image') {
                preview.innerHTML = `
                    <img src="${result.url}" alt="Generated content">
                    <div class="result-meta">
                        <p>Prompt: ${result.prompt}</p>
                        <button onclick="downloadAsset('${result.url}')">Download</button>
                    </div>
                `;
            } else {
                preview.innerHTML = `
                    <video controls>
                        <source src="${result.url}" type="video/mp4">
                    </video>
                    <div class="result-meta">
                        <p>Prompt: ${result.prompt}</p>
                        <button onclick="downloadAsset('${result.url}')">Download</button>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            spinner.style.display = 'none';
            preview.innerHTML = '<p class="error">Error generating content. Please try again.</p>';
        });
}

// Helper functions
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

function downloadAsset(url) {
    // In real implementation, replace with actual download logic
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-generated-content';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showDemo() {
    const demoSection = document.getElementById('demo');
    demoSection.classList.remove('hidden');
    demoSection.scrollIntoView({ behavior: 'smooth' });
}