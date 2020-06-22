let messageBox = (function(){
    function loggg(message) {
        if (message == "denied") 
            window.location.href = 'http://localhost/articles/'
        let _message = JSON.parse(message)
        return _message.i
    }
    return {
        logg:loggg
    }
})()