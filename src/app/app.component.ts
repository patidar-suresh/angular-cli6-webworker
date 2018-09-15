import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cli6-webworker';
  processingResult:string;

  cpuIntensiveProcessing(d) {
    let result = this.cpuIntensiveCalc(5000)
    this.processingResult = "Total iterations done in 5 second duration :- " + result.iteration;
  }

  private cpuIntensiveCalc(duration: number) {
    const before = new Date();
    let count = 0;
    while (true) {
      count++;
      const now = new Date();
      if (now.valueOf() - before.valueOf() > duration) {
        break;
      }
    }
    return { iteration: count };
  }
}
