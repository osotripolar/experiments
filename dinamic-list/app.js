import { createToast } from './toast.js'
import { } from "./config.js";

import {
  getLists,
  deleteList,
  postList,
  updateList,
  getNotes,
  postNote,
  updateNote,
  deleteNote,
} from "./dataProvider.js";

let localNotes;
let localLists;
let activeButton;

const notesContainer = document.getElementById("notesContainer");
const selectOptions = document.getElementById("listOptions");
const addNoteBtn = document.getElementById("addNoteBtn");
const inputNote = document.getElementById("inputNote");
const btnLists = document.getElementById("btnLists");
const noteTemplate = document.getElementById("noteTemplate");
const btnListEdit = document.getElementById("btnListEdit");
const btnListsAll = document.getElementById("btnListsAll");
const btnAll = document.getElementById("btnAll");
const btnNoList = document.getElementById("btnNoList");

// moda editar nota
const containerModalEditNote = document.getElementById("modalEditNote");
const closeModalNote = document.getElementById("closeModalEditNote");
const selectOptionsEditNotes = document.getElementById("listOptionsModalEditNote");
const inputEditNote = document.getElementById("inputEditNote");
const btnUpdateNote = document.getElementById("updateNote");
const idNoteModal = document.getElementById("idNoteModal");

// modal edit lists
const modalEditLists = document.getElementById("modalEditLists");
const selectModalLists = document.getElementById("selectModalLists");
const inputEditList = document.getElementById("inputEditList");
const inputNewList = document.getElementById("inputNewList");
const idListModal = document.getElementById("idListModal");
// botones
const btnCreateList = document.getElementById("createList");
const btnUpdateList = document.getElementById("updateList");
const btnDeleteList = document.getElementById("deleteList");
const btnCloseModalEditLists = document.getElementById("btnCloseModalEditLists");

// ================= LISTENERS

inputNewList.addEventListener("keydown", (e) => {
  if (inputNewList.value) {
    btnCreateList.removeAttribute("disabled");
    if (e.key === "Enter") {
      btnCreateList.click();
      btnCloseModalEditLists.click();
    }
  } else {
    btnCreateList.setAttribute("disabled", "");
  }
});

inputNote.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNoteBtn.click();
});

notesContainer.addEventListener("click", async (e) => {
  if (e.target.tagName !== "BUTTON") return;

  if (e.target.classList.contains("btn--edit")) {
    openEditModal(e);
  }

  if (e.target.classList.contains("btn--danger")) {
    const idNote = e.target.closest("li").dataset.id;

    deleteNote(idNote);
    await init();
    filtFilllll(activeButton)
  }
});

btnListsAll.addEventListener("click", filterViewByList);

// modal note

addNoteBtn.addEventListener("click", async () => {
  if (!inputNote.value) return;

  const newNote = {
    content: inputNote.value,
    list_id: selectOptions.value === "" ? null : selectOptions.value,
  };

  postNote(newNote);

  // limpiamos el input
  inputNote.value = "";

  await init();

  filtFilllll(activeButton)

});

btnUpdateNote.addEventListener("click", async () => {
  const idNewNote = idNoteModal.textContent;
  const newText = inputEditNote.value;
  const newIdList = selectOptionsEditNotes.value;

  const newData = {
    id: idNewNote,
    content: newText,
    list_id: newIdList === "" ? null : newIdList,
  };

  await updateNote(newData);

  closeModalNote.click();
  await init();
  filtFilllll(activeButton)
});

closeModalNote.addEventListener("click", () => {
  containerModalEditNote.classList.remove("show");
});

// modal list

btnCreateList.addEventListener("click", () => {
  if (!inputNewList.value) return;

  const newListName = inputNewList.value;

  postList(newListName);
  btnCloseModalEditLists.click();
  init();
});

btnUpdateList.addEventListener("click", async () => {
  const newListData = {
    id: idListModal.textContent,
    title: inputEditList.value,
  };

  await updateList(newListData);
  btnCloseModalEditLists.click();
  init();
});

btnDeleteList.addEventListener("click", async () => {
  const idList = idListModal.textContent;
  await deleteList(idList);
  btnCloseModalEditLists.click();
  init();
});

btnListEdit.addEventListener("click", () => {
  modalEditLists.classList.add("show");
  inputNewList.focus();
});

btnCloseModalEditLists.addEventListener("click", () => {
  setDefaultOptionsModalListsEditOrDelete();
  modalEditLists.classList.remove("show");
});

// Atajos

document.addEventListener("keydown", (e) => {
  if (containerModalEditNote.classList.contains("show")) {
    if (e.key === "Escape") {
      closeModalNote.click();
    }
  }
  if (modalEditLists.classList.contains("show")) {
    if (e.key === "Escape") {
      btnCloseModalEditLists.click();
    }
  }
});

// ================= MODALS

function openEditModal(e) {
  const li = e.target.closest("li");
  const noteText = li.querySelector("p").textContent;
  const noteId = li.dataset.id;
  const noteListId = li.dataset.idList;

  idNoteModal.textContent = noteId;
  inputEditNote.value = noteText;
  inputEditNote.focus();
  inputEditNote.select();

  if (noteListId) {
    const option = selectOptionsEditNotes.querySelector(
      `option[value="${noteListId}"]`,
    );
    option.selected = true;
  }

  containerModalEditNote.classList.add("show");
}

