import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements AfterViewInit {
  // Reference to the carousel div in the t  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  // Array of pet images

  images: string[] = [
    '/assets/pets/cat1.jpg',
    '/assets/pets/cat2.jpg',
    '/assets/pets/cat3.jpg',
    '/assets/pets/cat4.jpg',
    '/assets/pets/cat5.jpg',
    '/assets/pets/cat6.jpg',
    '/assets/pets/cat4.jpg',
    '/assets/pets/cat5.jpg',
    '/assets/pets/cat6.jpg',

  ];



  ngAfterViewInit() {
    setTimeout(() => { // wait for DOM to render
      const container = this.carousel.nativeElement;
      let scrollPos = 0;
      const step = 210; // image width + gap
      const totalScroll = container.scrollWidth - container.clientWidth;

      if (totalScroll <= 0) {
        console.warn('Carousel is not scrollable! Check image widths and CSS.');
        return;
      }

      setInterval(() => {
        scrollPos += step;
        if (scrollPos > totalScroll) scrollPos = 0;
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }, 2000); // scroll every 2 seconds
    }, 0);
  }
}
