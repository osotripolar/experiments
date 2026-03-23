const themeIcon = document.getElementById('iconTheme')
const themeModeInput = document.getElementById('inputTheme')
const html = document.querySelector('html')

console.log(themeModeInput)

themeModeInput.addEventListener('change',(e)=>{
    if(e.target.checked){
        setThemeToDark()
    }else{
        setThemeToNormal()
    }
})

if (localStorage.getItem('theme') == 'dark'){
    themeModeInput.checked = true
    setThemeToDark()
}

// funciones
function setThemeToDark(){
    localStorage.setItem('theme','dark')
    html.classList.add('dark');
    themeIcon.className = 'bi bi-brightness-high-fill'
}

function setThemeToNormal(){
    localStorage.setItem('theme','normal')
    html.classList.remove('dark')
    themeIcon.className = 'bi bi-moon-fill'
}


