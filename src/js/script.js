const helloWorld = (balise, text, id) => {
  let container = document.createElement(balise);
  let content = document.createTextNode(text);
  container.style.color = 'red';
  container.appendChild(content);

  let Div = document.querySelector(id);
  document.body.insertBefore(container, Div);
}

helloWorld('div','Hello World','name');