import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RoleService} from '../../../core/api/legacy/role.service';
import {UserService} from 'src/app/core/api/legacy/user.service';
import {RoleDto} from '../../../core/api/dto/role.dto';
import {UserDto} from '../../../core/api/dto/user.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.css'],
})
export class TaskDetailModalComponent implements OnInit {
  objectKeys: any = Object.keys;
  @Input() task: any = {};
  @Output() closeTaskModalClick = new EventEmitter<boolean>();
  @Input() roles: Record<string, RoleDto>;
  @Input() users: Record<string, UserDto>;

  /*******************************************************************
                      Constructor, Lifecycle Hooks
  *******************************************************************/
  constructor(private roleService: RoleService, private userService: UserService) {}

  ngOnInit() {
    if (!this.roles) {
      this.getRoles();
    }
    if (!this.users) {
      this.getUsers();
    }
  }

  /*******************************************************************
                          Service Calls
  *******************************************************************/
  getRoles(): void {
    this.roleService.getRoles().subscribe((r: RoleDto[]) => {
      this.roles = r.reduce((map: Record<string, RoleDto>, obj) => ((map[obj._id] = obj), map), {});
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((r: UserDto[]) => {
      this.users = r.reduce((map: Record<string, UserDto>, obj) => ((map[obj._id] = obj), map), {});
    });
  }

  /*******************************************************************
                          Click Handlers
  *******************************************************************/
  handleCloseModalClick() {
    this.closeTaskModalClick.emit(true);
  }
}
