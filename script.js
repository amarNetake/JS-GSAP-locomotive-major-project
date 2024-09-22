function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1", {
    y: "110%",
    stagger: 0.2,
    duration: 0.2,
    delay: 0.5,
  });

  tl.from(".line1-part1, .line h2", {
    opacity: 0,
    //onStart in a property which accepts a function. This function can be any user-defined function that will be triggered when this section is animated.
    onStart: function () {
      let h5Timer = document.querySelector(".line h5");
      let timerId = setInterval(() => {
        h5Timer.textContent = parseInt(h5Timer.textContent) + 1;
        if (h5Timer.textContent == "100") {
          clearInterval(timerId);
        }
      }, 30);
    },
    duration: 2, // Adjust duration for smoother animation
  });

  // Fade out the loader AFTER page1's animation has started
  tl.to("#line h2", {
    onComplete: function () {
      // Stop the CSS keyframes animation on .line h2
      let h2Element = document.querySelector(".line h2");
      h2Element.style.animation = "none"; // Stops the keyframe animation
      h2Element.style.fontFamily = "Silk Serif";
      h2Element.style.color = "transparent";
    },
    delay: 0,
  });

  // Animate #page1 to move from the bottom to top before loader fades out
  tl.from("#page1", {
    y: 1600, // Start from the bottom
    opacity: 0,
    delay: 1, // Delay to sync with loader fade-out
    onStart: function () {
      document.querySelector("#page1").style.zIndex = 1000; // Bring page1 to the top
    },
    duration: 2, // Adjust duration for smoother animation
    ease: "power4.inOut", // Use a more complex easing function for smoother movement
  });

  tl.from(".hero h1, .hero h2, .hero h3", {
     y: 110,
     delay: 0,
     duration: 0.3,
     stagger: 0.2
  });

  tl.to(".hero", {
     overflow: "visible"
  });

  tl.from("#nav-part2 h4", {
     opacity: 0,
     top: -100,
     stagger: 0.2,
     ease: "power4.inOut", // Use a more complex easing function for smoother movement
  });

  // Fade out the loader AFTER page1's animation has started
  tl.to("#loader", {
    opacity: 0,
    duration: 1, // Keep this duration to smoothly fade out the loader
    delay: 1, // Slight negative delay to overlap with page1 animation
    onComplete: function () {
      // Stop the CSS keyframes animation on .line h2
      let h2Element = document.querySelector(".line h2");
      h2Element.style.animation = "none"; // Stops the keyframe animation
    },
  });


  // Finally, remove the loader from DOM to avoid interaction issues
  tl.to("#loader", {
    display: "none",
  });

}


//Let's create a custom cursor functionality
document.addEventListener("mousemove", function (e) {
  // console.log(e);
  gsap.to("#cursor", {
    left: e.x,
    top: e.y,
  });
});

//magnet effect
function magneticCursor() {
  /*
     rect is a DOMRect object that contains information about the size and position of the element relative to the viewport. It is obtained by calling the method getBoundingClientRect() on the magnetElement. This object contains properties like the element's top, left, right, bottom, width, and height.

     getBoundingClientRect():
     getBoundingClientRect() is a built-in JavaScript method that returns a DOMRect object. This object provides the coordinates and dimensions of the element relative to the viewport (i.e., the visible part of the page). It helps you know where an element is located and how big it is on the screen.

     Here’s what getBoundingClientRect() returns:

     top: Distance from the top of the viewport to the top of the element.
     left: Distance from the left side of the viewport to the left side of the element.
     right: Distance from the left side of the viewport to the right side of the element.
     bottom: Distance from the top of the viewport to the bottom of the element.
     width: The width of the element.
     height: The height of the element.
     */

  const magnetElements = document.querySelectorAll("#nav-part2 h4");

  let myCustomCursorRadius = 50;

  magnetElements.forEach(function (magnetElement) {
    // Move element based on the cursor movement near the element
    magnetElement.addEventListener("mousemove", (event) => {
      const rect = magnetElement.getBoundingClientRect(); //This line of code fetches the position and size of the magnetElement relative to the current viewport and stores it in the rect variable.

      //We use getBoundingClientRect() because we want to know where the element is positioned on the screen in real-time and calculate the distance between the cursor and the center of the element.

      // Calculate the center of the element
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Calculate the distance between the cursor and the center of the element
      const distanceX = (event.clientX - elementCenterX) / 2; // Adjust for more prominent movement
      const distanceY = (event.clientY - elementCenterY) / 2;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Apply magnet effect when cursor is within custom radius
      if (distance < myCustomCursorRadius) {
        gsap.to(magnetElement, {
          x: distanceX * 5, // Increase the movement multiplier
          y: distanceY * 5, // To make the movement more dramatic
          ease: "power3.out", // Smooth easing for the movement
          duration: 0.5, // Duration for smoother transition
        });
      }
    });

    // Reset the element when the mouse leaves the element's area
    magnetElement.addEventListener("mouseleave", () => {
      gsap.to(magnetElement, {
        x: 0,
        y: 0,
        ease: "power3.out", // Smooth easing
        duration: 0.5, // Duration for smooth reset
      });
    });
  });

  // Optional: Ensure reset when the mouse leaves the viewport (entire page)
  document.addEventListener("mouseleave", () => {
    magnetElements.forEach((magnetElement) => {
      gsap.to(magnetElement, {
        x: 0,
        y: 0,
        ease: "power3.out",
        duration: 0.5,
      });
    });
  });
}

document.querySelectorAll(".hero h2, .hero h3, .hero h1").forEach((ele)=>{
     ele.addEventListener("mouseenter",()=>{
          ele.classList.add("hover-style");
     })
     ele.addEventListener("mouseleave",()=>{
          ele.classList.remove("hover-style");
     })
})


loadingAnimation();

magneticCursor();

