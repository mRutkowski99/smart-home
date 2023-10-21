import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MobileSharedAuthFeatureComponent} from "./mobile-shared-auth-feature.component";

const routes: Routes = [
    {
        path: '',
        component: MobileSharedAuthFeatureComponent
    }
]

@NgModule({
    imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [MobileSharedAuthFeatureComponent],
    exports: [RouterModule]
})export class MobileSharedAuthFeatureModule {}