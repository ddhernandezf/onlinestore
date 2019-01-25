export class ModalView {
    Show: boolean;
    Title: string;

    constructor(show: boolean, title: string) {
      this.Show = show;
      this.Title = title;
    }

    Caller($event) {
        this.Show = $event;
    }

    WakeUp() {
        this.Show = true;
    }
}
