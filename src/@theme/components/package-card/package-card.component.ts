import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {PackageModel} from "../../../@core/data/PackageModel";
import {CartService} from "../../../@core/api/packages/cart.service";
import {DeletePackageComponent} from "../../../app/dashboard/packages/delete-package/delete-package.component";
import {EditPackageComponent} from "../../../app/dashboard/packages/edit-package/edit-package.component";
import {ModalDialogService} from "ngx-modal-dialog";
import {PackageListService} from "../../../app/dashboard/packages/package-list.service";

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent implements OnInit {
  @Input() packageModels: PackageModel[] = [];
  @Input() canEdit?: boolean;
  @Input() canDelete?: boolean;
  @Input() canAdd?: boolean;
  cart: PackageModel[] = [];

  constructor(private cartService: CartService, private modalService: ModalDialogService,
              private viewRef: ViewContainerRef, private packageListService: PackageListService) {
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
  }

  addToCart(packageModel: PackageModel): void {
    !this.cart.some(item => item.id === packageModel.id) && this.cartService.saveCart(packageModel);
  }


  openDeleteDialog(data: PackageModel) {
    this.modalService.openDialog(this.viewRef, {
        title: 'Deletar Pacote',
        childComponent: DeletePackageComponent,
        data: data,
        onClose: () => {
          this.packageListService.handleRefreshPackageList()
          return true;
        }
      }
    )
  }

  openUpdateDialog(id: number) {
    this.modalService.openDialog(this.viewRef, {
        title: 'Atualizar Pacote',
        childComponent: EditPackageComponent,
        data: id,
        onClose: () => {
          this.packageListService.handleRefreshPackageList()
          return true;
        }
      }
    )
  }
}