// ================= RENDER

function render(notes = undefined) {
  fillNotes(notes);
  fillBtnLists();
  fillOptions();

  fillOptionsModalNotes();
  fillOptionsModaLists();

  marcarBotonSeleccionado();
}

// llenado de partes

function fillBtnLists() {
  const fragment = document.createDocumentFragment();

  // Añadimos botones por cada lista
  localLists.forEach((list) => {
    const btnList = el("button", undefined, list.title);
    btnList.dataset.id = list.id;
    fragment.appendChild(btnList);
  });

  // añadimos funcionalidad a los botones
  btnLists.replaceChildren(fragment);
}

async function fillNotes(filteredNotes = undefined) {

  try {


    const fragment = document.createDocumentFragment();
    const dataFilter = filteredNotes || localNotes;

    if (dataFilter.length != 0) {
      dataFilter.forEach((note) => {
        const noteContent = noteTemplate.content.cloneNode(true);
        const pNote = noteContent.querySelector("p");
        const liNote = noteContent.querySelector("li");

        pNote.textContent = note.content;
        liNote.dataset.id = note.id;
        if (note.list_id) liNote.dataset.idList = note.list_id;

        fragment.appendChild(noteContent);
      });
    } else {
      const message = el("p", "italic", "Vacío: inserte una nota");
      fragment.appendChild(message);
    }

    notesContainer.replaceChildren(fragment);

  } catch (err) {
    createToast('warning', 'No se pudo obtener información de esta fuente, intente con otra')
  }

}

function fillOptions() {
  const fragment = createOptions("Seleccione una lista");
  selectOptions.replaceChildren(fragment);
}

function fillOptionsModalNotes() {
  const fragment = createOptions("Sin Lista");
  selectOptionsEditNotes.replaceChildren(fragment);
}

function fillOptionsModaLists() {
  const fragment = createOptions("Sin Lista");
  selectModalLists.replaceChildren(fragment);

  selectModalLists.addEventListener("change", () => {
    const idList = selectModalLists.value;

    if (idList) {
      const nameList = selectModalLists.querySelector(
        `[value="${idList}"]`,
      ).textContent;
      inputEditList.value = nameList;
      idListModal.textContent = idList;
      // remover disabled
      inputEditList.removeAttribute("disabled");
      btnUpdateList.removeAttribute("disabled");
      btnDeleteList.removeAttribute("disabled");
    } else {
      setDefaultOptionsModalListsEditOrDelete();
    }
  });
}

// ================= FUNCIONES AUXILIARES

function filterViewByList(e) {

  if (!(e.target.tagName === "BUTTON")) return;

  const id = e.target.dataset.id
  activeButton = id;
  filtFilllll(id)

}

function filtFilllll(id) {
  if (id) {

    let datosFiltrados;

    if (id == 0) {
      // con esto renderizamos solo lo que
      datosFiltrados = localNotes.filter((nota) => nota.list_id == null);
    } else {
      datosFiltrados = localNotes.filter(
        (nota) => nota.list_id == id,
      );
    }
    render(datosFiltrados);
    if (id > 0) {
      selectOptions.value = id
    }
  } else {
    render();
  }
}


function setDefaultOptionsModalListsEditOrDelete() {
  // tambien deberíamos de inhabilitar el input correspondiente
  selectModalLists.value = "";
  idListModal.textContent = "-";
  inputEditList.value = "";
  inputNewList.value = "";
  inputEditList.setAttribute("disabled", "");
  btnUpdateList.setAttribute("disabled", "");
  btnDeleteList.setAttribute("disabled", "");
  btnCreateList.setAttribute("disabled", "");
}

function marcarBotonSeleccionado() {
  const botonestodos = btnListsAll.querySelectorAll("button");

  botonestodos.forEach((button) => {
    button.classList.remove("btnActive");
  });

  if (!activeButton) {
    btnAll.classList.add("btnActive");
    return;
  }

  if (activeButton == 0) {
    btnNoList.classList.add("btnActive");
  } else {
    const xd = btnListsAll.querySelector(`[data-id="${activeButton}"]`);
    xd.classList.add("btnActive");
  }
}

// creacion de elementos

function createOptions(text) {
  const fragment = document.createDocumentFragment();

  const defaultOption = el("option", undefined, text);
  defaultOption.value = "";
  defaultOption.selected = true;

  fragment.appendChild(defaultOption);

  localLists.forEach((list) => {
    const optionEl = el("option", undefined, list.title);
    optionEl.value = list.id;

    fragment.appendChild(optionEl);
  });

  return fragment;
}

function el(tag, className = undefined, text = undefined) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

// ================= APP START

async function initializeData() {
  // traemos los datos paralelamente
  try {
    const [resLists, resNotes] = await Promise.all([
      getLists(),
      getNotes()
    ]);

    if (!resLists.ok) throw ('Hubo un error en el servidor al traer las Listas')
    if (!resNotes.ok) throw ('Hubo un error en el servidor al traer las Notas')

    const [lists, notes] = await Promise.all([
      resLists.json(),
      resNotes.json()
    ])

    localLists = lists
    localNotes = notes

  } catch (error) {
    createToast('error', error)
  }
}

export async function init() {
  await initializeData();
  render();
}

init();