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
      data.forEach((wordData: WordData) => {
        const meanings = wordData.meanings;

        meanings.forEach((meaning: Meaning) => {
          const partOfSpeech = meaning.partOfSpeech;
          const definitions = meaning.definitions;

          definitions.forEach((definition: Definition) => {
            const def = definition.definition;
            const example = definition.example;
            const resultHTML = `
              <div>
                <strong>Part of Speech:</strong> ${partOfSpeech}
                <br>
                <strong>Definition:</strong> ${def}
                ${example ? `<br><strong>Example:</strong> ${example}` : ''}
                <br><br>
              </div>
            `;
            resultContainer.innerHTML += resultHTML;
          });
        });
      });
    } else {
      resultContainer.innerHTML = `<div><strong>Error:</strong> ${data.title}: ${data.message}</div>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultContainer.innerHTML = `<div><strong>Error:</strong> An error occurred while fetching the data.</div>`;
  }
};
