const textarea = document.querySelector('textarea'),
voicelist =document.querySelector('select'),
speechbtn = document.querySelector('button');

let synth = speechSynthesis,
isspeaking = true;

voices();
textarea.value= "";

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend",option);
    }
}
synth.addEventListener("voiceschanged",voices);

function textTospeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of  synth.getVoices()){
        if(voice.name === voicelist.value){
            utternance.voice = voice;
        }
    }
    synth.speak(utternance);
}

speechbtn.addEventListener("click", e=>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
        textTospeech(textarea.value);
        }
        if(textarea.value.length >80){
            if(isspeaking){
                synth.resume();
                isspeaking = false;
                speechbtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isspeaking = true;
                speechbtn.innerText = "Resume Speech"
            }
            setInterval(() => {
                if(!synth.speaking && !isspeaking){
                    isspeaking = true;
                    speechbtn.innerText = "Convert To Speech";
                }
            });
        }else{
            speechbtn.innerText = "Convert To Speech";
        }
    }

});