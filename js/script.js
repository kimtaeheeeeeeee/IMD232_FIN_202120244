document.addEventListener('DOMContentLoaded', function () {
  //MDN Referencesd의 EventTarget.addEventListener()를 활용하여 생성하였습니다
  let canvas = document.getElementById('waterCanvas'); //MDN Referencesd의 Document.getElementById()를 활용하여 생성하였습니다
  let ctx = canvas.getContext('2d');
  let particles = [];

  canvas.width = window.innerWidth; //MDN Referencesd의 Window.innerHeight글을 참고하여 제작했습니다
  canvas.height = window.innerHeight;

  let container = document.getElementById('waterCanvasContainer');
  let canvasContainerRect = container.getBoundingClientRect();

  //Week6: Particle System step 1,2을 응용해 파티클 클래스와 업데이트를 생성하였습니다
  class Particle {
    constructor(x, y, font) {
      this.x = x;
      this.y = y;
      this.size = 4.5;
      this.speedY = Math.random() * 3 - 1.5; //P5*js speed() 레퍼런스를 활용하였습니다
      this.text = getRandomText();
      this.font = font || 'Verdana';
      this.isFalling = true;
    }

    update() {
      if (this.isFalling) {
        this.y += this.speedY;
        this.speedY += 0.1;

        if (this.y + this.size >= canvasContainerRect.bottom) {
          this.y = canvasContainerRect.bottom - this.size;
          this.isFalling = false;
        }
      }
    }

    //MDN Referencesd의 https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage 해당글을 참고해 박스내 요소를 설정하였습니다
    draw() {
      ctx.fillStyle = 'rgba(255,250,250)';
      ctx.letterSpacing = 7;
      ctx.fillText(this.text, this.x, this.y);
      ctx.letterSpacing = 0;
    }
  }

  function getRandomText() {
    let texts = ['As', 'w', 'h', 'i', 't', 'e', 'as', 'snow']; //P5*js const 레퍼런스를 활용하였습니다
    return texts[Math.floor(Math.random() * texts.length)]; //P5*js random 레퍼런스를 활용하였습니다
  }

  function createParticles(e) {
    let xPos = e.clientX;
    let yPos = e.clientY;

    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(xPos, yPos));
    }
  }

  window.addEventListener('mousemove', createParticles);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      //MDN Referencesd의 for 문 글을 참고하여 애니메이션을 제작했습니다
      particles[i].update();
      particles[i].draw();

      if (!particles[i].isFalling && particles[i].size >= 5) {
        particles.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});
