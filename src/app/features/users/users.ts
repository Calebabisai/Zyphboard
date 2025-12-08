import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User, UserRole, UserCreateDto, UserUpdateDto } from '../../models/user.model';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class Users {
  
}
