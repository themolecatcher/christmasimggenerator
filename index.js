/** uncomment one of these **/
// import OpenAI from "openai"
import { HfInference } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@1.4.0/dist/HfInference.js';

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN)
const dialogModal = document.getElementById('dialog-modal')
const imageContainer = document.getElementById('image-container')
const userInput = document.getElementById('user-input')
const model = "stabilityai/stable-diffusion-2"
const submitButton = document.getElementById("submit-button")
/** show dialog on load **/
dialogModal.show()

async function renderImageFromTextInput(input) {
    try {
        const result = await hf.textToImage({
            model: model,
            inputs: input,
            parameters: {
                negative_prompt: 'blurry',
            },
        });

        const generatedImageSrc = await blobToBase64(result)

        imageContainer.innerHTML = `<img src="${generatedImageSrc}" alt="Generated Image">`;
    } catch (error) {
        console.error('Error rendering image:', error);
    }
}

async function blobToBase64(blob) {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
})
}

submitButton.addEventListener("click", function(){
    event.preventDefault()
    dialogModal.close()
    const userInputValue = userInput.value
    renderImageFromTextInput(userInputValue)
}) 

