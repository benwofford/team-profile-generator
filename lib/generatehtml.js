const fs = require('fs');
const Employee = require('./employee');

class Genhtml {
    constructor (filename,userObj) {
        this.filename = filename;
        this.userObj = userObj;


    }

createManager (data) {
    return `<div class="ui card">
    </div>
    <div class="content">
      <a class="header">${data.name}</a>
      <div class="meta">
        <span class="id">${data.id}</span>
      </div>
      <div class="email">
        ${data.email}
      </div>
    </div>
    <div class="extra content">
      <p>
        <i class="user icon"></i>
        ${data.officeNumber}
      </p>
    </div>
  </div>`
}

createEngineer (data) {
    return `<div class="ui card">
    </div>
    <div class="content">
      <a class="header">${data.name}</a>
      <div class="meta">
        <span class="id">${data.id}</span>
      </div>
      <div class="email">
        ${data.email}
      </div>
    </div>
    <div class="extra content">
      <a href="https://github.com/${data.github}">
        <i class="user icon"></i>
        ${data.github}
      </a>
    </div>
  </div>`
}

createIntern (data) {
    return `<div class="ui card">
    </div>
    <div class="content">
      <a class="header">${data.name}</a>
      <div class="meta">
        <span class="id">${data.id}</span>
      </div>
      <div class="email">
        ${data.email}
      </div>
    </div>
    <div class="extra content">
      <p>
        <i class="user icon"></i>
        ${data.school}
      </p>
    </div>
  </div>`
}

    writeHtml () {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <title>Document</title>
        </head>
        <body>
            ${this.createManager(this.userObj.managerData)}
        </body>
        </html>
        `
    }


}

module.exports = Genhtml;