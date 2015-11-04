var recognition;
var nowRecognition = false;
var $finalSpan = document.querySelector('#final_span');
var $interimSpan = document.querySelector('#interim_span');

function start () {
    recognition = new webkitSpeechRecognition();
    recognition.lang = document.querySelector('#select2').value;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function (e) {
        var finalText = '';
        var interimText = '';
        for (var i = 0; i < e.results.length; i++) {
            console.log(i, e, e.results, e.results[i][0].transcript);
            if (e.results[i].isFinal) {
                finalText += e.results[i][0].transcript;
            } else {
                interimText += e.results[i][0].transcript;
            }
        }
        $interimSpan.textContent = interimText;
        $finalSpan.textContent = finalText;
    };
    recognition.start();
    recognition.onaudiostart = function(e) { console.log('audiostart', e)};
    recognition.onsoundstart = function(e) { console.log('soundstart', e)};
    recognition.onspeechstart = function(e) { console.log('speechstart', e)};
    recognition.onspeechend = function(e) { console.log('speechend', e)};
    recognition.onsoundend=function(e) { console.log('soundend', e)};
    recognition.onaudioend=function(e) { console.log('audioend', e)};
    recognition.onnomatch=function(e) { console.log('nomatch', e)};
    recognition.onerror=function(e) { console.log('onerror', e)};
    recognition.onstart=function(e) { console.log('onstart', e)};
    recognition.onend=function(e) { console.log('onend', e)};
    nowRecognition = true;
};

function stop () {
    recognition.stop();
    nowRecognition = false;
}

document.querySelector('#btn2').onclick = function () {
    
    // unsupported.
    if (!'webkitSpeechRecognition' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }
    
    if (nowRecognition) {
        stop();
        this.value = '音声認識を継続的に行う';
        this.className = '';
    } else {
        start();
        this.value = '音声認識を止める';
        this.className = 'select';
    }
}
