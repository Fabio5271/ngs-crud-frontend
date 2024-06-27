import { Component } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../Services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleList: Role[] = [];
  // Get data from model
  newRole: Role = new Role();
  // Determines wither we are updating or creating a new role
  creationMode: boolean = true;
  
  constructor(private roleService: RoleService){
    this.getAllRoles();
  }
  // Get all roles from database
  getAllRoles(){
    this.roleService.getAll().subscribe((response: Role[])=>{
      this.roleList = response;
    })
  }
  // Delete role by id
  deleteRole(roleId: string){
    if(confirm("Are you sure you want to delete this role?")){
      this.roleService.delete(roleId).subscribe(()=>{
        alert("Role Deleted Successfully");
        window.location.reload();
      })
    }
  }
  // Create new role in database
  createRole(){
    const newRole = {
      roleName: this.newRole.roleName
    }
    this.roleService.create(newRole).subscribe(()=>{
      alert("Role Created Successfully");
      window.location.reload();
    })
  }
  // Update role
  modifyRole(){
    this.roleService.update(this.newRole).subscribe(()=>{
      alert("Role Updated Successfully");
      window.location.reload();
    })
  }
  // Verify the event
  openModel(role: Role = new Role()){
    if(role.id == ""){
      this.newRole = new Role();
    } else {
      this.creationMode = false;
      this.newRole = role;
    }
  }
}
