# Todo App

The running app can be found here [Todo App](https://alexandershpilka.github.io/todo/).

## Steps to run the app locally

- clone the repository
- run `npm install`
- run `npm start`

### Notes

- all the requirements are implemented including the bonus ones
- on app load the input field is automatically focused so that a user can start typing right away
- this is implemented using custom hook returning a reference for an element to be focused
- Modal is rendered using React's createPortal function into its own DOM node added to index.html
- this is to avoid possible issues with another DOM nodes with position set to `fixed`
- Modal is implemented with accessibility in mind, meaning it can be closed with either "Cancel" button, clicking on backdrop or pressing Escape key 
