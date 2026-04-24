
import { init } from "./app.js"
import { createToast } from "./toast.js"

/* =============
MODAL
============= */

// modal settings
const modalConfig = document.getElementById('modalConfig')
const btnConfig = document.getElementById('btnConfig')
const btnCloseModalConfig = document.getElementById('btnCloseModalConfig')
const btnConfirmSettings = document.getElementById('btnConfirmSettings')
const selectOriginData = document.getElementById('selectOriginData')

btnCloseModalConfig.addEventListener('click', () => {
  modalConfig.classList.remove("show")
})

btnConfig.addEventListener('click', () => {
  modalConfig.classList.add("show")
})

btnConfirmSettings.addEventListener('click', () => {
  localStorage.setItem('dataConfigOrigin', selectOriginData.value)
  btnCloseModalConfig.click()
  init()
  createToast('info', 'El origen de los datos ha cambiado')
})

/* =============
INIT
============= */

if (!localStorage.getItem('dataConfigOrigin')) {
  localStorage.setItem('dataConfigOrigin', 'mock')
}

selectOriginData.value = localStorage.getItem('dataConfigOrigin')


// Aún falta aquí manejar la lógica de la api, guardar las rutas de los endpoints (lo coloca el usuario) en un objeto del LocalStorage