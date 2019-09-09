import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/models/user';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	currentUser = {
		name: 'Usuario'
	};

	constructor(private authService: AuthService, private router: Router) {
		this.currentUser = this.authService.getCurrentUser();
	}

	ngOnInit() {
	}

	logout() {
		this.authService.signOut();
		this.router.navigateByUrl('/auth/login');
	}

}
