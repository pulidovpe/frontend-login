import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../auth/models/user';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	currentUser = {};

	constructor(private authService: AuthService) {
		this.currentUser = this.authService.getCurrentUser();
	}

	ngOnInit() {
	}

	handleLogout() {
		this.authService.signOut();
	}

}
