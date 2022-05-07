# Open course

Create courses by adding learning content in the form of youtube videos, PDFs, quizzes and text based articles. All which can be viewed in site, without having to navigate to another website.

# Running locally

Install dependencies

```
npm install
```

Install json-server  
_used as a local db and provides endpoints_

```
npm install -g json-server
```

Run the local db (json-server)

```
json-server --watch db.json
```

Run the app  
_if prompted, accept to run on a different port (original is 3000, might ask for 3001 or something similar)_

```
npm start
```
