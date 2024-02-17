/* eslint-disable react/prop-types */
import htmlLogo from '../assets/images/htmlLogo.svg'
import cssLogo from '../assets/images/cssLogo.svg'
import CodeInputBox from './CodeInputBox'

function CodeArea({ code, setHtmlCode, setCssCode }) {
    

    return (
        <div className="flex flex-col px-3 gap-3 h-full grow">
            <CodeInputBox id="htmlCode"  code={code.htmlCode} setCodeState={setHtmlCode} title='HTML' logo={htmlLogo}/>
            <CodeInputBox id="cssCode" code={code.cssCode} setCodeState={setCssCode} title='CSS' logo={cssLogo}/>
        </div>
    )
}

export default CodeArea