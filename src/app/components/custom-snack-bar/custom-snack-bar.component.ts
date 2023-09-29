import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) protected readonly data: any){}

  closeSnackbar(){
    this.data.snackBar.dismiss();
  }

  static openErrorSnackBar(snackBar: MatSnackBar,message: string, action: string){ // TODO: przenieść jako static do CustonSnackbarComponent
    snackBar.openFromComponent(CustomSnackBarComponent,{
      data:{
        message: message,
        action: action,
        icon: 'report-problem',
        snackBar: snackBar,
        color: "#eb0808"
      },
      panelClass: 'error-snackbar',
      duration: 5000,
    })
  }

  static openSuccessSnackBar(snackBar: MatSnackBar,message: string, action: string){
    snackBar.openFromComponent(CustomSnackBarComponent,{
      data:{
        message: message,
        action: action,
        icon: 'done',
        snackBar: snackBar,
        color: "#0afd32f3"
      },
      panelClass: 'success-snackbar',
      duration: 5000,
    })
  }
}
