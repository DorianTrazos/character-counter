// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const textareaElement = document.getElementById('textarea');
const excludeSpacesElement = document.getElementById('exclude-spaces');
const readingTimeElement = document.getElementById('reading-time');
const totalCharactersElement = document.getElementById('total-characters');
const wordCountElement = document.getElementById('word-count');
const sentenceCountElement = document.getElementById('sentence-count');

const countSpaces = value => {
  let spacesCounter = 0;
  for (const character of value) {
    if (character === ' ') {
      spacesCounter++;
    }
  }
  return spacesCounter;
};

const calculateReadingTime = text => {
  const wordsPerMinute = 100;
  const totalWords = text.trim().split(/\s+/).length;
  const minutes = totalWords / wordsPerMinute;

  console.log(minutes);

  if (minutes < 1) {
    readingTimeElement.textContent = 'Approx. reading time: < 1 minute';
    return;
  }

  readingTimeElement.textContent = `Approx. reading time: ${Math.ceil(minutes)} minute${Math.ceil(minutes) === 1 ? '' : 's'}`;
};

const analizeText = () => {
  const value = textareaElement.value;
  if (!value) return;

  calculateReadingTime(value);
  const totalCharacters = value.length;
  totalCharactersElement.textContent = totalCharacters < 10 ? '0' + totalCharacters : totalCharacters;

  if (excludeSpacesElement.checked) {
    const totalCharactersWthoutSpaces = totalCharacters - countSpaces(value);
    console.log(totalCharactersWthoutSpaces);
    totalCharactersElement.textContent = totalCharactersWthoutSpaces < 10 ? '0' + totalCharactersWthoutSpaces : totalCharactersWthoutSpaces;
  }
  const wordCount = value.split(' ').length;
  wordCountElement.textContent = wordCount < 10 ? '0' + wordCount : wordCount;
  const sentenceCount = value.split('.').length;
  sentenceCountElement.textContent = sentenceCount < 10 ? '0' + sentenceCount : sentenceCount;
};

// textareaElement.value =
//   'Design is the silent ambassador of your brand. Simplicity is key to effective communication, creating clarity in every interaction. A great design transforms complex ideas into elegant solutions, making them easy to understand. It blends aesthetics and functionality seamlessly.';

textareaElement.addEventListener('input', analizeText);
excludeSpacesElement.addEventListener('change', analizeText);
