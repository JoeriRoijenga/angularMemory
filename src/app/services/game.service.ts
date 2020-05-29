import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class GameService {
  private sizeSource = new BehaviorSubject<number>(6);
  public currentSize = this.sizeSource.asObservable();

  private charSource = new BehaviorSubject<string>("*");
  public currentChar = this.charSource.asObservable();

  private foundSource = new BehaviorSubject<number>(0);
  public currentFound = this.foundSource.asObservable();

  private timeSource = new BehaviorSubject<number>(0);
  public startTime = this.timeSource.asObservable();

  private scoreSource = new BehaviorSubject<number>(0);
  public scoreNew = this.scoreSource.asObservable();

  private loadBarSource = new BehaviorSubject<boolean>(false);
  public loadBarNew = this.loadBarSource.asObservable();

  private currentTimeSource = new BehaviorSubject<number>(0);
  public currentTime = this.currentTimeSource.asObservable();

  constructor() { }

  public changeSize(size: number): void {
    this.sizeSource.next(size);
  }

  public changeChar(char: string): void {
    this.charSource.next(char);
  }

  public changeFound(found: number): void {
    this.foundSource.next(found);
  }

  public timerEvent(event: number): void {
    this.timeSource.next(event);
  }

  public changeScore(time: number): void {
    this.scoreSource.next(time);
  }

  public loadbarStateChange(state: boolean): void {
    this.loadBarSource.next(state);
  }

  public currentTimeChange(time: number): void {
    this.currentTimeSource.next(time);
  }
}
