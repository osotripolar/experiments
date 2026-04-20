import { createToast, removeToast } from './toast.js'

const buttons = document.querySelector('.buttons')

buttons.addEventListener('click', (e) => {
  if (e.target.tagName != 'BUTTON') return
  createToast(e.target.id)
})

const btnGenerate = document.getElementById('generateToastButton')
const select = document.querySelector('select')
const input = document.querySelector('input')

btnGenerate.addEventListener('click',()=>{
  createToast(select.value,input.value)
})