export default (event) => {
    event.preventDefault()

    // Refer to https://stackoverflow.com/questions/45567341/regex-dont-match-if-it-is-an-empty-string
    let re = /^(?! *$)[a-zA-Z.+ '-]+$/;
    // check what text was put into the form field
    if (re.exec(document.getElementById('name').value) == null) {
        // Empty String
        document.getElementById('error').innerHTML = 'Please enter a value in the input field'
    } else {
        // Not Empty String
        document.getElementById('error').innerHTML = ''
        let data = {txt: document.getElementById('name').value}
        // Refer to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(function(res) {
            let polarity = res.score_tag
            switch (polarity) {
                case 'P+':
                    polarity = 'strong positive'
                    break;
                case 'P':
                    polarity = 'positive'
                    break;
                case 'NEU':
                    polarity = 'neutral'
                    break;
                case 'N':
                    polarity = 'negative'
                    break;
                case 'N+':
                    polarity = 'strong negative'
                    break;
                case 'NONE':
                    polarity = 'without polarity'
                    break;                    
                default:
                    break;
            }
            document.getElementById('polarity').innerHTML ='Polarity: ' +  polarity
            document.getElementById('subjectivity').innerHTML ='Subjectivity: ' + res.subjectivity.toLowerCase()
            document.getElementById('text').innerHTML ='Text: ' + res.sentence_list[0].text
            
        })
        .catch(err => console.log(err))
    }
}
