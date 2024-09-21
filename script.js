

let tl = gsap.timeline();

tl.from(".line h1", {
     y: "110%",
     stagger: 0.2,
     duration: 0.2,
     delay: 0.5
});

tl.from(".line1-part1, .line h2", {
     opacity: 0,
     //onStart in a property which accepts a function. This function can be any user-defined function that will be triggered when this section is animated.
     onStart: function(){
          let h5Timer = document.querySelector(".line h5");
          let timerId = setInterval(() =>{
               h5Timer.textContent = parseInt(h5Timer.textContent) + 1;
               if(h5Timer.textContent == "100") clearInterval(timerId);    
          },30);
     },
     duration: 2.6      // Adjust duration for smoother animation
});

// Animate #page1 to move from the bottom to top before loader fades out
tl.from("#page1", {
     y: 1600,          // Start from the bottom
     opacity: 0,
     delay: 1,          // Delay to sync with loader fade-out
     onStart: function(){
         document.querySelector("#page1").style.zIndex = 1000; // Bring page1 to the top
     },
     duration: 1.8,      // Adjust duration for smoother animation
     ease: "power4.inOut" // Use a more complex easing function for smoother movement
 });
 
 // Fade out the loader AFTER page1's animation has started
 tl.to("#loader", {
     opacity: 0,
     duration: 1,       // Keep this duration to smoothly fade out the loader
     delay: 1        // Slight negative delay to overlap with page1 animation
 });
 
 // Finally, remove the loader from DOM to avoid interaction issues
 tl.to("#loader", {
     display: "none"
 });