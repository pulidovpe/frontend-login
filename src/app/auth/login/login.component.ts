import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	isSubmitted = false;
	user_validation_messages = {
		'email': [
			{ type: 'required', message: 'Email is required' },
			{ type: 'pattern', message: 'Enter a valid email' }
		],
		'password': [
			{ type: 'required', message: 'The password is required' },
			{ type: 'minlength', message: 'Password must be at least 6 characters long' },
			{ type: 'maxlength', message: 'Password cannot be more than 30 characters long' },
			{ type: 'pattern', message: 'Your password must contain at least one numeric, one alphabetic, and one special characters' }
		]
	}

	constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: [null, Validators.compose([
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9._-]{2,64}@(?:[a-zA-Z0-9.-]{2,63}\.)[a-zA-Z]{2,6}$/)
         ])],
         password: [null, Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)//,
            //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/)
         ])]
		});
	}

	get formControls() { return this.loginForm.controls; }

	login() {
		console.log(this.loginForm.value);
		this.isSubmitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this.authService.singIn(this.loginForm.value).subscribe((res)=>{
			let name = res.dataUser['name'];
			console.log(`Welcome ${name}`);
			//console.log(res);
			this.router.navigateByUrl('admin');
		});
	}

}
