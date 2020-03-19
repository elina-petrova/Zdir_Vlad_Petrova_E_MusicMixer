(()=>{
    console.log('play');
    let keys = Array.from(document.querySelectorAll('.key'));
    let overlay = document.querySelector('.overlay');
    let overlayButton = document.querySelector('.startGame');
    let   dragZoneBase = [],
          dragZoneDrums = [];
  
    let audioElement;
    let audioElementPiano;
  
    var DrumsElectro = new Audio();
    DrumsElectro.src = "sounds/DrumsElectro.m4a";
  
    var DrumsHipHop = new Audio();
    DrumsHipHop.src = "sounds/DrumsHipHop.m4a";
  
    var DrumsRock = new Audio();
    DrumsRock.src = "sounds/DrumsRock.m4a";
  
    var DrumsFunky = new Audio();
    DrumsFunky.src = "sounds/DrumsFunky.m4a";
  
    var BaseElectro = new Audio();
    BaseElectro.src = "sounds/BaseElectro.m4a";
  
    var BaseHipHop = new Audio();
    BaseHipHop.src = "sounds/BaseHipHop.m4a";
  
    var BaseRock = new Audio();
    BaseRock.src = "sounds/BaseRock.m4a";
  
    var BaseFunky = new Audio();
    BaseFunky.src = "sounds/BaseFunky.m4a";
  
  
    var allMus = [DrumsHipHop, DrumsRock, DrumsElectro, DrumsFunky, BaseHipHop, BaseRock, BaseElectro, BaseFunky];
  
    allMus.forEach (piece =>{
      piece.loop = true;
      piece.volume = 0.2;
    });
  
    function startMus(){
      allMus.forEach (piece =>{
        piece.currentTime = 0;
      });
      console.log('HAHAHA');
  
      return allMus;
    }
    
  
    const dropZones = document.querySelectorAll('.drop_zone'),
          buttons = document.querySelectorAll('.button img'),
          dragZone = document.querySelectorAll('.button_holders div');
  
          
    for(let i = 0; i < 8; i++){
      if(i<4){
        dragZoneDrums.push(dragZone[i]);
      }
      else{
        dragZoneBase.push(dragZone[i]);
      }
    }
  
  
    overlayButton.addEventListener('click', () => {
              overlay.classList.remove('visible');
            });
    
  
    keys.forEach(key => key.addEventListener('transitionend', resetKey));
   
    function resetKey(){
      this.classList.remove('active');
    }
    function playSound(event){
      audioElementPiano = document.querySelector(`audio[data-key="${event.keyCode}"]`);
      let key = document.querySelector(`li[data-key="${event.keyCode}"]`);
      if(!audioElementPiano ){ return }
      audioElementPiano.currentTime = 0;
      audioElementPiano.play();
  
      key.classList.add('active');
    }
  
    function allowDrag(event) {
      console.log('started draggin an image');
  
      event.dataTransfer.setData("text/plain", this.id);
      console.log(this.id);
    }
  
  
    function allowDragOver(event) {
      event.preventDefault();
      console.log('dragged over a drop zone');
    }
  
    function allowDrop(event) {
      let currentImage = event.dataTransfer.getData("text/plain");
      console.log(currentImage);
      let droppingImage = document.querySelector(`#${currentImage}`);
  
      if(this.childNodes.length === 0 && this.classList[0] === droppingImage.dataset.ref) {
      droppingImage.parentNode.classList.add("dragOver");
      this.appendChild(droppingImage); 
      startMus.call(); 
      allMus[`${droppingImage.dataset.mus}`].play();
    }
  
    else if (this.childNodes.length > 0 && this.classList[0] === droppingImage.dataset.ref){
      if(droppingImage.dataset.mus < 4){
      dragZoneDrums.forEach(zone => {
        if(zone.childNodes.length === 2){
          allMus[`${this.firstChild.dataset.mus}`].pause();
          zone.classList.remove("dragOver");
          zone.appendChild(this.firstChild);
          droppingImage.parentNode.classList.add("dragOver");
          this.appendChild(droppingImage); 
          startMus.call(); 
          allMus[`${droppingImage.dataset.mus}`].play();
          return;
          
        }
      });
    }
    else{
      dragZoneBase.forEach(zone => {
        if(zone.childNodes.length === 2){
          allMus[`${this.firstChild.dataset.mus}`].pause();
          zone.classList.remove("dragOver");
          zone.appendChild(this.firstChild);
          droppingImage.parentNode.classList.add("dragOver");
          this.appendChild(droppingImage); 
          startMus.call(); 
          allMus[`${droppingImage.dataset.mus}`].play();
          return;
          
        }
      });
    }
    }
    console.log(this.childNodes.length);
  }
  
  function allowDropBack(event) {
    let currentImage = event.dataTransfer.getData("text/plain");
    console.log(currentImage);
    let droppingImage = document.querySelector(`#${currentImage}`);
  
    if(this.classList[1] === droppingImage.classList[0]) {
    
    this.appendChild(droppingImage); 
    this.classList.remove('dragOver');
    allMus[`${droppingImage.dataset.mus}`].pause();
  }
  
  }
  
    window.addEventListener('keydown', playSound);
  
    buttons.forEach(piece => piece.addEventListener('dragstart', allowDrag));
  
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', allowDragOver);
      zone.addEventListener('drop', allowDrop);
    });
  
    dragZone.forEach(zone => {
      zone.addEventListener('dragover', allowDragOver);
      zone.addEventListener('drop', allowDropBack);
    });
  
    
  
  
  })();
  