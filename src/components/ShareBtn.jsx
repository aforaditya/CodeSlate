import { useState } from "react"
import { add } from "../utils/db"
import { useCodeLinkContext } from '../context/codeLinkContext';


function ShareBtn() {

  let [saving, setSaving] = useState(false)
  const { codeLink, setCodeLink } = useCodeLinkContext();



  async function saveCode(){
    setSaving(true)
    const htmlCode = window.localStorage.getItem('htmlCode')
    const cssCode = window.localStorage.getItem('cssCode')
    const library = window.localStorage.getItem('library')
    const data = {htmlCode, cssCode, library}
    let docId = await add('codes', data)
    setSaving(false)
    setCodeLink(`https://codeslate.vercel.app/?code=${docId}`)
 }


  return (
    <div onClick={saveCode} className="border-[1px] border-gray-200 hover:border-white rounded-2xl flex justify-center items-center px-3 mr-5 cursor-pointer box-border text-gray-200 hover:text-white">
        <span className="">{saving ? 'Generating link' : 'Share code'}</span>
    </div>
  )
}

export default ShareBtn