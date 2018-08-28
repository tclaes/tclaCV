import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angularfire2 modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';

import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CvComponent } from './cv/cv.component';
import { UploadModule } from './uploads/shared/upload.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserProfileComponent,
    TodoListComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    CvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    NgbModule,
    CoreModule,
    UploadModule,
    AppRoutingModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
