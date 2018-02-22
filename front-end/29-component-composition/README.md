![cf](http://i.imgur.com/7v5ASc8.png) 29:  Component Composition
===

## Daily Plan
- Notes:
    - Anything top of mind?

- Hash Tables
- Code Review
- Composition vs Inheritance
- Building Reusable Components through `props.children`
- Lab Preview

## Learning Objectives
* Students will learn to about composition vs inheritance
* Students will learn to compose react components using props

## Readings
* Read [Conditional Rendering](https://facebook.github.io/react/docs/conditional-rendering.html)
* Read [Lists and Keys](https://facebook.github.io/react/docs/lists-and-keys.html)
* Read [Composition vs Inheritance](https://facebook.github.io/react/docs/composition-vs-inheritance.html)
* Read [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)


## Component Composition
#### Composition
Some components don't know their children a head of time. React components can use the special `children` prop to pass children directly into their output. For example a `SpeechBubble` component could be passed a `SuccessMessage` or `ErrorMessage` component to be used as a child component.

#### Specialization
Composition can be used to create special cases of another component. For example a `Modal` component could be composed to create a `SignupModal` or a `LoginModal`.
