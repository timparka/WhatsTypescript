interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordData {
  meanings: Meaning[];
}

const form = document.querySelector('#defineform') as HTMLFormElement;
const resultContainer = document.querySelector('#resultContainer') as HTMLDivElement;

form.onsubmit = async (event: Event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const text = formData.get('defineword') as string;

  // Clear the previous result
  resultContainer.innerHTML = '';

  // Call the API
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${text}`);
    const data = await response.json();

    // Display the result
    if (Array.isArray(data)) {
      const wordData: WordData = data[0];
      const firstMeaning: Meaning = wordData.meanings[0];
      const partOfSpeech = firstMeaning.partOfSpeech;
      const firstDefinition: Definition = firstMeaning.definitions[0];
      const def = firstDefinition.definition;
      const example = firstDefinition.example;

      const resultHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Part of Speech: ${partOfSpeech}</h5>
          <p class="card-text"><strong>Definition:</strong> ${def}</p>
          ${example ? `<p class="card-text"><strong>Example:</strong> ${example}</p>` : ''}
        </div>
      </div>
    `;
      resultContainer.innerHTML = resultHTML;

    } else {
      resultContainer.innerHTML = `<div><strong>Error:</strong> ${data.title}: ${data.message}</div>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultContainer.innerHTML = `<div><strong>Error:</strong> An error occurred while fetching the data.</div>`;
  }
};
