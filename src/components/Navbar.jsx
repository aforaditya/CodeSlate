import ShareBtn from "./ShareBtn";

function Navbar({library, setLibrary}) {

  return (
    <nav className="p-3">

      <div className="navbar px-5 py-3 flex items-center justify-between">
        <label className="text-xl text-white">CodeSlate</label>

        <div className="flex">
        <ShareBtn />
        <div className="flex rounded-lg  library-bar shadow-lg">
          <div onClick={()=>setLibrary('HTML_CSS')} className={`p-2 px-5 rounded-lg cursor-pointer cursor-pointer ${library == 'HTML_CSS' ? 'active' : ''}`}><label className="text-white text-sm cursor-pointer">HTML + CSS</label></div>
          <div onClick={()=>setLibrary('BOOTSTRAP')} className={`p-2 px-5 rounded-lg cursor-pointer cursor-pointer ${library == 'BOOTSTRAP' ? 'active' : ''}`}><label className="text-white text-sm cursor-pointer">Bootstrap</label></div>
          <div onClick={()=>setLibrary('TAILWIND')} className={`p-2 px-5 rounded-lg cursor-pointer cursor-pointer ${library == 'TAILWIND' ? 'active' : ''}`}><label className="text-white text-sm cursor-pointer">TailwindCSS</label></div>
        </div>

        </div>

      </div>

    </nav>
  )
}

export default Navbar