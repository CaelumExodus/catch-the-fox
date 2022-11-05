import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('runningImage') runningImage!: ElementRef;

  constructor(
    private readonly _erRef: ElementRef
  ) {
  }

  public runAway() {
    const imageDimensions = {
      x: this.runningImage.nativeElement.offsetWidth,
      y: this.runningImage.nativeElement.offsetHeight,
    }
    const containerDimensions = {
      x: this.container.nativeElement.offsetWidth - imageDimensions.x,
      y: this.container.nativeElement.offsetHeight - imageDimensions.y,
    }
    const imageOffset = {
      x: this.runningImage.nativeElement.offsetLeft,
      y: this.runningImage.nativeElement.offsetTop,
    }
    let randomizeCoordinates = this.setParameters(containerDimensions.x, containerDimensions.y);

    while(
      (
        randomizeCoordinates.x > imageOffset.x - imageDimensions.x
        &&
        randomizeCoordinates.x < imageOffset.x + imageDimensions.x
      )
      &&
      (
        randomizeCoordinates.y > imageOffset.y - imageDimensions.y
        &&
        randomizeCoordinates.y < imageOffset.y + imageDimensions.y
      )
      ) {
      randomizeCoordinates = this.setParameters(containerDimensions.x, containerDimensions.y);
    }

    this.runningImage.nativeElement.setAttribute(
      'style',
      `top: ${ randomizeCoordinates.y }px; left:${ randomizeCoordinates.x }px`)
  }

  private setParameters(x: number, y: number): { x: number, y: number } {
    const randomX = this.getRandomInt(x);
    const randomY = this.getRandomInt(y);

    return {x: randomX, y: randomY};
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
