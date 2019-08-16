import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule} from './material.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { QuestionComponent} from './test/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
