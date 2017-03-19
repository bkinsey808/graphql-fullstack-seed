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

const UsersQueryNode: DocumentNode = require('graphql-tag/loader!../../graphql/Users.graphql');
import { UsersQuery } from '../../graphql/schema';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: ApolloQueryObservable<UsersQuery>;
  private apollo: Apollo;

  constructor(apollo: Apollo) {
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
