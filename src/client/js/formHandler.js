export default function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let data = {txt: document.getElementById('name').value}
    
    // console.log("::: Form Submitted :::")
    fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.subjectivity
    })
}
