let apiKey = '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';

let message = [];

function init() {

  inputField.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      handle_QUERY();
    }
  });
  submitBtn.addEventListener('click', () => handle_QUERY());
}

function handle_QUERY(){

  const div = document.createElement('div');
  div.classList.add('message');
  div.classList.add('user');
  div.innerHTML = inputField.value;
  results.appendChild(div);
    
  results.scrollTop = results.scrollHeight;



  fetch(`https://api.openai.com/v1/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'ft:davinci-002:personal::8NFrXI5P',
      prompt: `${inputField.value} ->`,
      max_tokens: 100,
    })
  })
//  .then(response => response.json())
  .then(response => {
//    if (!response.ok) {
//      throw new Error(`HTTP error! Status: ${response.status}`);
//    }
    return response.json();
  })
  // .then(data => {
  //   messages.push({
  //     'role': 'assistant',
  //     'content': data.choices[0].message.content 
  //   } );


  //   const div = document.createElement('div');
  //   div.classList.add('message');
  //   div.classList.add('bot');
  //   div.innerHTML = data.choices[0].message.content;
  //   results.appendChild(div);

    //scroll to bottom of results
    results.scrollTop = results.scrollHeight;
//  });

}

fetch('./config.json')
  .then(response => response.json())
  .then(data => {
    apiKey = data.apiKey;
    init();
  });