 // ParticlesJS Config.
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 700 } },


    "color": {
      "value": "#e1e8f0" },//color of dots

    "shape": {
      "type": "circle",//shape of dotes.
      "stroke": {
        "width": 0,
        "color": "#FFFFFF" },

      "polygon": {
        "nb_sides": 5 } },


    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false } },


    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false } },


    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#6ED3CF",//color of lines
      "opacity": 1.2,//thickness of lines
      "width": 1 },

    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200 } } },



  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" },

      "onclick": {
        "enable": true,
        "mode": "push" },

      "resize": true },

    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1 } },


      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3 },

      "repulse": {
        "distance": 200,
        "duration": 0.4 },

      "push": {
        "particles_nb": 4 },

      "remove": {
        "particles_nb": 2 } } },



  "retina_detect": true });