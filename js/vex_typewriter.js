const vexCode = `float angle;

angle = @Frame * chf("mult") * fit01(rand(@ptnum), chf("min"), chf("max"))+200;
vector4 orient = quaternion(angle, {0,1,0});
v@up = v@N;`;

const vexCodeWithTags = `<span class="keyword">float</span> angle;

angle = <span class="function">@Frame</span> * <span class="function">chf</span>(<span class="string">"mult"</span>) * <span class="function">fit01</span>(<span class="function">rand</span>(<span class="function">@ptnum</span>), <span class="function">chf</span>(<span class="string">"min"</span>), <span class="function">chf</span>(<span class="string">"max"</span>))+<span class="number">200</span>;
<span class="keyword">vector4</span> orient = <span class="function">quaternion</span>(angle, {<span class="number">0</span>,<span class="number">1</span>,<span class="number">0</span>});
v@up = v@N;`;

const codeContainer = document.getElementById('code-container');
const vexContainer = document.getElementById('vex-container');
const copyButton = document.getElementById('copy-button');
let index = 0;
let isTyping = false;

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function typeCode(timestamp) {
    if (!isTyping) return;

    if (!typeCode.startTime) typeCode.startTime = timestamp;
    const elapsedTime = timestamp - typeCode.startTime;
    const duration = 1000; // Total animation duration in milliseconds

    if (elapsedTime < duration) {
        const progress = easeInOutQuad(elapsedTime / duration);
        index = Math.floor(progress * vexCodeWithTags.length);
        codeContainer.innerHTML = vexCodeWithTags.slice(0, index) + '<span class="cursor"></span>';
        adjustHeight();
        requestAnimationFrame(typeCode);
    } else {
        codeContainer.innerHTML = vexCodeWithTags + '<span class="cursor"></span>';
        adjustHeight();
        copyButton.style.opacity = '1';
    }
}

function adjustHeight() {
    codeContainer.style.height = codeContainer.scrollHeight + 'px';
}

function startTyping() {
    if (!isTyping) {
        isTyping = true;
        index = 0;
        codeContainer.style.height = '0px';
        copyButton.style.opacity = '0';
        typeCode.startTime = null;
        requestAnimationFrame(typeCode);
    }
}

function resetTyping() {
    isTyping = false;
    index = 0;
    codeContainer.innerHTML = '';
    codeContainer.style.height = '0px';
    copyButton.style.opacity = '0';
}

function copyCode() {
    navigator.clipboard.writeText(vexCode).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

vexContainer.addEventListener('mouseenter', startTyping);
vexContainer.addEventListener('mouseleave', resetTyping);
copyButton.addEventListener('click', copyCode);

// Initial empty state
codeContainer.innerHTML = '';
codeContainer.style.height = '0px';