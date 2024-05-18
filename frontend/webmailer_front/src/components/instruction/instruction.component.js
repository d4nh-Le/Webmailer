import './instruction.component.css';

function Instruction() {
    return (
        <div class="instruction">
            <div class="instruction-title">How it works:</div>
            <div class="instruction-content">
                <div class="instruction-item">1. Register designated website and email address.</div>
                <div class="instruction-item">2. Create a Webmailer middleware.</div>
                <div class="instruction-item">3. Put the middleware in your web application routes.</div>
                <div class="instruction-item">4. Everytime your page receives traffic, the visit will also be recorded on Webmailer server.</div>
                <div class="instruction-item">5. Notifications will be sent to designated email.</div>
            </div>
        </div>
    );
};

export default Instruction;