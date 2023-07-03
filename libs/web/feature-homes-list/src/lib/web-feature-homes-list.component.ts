import {
  ChangeDetectionStrategy,
  Component, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebFacade} from "@smart-home/web/data-access";
import { CardModule } from 'primeng/card';
import {faCity, faPeopleGroup, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SharedUiFaIconComponent} from "@smart-home/shared/ui-fa-icon";
import {ButtonModule} from "primeng/button";
import {StopClickPropagationDirective} from "@smart-home/mobile/shared/util";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'smart-home-web-feature-homes-list',
  standalone: true,
  imports: [CommonModule, CardModule, SharedUiFaIconComponent, ButtonModule, StopClickPropagationDirective, DialogModule, InputTextModule, ReactiveFormsModule, ConfirmDialogModule],
  templateUrl: './web-feature-homes-list.component.html',
  styleUrls: ['./web-feature-homes-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ConfirmationService]
})
export class WebFeatureHomesListComponent implements OnInit {
  readonly CITY_ICON = faCity
  readonly FAMILY_ICON = faPeopleGroup
  readonly DELETE_ICON = faTrash
  readonly ADD_ICON = faPlus

  addDialogVisible = false;

  addHomeForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    city: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  })

  constructor(private storeFacade: WebFacade, private confirmationService: ConfirmationService) {
  }

  homesVm$ = this.storeFacade.homesVm$;

  ngOnInit() {
    this.storeFacade.getHomes();
    this.homesVm$.subscribe(console.log)
  }

  onSubmit() {
    this.storeFacade.createHome({...this.addHomeForm.getRawValue()})
    this.addHomeForm.reset();
    this.addDialogVisible = false;
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this record?',
        header: 'Delete Confirmation',
      accept: () => this.storeFacade.deleteHome(id)
    })
  }
}
