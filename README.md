<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>StackOverFlow</h1>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style&logo=Nodemon&logoColor=white" alt="Nodemon" />
<img src="https://img.shields.io/badge/SQLite-003B57.svg?style&logo=SQLite&logoColor=white" alt="SQLite" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />
</p>
<img src="https://img.shields.io/github/license/SamyOffer/StackOverFlow?style&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/SamyOffer/StackOverFlow?style&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/SamyOffer/StackOverFlow?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/SamyOffer/StackOverFlow?style&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running StackOverFlow](#-running-StackOverFlow)
---


## 📍 Overview

I recreated Stack Overflow using the MVC (Model-View-Controller) design pattern for web development. This involved structuring the application into separate components for handling data (Model), rendering the user interface (View), and managing user interactions (Controller).

---

## 📂 Repository Structure

```sh
└── StackOverFlow/
    ├── .gitignore
    ├── README.md
    ├── UtilisateursjeuxmBureaudb_Project.sqlite
    ├── app.js
    ├── models/
    │   ├── Answer.js
    │   ├── Categories.js
    │   ├── Question.js
    │   ├── User.js
    │   └── db_conf.js
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── images/
    │   └── stylesheets/
    ├── routes/
    │   ├── admin.js
    │   ├── index.js
    │   ├── question.js
    │   └── users.js
    └── views/
        ├── admin.hbs
        ├── create_question.hbs
        ├── error.hbs
        ├── index.hbs
        ├── layout.hbs
        ├── partials/
        ├── question.hbs
        └── users/
```


---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the StackOverFlow repository:
```sh
git clone https://github.com/SamyOffer/StackOverFlow
```

2. Change to the project directory:
```sh
cd StackOverFlow
```

3. Install the dependencies:
```sh
npm i 
```

### 🤖 Running StackOverFlow

```sh
npm start
```

---

[↑ Return](#Top)

---
