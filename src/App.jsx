import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import Screen from './components/Screen'
import CodeArea from './components/CodeArea'
import Navbar from './components/Navbar'
import PopUp from './components/PopUp'
import { CodeLinkProvider } from './context/codeLinkContext'
import { get } from './utils/db'



function App() {

  let savedHtml = window.localStorage.getItem('htmlCode') || '<p> All changes you make will appear here 🧩💻</p>'
  let savedCss = window.localStorage.getItem('cssCode') || ''
  let savedLibrary = window.localStorage.getItem('library') || 'HTML_CSS'

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let codeKey = params.code


  let [htmlCode, setHtmlCode] = useState(savedHtml)
  let [cssCode, setCssCode] = useState(savedCss)
  let [library, setLibrary] = useState(savedLibrary)


  useEffect(() => {


    window.localStorage.setItem('htmlCode', htmlCode)
    window.localStorage.setItem('cssCode', cssCode)
    window.localStorage.setItem('library', library)

    let screen = document.querySelector('#screen')
    let iframeDocument = screen.contentDocument || screen.contentWindow.document;
    iframeDocument.body.innerHTML = htmlCode
    let styleElement = iframeDocument.createElement('style')
    styleElement.innerHTML = cssCode
    
    // Remove existing style elements first
    var existingStyles = iframeDocument.head.getElementsByTagName('style');
    for (var i = 0; i < existingStyles.length; i++) {
     existingStyles[i].parentNode.removeChild(existingStyles[i])
    }

    iframeDocument.head.appendChild(styleElement)
  })

  useEffect(()=>{

    let screen = document.querySelector('#screen')
    let iframeDocument = screen.contentDocument || screen.contentWindow.document;
    let linkElement = iframeDocument.createElement('link')
    let scriptElement = iframeDocument.createElement('script')

    if(library=='BOOTSTRAP'){

      

      let tailwindElement = iframeDocument.querySelector('script[src="https://cdn.tailwindcss.com"]')
      tailwindElement && tailwindElement.parentNode.removeChild(tailwindElement)

      // Remove the style put by tailwind
      setTimeout(()=>{
        let styleElements = iframeDocument.getElementsByTagName('style');
        for (let i = 0; i < styleElements.length; i++) {
          if (styleElements[i].textContent.includes('tailwindcss.com')) {
            styleElements[i].textContent = '';
          }
        }
      }, 1000)



      linkElement.href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
      linkElement.rel='stylesheet'
      iframeDocument.head.appendChild(linkElement)
    }else if(library=='TAILWIND'){

      let bootStrapElement = iframeDocument.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]')
      bootStrapElement && bootStrapElement.parentNode.removeChild(bootStrapElement)

      scriptElement.src='https://cdn.tailwindcss.com'
      iframeDocument.head.appendChild(scriptElement)
    }
    else{
      let bootStrapElement = iframeDocument.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]')
      bootStrapElement && bootStrapElement.parentNode.removeChild(bootStrapElement)

      let tailwindElement = iframeDocument.querySelector('script[src="https://cdn.tailwindcss.com"]')
      tailwindElement && tailwindElement.parentNode.removeChild(tailwindElement)

      // Remove the style put by tailwind
      setTimeout(()=>{
        let styleElements = iframeDocument.getElementsByTagName('style');
        for (let i = 0; i < styleElements.length; i++) {
          if (styleElements[i].textContent.includes('tailwindcss.com')) {
            styleElements[i].textContent = '';
          }
        }
      }, 1000)

    }
    
  }, [library])


  // Fetch Code from Database

  useEffect(()=>{
    async function fetchDataFromDatabase(){
      let data = await get('codes', codeKey)

      // show error message if codeKey is Invalid
      if(!data)
      alert('Invalid Link!')

      setHtmlCode(data.htmlCode)
      setCssCode(data.cssCode)
      setLibrary(data.library)
    }

    if(codeKey)
    fetchDataFromDatabase()

  }, [])

  return (
    <CodeLinkProvider>
    <div>
      <PopUp />
      <Navbar library={library} setLibrary={setLibrary}/>
      <div className='flex h-[80vh]'>
        <Screen />
        <CodeArea setHtmlCode={setHtmlCode} setCssCode={setCssCode} code={{htmlCode, cssCode}} />
      </div>
    </div>
    </CodeLinkProvider>
  )
}

export default App
