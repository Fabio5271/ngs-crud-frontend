import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { UserService } from '../../Services/user.service';
import { RoleService } from '../../Services/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userList: User[] = [];
  roleList: Role[] = [];
  // Get data from model
  userToModify: User = new User();
  // Determines whether we are updating or creating a new user
  creationMode: boolean = true;

  constructor(private userService: UserService,
              private roleService: RoleService) {
    this.getAllUsers();
    this.getAllRoles();
  }
  // Get all users from database
  getAllUsers(){
    this.userService.getAll().subscribe((response: User[])=>{
      this.userList = response;
    })
  }
  // Get all roles from database
  getAllRoles(){
    this.roleService.getAll().subscribe((response)=>{
      this.roleList = response;
    })
  }
  // Update User
  modifyUser(){
    this.userService.update(this.userToModify).subscribe(()=>{
      alert("User Updated Successfully");
      window.location.reload();
    })
  }
  // Create new user in database
  createUser(){
    const newUser = {
      userName: this.userToModify.userName,
      lastName: this.userToModify.lastName,
      role: {
        id: this.userToModify.role.id,
      }
    };
    this.userService.create(newUser).subscribe(()=>{
      alert("User Created Successfully");
      window.location.reload();
    });
  }
  // Delete user by id
  deleteUser(userId : string){
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.delete(userId).subscribe(()=>{
        alert("User Deleted Successfully");
        window.location.reload();
      });
    }
  }
  // Verify the event
  openModel(user : User = new User()){
    if (user.id == ""){
      this.creationMode = true;
      this.userToModify = new User();
    } else {
      this.creationMode = false;
      this.userToModify = user;
    }
  }
}
