import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
	}

	login(form){
		// console.log(form.value);
		this.authService.singIn(form.value).subscribe((res)=>{
			let name = res.dataUser['name'];
			console.log(`Welcome ${name}`);
			//console.log(res);
			this.router.navigateByUrl('admin');
		});
	}

}
