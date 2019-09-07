import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	isSubmitted = false;
	user_validation_messages = {
		'fullname': [
			{ type: 'required', message: 'The full name is required' },
			{ type: 'minlength', message: 'The full name must be at least 6 characters long' },
			{ type: 'maxlength', message: 'The full name cannot be more than 30 characters long' },
			{ type: 'pattern', message: 'Your full name must contain only letters' }
		],
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
		this.registerForm = this.formBuilder.group({
			fullname: [null, Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(30),
				Validators.pattern(/^[a-zA-Z \t]{6,30}$/)
			])],
			email: [null, Validators.compose([
				Validators.required,
				Validators.pattern(/^[a-zA-Z0-9._-]{2,64}@(?:[a-zA-Z0-9.-]{2,63}\.)[a-zA-Z]{2,6}$/)
			])],
			password: [null, Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(30),
				Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/)
			])]
		});
	}

	get formControls() { return this.registerForm.controls; }

	register() {
		console.log(this.registerForm.value);
		this.isSubmitted = true;
		if (this.registerForm.invalid) {
			return;
		}
		this.authService.register(this.registerForm.value).subscribe((res) => {
			//console.log(res);
			this.router.navigateByUrl('login');
		});
	}

}
