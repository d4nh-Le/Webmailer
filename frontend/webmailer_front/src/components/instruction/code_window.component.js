import './code_window.component.css';

function CodeWindow() {
    return (
        
    <div class="code-window">
    <div class="code-editor">

      <div class="editor-header">
        <span class="editor-title">Webmailer.middleware.js</span>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="editor-icon"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linecap="round" stroke-width="2" stroke="#4C4F5A" d="M6 6L18 18"></path> <path stroke-linecap="round" stroke-width="2" stroke="#4C4F5A" d="M18 6L6 18"></path> </g></svg>
      </div>

      <div class="editor-content">
      <pre>
          <code>
            {`
const axios = require('axios');

const webmailerTrigger = async (req, res, next) => {
    const key = [YOUR_API_KEY]; 
    const page = [YOUR_WEBSITE_NAME];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const referer = req.get('Referer') || ''; 

    const parameters = { key, page, ip, referer};

    try {
     await axios.post('https://w3bmailer.site/trigger', { parameters });
    } catch (error) {
     console.error('Error sending to server:', error);
    }

    next();
}
            `}
          </code>
        </pre>
      </div>
    </div>

    <div class="code-note">
        <div class="note-header">For more detailed documentation and how to use, please visit <a class='footer-link' href='https://github.com/d4nh-Le/webmailer'>Webmailer Github</a>.</div>
    </div>
 </div>
    );
}

export default CodeWindow;