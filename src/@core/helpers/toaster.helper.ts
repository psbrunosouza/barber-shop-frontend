import {ToastrService} from "ngx-toastr";
import {Injectable} from "@angular/core";

@Injectable()
export class ToasterHelper {
  constructor(private toastr: ToastrService) {
  }

  showSuccess(title: string, message: string): void{
    this.toastr.success(message, title, {
      progressAnimation: 'decreasing',
      progressBar: true,
    })
  }

  showError(title: string, message: string): void{
    this.toastr.error(message, title, {
      progressAnimation: 'decreasing',
      progressBar: true,
    })
  }

  showWarning(title: string, message: string): void{
    this.toastr.warning(message, title, {
      progressAnimation: 'decreasing',
      progressBar: true,
    })
  }
}
