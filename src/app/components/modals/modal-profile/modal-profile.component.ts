import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { ItModalComponent } from 'design-angular-kit';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrl: './modal-profile.component.scss',
})
export class ModalProfileComponent implements AfterViewInit {
  @ViewChild('modalProfile') modalProfile!: ItModalComponent;

  @Input() profileDetail: any;

  isEmailType: boolean = false;
  remainingTime: number = 60;
  timerInterval: any;

  firstModalVisible = true;
  secondModalVisible = false;

  userInput: string = '';
  confirmInput: string = '';

  ngAfterViewInit(): void {
    // Rimuovo questa riga, poiché non voglio aprire automaticamente la modale all'inizio
    // this.modalProfile.toggle();

    document
      .getElementById('newInput')!
      .addEventListener('input', () => this.setUserInputDisplay());
    document
      .getElementById('confirmInput')!
      .addEventListener('input', () => this.setUserInputDisplay());
  }

  openModal(type: 'email' | 'phone'): void {
    this.isEmailType = type === 'email';
    console.log('modal', type);

    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);

    this.modalProfile.toggle();
  }

  setUserInputDisplay(): void {
    const displayValue = this.isEmailType
      ? this.userInput
      : this.profileDetail?.phone;
    document.getElementById('userInputDisplay')!.innerText = displayValue || '';
  }

  showFirstModal() {
    this.firstModalVisible = true;
    this.secondModalVisible = false;
    this.userInput = '';
    this.confirmInput = '';
    this.setUserInputDisplay();
  }

  showSecondModal() {
    this.firstModalVisible = false;
    this.secondModalVisible = true;
    this.setUserInputDisplay();
  }

  // converto il tempo rimanente in formato mm:ss
  formatTime(): string {
    const minutes: number = Math.floor(this.remainingTime / 60);
    const seconds: number = this.remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
