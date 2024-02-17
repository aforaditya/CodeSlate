import { useCodeLinkContext } from '../context/codeLinkContext';





function PopUp() {

    let {codeLink, setCodeLink} = useCodeLinkContext()

    function copyLink(){
        navigator.clipboard.writeText(codeLink)
        const copyBtn = document.querySelector('#copyBtn')
        copyBtn.innerText = '✅ Copied'
    
        setTimeout(()=>copyBtn.innerText = '🖇️ Copy link', 2000)
    }

    

    let component = codeLink ? 
    <div className='bg-blue-700 opacity-90 h-screen w-screen absolute flex justify-center items-center z-10'>
    <div className='glass p-5 w-5/12'>
        <h3 className='text-white'>Code saved!</h3>
        <p className='text-white'>Share it with your friends using this link:  </p>
        <p>{codeLink}</p>
        <button id="copyBtn" onClick={copyLink} className='border-[1px] border-white mt-4 py-1 px-2 rounded-md font-semibold text-white'>🖇️ Copy link</button>
        <button id="copyBtn" onClick={()=>setCodeLink('')} className='ml-3 border-[1px] border-white mt-4 py-1 px-2 rounded-md font-semibold text-white'>Close</button>
    </div>
</div>
:
''


  return component
    
  
}

export default PopUp