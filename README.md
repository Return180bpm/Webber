# Webber

**A social network app using Material Design**



### General Idea

I made this when I was attending the full stack web development bootcamp at [SPICED Academy](https://www.spiced-academy.com/en). As part of the lesson plan, the app introduced us to React, Redux, sockets, and front end routing. I also used Material-UI, for fun.

Read about all that fun in my [Development Story](#development-story) section, below!

### Features

*   Register and login 
*   Edit your profile
*   Upload a profile picture 
*   Find other users
*   Friend and unfriend
*   Message other users

### Stack

*Front*

*   [React](https://reactjs.org/)
*   [React Redux](https://react-redux.js.org/)
*   [Material-UI](https://material-ui.com/) - A library of React components based on Google's [Material Design](https://material.io/).

*Back*

*   [Node](https://nodejs.org/en/about/)
*   [PostgreSQL](https://www.postgresql.org/about/)

<a id="development-story"> </a>

### Development Story

#### The Dream

Visions/Background / hypothesis / thesis / hubris / 

This was the last guided project of my coding bootcamp. ([The final project](https://github.com/Return180bpm/imagerouter) was self-directed.) Building on what we had learned about Node and PostgreSQL, we built this full stack social network app with registration, profiles and a chat function in 7 days. It felt like a fitting culmination to 10 weeks of JavaScript learning.

For me it was also an opportunity to explore something else, as during the last few projects I caught myself asking questions like

>   Ok, I have coded this feature, but how do I present it to the user in a way that is clear,  efficient and aesthetically appealing at the same time?

In a word, I was getting interested in UX.    

So I decided to use Material Design for my UI, as I found the idea of a design system fascinating. And to top it all off, I could also use this project to refresh my Figma skills. This would be a blast!

In my vision, I saw myself throwing together a UI in Figma (as if that was a trifle for a beginner), clicking on the Export-to-CSS-button (which is not that simple), linking to that CSS from my index.html, as I had done so far (nope), and voilà - a social network app with a Material Design UI. 

So I found the Material UI React Component library, an appropiate design kit for Figma, and merrily went to work. In hindsight I marvel. 

#### In Reality

I barely made it past the set up. 

The Figma part was confusing - importing a design kit means working with hundreds of components. Was I allowed to combine them into new ones? How far could I modify them? And, oh my, I have to think about a lot of fonts, don't I? Really thinking through every aspect of the UI - I didn't even know where to start with that. 

The Material UI part was painful - especially so, because I did not expect the CSS-in-JS entanglement that was waiting for me. I was used to writing CSS in .css files. That could get messy, but creating classes and modifying attributes was easy. Most of all, it was clear that styles lived in .css files and nowhere else (besides the occasional dynamic attribute change via JS). With CSS-in-JS, the approach chosen by Material UI, my world got turned upside down. Things as simple as changing the color of a buttons required research. Classes and themes required an understanding of hooks or Higher Order Components. And most of all, Styles were living side by side with my JavaScript logic. It was pandemonium.

Needless to say, after 2 days of set up and research I decided that what really could use some work were my expectations. I wasn't going to send seismic waves through the UX community with this project. Since I hadn't an established workflow, I wasn't even sure what I could hope for at that point. Meanwhile, on the coding side, things were getting more complex with Redux and Sockets, and I wanted to keep up with that first and foremost. 

So, I decided that this was to be a learning experience. I would do what I can when there was time for it. Now my grand vision went something like this: "it would be cool to integrate Material UI, get some elements on the screen and make my own theme." On the Figma side, I would be happy to understand the basics of a design kit.

#### Results

In the end, I achieved these goals.

*What went well?*

Well, I learned

*   how to integrate a CSS library, which I had never done before,
*   about CSS-in-JS,
*   about hooks and HOC,
*   how to use a design kit in Figma.

I'm happy about that. 

It was also a great feeling to have that vision at the beginning. Lastly, I am glad that I pared it down fairly early. In the end, even though I was aiming for a much humbler goal now, I was aiming realistically, and got a good learning experience out of it. 

*What could be improved?*

The CSS-in-JS caught me off guard. This caused a delay, it felt a little like I was relearning CSS, which is not something I wanted to do. It was especially frustrating because it happened right at the beginning. I think it took the wind out of my sails. 

A simple thing to learn: "Unknown tools will take time before they become useful." I could also research the tools early, before forming goals.  

The amount of work in general was unexpected. I can see now how gung-ho I went into this. Really, the biggest challenge was kind of overarching: "Where do I start? -  With a list of features or with the theme colors? In Figma or on paper?" "How does it make sense to think of colors if I don't know who the app is supposed to be for?" What really stuck with me, were these questions around UX and product design. 

(Since then, I have continued pursuing those questions and signed up for the Google UX Design Professional Certificate. Read more about my journey on my blog!)

In the midst of the battle, these questions were half-buried. I think what I missed was a reckoning with this aspect - do I put time in figuring out the UX stuff from scratch or do I drop this and employ a practical solution - like using template Components and theming all the way through? Using an out-of-box UI approach like that could have been a valuable learning experience in itself. 

In my next and final project of the bootcamp, I took some of these lessons to heart and spent the first day planning things out with my colleague. We made mapper - an app that gives you a photo album of local pictures based around any point in the world/ lets you pick any spot on the world map and browse photos taken in that location.
