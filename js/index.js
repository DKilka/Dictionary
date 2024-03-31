let dictionaryList = document.querySelector(".dictionary-list");

const showNewElement = (newWord) => {
  if (newWord === "") {
    return;
  }
  console.log(
    getWords(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`)
  );
  const deleteButton = Object.assign(document.createElement("button"), {
    innerHTML: `<img src="../images/delete-word-icon.svg" class="delete-icon">`,
  });
  deleteButton.addEventListener("click", () => deleteWord(newElement));
  const word = Object.assign(document.createElement("div"), {
    class: newWord,
    textContent: newWord,
  });
  const newElement = Object.assign(document.createElement("li"), {
    class: "item-" + newWord,
  });
  newElement.append(word, deleteButton);
  saveData(dictionaryList);
  return dictionaryList.append(newElement);
};

const deleteWord = (word) => {
  return (word.innerHTML = "");
};

const AddWordToList = (event) => {
  if (event.key === "Enter" && !!newWord.value) {
    showNewElement(newWord.value);
    newWord.value = null;
  }
};

const getWords = async (URL) => {
  const responce = await fetch(URL);
  if (responce.ok) {
    const data = await responce.json();
    return await data;
  } else {
    console.log(responce.status);
  }
};

const saveData = (dictionaryList) => {
  return localStorage.setItem("save", dictionaryList.innerHTML);
};

const loadData = () => {
  return (dictionaryList.innerHTML = localStorage.getItem("save"));
};

newWord.addEventListener("keypress", (event) => AddWordToList(event));
window.onload = loadData();
