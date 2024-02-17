import { useEffect } from "react"

function CodeInputBox({ setCodeState, logo, title, code, id }) {


  function autoCloseTag(e) {
    let textarea = document.querySelector('#htmlCode')
    let value = textarea.value
    if (e.key === '>') {
      let stop = textarea.selectionStart
      let i
      for (i = stop - 1; i >= 0; i--) {
        if (value.charAt(i) == '<') {
          break;
        }
      }

      let tag = value.substring(i + 1, stop)
      if (tag.includes(' ') == false) {
        let newValue = value.substring(0, stop) + '</' + tag + '>' + value.substring(stop, value.length)
        console.log('OLD VAL', value);
        console.log('NEW VAL', newValue);
        textarea.value = newValue
        textarea.setSelectionRange(stop, stop)
      }
    }else if(e.key=='"'){
      let stop = textarea.selectionStart
      let newValue = value.substring(0, stop) + '"' + value.substring(stop, value.length)
      console.log('OLD VAL', value);
      console.log('NEW VAL', newValue);
      textarea.value = newValue
      textarea.setSelectionRange(stop, stop)
    }else if(e.key=="'"){
      let stop = textarea.selectionStart
      let newValue = value.substring(0, stop) + "'" + value.substring(stop, value.length)
      console.log('OLD VAL', value);
      console.log('NEW VAL', newValue);
      textarea.value = newValue
      textarea.setSelectionRange(stop, stop)
    }

  }

  return (
    <div className="w-full code-editor h-full">
      <div className='flex items-center px-3 pt-2 gap-2 opacity-80'>
        <img src={logo} className='w-5' />
        <label className="text-white tracking-wider text-sm">{title}</label>
      </div>
      <textarea id={id} spellCheck='false' className="w-full h-[85%] min-h-[85%] box-border  bg-transparent outline-none pt-1 px-2 text-white" onChange={(e) => { setCodeState(e.target.value) }} onKeyDown={autoCloseTag} value={code}> </textarea>
    </div>
  )
}

export default CodeInputBox