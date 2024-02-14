import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IUser } from 'src/app/shared/models/admin/user';
import { AccountsService } from 'src/app/shared/services/accounts.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('munir.sheikh@live.com', [Validators.required, Validators.email]),
    password: new FormControl('Pa$$w0rd', Validators.required),
  });
  
  returnUrl: string | undefined;
  user: IUser | null | undefined;

  constructor(private accountService: AccountsService, 
      private router: Router, private activatedRoute: ActivatedRoute) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/userTask';
    //console.log('returnUrl:', this.returnUrl);
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('munir.sheikh@live.com', [Validators.required, Validators.email]),
      password: new FormControl('Pa$$w0rd', Validators.required),
    })
  }

  onSubmit(){
    if(this.loginForm !== undefined) {
      this.accountService.login(this.loginForm.value).subscribe(() => {
        if(this.user?.roles.includes('Candidate')) return;
        this.router.navigateByUrl('userTask');
      }, error => {
        console.log(error);
      })
    }
  }

}
