import './intro.component.css';

function intro() {
    return (
        <div className="intro">
            <div class="intro-top">           
            <div class="intro-title">Website traffics and analytics - all in your email.</div>
           <div class="intro-content">Webmailer collects and notifies you about your website traffics and performance through your email.</div>  
           <div class="intro-content">No complicated services • No app download needed - and free.</div>
           </div>


            <div class="intro-bottom"> 
            <a href='#instruction-title-started'><div class="intro-item button get-started"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="m3 7l9 6l9-6m-1 14l2-2l-2-2m-3 0l-2 2l2 2"/></g></svg>Get started</div></a>
            <a href='https://github.com/d4nh-Le/webmailer' target='blank'><div class="intro-item button documentation"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#3c3c43c7" stroke-linecap="round" stroke-linejoin="round"><path stroke-dasharray="64" stroke-dashoffset="64" stroke-width="2" d="M13 3L19 9V21H5V3H13"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M12.5 3V8.5H19"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="14;0"/></path><g stroke-dasharray="8" stroke-dashoffset="8" stroke-width="2"><path d="M10 13L8 15L10 17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="8;0"/></path><path d="M14 13L16 15L14 17"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="8;0"/></path></g></g></svg>Documentation</div></a>
            </div>
        </div>
    );
}

export default intro;