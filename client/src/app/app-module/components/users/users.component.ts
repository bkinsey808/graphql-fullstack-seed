declare var require: any;

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Subject } from 'rxjs/Subject';
import { DocumentNode } from 'graphql';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UsersQuery } from '../../../../graphql/schema';


// todo figure out how to refactor this to not use require
const UsersQueryNode: DocumentNode = require('graphql-tag/loader!../../../../graphql/Users.graphql');

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: ApolloQueryObservable<UsersQuery>;

  constructor(private apollo: Apollo) {
    this.apollo = apollo;
  }

  public ngOnInit() {
    // Query users data with observable variables
    this.users = this.apollo.watchQuery<UsersQuery>({
      query: UsersQueryNode,
    })
      // Return only users, not the whole ApolloQueryResult
      .map(result => {
        console.log(result.data.users);
        return result.data.users;
      }) as any;
  }

}
