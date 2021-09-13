# Webber

**A social network app using Material Design**

---

>   *DISCLAIMER: This is Tom Szwaja writing. The other contributor to this repo - [friedmandavid](https://github.com/friedmandavid) -  was a teacher at the coding bootcamp where this was made. He set up the template for this project.*

### General Idea

I made this when I was attending the full stack web development bootcamp at [SPICED Academy](https://www.spiced-academy.com/en). As part of the lesson plan, this project introduced us to React, Redux, sockets, and front end routing. I also used it to learn Material-UI, for fun.

Read about all that fun in the [Development Story](#development-story) section, below!

---

### Features

*   Register and login 
*   Edit your profile
*   Reset your password via email
*   Upload a profile picture 
*   Find other users
*   Friend them
*   Chat with them
*   Unfriend them

---

### Stack

*   [React](https://reactjs.org/)
*   [React Redux](https://react-redux.js.org/)
*   [Material-UI](https://material-ui.com/) - A library of React components based on Google's [Material Design](https://material.io/).
*   [Node](https://nodejs.org/en/about/)
*   [Express](http://expressjs.com/)
*   [PostgreSQL](https://www.postgresql.org/about/)

---

<a id="development-story"> </a>

### Development Story

#### Dream

This was the last guided portion of my coding bootcamp. ([The final project](https://github.com/Return180bpm/imagerouter) was self-directed.) Building on what we had learned about Node and PostgreSQL, it felt like this full stack app with registration, profiles and a chat function was a fitting culmination to 10 weeks of JavaScript learning.

For me it was also an opportunity to explore something else, as during the last few projects I caught myself asking questions like

>   Ok, I have coded this feature, but how do I present it to the user in a way that is clear, efficient and appealing at the same time?

In a word, I was getting interested in UX.    

So I decided to use Material Design for my UI, as I had just heard about the idea of a design system and found it fascinating. Then I could also use this project to refresh my Figma skills. I was getting excited with the possibilities - this would be a blast!

In my vision, I saw myself throwing together a UI in Figma (as if that was a trifle for a beginner), clicking on the Export-to-CSS-button (which is not that simple), linking to that CSS from my index.html, as I had done so far (not here tho), and voilà - a social network app with a Material Design UI. 

So I found the Material-UI React Component library, an appropiate design kit for Figma, and merrily went to work. 

#### Reality

The Figma part was confusing - importing a design kit means working with hundreds of components. Was I allowed to combine them into new ones? How far could I modify them? And, oh my, I have to think about a lot of fonts, don't I? Really thinking through every aspect of the UI - I didn't even know where to start with that. 

The Material UI part was frustrating - I was used to writing CSS in .css files. That could get messy, but creating classes and modifying attributes was easy. Most of all, it was clear that styles lived in .css files and nowhere else (besides the occasional dynamic attribute change via JS). With CSS-in-JS, the approach chosen by Material UI, my world got turned upside down. Things as simple as changing the color of a buttons required research. Classes and themes required an understanding of hooks or Higher Order Components. And most of all, styles were living side by side with my JavaScript logic. It was pandemonium.

After a bit of this set up and research I realized that what really could use some work were my expectations. I wasn't going to send seismic waves through the UX community with this project. I wasn't even sure what I could hope for at that point, since I was still figuring out the workflow. Meanwhile, on the coding side, things were getting more complex with Redux and sockets, and I wanted to keep up with that first and foremost. 

So, I decided that this was to be a learning experience. I would do what I can with the limited time I had. Now, my grand vision went something like this: it would be cool to integrate Material UI, get some elements on the screen and see if I can modify the default theme. On the Figma side, I'd like to understand the basic workflow of a design kit.

#### Review

In the end, I achieved all of this. Even though the result was far off from my initial vision, the app was functioning, stable and made of Material Components. This was a learning experience in more ways than one. Let's examine. 

##### *What went well?*

Well, I learned how to do some technical things - using the Material-UI library involved a lot of steps, from setting up a <ThemeProvider> to learning about the API of the <form> component. I'm grateful that their documentation is as rich as it is. 

It was quite satisfying to get a pre-styled Material-looking button on the screen; it felt great to import one of the form templates and make it work for me; and to get a grasp on CSS-in-JS and organize it efficiently - I'm still waiting for my medal.

Lastly, I am glad that I pared down my initial vision fairly early. I was now aiming for a much humbler goal, but aiming realistically, and I got a good learning experience out of that. 

This whole undertaking really was a dive into unknown waters - everything was new and in the end I have a much better sense of the scale and effort involved in a project like this. 

##### *What could be improved?*

The CSS-in-JS caught me off guard. I had not anticipated that it would get so complicated. It was especially frustrating because it happened right at the beginning and kind of took the wind out of my sails. But maybe this was also a blessing. 

A simple thing to learn from this could be: Unknown tools will take time before they become useful. Look at your tools early, before forming goals.  

The amount of work in general was unexpected. Really, the biggest challenge was a meta problem: Where do I start designing this? -  With a list of features or with the theme colors or somewhere else? Does it even make sense to think of colors if I don't know who the app is supposed to be for? etc. etc. What really stuck with me, were these kinds of fundamental questions around UX and product design. 

Since then, I have signed up for the [Google UX Design Professional Certificate](https://www.coursera.org/professional-certificates/google-ux-design) and learned about Design Sprints and various approaches to the design process. I'm left with a greater appreciation for structure and focus. 

In my next and final project of the bootcamp, I took this lesson to heart and spent the first day thoroughly planning things out with my colleague. We made [mapper](https://github.com/Return180bpm/imagerouter)  - an app that lets you pick any spot on the world map and see photos taken in that location. Take a look!
