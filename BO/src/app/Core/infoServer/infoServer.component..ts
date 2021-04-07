import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-infos',
    templateUrl: './infoServer.component.html',
    styleUrls: ['./infoServer.component.scss']
})

export class InfoServerComponent  {

    constructor(private router: Router, private route: ActivatedRoute) {}
}
